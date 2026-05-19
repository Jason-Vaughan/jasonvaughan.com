#!/usr/bin/env node
// Generates public/share/<id>/index.html for every card in the registry.
// Each page is a tiny OG-tagged stub: link-preview crawlers grab the meta
// tags, humans get an immediate JS redirect to /#<id> on the main page.
//
// Run as part of the deploy pipeline (see .github/workflows/deploy.yml)
// so adding/removing entries in share-cards.js stays in parity with the
// deployed artifacts.

import { mkdir, writeFile, readdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { SHARE_CARDS } from "../src/data/share-cards.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const SHARE_DIR = resolve(PROJECT_ROOT, "public/share");
const SITE_URL = "https://jasonvaughan.com";

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildPage(card) {
  const title = escapeHtml(card.title);
  const description = escapeHtml(card.description);
  const id = card.id;
  const ogImage = `${SITE_URL}/share-images/${id}.png`;
  const targetUrl = `/#${id}`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="${SITE_URL}/share/${id}/" />
    <meta property="og:site_name" content="Jason Vaughan" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${ogImage}" />

    <!-- Humans get redirected immediately; crawlers stay on this page and read the OG tags above. -->
    <meta http-equiv="refresh" content="0;url=${targetUrl}" />
    <script>window.location.replace(${JSON.stringify(targetUrl)});</script>

    <style>
      html, body { margin: 0; padding: 0; background: #09090b; color: #d4d4d8;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      .wrap { text-align: center; padding: 80px 24px; }
      a { color: #f59e0b; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <p>Redirecting to <a href="${targetUrl}">${title}</a>…</p>
    </div>
  </body>
</html>
`;
}

async function main() {
  // Clean any old per-card directories that aren't in the current registry —
  // removed cards should not leave dangling share pages behind.
  if (existsSync(SHARE_DIR)) {
    const existing = await readdir(SHARE_DIR, { withFileTypes: true });
    const validIds = new Set(SHARE_CARDS.map((c) => c.id));
    for (const entry of existing) {
      if (entry.isDirectory() && !validIds.has(entry.name)) {
        await rm(resolve(SHARE_DIR, entry.name), { recursive: true, force: true });
        console.log(`  ✗ removed stale share page: ${entry.name}`);
      }
    }
  }

  await mkdir(SHARE_DIR, { recursive: true });

  for (const card of SHARE_CARDS) {
    const cardDir = resolve(SHARE_DIR, card.id);
    await mkdir(cardDir, { recursive: true });
    await writeFile(resolve(cardDir, "index.html"), buildPage(card), "utf8");
    console.log(`  ✓ /share/${card.id}/index.html`);
  }

  console.log(`\nGenerated ${SHARE_CARDS.length} share page(s) in ${SHARE_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
