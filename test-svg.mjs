import { chromium } from "playwright";
import { exec } from "node:child_process";

const server = exec("npx vite --port 5173");
await new Promise(r => setTimeout(r, 3000));

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("http://localhost:5173");
await new Promise(r => setTimeout(r, 2000));
const svgVisible = await page.evaluate(() => {
  const svg = document.querySelector('a[href*="ScrapeGoat"] svg');
  if (!svg) return false;
  const rect = svg.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
});
console.log("SVG VISIBLE:", svgVisible);
await browser.close();
server.kill();
