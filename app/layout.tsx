import type { Metadata } from "next";
import { withBasePath } from "./base-path";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://animos-project.montblancabc.chatgpt.site";
const siteOrigin = new URL(siteUrl).origin;

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "アニモスプロジェクト",
    template: "%s｜アニモスプロジェクト",
  },
  description:
    "誰も取り残さない地域防災を。デジタルの力で地域の防災・福祉・情報をつなぐアニモスプロジェクト。",
  icons: {
    icon: withBasePath("/animos-logo.png"),
    shortcut: withBasePath("/animos-logo.png"),
  },
  openGraph: {
    title: "誰も取り残さない地域防災を。",
    description: "デジタルの力で地域の防災・福祉・情報をつなぐ。",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: withBasePath("/og.png"),
        width: 1792,
        height: 896,
        alt: "いつものつながりが、もしもの命を支える。 ANIMOS PROJECT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "誰も取り残さない地域防災を。",
    description: "デジタルの力で地域の防災・福祉・情報をつなぐ。",
    images: [withBasePath("/og.png")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Afacad:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
