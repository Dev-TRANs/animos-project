import type { Metadata } from "next";
import { withBasePath } from "./base-path";
import { ScrollBoundaryGuard } from "./components/ScrollBoundaryGuard";
import { siteUrl, socialImage } from "./metadata-config";
import "./globals.css";

const homeDescription =
  "防災×情報×〇〇で、誰一人取り残されない社会へ。地域・自治体・企業・学校と連携し、日常から安心して暮らせる地域をつくるANIMOS PROJECT。";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: {
    default: "ANIMOS PROJECT",
    template: "%s | ANIMOS PROJECT",
  },
  description: homeDescription,
  alternates: {
    canonical: `${siteUrl}/`,
  },
  icons: {
    icon: withBasePath("/animos-logo.png"),
    shortcut: withBasePath("/animos-logo.png"),
  },
  openGraph: {
    title: "誰一人取り残されない社会へ。｜ANIMOS PROJECT",
    description: homeDescription,
    url: `${siteUrl}/`,
    siteName: "ANIMOS PROJECT",
    type: "website",
    locale: "ja_JP",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "誰一人取り残されない社会へ。｜ANIMOS PROJECT",
    description: homeDescription,
    images: [socialImage.url],
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
      <body>
        <ScrollBoundaryGuard />
        {children}
      </body>
    </html>
  );
}
