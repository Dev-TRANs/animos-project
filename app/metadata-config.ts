import type { Metadata } from "next";

// Canonical URLs, sitemap URLs and social cards must use the same production host.
// Change this value first when the public domain changes.
export const siteUrl = "https://animos.stki.org";

export const socialImage = {
  url: `${siteUrl}/og.png`,
  width: 2594,
  height: 1274,
  alt: "誰も取り残さない地域防災を。 ANIMOS PROJECT",
};

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const pageUrl = `${siteUrl}${path === "/" ? "/" : `${path}/`}`;
  const socialTitle = `${title} | ANIMOS PROJECT`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: pageUrl,
      siteName: "ANIMOS PROJECT",
      type: "website",
      locale: "ja_JP",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage.url],
    },
  };
}
