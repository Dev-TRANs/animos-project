# Animos Project LP 実装指示書

## 目的

Figmaで作成した「Animos Project」のLPデザインをもとに、Webサイトとして実装してください。

Figma上ではフレーム分けはされていますが、Auto Layout・制約・レスポンシブ設定は完全ではありません。  
そのため、Figmaの見た目を参考にしつつ、実装時はレスポンシブで破綻しない構造に再設計してください。

## Figma参照

Figmaファイル：

https://www.figma.com/design/23oBQ2xVS1JFRRL4TkvSK8/animosproject?node-id=0-1

添付画像も必ず参照してください。

- `Home-1.png`
- `Home-1-open menu.png`
- `Home-2.png`
- `Home-2-Horizontal carousel.png`

Figmaや添付画像は、完全なpx固定の設計図ではなく、見た目・構成・雰囲気の基準として扱ってください。

---

# 実装対象

トップページ1ページ構成のLPです。

主なセクションは以下です。

1. Hero
2. About / プロジェクト紹介
3. Actions / アクション一覧カルーセル
4. News
5. Contact
6. Footer

---

# 全体デザイン方針

- 白背景を基本にする
- メインカラーは強い青 `#0000ff` 系
- アクセントカラーはオレンジ〜黄色のグラデーション
- 黒太線、角丸、白黒コントラストを強く使う
- かわいい方向ではなく、グラフィック強めのポスター風にする
- Figmaの見た目を完全な固定配置で再現するのではなく、Webとして自然に動くようにする
- スマホ表示を主軸にしつつ、PCでは余白を活かしたLPとして成立させる

---

# レスポンシブ基本方針

## ブレイクポイント

- mobile: 〜767px
- tablet: 768px〜1023px
- desktop: 1024px〜

## 共通ルール

- ページ全体に不要な横スクロールを出さない
- セクション左右余白は `clamp(20px, 5vw, 80px)` を基本にする
- 見出しサイズは `clamp()` を使って可変にする
- 本文は `max-width: 720px` 程度にして、横に伸びすぎないようにする
- 画像は `width: 100%; height: auto; object-fit: cover;`
- 装飾要素は絶対配置を使ってもよいが、スマホで画面外にはみ出しすぎないよう調整する
- Figmaの座標をそのまま大量の `position: absolute` で写さない
- CSS Grid / Flex / position を適切に使う

---

# 1. Hero セクション

## 見た目

スマホ縦長のファーストビューです。

背景に大きな青い円のパターンが敷かれています。  
上部に「Animos Project」のロゴ風テキストがあり、右上に黒いmenuボタンがあります。

中央付近に大きく、

```txt
誰も
取り残さない
地域防災を。
```

という日本語コピーを、白い枠付きボックスに入れて表示します。

その下に英語コピー：

```txt
Disaster-resilient communities that leave no one behind.
```

を小さめの白い枠付きボックスで表示します。

右下にはスクロールを示す丸い矢印ボタンがあります。

## 実装方針

- Heroは `min-height: 100svh`
- 初期表示は `Home-1.png` に近づける
- 背景の円パターンはアニメーション可能なDOM要素として生成する
- 青い円は規則的なグリッド状に並べる
- 一部にオレンジの円を混ぜる
- 上部に白のフェード/グラデーションを入れて、ロゴ周辺を読みやすくする

## mobile

- ロゴは左上
- menuボタンは右上
- メインコピーは画面中央よりやや下
- コピーの白ボックスは横幅 `80〜90vw`
- 日本語コピーは大きく、3行構成を維持
- 英語コピーは日本語コピーの下に配置
- スクロール矢印は右下に固定気味に配置

## desktop

- Heroは横幅いっぱいに拡張
- 背景パターンは画面全体に広げる
- メインコピーは左寄せ〜中央寄せのどちらでもよいが、Figmaの印象を優先して大きく表示
- ロゴとmenuは上部に固定配置

---

# 2. ハンバーガーメニュー

## 重要

ハンバーガーメニューとClose / Xアイコンはデザインが特殊です。  
一般的なハンバーガーアイコンや自作の適当なSVGで置き換えないでください。

Figmaから実際のアセットを取得し、可能であればSVGパスとして実装してください。

対象：

