# ANIMOS PROJECT

「誰も取り残さない地域防災」をテーマに、地域・情報・福祉をデジタルでつなぐ
ANIMOS PROJECTの公式ウェブサイトです。

## ローカル開発

Node.js 22以降が必要です。

```bash
npm install
npm run dev
```

変更前後の確認には、次を実行します。

```bash
npm run lint
npm run build
npm test
```

## 公開

本番はCloudflare Pagesで運用しています。GitHubリポジトリの本番ブランチへ
pushすると、Cloudflare Pagesが自動的にビルド・公開します。

```txt
Build command: npm run build
Output directory: out
```

このサイトはNext.jsの静的exportです。実行時サーバーやデータベースを
必要としません。

引き継ぎ、コンテンツ更新、外部連携、公開前チェックについては
[保守ガイド](docs/MAINTENANCE.md)を参照してください。
