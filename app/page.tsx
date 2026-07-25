import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "アニモスプロジェクト｜いつものつながりが、もしもの命を支える。",
  description:
    "防災・福祉・情報をつなぎ、誰も取り残されない地域をつくるアニモスプロジェクトの公式サイトです。",
};

const missions = [
  {
    number: "01",
    label: "INFORMATION",
    title: "情報を、届くかたちへ。",
    text: "防災・福祉に関する情報を、年齢や障害、言語にかかわらず、誰もが利用しやすい形で届けます。",
  },
  {
    number: "02",
    label: "CONNECTION",
    title: "地域の点を、線に。",
    text: "地域・行政・学校・企業・福祉団体が、日常から支え合える柔軟なネットワークを育てます。",
  },
  {
    number: "03",
    label: "TECHNOLOGY",
    title: "技術を、やさしい力に。",
    text: "ICTやデジタル技術を活用し、必要な情報や支援が途切れない仕組みをつくります。",
  },
];

const activities = [
  {
    status: "準備中",
    type: "LISTEN",
    title: "福祉施設との連携",
    text: "現場の声を起点に、日常と災害時の情報・支援のあり方を一緒に考えます。",
    tone: "blue",
  },
  {
    status: "計画中",
    type: "RESEARCH",
    title: "アンケート調査",
    text: "福祉施設などが抱える防災上の課題や、必要とされる情報を丁寧に把握します。",
    tone: "orange",
  },
  {
    status: "構想中",
    type: "DEVELOP",
    title: "防災アプリの開発",
    text: "一人ひとりに必要な情報が届き、地域の助け合いにつながる仕組みを検討します。",
    tone: "navy",
  },
  {
    status: "計画中",
    type: "GATHER",
    title: "防災イベント",
    text: "学びや対話を通じて、防災を暮らしの中に取り入れる機会をつくります。",
    tone: "green",
  },
];

