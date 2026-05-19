#!/usr/bin/env node
// Generates public/share-images/<id>.png (1200x630) for every card in the
// registry by booting a Vite preview server, navigating to each card's
// anchor, and screenshotting the viewport once the card is centered.
//
// Required env / args:
//   OG_BASE_URL  (default: http://localhost:4173) — the preview server URL.
//                The deploy workflow boots `vite preview` on 4173 before
//                running this script.

import { chromium } from "playwright";
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { SHARE_CARDS } from "../src/data/share-cards.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(PROJECT_ROOT, "public/share-images");
const BASE_URL = process.env.OG_BASE_URL || "http://localhost:4173";

// OG standard. iMessage / Slack / Discord / Twitter all render this aspect.
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// Render at 2x then downscale on save — Chromium's deviceScaleFactor gives
// us crisp PNGs even on retina-class preview surfaces.
const SCALE = 2;

async function captureCard(page, card) {
  // Navigate to the BASE URL (no hash). The App.jsx deep-link handler only
  // runs when a hash is present — by avoiding it entirely, we eliminate the
  // race between its smooth-scroll + highlight-pulse and our own positioning.
  const url = BASE_URL + "/";
  console.log(`  → ${url} #${card.id}`);

  await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });

  // Let framer-motion entrance animations + initial data fetches settle
  // (Monad-1 stats arrive asynchronously; we want the live tiles populated).
  await page.waitForTimeout(2000);

  // Confirm the element exists before scrolling. If a card is renamed but
  // the registry isn't updated, this surfaces the mismatch immediately.
  const found = await page.$(`#${card.id}`);
  if (!found) {
    throw new Error(`Element with id="${card.id}" not found on page`);
  }

  // Scroll the card to the top of the viewport with a small breathing-room
  // offset. Instant behavior (not smooth) so we don't have to wait for
  // animations to complete before screenshotting.
  await page.evaluate((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    // Make sure no stale highlight class is on the element from a previous
    // navigation in the same page session.
    el.classList.remove("card-highlight-pulse");
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top - 24, behavior: "instant" });
  }, card.id);

  // Small wait after scroll for any layout settling.
  await page.waitForTimeout(300);

  const outPath = resolve(OUT_DIR, `${card.id}.png`);
  await page.screenshot({
    path: outPath,
    type: "png",
    fullPage: false,
    clip: { x: 0, y: 0, width: OG_WIDTH, height: OG_HEIGHT },
  });
  console.log(`  ✓ ${card.id}.png`);
}

async function main() {
  // Drop stale images for cards that have been removed from the registry.
  if (existsSync(OUT_DIR)) {
    const existing = await readdir(OUT_DIR);
    const validImages = new Set(SHARE_CARDS.map((c) => `${c.id}.png`));
    for (const file of existing) {
      if (file.endsWith(".png") && !validImages.has(file)) {
        await rm(resolve(OUT_DIR, file), { force: true });
        console.log(`  ✗ removed stale image: ${file}`);
      }
    }
  }

  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: OG_WIDTH, height: OG_HEIGHT },
    deviceScaleFactor: SCALE,
    // Pretend to be a desktop browser; some OG image generators trip on bot UAs.
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  let failures = 0;
  for (const card of SHARE_CARDS) {
    try {
      await captureCard(page, card);
    } catch (err) {
      failures += 1;
      console.error(`  ✗ ${card.id}: ${err.message}`);
    }
  }

  await browser.close();
  console.log(
    `\nGenerated ${SHARE_CARDS.length - failures}/${SHARE_CARDS.length} OG images in ${OUT_DIR}`,
  );

  if (failures > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
