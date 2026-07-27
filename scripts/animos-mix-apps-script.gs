const SPREADSHEET_ID = "1A8-EwLLPnR2OVIQvVlU6jM4re0uouk9qo6ABtz84LO0";
const SHEET_NAME = "main";

function doGet() {
  return jsonResponse_({ ok: true, service: "ANIMOS MIX" });
}

function doPost(event) {
  const lock = LockService.getScriptLock();

  try {
    const params = event && event.parameter ? event.parameter : {};
    const honeypot = String(params.website || "").trim();
    const idea = String(params.idea || "")
      .replace(/[\u0000-\u001F\u007F]/g, " ")
      .trim()
      .slice(0, 16);
    const source = String(params.source || "").trim().slice(0, 500);

    if (honeypot) {
      return jsonResponse_({ ok: true });
    }
    if (!idea) {
      return jsonResponse_({ ok: false, error: "idea is required" });
    }

    lock.waitLock(10000);

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error('Sheet "main" was not found.');
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["受信日時", "アイデア", "送信元"]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, 3).setFontWeight("bold");
    }

    const safeIdea = /^[=+\-@]/.test(idea) ? `'${idea}` : idea;
    sheet.appendRow([new Date(), safeIdea, source]);
    return jsonResponse_({ ok: true });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  } finally {
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