const updates = [
  {
    date: "2026.07",
    category: "PROJECT",
    title: "アニモスプロジェクト、ウェブサイトを準備しています",
  },
  {
    date: "COMING SOON",
    category: "ACTIVITY",
    title: "今後の活動情報をこちらでお知らせします",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="アニモスプロジェクト トップへ">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>
            <b>ANIMOS</b>
            <small>PROJECT</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          <a href="#about">私たちについて</a>
          <a href="#activities">活動内容</a>
          <a href="#news">お知らせ</a>
          <a href="#join">参加・連携</a>
          <a className="nav-cta" href="#contact">お問い合わせ</a>
        </nav>
        <details className="mobile-nav">
          <summary aria-label="メニューを開く">
            <span />
            <span />
            <span />
          </summary>
          <nav aria-label="スマートフォンメニュー">
            <a href="#about">私たちについて</a>
            <a href="#activities">活動内容</a>
            <a href="#news">お知らせ</a>
            <a href="#join">参加・連携</a>
            <a href="#contact">お問い合わせ</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="top">
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow light">
              <span />
              防災を、日常の文化へ。
            </p>
            <h1>
              いつものつながりが、
              <br />
              <em>もしもの命</em>を支える。
            </h1>
            <p className="hero-lead">
              防災・福祉・情報をつなぎ、
              <br />
              誰も取り残されない地域をつくる。
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#about">
                アニモスについて <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link light-link" href="#activities">
                活動を見る <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-label="異なる人や組織が柔軟につながるイメージ">
            <div className="visual-caption">
              <span>DAILY CONNECTION</span>
              <span>RESILIENT COMMUNITY</span>
            </div>
            <div className="connection-field" aria-hidden="true">
              <span className="path path-a" />
              <span className="path path-b" />
              <span className="path path-c" />
              <span className="path path-d" />
              <span className="node node-a"><i /></span>
              <span className="node node-b"><i /></span>
              <span className="node node-c"><i /></span>
              <span className="node node-d"><i /></span>
              <span className="node node-e"><i /></span>
              <span className="signal-dot" />
            </div>
            <img
              className="official-lockup"
              src="/animos-logo.png"
              alt="ANIMOS PROJECT ロゴ"
              width="104"
              height="104"
            />
            <p>
              違いを消さずに、
              <br />
              つながり方を増やしていく。
            </p>
          </div>
        </div>
        <div className="hero-bottom">
          <span>ANIMOS PROJECT</span>
          <span>SCROLL TO CONNECT</span>
        </div>
      </section>

      <section className="intro section-shell" id="about">
        <div className="section-index">
          <span>01</span>
          <p>ABOUT US</p>
        </div>
        <div className="intro-main">
          <p className="eyebrow">
            <span />
            アニモスプロジェクトとは
          </p>
          <h2>
            違うまま、
            <br />
            <em>つながる。</em>
          </h2>
          <div className="intro-body">
            <p className="lead">
              災害時だけに備えるのではなく、
              <br />
              日常から人と地域がつながる状態をつくる。
            </p>
            <p>
              地震や豪雨などの自然災害が起きたとき、必要な情報が届かず、避難や支援に困難を抱える人がいます。アニモスプロジェクトは、防災・福祉・情報を組み合わせ、日々の関係性そのものを地域の備えへ変えていきます。
            </p>
          </div>
        </div>
        <div className="belief-card">
          <p className="card-label">OUR BELIEF</p>
          <blockquote>
            情報でつながり、
            <br />
            支え合い、
            <br />
            <span>命を守る。</span>
          </blockquote>
          <div className="belief-foot">
            <span>VISION</span>
            <p>誰一人取り残されない<br />防災社会の実現。</p>
          </div>
        </div>
      </section>

      <section className="missions">
        <div className="section-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow light"><span /> OUR MISSION</p>
              <h2>つながりを、<br />社会の力に。</h2>
            </div>
            <p>
              誰もが必要な情報と支援にたどり着けるように。
              <br />
              私たちは3つの方向から取り組みます。
            </p>
          </div>
          <div className="mission-list">
            {missions.map((mission) => (
              <article className="mission-card" key={mission.number}>
                <div className="mission-number">{mission.number}</div>
                <div>
                  <p className="card-label">{mission.label}</p>
                  <h3>{mission.title}</h3>
                  <p>{mission.text}</p>
                </div>
                <span className="mission-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="activities section-shell" id="activities">
        <div className="section-heading dark">
          <div>
            <p className="eyebrow"><span /> WHAT WE DO</p>
            <h2>日常から始める、<br />4つの活動。</h2>
          </div>
          <p>
            現場の声を聞くことから、仕組みをつくることまで。
            <br />
            ひとつずつ、地域とともに進めていきます。
          </p>
        </div>
        <div className="activity-grid">
          {activities.map((activity, index) => (
            <article className={`activity-card ${activity.tone}`} key={activity.title}>
              <div className="activity-top">
                <span className="activity-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="status">{activity.status}</span>
              </div>
              <div className="activity-symbol" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <p className="card-label">{activity.type}</p>
              <h3>{activity.title}</h3>
              <p>{activity.text}</p>
              <span className="coming">詳細は順次公開します</span>
            </article>
          ))}
        </div>
      </section>

      <section className="network">
        <div className="section-shell network-grid">
          <div className="network-copy">
            <p className="eyebrow"><span /> OUR NETWORK</p>
            <h2>ひとつが途切れても、<br />別の道でつながれる。</h2>
            <p>
              誰かを中心に置くのではなく、それぞれが複数の接点を持つこと。柔軟で回復力のあるつながりが、日常にも、もしもの時にも力になります。
            </p>
            <div className="network-tags" aria-label="連携を想定する地域の担い手">
              <span>地域住民</span>
              <span>福祉団体</span>
              <span>学校</span>
              <span>行政</span>
              <span>企業</span>
              <span>地域団体</span>
            </div>
          </div>
          <div className="network-map" aria-label="地域のさまざまな担い手が複数の経路でつながる図">
            <span className="map-line line-1" />
            <span className="map-line line-2" />
            <span className="map-line line-3" />
            <span className="map-line line-4" />
            <span className="map-line line-5" />
            <span className="map-line line-6" />
            <span className="map-node map-a">地域住民</span>
            <span className="map-node map-b">福祉団体</span>
            <span className="map-node map-c">学校</span>
            <span className="map-node map-d">行政</span>
            <span className="map-node map-e">企業</span>
            <span className="map-node map-f">地域団体</span>
            <span className="map-pulse" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="news section-shell" id="news">
        <div className="news-heading">
          <div>
            <p className="eyebrow"><span /> NEWS &amp; REPORTS</p>
            <h2>お知らせ・活動記録</h2>
          </div>
          <span className="text-link muted-link">これからの記録をお届けします</span>
        </div>
        <div className="news-list">
          {updates.map((update) => (
            <article key={update.title}>
              <time>{update.date}</time>
              <span>{update.category}</span>
              <h3>{update.title}</h3>
              <b aria-hidden="true">↗</b>
            </article>
          ))}
        </div>
      </section>

      <section className="join section-shell" id="join">
        <div className="join-card">
          <div className="join-orbit" aria-hidden="true" />
          <p className="eyebrow light"><span /> JOIN THE CONNECTION</p>
          <h2>
            一緒に、つながりを
            <br />
            <em>育てませんか。</em>
          </h2>
          <p>
            地域、行政、学校、企業、福祉団体。
            <br />
            立場を越えてできることを、一緒に考えましょう。
          </p>
          <div className="join-actions">
            <a className="button button-primary" href="#contact">
              連携・協働を相談する <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-ghost" href="#contact">
              活動について問い合わせる
            </a>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-main section-shell">
          <div className="footer-brand">
            <a className="brand brand-light" href="#top">
              <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
              <span><b>ANIMOS</b><small>PROJECT</small></span>
            </a>
            <p>防災・福祉・情報をつなぎ、<br />誰も取り残されない地域をつくる。</p>
          </div>
          <div className="footer-contact">
            <p className="card-label">CONTACT</p>
            <h2>お問い合わせ</h2>
            <p>
              連携・協働、取材、そのほか活動に関するご相談は、
              <br />
              公開準備中の窓口より順次受け付けます。
            </p>
            <span className="contact-status">お問い合わせ窓口 準備中</span>
          </div>
          <nav aria-label="フッターナビゲーション">
            <a href="#about">私たちについて</a>
            <a href="#activities">活動内容</a>
            <a href="#news">お知らせ</a>
            <a href="#join">参加・連携</a>
          </nav>
        </div>
        <div className="footer-bottom section-shell">
          <span>活動地域・運営情報は公開準備中です</span>
          <span>© 2026 ANIMOS PROJECT</span>
        </div>
      </footer>
    </main>
  );
}
