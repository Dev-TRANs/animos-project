import Link from "next/link";
import { withBasePath } from "../base-path";
import { EditableThemeWord } from "../components/EditableThemeWord";
import { InteriorFooter, InteriorHeader, InteriorHero } from "../components/InteriorPage";
import { createPageMetadata } from "../metadata-config";

export const metadata = createPageMetadata({
  title: "About Us",
  description: "ANIMOS PROJECTの使命、目指す未来、4つの価値観をご紹介。防災×情報×〇〇で、誰一人取り残されない地域社会を目指します。",
  path: "/about",
});

const values = [
  {
    number: "01",
    title: "人を第一に考える",
    text: "仕組みや技術から考えるのではなく、そこに暮らす一人ひとりの状況や声から始めます。年齢や障害、言語などにかかわらず、必要な人に届く形を考え続けます。",
    image: withBasePath("/assets/about-community.svg"),
  },
  {
    number: "02",
    title: "地域との協力を大切にする",
    text: "地域をよく知る住民のみなさん、自治体、企業、学校、団体と対話し、それぞれの知識や経験を持ち寄りながら、地域に合った答えを一緒につくります。",
    image: withBasePath("/assets/about-map.svg"),
  },
  {
    number: "03",
    title: "テクノロジーを身近な課題解決に活用する",
    text: "デジタルを目的にせず、情報が届かない、支援につながりにくいといった身近な課題を解決するための道具として、わかりやすく使いやすい形で活用します。",
    image: withBasePath("/assets/about-connect.svg"),
  },
  {
    number: "04",
    title: "防災を日常の一部にする",
    text: "防災を災害時だけのものにせず、普段の学びや地域のつながり、情報共有の中に取り入れます。日常の小さな備えが、もしものときの安心につながる状態を目指します。",
    image: withBasePath("/assets/about-app.svg"),
  },
];

export default function AboutPage() {
  return (
    <main className="interior-page about-page">
      <InteriorHeader current="About Us" />
      <InteriorHero
        eyebrow="ABOUT US"
        title={<><span className="interior-title-line">誰一人</span><span className="interior-title-line">取り残されない社会へ。</span></>}
        lead={<>私たちは、「防災×情報×〇〇」を組み合わせ、すべての人が日常から安心して暮らせる地域をつくるプロジェクトです。</>}
      />
      <section className="interior-intro">
        <p className="kicker">WHO WE ARE</p>
        <h2>防災×情報×〇〇で、日常から安心できるまちをつくる。</h2>
        <p>災害が起きたときだけではなく、普段から必要な情報に触れ、困ったときに支援へつながれること。アニモスプロジェクトは、地域にある知恵と人のつながりにテクノロジーを掛け合わせ、誰も取り残されない仕組みを育てます。</p>
      </section>

      <section className="about-pillars" aria-label="使命と目指す未来">
        <article>
          <div>
            <p className="kicker">OUR MISSION</p>
            <h2>災害時だけでなく、日常から安心して暮らせる地域をつくる。</h2>
            <p>必要な情報をわかりやすく届け、地域の中で支え合える関係を育てることで、平時にも災害時にも安心できる暮らしを支えます。</p>
          </div>
          <img src={withBasePath("/assets/about-next.svg")} alt="" />
        </article>
        <article>
          <div>
            <p className="kicker">OUR VISION</p>
            <h2>すべての人が、必要な情報や支援を受けられる社会へ。</h2>
            <p>住む場所や年齢、障害の有無にかかわらず、一人ひとりが必要な情報を受け取り、適切な支援につながれる「誰も取り残されない社会」を目指します。</p>
          </div>
          <img src={withBasePath("/assets/about-void.svg")} alt="" />
        </article>
      </section>

      <div className="about-values-heading">
        <p className="kicker">OUR VALUES</p>
        <h2>私たちが大切にする、4つのこと。</h2>
      </div>
      <section className="theme-list" aria-label="プロジェクトの4つの価値観">
        {values.map((theme) => (
          <article className="theme-card" key={theme.number}>
            <div className="theme-visual">
              <span>{theme.number}</span>
              <img src={theme.image} alt="" />
            </div>
            <div className="theme-copy">
              <p>ANIMOS VALUE {theme.number}</p>
              <h2>{theme.title}</h2>
              <p>{theme.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="about-collaboration">
        <img src={withBasePath("/assets/about-community.svg")} alt="" />
        <div>
          <p className="kicker">OUR GOAL</p>
          <h2>立場を越えてつながり、安心して暮らせる社会を一緒につくる。</h2>
          <p>地域のみなさん、自治体、企業、学校、そして同じ目標を持つ団体と連携し、それぞれの知見や強みを生かしながら、誰もが安心して暮らせる社会づくりに貢献します。</p>
        </div>
      </section>
      <section className="about-idea">
        <p className="kicker">YOUR IDEA</p>
        <h2>君なら、何を<br />組み合わせる？</h2>
        <p>「〇〇」に入る言葉は、きっと一つではありません。</p>
        <div className="about-idea-formula">
          <span>防災</span><b>×</b><span>情報</span><b>×</b><EditableThemeWord />
        </div>
        <p className="about-idea-hint">鼓動する「〇〇」をタップして、あなたのアイデアを聞かせてください。</p>
      </section>
      <Link className="interior-next" href="/actions"><span>取り組みを見る</span><b>→</b></Link>
      <InteriorFooter />
    </main>
  );
}