- ハンバーガーメニューアイコン
- Close / X アイコン
- menu / Close の縦書き風テキスト

## 通常状態

- 右上に黒背景の小さなmenuボタンを配置
- 白いハンバーガー風のうねうねしたパス
- `menu` の縦書き/回転表示もFigmaの見た目に近づける

## 開くときのアニメーション

ハンバーガーの白いパスが、パスの端から順番に消えていくようにしてください。

その後、Xアイコンがパスに沿って出現するようにしてください。

### ハンバーガーが消える動き

- SVGパスとして扱える場合は、`stroke-dasharray` と `stroke-dashoffset` を使う
- パスの始点から終点へ向かって、線が吸い込まれるように消える
- 消え方は等速ではなく、少し粘ってから速く消える
- easingは `cubic-bezier(0.76, 0, 0.24, 1)` などを使う
- durationは `450ms〜650ms`

### Xが出現する動き

- XもSVGパスとして扱う
- `stroke-dasharray` / `stroke-dashoffset` で、線が描かれていくように出す
- 2本の線は完全同時ではなく、`60ms〜120ms` 程度ずらして出す
- durationは `350ms〜500ms`

## 閉じるときのアニメーション

逆順にしてください。

1. Xのパスが端から消える
2. ハンバーガーのうねうねパスが端から描かれて戻る
3. メニューOverlayを閉じる

## メニューOverlay

クリック時は黒いメニューパネルを開きます。

表示内容：

- Home
- About Us
- News
- Contact

仕様：

- mobileでは右上から大きめの黒い角丸パネルを表示
- 白文字、大きな英字
- 各項目に白い下線
- Close表記と閉じるアイコンを右上に配置
- メニューを開いている間は背景スクロールを止める
- 各メニュー項目を押したら該当セクションにスムーズスクロールし、メニューを閉じる

## 実装例

```tsx
<MenuButton
  isOpen={isMenuOpen}
  onClick={toggleMenu}
/>
```

```tsx
function MenuButton({ isOpen, onClick }) {
  return (
    <button
      className="menuButton"
      data-open={isOpen}
      aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
      aria-expanded={isOpen}
      onClick={onClick}
    >
      <svg className="menuIcon" viewBox="0 0 ...">
        <path className="hamburgerPath path1" />
        <path className="hamburgerPath path2" />
        <path className="hamburgerPath path3" />
        <path className="closePath close1" />
        <path className="closePath close2" />
      </svg>
      <span className="menuLabel">{isOpen ? "Close" : "menu"}</span>
    </button>
  )
}
```

```css
.menuIcon path {
  fill: none;
  stroke: #fff;
  stroke-width: 8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.hamburgerPath,
.closePath {
  transition:
    stroke-dashoffset 520ms cubic-bezier(0.76, 0, 0.24, 1),
    opacity 160ms ease;
}

.menuButton[data-open="false"] .hamburgerPath {
  stroke-dashoffset: 0;
  opacity: 1;
}

.menuButton[data-open="false"] .closePath {
  stroke-dashoffset: var(--path-length);
  opacity: 0;
}

.menuButton[data-open="true"] .hamburgerPath {
  stroke-dashoffset: var(--path-length);
  opacity: 0;
}

.menuButton[data-open="true"] .closePath {
  stroke-dashoffset: 0;
  opacity: 1;
}
```

```ts
useEffect(() => {
  const paths = buttonRef.current?.querySelectorAll("path")
  paths?.forEach((path) => {
    const length = path.getTotalLength()
    path.style.setProperty("--path-length", String(length))
    path.style.strokeDasharray = String(length)
  })
}, [])
```

## fallback

どうしてもFigmaからSVGパスを直接取れない場合のみ、Figmaアセットを画像として使い、マスクやopacityで近い表現を作ってください。  
ただし、最優先はSVGパス化です。

---

# 3. Hero背景の青丸スクロールアニメーション

## 目的

ファーストビューのコピー「誰も取り残さない地域防災を。」と連動して、スクロール時に背景の青い丸がランダムに消えていく表現を入れてください。

ただフェードするのではなく、青い丸が急激に小さくなって消える表現が望ましいです。

## 初期状態

ページをまだスクロールしていない状態では、添付画像 `Home-1.png` の状態に近づけてください。

