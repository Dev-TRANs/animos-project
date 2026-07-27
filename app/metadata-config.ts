import type { Metadata } from "next";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.CF_PAGES_URL ??
  "https://dev-trans.github.io/animos-project"
).replace(/\/$/, "");

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
