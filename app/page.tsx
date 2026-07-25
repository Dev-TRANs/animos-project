import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "アニモスプロジェクト｜防災を、誰でも触れられるものへ。",
  description:
    "地域における防災・災害情報の共有や意識向上を目的に、アプリケーション開発を中心としたデジタル活用に取り組む団体です。",
};

const missions = [
  ["01", "日常化", "若者や地域住民が、普段の生活の中で楽しみながら防災意識を持てる社会を目指します。"],
  ["02", "共有・可視化", "危険箇所や避難経路の情報を、住民同士でリアルタイムに共有・可視化できる仕組みをつくります。"],
  ["03", "全員参加", "要支援者もそうでない方も、住民同士の横のつながりを強める防災ネットワークを目指します。"],
];

const activities = [
  ["検討中", "デジタルハザードマップ", "地域の危険箇所や避難所、避難ルートを可視化・共有し、災害発生時の迅速な行動につなげます。"],
  ["検討中", "要支援者へのデジタル支援", "スマートフォンの貸し出しやVRゴーグルの活用など、身体の状態に応じて何ができるかを考えています。"],
  ["調査・検討中", "要支援者と地域住民をつなぐ", "支援する側と支援を必要とする側、それぞれの思いや必要な支援を知り、すれ違いを減らす取り組みです。"],
  ["開発中", "防災 × 鬼ごっこアプリ", "遊びながら避難行動、危険区域、地図理解、状況判断を学べるアプリを開発しています。"],
];

