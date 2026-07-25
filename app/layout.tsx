import type { Metadata } from "next";
import { Kiwi_Maru, Manrope } from "next/font/google";
import "./globals.css";

const kiwiMaru = Kiwi_Maru({
  variable: "--font-kiwi",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://animos-project.openai.site"),
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
        width: 1733,
        height: 909,
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
      <body className={`${kiwiMaru.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