- 画面全体に大きな青い円が規則的に並んでいる
- 一部にオレンジ円がある
- ロゴ、menu、メインコピー、英語コピーが重なっている
- Heroは `100svh` 以上

## スクロール時

ユーザーが下にスクロールすると、背景の青い丸がランダム順に消えていく。

消え方：

- opacityだけで消さない
- `scale(1)` から `scale(0)` へ急激に小さくする
- 等速ではなく、緩急をつける
- 最初は少し粘り、途中から一気に縮む
- easingは `cubic-bezier(0.7, 0, 0.15, 1)` または `cubic-bezier(0.8, 0, 0.2, 1)`
- 消える順番はランダムだが、毎回リロードで変わりすぎないよう固定seedにする

## 実装方針

CSSの背景画像だけで丸を描くのではなく、アニメーション可能なDOM要素として丸を生成してください。

例：

```ts
const circles = generateCircles({
  rows: 10,
  cols: 7,
  seed: "animos",
})
```

各円は以下のようなデータを持たせてください。

```ts
type HeroCircle = {
  id: string
  row: number
  col: number
  x: number
  y: number
  size: number
  colorType: "blue" | "orange" | "gradient"
  disappearOrder: number
  keepUntilAbout?: boolean
}
```

描画例：

```tsx
<div className="heroCircleLayer" aria-hidden="true">
  {circles.map((circle) => (
    <div
      key={circle.id}
      className={`heroCircle heroCircle-${circle.colorType}`}
      style={{
        "--x": `${circle.x}px`,
        "--y": `${circle.y}px`,
        "--size": `${circle.size}px`,
      }}
    />
  ))}
</div>
```

スクロール進捗は `requestAnimationFrame` で更新してください。

```ts
const progress = clamp(window.scrollY / heroHeight, 0, 1)
```

各円ごとに消えるタイミングをずらしてください。

```ts
const localProgress = clamp(
  (scrollProgress - circle.start) / (circle.end - circle.start),
  0,
  1
)
```

scaleは easing を通してください。

```ts
const eased = easeCircleDisappear(localProgress)
const scale = 1 - eased
const opacity = localProgress > 0.92 ? 0 : 1
```

推奨 easing：

```ts
function easeCircleDisappear(t: number) {
  if (t <= 0) return 0
  if (t >= 1) return 1
  return 1 - Math.pow(1 - t, 4)
}
```

---

# 4. About冒頭のグラデーション円への接続

## 目的

Heroで背景にある青い円のうち一つが、スクロール後のAboutセクション上部にあるグラデーション円へ自然に変化するように見せてください。

Figmaの後半画面では、Aboutセクション上部に淡い青紫グラデーションの円があります。  
Hero内の真っ青な円が、スクロールに合わせてその円へ移動・変色・変形していくように実装してください。

## 実装方針

Hero背景の円のうち1つを `morphCircle` として扱ってください。

この円だけは他の円と違い、スクロール時に消さないでください。

代わりに以下を行います。

- Hero内の元の位置から、Aboutセクション上部の円の位置へ移動する
- 色を `#0000ff` から淡い青紫グラデーションへ変化させる
- サイズをAbout側の円サイズに合わせて変化させる
- z-indexを調整し、Aboutセクション背景の装飾として自然に見えるようにする
- 最終的にはAboutセクション上部の円と同じ見た目になる

## 実装イメージ

`morphCircle` は fixed または absolute で管理してください。

推奨：

- HeroからAboutにまたがる専用の `TransitionCircle` コンポーネントを作る
- `getBoundingClientRect()` でHero内の円の開始位置と、About内のターゲット円の位置を測る
- scroll progress で `x, y, scale, background` を補間する
- 補間完了後はAboutセクション内の装飾円として見えるようにする

```tsx
<TransitionCircle
  startRef={heroCircleRef}
  endRef={aboutCircleTargetRef}
  scrollRange={[0.25, 1.15]}
/>
```

## 色変化

CSSで単純にbackground-colorだけを変えるとグラデーションに移行しにくいので、擬似要素を使ってください。

- 本体：青い円
- `::after`：グラデーション円
- スクロール進捗に応じて `::after` の opacity を 0 → 1 にする

