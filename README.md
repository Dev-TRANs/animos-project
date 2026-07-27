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
npm run build
```

## Deployment

Next.js の静的 export を使用します。ビルドすると `out` ディレクトリが生成されます。

Cloudflare Pages:

```txt
Build command: npm run build
Output directory: out
```

`@cloudflare/next-on-pages` は使用しません。

GitHub Pages も、`main` ブランチへの push を契機に GitHub Actions が同じ静的サイトを
生成して自動デプロイします。
