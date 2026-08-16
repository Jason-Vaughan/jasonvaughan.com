#!/usr/bin/env node
import { chromium } from "playwright";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const OUT_PATH = resolve(PROJECT_ROOT, "public/og-image.png");

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2
  });

  // Render HTML preview card template for og-image.png
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        body {
          width: 1200px;
          height: 630px;
          background: #09090b;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 60px;
          position: relative;
          overflow: hidden;
        }
        .bg-glow {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, rgba(9, 9, 11, 0) 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .top-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(251, 191, 36, 0.12);
          border: 1px solid rgba(251, 191, 36, 0.35);
          color: #fbbf24;
          padding: 8px 18px;
          border-radius: 20px;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .main-title {
          font-size: 64px;
          font-weight: 900;
          letter-spacing: -1.5px;
          line-height: 1.1;
          margin-top: 20px;
          background: linear-gradient(135deg, #ffffff 0%, #d4d4d8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gold-highlight {
          background: linear-gradient(90deg, #fbbf24 0%, #d97706 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .subtitle {
          font-size: 26px;
          color: #a1a1aa;
          font-weight: 500;
          line-height: 1.4;
          margin-top: 16px;
          max-width: 900px;
        }
        .footer-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 24px;
          margin-top: 30px;
        }
        .pill-group {
          display: flex;
          gap: 12px;
        }
        .pill {
          background: #18181b;
          border: 1px solid #27272a;
          color: #e4e4e7;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
        }
        .domain-tag {
          font-size: 20px;
          font-weight: 800;
          color: #fbbf24;
          letter-spacing: 0.5px;
        }
      </style>
    </head>
    <body>
      <div class="bg-glow"></div>
      
      <div>
        <div class="top-badge">
          <span>⚡ LIVE SYSTEMS & TECHNICAL PROGRAM MANAGEMENT</span>
        </div>
        <h1 class="main-title">
          JASON VAUGHAN <br/>
          <span class="gold-highlight">AV Production & AI Telemetry</span>
        </h1>
        <p class="subtitle">
          Senior Events Technical Leader with 25+ years experience in high-stakes live events, flagship broadcasts (Google I/O, Cloud Next, Made by Google), and AI workflow automation.
        </p>
      </div>

      <div class="footer-bar">
        <div class="pill-group">
          <div class="pill">🎬 Technical Program Manager</div>
          <div class="pill">📡 Live Broadcast & Signal Flow</div>
          <div class="pill">🤖 AI Fleet & Automation</div>
        </div>
        <div class="domain-tag">jasonvaughan.com</div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(htmlContent);
  await page.screenshot({ path: OUT_PATH, type: "png" });
  console.log(`✅ Generated home OG preview card image at ${OUT_PATH}`);

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
