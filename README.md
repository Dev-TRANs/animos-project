# Animos Project

「誰も取り残さない地域防災」をテーマに、地域・情報・福祉をデジタルでつなぐ
アニモスプロジェクトの公式ウェブサイトです。

## Development

Node.js 22 以降が必要です。

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run build:pages
```

## Deployment

`main` ブランチへの push を契機に GitHub Actions が静的サイトを生成し、
GitHub Pages へ自動デプロイします。