```css
.transitionCircle {
  background: #0000ff;
}

.transitionCircle::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    circle at 35% 25%,
    #ffffff 0%,
    #b9b7ff 42%,
    #0000ff 100%
  );
  opacity: var(--gradient-progress);
}
```

## 動き

- Heroの円がすぐに消えたり移動したりすると不自然なので、スクロール開始直後は少し固定する
- `scrollProgress: 0.15〜0.35` で周囲の円が消え始める
- `scrollProgress: 0.35〜1.0` でmorphCircleがAbout上部へ移動・変色
- `scrollProgress: 1.0` 以降はAboutセクション内の装飾円として固定表示

## 注意

- About側の円とHero側の円を別々に表示すると二重に見えるので避ける
- morphCircleがAboutのターゲット位置に到達するまでは、About側の円は透明にしておく
- 到達後にAbout側円を表示する場合は、morphCircleと完全に重なるタイミングでクロスフェードする

---

# 5. HeroからAboutへの接続

## 目的

Heroの背景アニメーションから、後半のHome-2セクションへ自然に繋げてください。

## 実装方針

- Heroの次にAboutセクションを配置する
- HeroとAboutの境界で急に白背景へ切り替えない
- Hero下部からAbout上部へかけて、白背景と円装飾が連続しているように見せる
- Aboutセクション上部にHeroの円パターンの名残を少し残してもよい
- スクロールによって丸が消えたあと、白背景のAbout本文が自然に現れる構成にする

---

# 6. About / プロジェクト紹介

## 見た目

白背景の紹介セクションです。  
イラスト素材と大きな日本語見出しを組み合わせます。

主な見出しは以下です。

- 地域の防災を、デジタルでもっと身近に。
- 地域の情報を、わかりやすく共有。
- 要支援者と、地域をつなぐ。
- 防災を学べるアプリを開発。

青背景の文字ハイライトを使い、重要語を強調します。

## 実装方針

- セクションごとに `section` として分ける
- 見出しは大きく太く
- 青ハイライトは `span` で実装
- 本文は読みやすい行間にする
- イラスト素材はFigmaから書き出したものを使う
- 画像が取得できない場合のみ一時的なplaceholderを使うが、最終的にはFigmaアセットに差し替える

## テキスト

### 地域の防災を、デジタルでもっと身近に。

いつ起こるかわからない自然災害に対して、避難ルートや危険箇所の情報を、普段からわかりやすく共有・認知できる仕組みが必要です。アニモスプロジェクトは、この課題意識からスタートした、デジタル活用を中心とする新しい取り組みです。

### 地域の情報を、わかりやすく共有。

地域の危険箇所や避難所、避難ルートなどを可視化・共有し、災害発生時に迅速な行動が取れるデジタルハザードマップの開発を検討しています。住民自身が参加し、情報を更新・共有できる仕組みを目指します。

### 要支援者と、地域をつなぐ。

災害時には、高齢者や障害のある方など、支援を必要とする人への対応も重要です。一方で、支援する側が「どのように声をかければよいのか」「何を手伝えばよいのか」を知らない場合もあります。アニモスプロジェクトでは、支援を必要とする人の状況や思いを共有し、地域の中で適切な支援につなげる方法を考えています。

### 防災を学べるアプリを開発。

地域の危険箇所や避難所、避難ルートなどを可視化・共有し、災害時に迅速な行動が取れるデジタルハザードマップの開発を検討しています。また、住民自身が参加し、情報を更新・共有できる仕組みを目指します。

## CTA

紹介セクションの末尾にオレンジ〜黄色の横長ボタンを配置してください。

テキスト：

```txt
ANIMOS PROJECT の紹介をもっと詳しくみる
```

右端に丸い矢印アイコンを配置します。

---

# 7. Actions / アクション一覧カルーセル

## 見た目

黒背景のカードを横スクロールで並べるカルーセルです。

カード上部に写真サムネイル、下にタイトルと説明文。  
左下に黄色〜オレンジの円で `#1` などの番号。  
右下に白い角丸四角の矢印ボタン。

## PC表示

- 横一列に5枚表示してよい
- 画面幅が足りない場合は横スクロール
- カード幅は約 `320px〜360px`
- カード間隔は `24px〜32px`

## mobile表示

