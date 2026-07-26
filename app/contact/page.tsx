import type { Metadata } from "next";
import { InteriorFooter, InteriorHeader, InteriorHero } from "../components/InteriorPage";
import { siteLinks } from "../site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "アニモスプロジェクトへのご相談・協働に関するお問い合わせ案内です。",
};

const topics = [
  ["地域・自治体のみなさま", "地域防災の課題や、デジタル活用について一緒に考えたい"],
  ["学校・教育関係のみなさま", "防災学習や、子ども・若い世代との取り組みを相談したい"],
  ["企業・団体のみなさま", "技術、知見、活動の場などを生かしてプロジェクトに協力したい"],
];

const methods = [
  {
    label: "EMAIL",
    title: "メールで相談する",
    text: "連携や取材、活動への参加など、内容を詳しく伝えたいお問い合わせにおすすめです。",
    detail: "所属・お名前・ご連絡先・お問い合わせ内容をご記載ください。",
    href: siteLinks.email ? `mailto:${siteLinks.email}` : "",
    linkLabel: siteLinks.email || "メールアドレス準備中",
  },
  {
    label: "INSTAGRAM",
    title: "Instagramでつながる",
    text: "活動の様子や最新情報をご覧いただけます。簡単なご質問はDMからも受け付ける予定です。",
    detail: "DMへの返信にはお時間をいただく場合があります。",
    href: siteLinks.instagram,
    linkLabel: siteLinks.instagram ? "Instagramを開く" : "リンク準備中",
  },
];

export default function ContactPage() {
  return (
    <main className="interior-page contact-page">
      <InteriorHeader current="Contact" />
      <InteriorHero
        eyebrow="CONTACT"
        title={<><span className="interior-title-line">一緒に、地域のこれからを</span><span className="interior-title-line">考えませんか。</span></>}
        lead="アニモスの活動に興味を持ってくださった方、地域防災について話してみたい方からのご連絡をお待ちしています。"
      />
      <section className="contact-topics">
        <p className="kicker">LET&apos;S CONNECT</p>
        <h2>こんなご相談をお待ちしています。</h2>
        <div className="contact-topic-grid">
          {topics.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="contact-methods">
        <div className="contact-methods-heading">
          <p className="kicker">HOW TO CONTACT</p>
          <h2>ご都合のよい方法でご連絡ください。</h2>
        </div>
        <div className="contact-method-list">
          {methods.map((method, index) => (
            <article key={method.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p className="kicker">{method.label}</p>
              <h3>{method.title}</h3>
              <p>{method.text}</p>
              <small>{method.detail}</small>
              {method.href ? (
                <a href={method.href} target={method.label === "INSTAGRAM" ? "_blank" : undefined} rel={method.label === "INSTAGRAM" ? "noreferrer" : undefined}>
                  {method.linkLabel} <b>→</b>
                </a>
              ) : (
                <span className="contact-method-pending">{method.linkLabel}</span>
              )}
            </article>
          ))}
        </div>
        <p className="contact-note">お問い合わせでいただいた情報は、ご連絡への対応以外の目的には使用しません。内容によっては返信にお時間をいただく場合があります。</p>
      </section>
      <InteriorFooter />
    </main>
  );
}
