import Link from "next/link";
import { withBasePath } from "../base-path";
import { InteriorFooter, InteriorHeader, InteriorHero } from "../components/InteriorPage";
import { createPageMetadata } from "../metadata-config";

export const metadata = createPageMetadata({
  title: "Actions",
  description: "デジタルハザードマップ、地域情報共有、要支援者へのデジタル支援など、ANIMOS PROJECTが進める5つの地域防災アクションをご紹介します。",
  path: "/actions",
});

const actions = [
  ["01", "デジタルハザードマップ開発", "地域の危険箇所、避難所、避難ルートをマップ上に整理。住民が普段から確認し、更新できる仕組みを目指します。", "/assets/action-hazard-map.png", ["危険箇所の可視化", "避難ルートの共有", "地域参加型の更新"]],
  ["02", "地域情報の共有", "住民が持つ防災情報を持ち寄り、必要なときに地域全体で把握できる、わかりやすい情報共有の形を検討します。", "/assets/action-community-share.png", ["地域の声を収集", "情報をわかりやすく整理", "平時から共有"]],
  ["03", "要支援者へのデジタル支援", "高齢者や障害のある方など、一人ひとりに合った情報の届け方と、災害時の支援方法を考えます。", "/assets/action-digital-support.png", ["届きやすい情報設計", "個別の状況を理解", "支援方法の検討"]],
  ["04", "支援する人と必要とする人をつなぐ", "支援する側と必要とする側の認識のずれを減らし、日頃から互いの状況を理解できる関係づくりを支えます。", "/assets/action-connect-support.png", ["ニーズの共有", "地域の支援者と連携", "顔の見える関係"]],
  ["05", "防災学習アプリの開発", "避難行動や地図理解を、遊びや体験を通して学べるアプリを開発。若い世代が地域防災に関わる入口をつくります。", "/assets/action-learning-app.png", ["体験型の学び", "子どもにもわかりやすく", "地域を知るきっかけ"]],
];

export default function ActionsPage() {
  return (
    <main className="interior-page actions-page">
      <InteriorHeader current="Actions" />
      <InteriorHero
        eyebrow="ACTIONS"
        title="考えるだけで終わらせない。"
        lead="地域の声を聞き、小さく試し、また見直す。アニモスプロジェクトが進める5つのアクションです。"
      />
      <section className="action-detail-list">
        {actions.map(([number, title, text, image, points]) => (
          <article className="action-detail" id={`action-${number}`} key={number as string}>
            <div className="action-detail-image">
              <img src={withBasePath(image as string)} alt="" />
              <span>#{number}</span>
            </div>
            <div className="action-detail-copy">
              <p className="kicker">ACTION {number}</p>
              <h2>{title}</h2>
              <p>{text}</p>
              <ul>
                {(points as string[]).map((point) => <li key={point}>{point}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </section>
      <Link className="interior-next" href="/news"><span>活動のお知らせを見る</span><b>→</b></Link>
      <InteriorFooter />
    </main>
  );
}
