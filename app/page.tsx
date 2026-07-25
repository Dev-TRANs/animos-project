import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "アニモスプロジェクト｜防災を、日常のカルチャーへ。",
  description:
    "防災・福祉・情報をつなぎ、誰も取り残されない地域をつくるアニモスプロジェクト。",
};

const missions = [
  ["01", "届ける", "防災・福祉の情報を、誰もが使いやすいかたちにする。"],
  ["02", "つなぐ", "地域・行政・学校・企業・福祉団体の関係を育てる。"],
  ["03", "つくる", "ICTとデジタルの力で、地域の課題を解決する。"],
];

const activities = [
  ["準備中", "福祉施設との連携", "現場の声から、一緒に考える。"],
  ["計画中", "アンケート調査", "本当に必要な情報を、丁寧に知る。"],
  ["構想中", "防災アプリの開発", "情報が届き、助け合える仕組みをつくる。"],
  ["計画中", "防災イベント", "学びと対話を、街の日常にひらく。"],
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
        <a href="#top" className="header-brand">
          <Logo />
        </a>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          <a href="#about">ABOUT</a>
          <a href="#activities">ACTION</a>
          <a href="#news">NEWS</a>
          <a className="header-cta" href="#contact">LET&apos;S CONNECT ↗</a>
        </nav>
        <details className="mobile-menu">
          <summary aria-label="メニューを開く"><i /><i /></summary>
          <nav>
            <a href="#about">私たちについて</a>
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
          <p className="hero-kicker">
            <span>ANIMOS PROJECT</span>
            <span>EST. 2026 / JAPAN</span>
          </p>
          <h1>
            いつもの
            <br />
            つながりが、
            <br />
            <em>もしも</em>を支える。
          </h1>
          <div className="hero-bottom">
            <p>
              防災・福祉・情報をつなぎ、
              <br />
              誰も取り残されない地域をつくる。
            </p>
            <a href="#about">SCROLL TO DISCOVER <span>↓</span></a>
          </div>
        </div>
        <span className="visual-note">※ イメージビジュアル</span>
        <div className="hero-sticker">防災を、<br />日常の文化へ。</div>
      </section>

      <div className="culture-ticker" aria-label="ブランドメッセージ">
        <div>
          <span>DIFFERENT, BUT CONNECTED.</span>
          <b>違うまま、つながる。</b>
          <span>DIFFERENT, BUT CONNECTED.</span>
          <b>違うまま、つながる。</b>
        </div>
      </div>

      <section className="manifesto wrap" id="about">
        <div className="section-label">
          <span>01</span>
          <b>WHO WE ARE</b>
        </div>
        <div className="manifesto-copy">
          <p className="small-heading">ANIMOS PROJECT IS...</p>
          <h2>
            備えることを、
            <br />
            <em>もっと日常に。</em>
          </h2>
          <div className="manifesto-text">
            <p className="lead">
              防災を「特別なこと」から、
              <br />
              この街のカルチャーへ。
            </p>
            <p>
              災害が起きてから、はじめてつながるのでは遅い。いつもの会話、いつもの場所、いつもの仲間。その関係性が、もしものときに情報と支援を届ける道になります。アニモスは、防災・福祉・情報を横断しながら、地域の新しいつながり方を提案するプロジェクトです。
            </p>
          </div>
        </div>
        <aside className="quote-card">
          <span>OUR PHILOSOPHY</span>
          <blockquote>
            情報でつながり、
            <br />
            支え合い、
            <br />
            命を守る。
          </blockquote>
          <p>誰一人取り残されない防災社会の実現へ。</p>
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
        </div>
        <div className="photo-story">
          <span className="story-number">CULTURE 001</span>
          <h2>
            情報を、
            <br />
            <em>手渡せる距離</em>に。
          </h2>
          <p>
            便利な情報も、必要な人に届かなければ意味がない。デジタルだけに頼らず、対話や紙、場所や人を組み合わせる。伝え方の選択肢を増やすことも、防災です。
          </p>
          <a href="#activities">私たちのアクションを見る ↘</a>
        </div>
      </section>

      <section className="missions">
        <div className="wrap">
          <div className="missions-head">
            <div className="section-label light-label">
              <span>02</span>
              <b>OUR MISSION</b>
            </div>
            <h2>つながりを、<br />社会の力に。</h2>
            <p>3つの方向から、日常の関係性を地域の備えに変えていきます。</p>
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
          <span>THIS IS OUR KIND OF PREPAREDNESS.</span>
          <h2>街で会う。話す。<br />それが、備えになる。</h2>
          <p>防災は、非常時だけのものじゃない。</p>
        </div>
        <span className="visual-note">※ イメージビジュアル</span>
      </section>

      <section className="actions wrap" id="activities">
        <div className="actions-head">
          <div className="section-label">
            <span>03</span>
            <b>WHAT WE DO</b>
          </div>
          <h2>いまから始める、<br />4つのアクション。</h2>
          <p>活動状況は誤解のないよう、現在のステータスを明記しています。</p>
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
      </section>

      <section className="connection">
        <div className="wrap connection-inner">
          <p>NEIGHBORHOOD</p>
          <h2>
            地域住民 <i>×</i> 福祉団体 <i>×</i> 学校
            <br />
            行政 <i>×</i> 企業 <i>×</i> 地域団体
          </h2>
          <div>
            <b>ひとつが途切れても、別の道でつながれる。</b>
            <p>中心も、支える側・支えられる側も固定しない。複数の接点を持つ、しなやかな地域へ。</p>
          </div>
        </div>
      </section>

      <section className="news wrap" id="news">
        <div className="news-head">
          <div className="section-label">
            <span>04</span>
            <b>NEWS &amp; JOURNAL</b>
          </div>
          <h2>動き出したことを、<br />ここに記録していく。</h2>
        </div>
        <div className="news-items">
          <article>
            <time>2026.07</time>
            <span>PROJECT</span>
            <h3>アニモスプロジェクト、ウェブサイトを公開しました</h3>
            <b>↗</b>
          </article>
          <article>
            <time>COMING SOON</time>
            <span>JOURNAL</span>
            <h3>これからの活動や街で見つけた問いを発信します</h3>
            <b>↗</b>
          </article>
        </div>
      </section>

      <section className="join wrap" id="contact">
        <div className="join-brand"><Logo full /></div>
        <div className="join-copy">
          <span>JOIN THE PROJECT</span>
          <h2>一緒に、つながりを<br />育てませんか。</h2>
          <p>地域、行政、学校、企業、福祉団体。<br />立場を越えてできることを、一緒に考えましょう。</p>
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
          <p>防災・福祉・情報をつなぎ、<br />誰も取り残されない地域をつくる。</p>
          <nav>
            <a href="#about">ABOUT</a>
            <a href="#activities">ACTION</a>
            <a href="#news">NEWS</a>
            <a href="#contact">CONTACT</a>
          </nav>
        </div>
        <div className="wrap footer-bottom">
          <span>© 2026 ANIMOS PROJECT</span>
          <span>DIFFERENT, BUT CONNECTED.</span>
        </div>
      </footer>
    </main>
  );
}