- 横スクロールカルーセル
- 1カードの幅は `78vw〜84vw`
- 次のカードが少し見えるようにする
- スクロールスナップを使う
- FigmaのHome-2では2枚だけ見えているが、実装では5枚すべて横スクロールできるようにする

## カード共通仕様

- 背景: 黒
- 文字: 白
- 角丸: 大きめ
- サムネイル画像はカード上部に配置
- サムネイルは `aspect-ratio: 16 / 10` または `4 / 3`
- `object-fit: cover`
- 番号円はカード左下から少しはみ出してもよい
- 矢印ボタンはカード右下

## アクション一覧データ

### 01｜デジタルハザードマップ開発

地域の危険箇所、避難所、避難ルートなどをマップ上に整理し、誰でも確認しやすい形で共有できる仕組みを開発します。

画像候補：

```txt
action-hazard-map.jpg
```

### 02｜地域情報の共有

住民が地域の防災情報を共有・更新できる仕組みを検討します。災害時に必要な情報を、地域全体で把握できる状態を目指します。

画像候補：

```txt
action-community-share.jpg
```

### 03｜要支援者へのデジタル支援

高齢者や障害のある方など、災害時に支援を必要とする人に向けた情報提供や支援方法を考えます。スマホや映像、体験型コンテンツの活用も検討中です。

画像候補：

```txt
action-digital-support.jpg
```

### 04｜支援する人と必要とする人をつなぐ

支援する側と、支援を必要とする側の認識のずれを減らす取り組みを行います。どのような支援が必要か共有できる仕組みを目指します。

画像候補：

```txt
action-connect-support.jpg
```

### 05｜防災学習アプリの開発

防災を身近に学べるアプリを開発します。避難行動や地図理解、危険区域の把握などを、子どもや若い世代にもわかりやすく伝えることを目指します。

画像候補：

```txt
action-learning-app.jpg
```

---

# 8. News セクション

## 見た目

白背景に中央揃えの `News` 見出し。  
その下に横長のグレー角丸ボックスが3つ並びます。

現時点では詳細なニュース内容が未定のため、プレースホルダーとして実装してください。

## 実装方針

- `News` 見出しは中央揃え
- カードは薄いグレー
- 角丸はかなり大きめ
- mobileでは縦積み
- desktopでは最大幅を設定して中央寄せ
- 将来的にnoteリンクやお知らせ一覧に差し替えられるよう、配列データから描画する

## CTA

News下にオレンジ〜黄色の横長ボタンを配置してください。

テキスト：

```txt
ANIMOS PROJECT のnoteをみる
```

右端に丸い矢印アイコンを配置します。

---

# 9. Contact セクション

## 見た目

白背景。  
上に細い罫線。  
中央に `Contact` 見出し。  
その下に説明文。

テキスト：

```txt
アニモスの活動にご興味がある方は、
気軽にご連絡ください！
```

その下にオレンジ〜黄色のCTAボタン。

ボタンテキスト：

```txt
ANIMOS PROJECT に連絡する
```

## 実装方針

- 中央揃え
- 上部に区切り線
- CTAは紹介セクション・Newsと同じボタンコンポーネントを使う
- 実際のリンク先は一旦 `#` でよい
- 後からGoogleフォーム、メール、SNSなどに差し替えられるようにする

---

# 10. Footer

## 見た目

下部に大きな青い円形のフッターがあります。  
中に白文字で `ANIMOS PROJECT` と表示します。

## 実装方針

- mobileでは画面下から大きな青い半円が出るように見せる
- desktopでは横幅に合わせて大きな円/楕円として調整
- 文字は中央に配置
- 背景色はHeroと同じ強い青

---

# アニメーション実装ライブラリ

既存プロジェクトに合わせてください。

優先順位：

1. 既にGSAPが入っているなら GSAP + ScrollTrigger
2. 既にFramer Motionが入っているなら Framer Motion
3. どちらもなければ CSS + requestAnimationFrame

このLPではスクロール連動・SVGパス描画・円の個別制御があるため、導入可能なら GSAP + ScrollTrigger が最も実装しやすいです。

## GSAPを使う場合

