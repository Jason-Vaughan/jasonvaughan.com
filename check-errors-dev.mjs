import { chromium } from "playwright";
import { exec } from "node:child_process";

const server = exec("npx vite --port 5173");
await new Promise(r => setTimeout(r, 3000));

const browser = await chromium.launch();
const page = await browser.newPage();
page.on("pageerror", err => console.log("PAGE ERROR:", err));
page.on("console", msg => {
  if (msg.type() === "error") console.log("CONSOLE ERROR:", msg.text());
});

await page.goto("http://localhost:5173");
await new Promise(r => setTimeout(r, 2000));
await browser.close();
server.kill();