function Logo({ full = false }: { full?: boolean }) {
  if (full) {
    return (
      <img
        className="logo-full"
        src="/animos-logo.png"
        alt="ANIMOS PROJECT"
        width="220"
        height="220"
      />
    );
  }

  return (
    <span className="logo-lockup" aria-label="ANIMOS PROJECT">
      <span className="logo-crop" aria-hidden="true">
        <img src="/animos-logo.png" alt="" width="140" height="140" />
      </span>
      <span>ANIMOS PROJECT</span>
    </span>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a href="/" className="header-brand">
          <Logo />
        </a>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          <a href="/about">ABOUT</a>
          <a href="#activities">ACTION</a>
          <a href="#news">NEWS</a>
          <a className="header-cta" href="#contact">LET&apos;S CONNECT ↗</a>
        </nav>
        <details className="mobile-menu">
          <summary aria-label="メニューを開く"><i /><i /></summary>
          <nav>
            <a href="/about">私たちについて</a>
            <a href="#activities">活動内容</a>
            <a href="#news">お知らせ</a>
            <a href="#contact">参加・連携</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="top">
        <img
          className="hero-photo"
          src="/hero-culture.png"
          alt="地域のこれからを話し合う若い世代のイメージビジュアル"
          width="1536"
          height="1024"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <h1>
            防災を、
            <br />
            誰でも
            <br />
            <em>触れられるもの</em>へ。
          </h1>
          <div className="hero-bottom">
            <p>
              アプリケーション開発を中心に、
              <br />
              地域の防災・災害情報の共有と意識向上に取り組みます。
            </p>
            <a href="#about">SCROLL TO DISCOVER <span>↓</span></a>
          </div>
        </div>
        <span className="visual-note">※ イメージビジュアル</span>
        <img
          className="prop prop-sticky-notes"
          src="/prop-sticky-notes.png"
          alt=""
          aria-hidden="true"
          width="1254"
          height="1254"
        />
      </section>

      <div className="culture-ticker" aria-label="ブランドメッセージ">
        <div>
          <span>DISASTER PREVENTION × DIGITAL</span>
          <b>防災を、難しくて遠いものから、誰でも触れられるものへ。</b>
          <span>DISASTER PREVENTION × DIGITAL</span>
          <b>防災を、難しくて遠いものから、誰でも触れられるものへ。</b>
        </div>
      </div>

      <section className="manifesto wrap" id="about">
        <div className="manifesto-copy">
          <h2>
            地域の防災を、
            <br />
            <em>デジタルでもっと身近に。</em>
          </h2>
          <div className="manifesto-text">
            <p className="lead">
              高校生や地域住民が、
              <br />
              普段から防災意識を持てる仕組みを。
            </p>
            <p>
              いつ起こるかわからない自然災害に対して、避難ルートや危険箇所の情報を、普段からわかりやすく共有・認知できる仕組みが必要です。アニモスプロジェクトは、この課題意識からスタートした、デジタル活用を中心とする新しい取り組みです。
            </p>
          </div>
        </div>
        <aside className="quote-card">
          <img
            className="prop prop-binder-clip"
            src="/prop-binder-clip.png"
            alt=""
            aria-hidden="true"
            width="1254"
            height="1254"
          />
          <span>OUR PHILOSOPHY</span>
          <blockquote>
            防災を、
            <br />
            難しくて遠いもの
            <br />
            にしない。
          </blockquote>
          <p>アプリケーション開発を中心に活動しています。</p>
        </aside>
      </section>

      <section className="editorial-photo wrap">
        <div className="photo-frame photo-portrait">
          <img
            src="/activity-dialogue.png"
            alt="スマートフォンと地域の地図を囲んで話すイメージビジュアル"
            width="1024"
            height="1536"
          />
          <span>IMAGE VISUAL / 2026</span>
          <img
            className="prop prop-orange-sticker"
            src="/prop-orange-sticker.png"
            alt=""
            aria-hidden="true"
            width="1254"
            height="1254"
          />
        </div>
        <div className="photo-story">
          <span className="story-number">DIGITAL HAZARD MAP</span>
          <h2>
            地域の情報を、
            <br />
            <em>わかりやすく共有する。</em>
          </h2>
          <p>
            地域の危険箇所や避難所、避難ルートなどを可視化・共有し、災害発生時に迅速な行動が取れるデジタルハザードマップの開発を検討しています。住民自身が参加し、情報を更新・共有できる仕組みを目指します。
          </p>
          <a href="#activities">私たちのアクションを見る ↘</a>
        </div>
      </section>

      <section className="missions">
        <img
          className="prop prop-emergency-radio"
          src="/prop-emergency-radio.png"
          alt=""
          aria-hidden="true"
          width="1536"
          height="1024"
        />
        <div className="wrap">
          <div className="missions-head">
            <h2>アニモスが、<br />目指すこと。</h2>
            <p>防災意識の日常化と、住民全員が参加できる情報共有の仕組みを目指します。</p>
          </div>
          <div className="mission-rows">
            {missions.map(([num, title, text]) => (
              <article key={num}>
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <b>↗</b>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="culture-scene">
        <img
          src="/community-culture.png"
          alt="地域で世代を越えて交流する人々のイメージビジュアル"
          width="1536"
          height="1024"
        />
        <div className="culture-scene-copy">
          <span>DISASTER PREVENTION IN EVERYDAY LIFE.</span>
          <h2>若者も地域住民も、<br />普段から防災を考える。</h2>
          <p>防災意識を、難しくて遠いものではなく、日常の中で持てるものに。</p>
        </div>
        <span className="visual-note">※ イメージビジュアル</span>
      </section>

      <section className="actions wrap" id="activities">
        <img
          className="prop prop-megaphone"
          src="/prop-megaphone.png"
          alt=""
          aria-hidden="true"
          width="1536"
          height="1024"
        />
        <div className="actions-head">
          <h2>現在取り組んでいる、<br />4つのテーマ。</h2>
          <p>アプリケーション開発を中心に、調査・検討を進めています。</p>
        </div>
        <div className="action-list">
          {activities.map(([status, title, text], index) => (
            <article key={title}>
              <span className="action-index">0{index + 1}</span>
              <div>
                <span className="status">{status}</span>
                <h3>{title}</h3>
              </div>
              <p>{text}</p>
              <b>MORE SOON</b>
            </article>
          ))}
        </div>
        <a className="detail-link" href="/about">活動の背景と詳しい内容を見る <b>↗</b></a>
      </section>

      <section className="news wrap" id="news">
        <img
          className="prop prop-first-aid"
          src="/prop-first-aid.png"
          alt=""
          aria-hidden="true"
          width="1536"
          height="1024"
        />
        <div className="news-head">
          <h2>ニュース</h2>
          <p>活動のお知らせや、プロジェクトの記録を発信します。</p>
        </div>
        <div className="news-items">
          <article>
            <time>2026.07</time>
            <span>お知らせ</span>
            <h3>アニモスプロジェクト、ウェブサイトを公開しました</h3>
            <b>↗</b>
          </article>
          <article>
            <time>準備中</time>
            <span>活動記録</span>
            <h3>これからの活動や街で見つけた問いを発信します</h3>
            <b>↗</b>
          </article>
        </div>
      </section>

      <section className="join wrap" id="contact">
        <div className="join-brand"><Logo full /></div>
        <div className="join-copy">
          <span>JOIN THE PROJECT</span>
          <h2>アニモスの活動を、<br />知ってください。</h2>
          <p>今後、活動を知ってもらい、支援してもらうためのアプリ開発やイベントでの活用も進めています。</p>
          <div className="join-links">
            <span>連携・協働を相談する <b>↗</b></span>
            <span>活動について問い合わせる <b>↗</b></span>
          </div>
          <small>お問い合わせ窓口は現在準備中です</small>
        </div>
      </section>

      <footer>
        <div className="wrap footer-inner">
          <Logo />
          <p>防災を、難しくて遠いものから、<br />誰でも触れられるものへ。</p>
          <nav>
            <a href="/about">ABOUT</a>
            <a href="#activities">ACTION</a>
            <a href="#news">NEWS</a>
            <a href="#contact">CONTACT</a>
          </nav>
        </div>
        <div className="wrap footer-bottom">
          <span>© 2026 ANIMOS PROJECT</span>
          <span>DISASTER PREVENTION × DIGITAL</span>
        </div>
      </footer>
    </main>
  );
}