- Hero背景円は配列でDOM生成
- `gsap.timeline({ scrollTrigger: ... })` で制御
- 消える円は `stagger` を使う
- `stagger` は完全ランダムではなく、seed付き配列で順序を作る
- morphCircleは別timelineで `x`, `y`, `scale`, `--gradient-progress` を制御
- menu iconは `strokeDashoffset` をtimelineで制御

---

# コンポーネント設計

可能であれば以下のように分けてください。

- `Header`
- `Hero`
- `MenuButton`
- `MenuOverlay`
- `HeroCircleLayer`
- `TransitionCircle`
- `AboutSection`
- `HighlightTitle`
- `CTAButton`
- `ActionsCarousel`
- `ActionCard`
- `NewsSection`
- `ContactSection`
- `Footer`

データはコンポーネント内に直書きではなく、できれば配列として管理してください。

例：

```ts
const actions = [
  {
    number: "1",
    title: "デジタルハザードマップ開発",
    description:
      "地域の危険箇所、避難所、避難ルートなどをマップ上に整理し、誰でも確認しやすい形で共有できる仕組みを開発します。",
    image: "/assets/action-hazard-map.jpg",
  },
]
```

---

# CSS / スタイリング方針

## 推奨

- CSS Modules / 通常CSS / Tailwind のどれでも既存プロジェクトに合わせる
- `clamp()` を積極的に使う
- `scroll-snap-type` を使ってカルーセルを自然にする
- `position: sticky` や `fixed` は必要な部分だけに使う
- `svh` を使い、スマホブラウザのアドレスバーでHeroが崩れないようにする

## 避けること

- Figmaの座標をそのまま大量の `position: absolute` で再現すること
- すべてをpx固定にすること
- スマホで文字が小さすぎること
- ページ全体に横スクロールが出ること
- カードの高さがバラバラになること
- hoverしないと読めないUIにすること
- メニューアイコンを一般的な三本線で雑に置き換えること

---

# アセット取得方針

Figmaから必要なアセットを取得し、プロジェクト内に保存してください。

保存先例：

```txt
public/assets/
  action-hazard-map.jpg
  action-community-share.jpg
  action-digital-support.jpg
  action-connect-support.jpg
  action-learning-app.jpg
  menu-icon.svg
  close-icon.svg
  about-visual-1.svg
  about-visual-2.svg
```

Figmaから取得した一時URLをそのまま本番コードに直書きしないでください。  
URLは期限切れになる可能性があるため、必ずローカルの `public/assets/` などに保存して参照してください。

---

# アクセシビリティ

- 画像には適切な `alt` を設定
- メニューボタンには `aria-label`
- メニュー開閉状態に `aria-expanded`
- カルーセルはキーボード操作でも内容が追えるようにする
- 装飾だけの画像や背景には空のaltまたはCSS背景を使う
- ボタンやリンクは十分なクリック領域を確保する
- `prefers-reduced-motion` が有効な場合は、パスアニメーションやスクロール演出を弱める、または無効化する

---

# 最終チェック

- 初期表示が `Home-1.png` に近い
- メニューアイコンがFigma由来の特殊な形を保っている
- menuクリック時にハンバーガー線が端から消える
- Xが線として描かれて出現する
- メニューOverlayが `Home-1-open menu.png` に近い
- スクロールで青丸がランダムに縮小して消える
- 青丸の1つがAbout上部のグラデーション円へ自然に変化する
- HeroからAboutへ急に切り替わらず、連続した体験になっている
- `Home-2.png` の後半セクションに自然に繋がっている
- アクションカルーセルがスマホで自然に横スクロールできる
- 375px幅のスマホでHeroが崩れない
- 390px幅のスマホで日本語コピーが見切れない
- 768px幅のタブレットで余白が詰まりすぎない
- 1024px以上で間延びしすぎない
- ページ全体に不要な横スクロールが出ない
- Lighthouseで大きな問題が出ない

---

# Codexへ最初に渡す依頼文

```txt
Figmaファイルと添付画像を参照して、Animos Project LPを実装してください。特にFigma由来のハンバーガーメニュー/Closeアイコンの形状を取得し、SVGパスアニメーションとして実装してください。Heroでは初期表示をHome-1.pngに近づけ、スクロールに応じて青い円がランダムに縮小して消え、うち1つがAboutセクション上部のグラデーション円へ自然に変化するようにしてください。詳細は実装指示書に従ってください。
```
