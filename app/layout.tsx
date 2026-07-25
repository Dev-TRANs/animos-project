import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://animos-project.montblancabc.chatgpt.site"),
  title: {
    default: "アニモスプロジェクト",
    template: "%s｜アニモスプロジェクト",
  },
  description:
    "防災・福祉・情報をつなぎ、誰も取り残されない地域をつくるアニモスプロジェクト。",
  icons: {
    icon: "/animos-logo.png",
    shortcut: "/animos-logo.png",
  },
  openGraph: {
    title: "いつものつながりが、もしもの命を支える。",
    description: "防災・福祉・情報をつなぎ、誰も取り残されない地域をつくる。",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: "/og.png",
        width: 1792,
        height: 896,
        alt: "いつものつながりが、もしもの命を支える。 ANIMOS PROJECT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "いつものつながりが、もしもの命を支える。",
    description: "防災・福祉・情報をつなぎ、誰も取り残されない地域をつくる。",
    images: ["/og.png"],
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
          href="https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
