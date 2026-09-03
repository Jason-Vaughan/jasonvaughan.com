import { chromium } from "playwright";
import { exec } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir, writeFile } from "node:fs/promises";
import { promisify } from "node:util";

const execAsync = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = resolve(__dirname, "../dist");

// Known routes to prerender. 
const routes = [
  "/projects/tilt-showcase",
  "/projects/tangleclaw",
  "/projects/tanglebrain",
  "/projects/cierre-sensei",
  "/projects/scrapegoat",
  "/projects/notse",
  "/projects/clawbridge"
];

async function main() {
  console.log("Starting local preview server...");
  const server = exec("npx vite preview --port 4173");

  // Give the server a moment to start
  await new Promise((r) => setTimeout(r, 3000));

  console.log("Launching Playwright...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (const route of routes) {
    const url = `http://localhost:4173${route}`;
    console.log(`Prerendering ${route} ...`);
    
    // Visit page and wait for React to render
    await page.goto(url, { waitUntil: "networkidle" });
    
    // Get fully rendered HTML
    let html = await page.content();
    
    // Save to dist folder
    const outDir = resolve(DIST_DIR, route.substring(1)); // remove leading slash
    await mkdir(outDir, { recursive: true });
    
    await writeFile(resolve(outDir, "index.html"), html, "utf8");
    console.log(`  ✓ Saved to ${outDir}/index.html`);
  }

  console.log("Cleaning up...");
  await browser.close();
  server.kill();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
