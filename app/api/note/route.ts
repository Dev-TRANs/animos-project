const configuredNoteUrl =
  process.env.NOTE_ACCOUNT_URL ??
  process.env.NEXT_PUBLIC_NOTE_ACCOUNT_URL ??
  "https://note.com/lithe_daisy9215";

export const dynamic = "force-static";

function decodeXml(value: string) {
  return value
    .replace(/^<!\[CDATA\[|\]\]>$/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;|&apos;/g, "'");
}

function readTag(item: string, tag: string) {
  const match = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeXml(match[1].trim()) : "";
}

function readThumbnail(item: string) {
  const attributePatterns = [
    /<media:thumbnail\b[^>]*\burl=["']([^"']+)["'][^>]*>/i,
    /<media:content\b[^>]*\burl=["']([^"']+)["'][^>]*>/i,
    /<enclosure\b[^>]*\burl=["']([^"']+)["'][^>]*>/i,
  ];

  for (const pattern of attributePatterns) {
    const match = item.match(pattern);
    if (match?.[1]) return decodeXml(match[1]);
  }

  const thumbnailTag = readTag(item, "media:thumbnail");
  if (thumbnailTag.startsWith("http")) return thumbnailTag;

  const description = readTag(item, "description");
  const imageMatch = description.match(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/i);
  return imageMatch?.[1] ? decodeXml(imageMatch[1]) : "";
}

export async function GET() {
  if (!configuredNoteUrl) {
    return Response.json({ items: [], accountUrl: "" });
  }

  const accountUrl = configuredNoteUrl.replace(/\/+$/, "");

  try {
    const response = await fetch(`${accountUrl}/rss`, {
      headers: { Accept: "application/rss+xml, application/xml, text/xml" },
    });

    if (!response.ok) throw new Error(`note feed returned ${response.status}`);

    const xml = await response.text();
    const items = Array.from(xml.matchAll(/<item\b[\s\S]*?<\/item>/gi))
      .slice(0, 20)
      .map(([item]) => {
        const publishedAt = new Date(readTag(item, "pubDate"));
        const date = Number.isNaN(publishedAt.getTime())
          ? ""
          : new Intl.DateTimeFormat("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(publishedAt).replace(/\//g, ".");

        return {
          date,
          title: readTag(item, "title"),
          url: readTag(item, "link"),
          thumbnail: readThumbnail(item),
        };
      })
      .filter((item) => item.title && item.url);

    return Response.json(
      { items, accountUrl },
      { headers: { "Cache-Control": "public, max-age=900" } },
    );
  } catch {
    return Response.json(
      { items: [], accountUrl },
      { status: 200, headers: { "Cache-Control": "public, max-age=120" } },
    );
  }
}
