# ANIMOS PROJECT 保守ガイド

この文書は、初めてリポジトリを触る担当者が、安全に内容を更新して
Cloudflare Pagesへ公開するための案内です。

## 1. サイトの仕組み

- Next.js App RouterとReactで構築しています。
- `next.config.ts`の`output: "export"`により、実行時サーバーを持たない静的サイトとして`out/`へ出力します。
- 本番はCloudflare Pagesです。GitHubの本番ブランチへのpushが公開の起点です。
- データベースや実行時APIはありません。News用の`/api/note`もビルド時に静的ファイルへ変換されます。

## 2. 主なファイル

| 目的 | 更新場所 |
| --- | --- |
| ホームの文章、Actions、News抜粋 | `app/page.tsx` |
| Aboutの文章、4つの価値観 | `app/about/page.tsx` |
| Actionsの詳細 | `app/actions/page.tsx` |
| News一覧表示 | `app/news/NewsIndex.tsx` |
| note RSSの取得・変換 | `app/api/note/route.ts` |
| Contactの文章 | `app/contact/page.tsx` |
| メール、Instagram、共通ナビ | `app/site-config.ts` |
| タイトル、canonical、OGP | `app/metadata-config.ts`、`app/layout.tsx` |
| 共通ヘッダー・フッター | `app/components/InteriorPage.tsx` |
| メニューボタンのパスアニメーション | `app/components/AnimatedMenuButton.tsx` |
| サイト全体の見た目 | `app/globals.css` |
| 画像 | `public/`、`public/assets/` |
| 公開設定 | `next.config.ts` |

ホームとActions詳細には、それぞれ用途に合わせたActionsの文章があります。
項目の追加・削除・名称変更をするときは、`app/page.tsx`と
`app/actions/page.tsx`の両方を更新してください。

## 3. 外部連携

### note

`app/api/note/route.ts`がnoteのRSSをビルド時に取得し、静的な
`out/api/note`を生成します。そのため、noteへ投稿しただけでは本番サイトの
Newsは更新されません。Cloudflare Pagesを再デプロイしてください。

アカウントURLは次の優先順です。

1. `NOTE_ACCOUNT_URL`
2. `NEXT_PUBLIC_NOTE_ACCOUNT_URL`
3. コード内の既定URL

RSS取得に失敗してもビルドを止めず、空の一覧を出力する設計です。公開後に
Newsが空の場合は、まずCloudflareのビルドログとnoteの`/rss`を確認します。

### ANIMOS MIX

Aboutの「防災×情報×〇〇」は、Google Apps Scriptへ送信します。

- フロント側: `app/components/EditableThemeWord.tsx`
- Apps Scriptの控え: `scripts/animos-mix-apps-script.gs`
- 保存先: Apps Script内の`SPREADSHEET_ID`と`SHEET_NAME`
- 上書き用環境変数: `NEXT_PUBLIC_ANIMOS_MIX_ENDPOINT`

ブラウザからの送信は`no-cors`です。画面の「届いたよ」はリクエストを
送れたことを示し、スプレッドシートへの保存完了を読み取ったものではありません。
障害調査ではApps Scriptの実行履歴と保存先シートも確認してください。

## 4. 環境変数

`.env.example`を`.env.local`へコピーし、必要な値だけ設定します。
秘密情報を`NEXT_PUBLIC_`で始まる変数へ入れないでください。この接頭辞の値は
ブラウザへ公開されます。

Cloudflare Pagesでは、同じ名前の変数をプロジェクト設定へ登録します。
`NEXT_PUBLIC_BASE_PATH`はサブディレクトリ配信時だけ使用し、通常の独自ドメイン
運用では空のままにします。

## 5. デザインとアニメーションの注意点

- `app/globals.css`は、ホーム、共通部品、下層ページ、レスポンシブ指定の順でまとまっています。既存クラスを検索してから追加してください。
- ホームの84個の円は`app/page.tsx`の`Hero`でスクロール位置から直接描画します。iPhone向けにレイアウト計測とGPUレイヤー数を抑えているため、`scroll`内で`getBoundingClientRect()`などのレイアウト読み取りを追加しないでください。
- Aboutへ移動する円は、Safariの非同期スクロールとの競合を避けるため`position: absolute`です。`fixed`へ戻さないでください。
- メニューボタンはReact側の`MenuPhase`とCSSの`data-phase`指定が対になっています。時間やphase名を変えるときは両方を更新し、開閉を連打して確認してください。
- `prefers-reduced-motion`利用者にはアニメーションを短縮します。この指定を削除しないでください。

## 6. 更新から公開まで

1. `npm install`
2. `npm run dev`
3. PCと実機iPhoneで対象ページを確認
4. `npm run lint`
5. `npm run build`
6. `npm test`
7. 差分をレビューしてからGitHubの本番ブランチへpush
8. Cloudflare Pagesのビルド完了後、独自ドメインで再確認

最低限、次を確認します。

- `/`、`/about/`、`/actions/`、`/news/`、`/contact/`が表示できる
- モバイルメニューが開閉できる
- ホームの円アニメーションがスクロールに追従する
- Newsにnoteの記事が出る
- ContactのメールとInstagramが正しい
- OGP画像、タイトル、canonical URLが本番ドメインを指す
- 横スクロールやHydrationエラーがない

## 7. 変更時の方針

- 文章やリンクなど共有される値は、まず`site-config.ts`など既存の共通設定へ置けないか確認します。
- コメントにはコードの読み替えではなく、「なぜ必要か」「消すと何が壊れるか」を残します。
- 新しい依存パッケージ、データベース、サーバー処理は、静的exportとCloudflare Pagesで動くか確認してから導入します。
- 本番公開を伴うpushは、ローカルと実機の確認が終わってから行います。
