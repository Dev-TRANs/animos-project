"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

const defaultAnimosMixEndpoint =
  "https://script.google.com/macros/s/AKfycbyL9KmHtJp-cH1YNTQC-xioFKwX2d1A2XTWhaR1p9x2rVcpQc275ARL5aCMxlqGBLwtSw/exec";

export function EditableThemeWord() {
  const [word, setWord] = useState("〇〇");
  const [draft, setDraft] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const endpoint =
    process.env.NEXT_PUBLIC_ANIMOS_MIX_ENDPOINT?.trim() || defaultAnimosMixEndpoint;

  useEffect(() => {
    const syncWord = (event: Event) => {
      setWord((event as CustomEvent<string>).detail);
    };
    window.addEventListener("animos-theme-word", syncWord);
    return () => window.removeEventListener("animos-theme-word", syncWord);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const openEditor = () => {
    setDraft(word === "〇〇" ? "" : word);
    setSubmitState("idle");
    setSubmitMessage("");
    setIsOpen(true);
  };

  const applyWord = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedWord = draft.trim().slice(0, 16);
    const form = event.currentTarget;
    const honeypot = new FormData(form).get("website");
    if (!normalizedWord || honeypot || submitState === "submitting") return;

    if (!endpoint) {
      setSubmitState("error");
      setSubmitMessage("送信先の設定がまだ完了していません。");
      return;
    }

    setSubmitState("submitting");
    setSubmitMessage("スプレッドシートへ届けています…");

    try {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        keepalive: true,
        body: new URLSearchParams({
          idea: normalizedWord,
          source: window.location.href,
          website: "",
        }),
      });
      setWord(normalizedWord);
      window.dispatchEvent(new CustomEvent("animos-theme-word", { detail: normalizedWord }));
      setSubmitState("success");
      setSubmitMessage("アイデアを届けました。ありがとう！");
      window.setTimeout(() => setIsOpen(false), 700);
    } catch {
      setSubmitState("error");
      setSubmitMessage("送信できませんでした。通信環境を確認して、もう一度お試しください。");
    }
  };

  return (
    <>
      <button
        className="editable-theme-word"
        type="button"
        onClick={openEditor}
        aria-label={`現在の言葉は「${word}」。タップして変更`}
        title="タップして言葉を変える"
      >
        <span className={word === "〇〇" ? "editable-theme-text is-pulsing" : "editable-theme-text"}>
          {word}
        </span>
      </button>
      {isOpen && createPortal(
        <div
          className="theme-editor-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <form className="theme-editor-dialog" role="dialog" aria-modal="true" aria-labelledby="theme-editor-title" onSubmit={applyWord}>
            <button className="theme-editor-close" type="button" onClick={() => setIsOpen(false)} aria-label="閉じる">×</button>
            <span className="theme-editor-orb" aria-hidden="true" />
            <p className="theme-editor-kicker">ANIMOS MIX</p>
            <h2 id="theme-editor-title">君は、何を<br />組み合わせる？</h2>
            <p className="theme-editor-formula">防災 <b>×</b> 情報 <b>×</b></p>
            <label className="theme-editor-field">
              <span>YOUR IDEA</span>
              <input
                ref={inputRef}
                value={draft}
                onChange={(event) => {
                  setDraft(event.target.value);
                  if (submitState !== "idle") {
                    setSubmitState("idle");
                    setSubmitMessage("");
                  }
                }}
                maxLength={16}
                placeholder="例：地域、福祉、教育"
                required
              />
            </label>
            <input className="theme-editor-trap" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            {submitMessage && (
              <p className={`theme-editor-status is-${submitState}`} role="status" aria-live="polite">
                {submitMessage}
              </p>
            )}
            <div className="theme-editor-actions">
              <button type="button" onClick={() => setIsOpen(false)}>キャンセル</button>
              <button type="submit" disabled={submitState === "submitting" || submitState === "success"}>
                {submitState === "submitting" ? "送信中…" : submitState === "success" ? "届きました" : "組み合わせる"}
                <span>→</span>
              </button>
            </div>
          </form>
        </div>,
        document.body,
      )}
    </>
  );
}
