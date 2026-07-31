import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../out/", import.meta.url);
const googleSiteVerification = "U3N1SPErYZ6hcrPgWswh8WCyACwLkJXfE7c7QNofrBQ";

async function readOutput(path) {
  return readFile(new URL(path, outputRoot), "utf8");
}

test("exports every public page as static HTML", async () => {
  const pages = [
    "index.html",
    "about/index.html",
    "actions/index.html",
    "news/index.html",
    "contact/index.html",
  ];

  const htmlFiles = await Promise.all(pages.map(readOutput));

  for (const html of htmlFiles) {
    assert.match(html, /<html lang="ja">/);
    assert.match(html, /ANIMOS PROJECT/);
    assert.match(html, /https:\/\/github\.com\/Dev-TRANs/);
    assert.match(html, /https:\/\/x\.com\/metsa_a/);
    assert.match(
      html,
      new RegExp(`<meta name="google-site-verification" content="${googleSiteVerification}"\\s*\\/?`),
    );
  }

  assert.match(htmlFiles[0], /<title>ANIMOS PROJECT<\/title>/);
  assert.match(htmlFiles[1], /<title>About Us \| ANIMOS PROJECT<\/title>/);
  assert.match(htmlFiles[2], /<title>Actions \| ANIMOS PROJECT<\/title>/);
  assert.match(htmlFiles[3], /<title>News \| ANIMOS PROJECT<\/title>/);
  assert.match(htmlFiles[4], /<title>Contact \| ANIMOS PROJECT<\/title>/);
});

test("exports the note feed as static JSON", async () => {
  const feed = JSON.parse(await readOutput("api/note"));

  assert.ok(Array.isArray(feed.items));
  assert.match(feed.accountUrl, /^https:\/\/note\.com\//);
});

test("exports a sitemap for every public page", async () => {
  const sitemap = await readOutput("sitemap.xml");

  for (const path of ["/", "/about/", "/actions/", "/news/", "/contact/"]) {
    assert.match(sitemap, new RegExp(`<loc>https://[^<]+${path}</loc>`));
  }
});
