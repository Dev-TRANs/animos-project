import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "私たちについて",
  description:
    "アニモスプロジェクトが生まれた背景、地域防災・福祉・アプリケーション開発への取り組みを紹介します。",
};

function Logo() {
  return (
    <span className="logo-lockup" aria-label="ANIMOS PROJECT">
      <span className="logo-crop" aria-hidden="true">
        <img src="/animos-logo.png" alt="" width="140" height="140" />
      </span>
      <span>ANIMOS PROJECT</span>
    </span>
  );
}

export default function AboutPage() {
  return (
    <main className="about-page">
      <header className="site-header">
        <a href="/" className="header-brand"><Logo /></a>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          <a href="/about">ABOUT</a>
          <a href="/#activities">ACTION</a>
          <a href="/#news">NEWS</a>
          <a className="header-cta" href="/#contact">LET&apos;S CONNECT ↗</a>
        </nav>
        <details className="mobile-menu">
          <summary aria-label="メニューを開く"><i /><i /></summary>
          <nav>
            <a href="/about">私たちについて</a>
            <a href="/#activities">活動内容</a>
            <a href="/#news">ニュース</a>
            <a href="/#contact">参加・連携</a>
          </nav>
        </details>
      </header>

      <section className="about-hero">
        <div className="wrap">
          <p>私たちについて</p>
          <h1>地域の防災を、<br /><em>デジタルでもっと身近に。</em></h1>
          <div className="about-hero-intro">
            <b>アニモスプロジェクトは、地域における防災・災害情報の共有や意識向上を目的に活動する団体です。</b>
            <p>アプリケーション開発を中心に、高校生や地域住民が普段から防災を考え、情報を共有できる新しい仕組みをつくろうとしています。</p>
          </div>
        </div>
        <img className="prop about-radio" src="/prop-emergency-radio.png" alt="" aria-hidden="true" width="1536" height="1024" />
      </section>

      <section className="about-origin wrap">
        <div>
          <span>はじまり</span>
          <h2>いつ起こるかわからない。<br />だから、普段から考えられる仕組みを。</h2>
        </div>
        <p>
          自然災害に対して、高校生や地域住民が普段から防災意識を持ち、避難ルートや危険箇所の情報をわかりやすく共有・認知できる仕組みが必要であるという課題意識からスタートしました。
        </p>
      </section>

      <section className="about-projects">
        <div className="wrap">
          <h2>取り組んでいること</h2>
          <article className="about-project">
            <span>01</span>
            <div>
              <h3>デジタルハザードマップ</h3>
              <p>地域の危険箇所や避難所、避難ルートを可視化・共有し、災害発生時に迅速な行動が取れる仕組みを検討しています。</p>
              <p>情報を受け取るだけでなく、地域住民自身が参加し、共有・更新できる「全員参加型」のマップを目指します。</p>
            </div>
          </article>
          <article className="about-project">
            <span>02</span>
            <div>
              <h3>福祉におけるデジタル支援</h3>
              <p>スマートフォンの貸し出しやVRゴーグルによる災害体験など、身体の状態や必要な支援に合わせてデジタルで何ができるかを考えています。</p>
              <div className="about-questions">
                <p>支援する側は、どのような支援ができるかを知っているだろうか。</p>
                <p>支援を必要とする側は、何を望み、どのような思いを持っているだろうか。</p>
              </div>
              <b>二つの思いのすれ違いを減らし、人と人をつなげる取り組みです。</b>
            </div>
          </article>
          <article className="about-project">
            <span>03</span>
            <div>
              <h3>「防災 × 鬼ごっこ」アプリ</h3>
              <p>災害エリアから逃げながら避難所を目指す。遊びながら、避難行動・危険区域・地図理解・状況判断を自然に学べるアプリを開発しています。</p>
              <blockquote>「遊び」が「命を守る訓練」になる。</blockquote>
              <p>防災を難しいものではなく、誰でも触れられるものへ。特に子ども世代へ、楽しみながら生き残る力を届けたいと考えています。</p>
            </div>
          </article>
        </div>
        <img className="prop about-first-aid" src="/prop-first-aid.png" alt="" aria-hidden="true" width="1536" height="1024" />
      </section>

      <section className="about-goal">
        <div className="wrap">
          <h2>目指す先</h2>
          <div className="about-goal-grid">
            <article>
              <span>01</span>
              <h3>防災意識の「日常化」</h3>
              <p>若者や地域住民が、普段の生活の中で楽しみながら防災意識を持てる社会へ。</p>
            </article>
            <article>
              <span>02</span>
              <h3>災害情報のリアルタイム化</h3>
              <p>危険箇所や避難経路を、住民同士で共有・可視化できる地域へ。</p>
            </article>
            <article>
              <span>03</span>
              <h3>全員参加型のネットワーク</h3>
              <p>要支援者もそうでない方も、横のつながりを強め、支え合える地域へ。</p>
            </article>
          </div>
        </div>
        <img className="prop about-megaphone" src="/prop-megaphone.png" alt="" aria-hidden="true" width="1536" height="1024" />
      </section>

      <section className="about-back wrap">
        <a href="/">トップページへ戻る <b>↗</b></a>
      </section>

      <footer>
        <div className="wrap footer-inner">
          <Logo />
          <p>防災を、難しくて遠いものから、<br />誰でも触れられるものへ。</p>
          <nav>
            <a href="/about">ABOUT</a>
            <a href="/#activities">ACTION</a>
            <a href="/#news">NEWS</a>
            <a href="/#contact">CONTACT</a>
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
