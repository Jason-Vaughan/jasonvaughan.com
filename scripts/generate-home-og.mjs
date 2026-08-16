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

  // Generate 52 weeks x 7 days pseudo-activity squares (GitHub Green & Amber Gold)
  let squaresHtml = "";
  for (let w = 0; w < 48; w++) {
    squaresHtml += `<div style="display: flex; flex-direction: column; gap: 3px;">`;
    for (let d = 0; d < 7; d++) {
      const rand = Math.sin(w * 7 + d * 13 + 42) * 10000;
      const val = rand - Math.floor(rand);
      let color = "#18181b"; // level 0 (dark)
      if (val > 0.35) color = "#0e4429"; // level 1
      if (val > 0.60) color = "#006d32"; // level 2
      if (val > 0.78) color = "#26a641"; // level 3
      if (val > 0.90) color = "#fbbf24"; // level 4 (gold highlight)
      squaresHtml += `<div style="width: 11px; height: 11px; border-radius: 2px; background: ${color};"></div>`;
    }
    squaresHtml += `</div>`;
  }

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
          padding: 44px 50px;
          position: relative;
          overflow: hidden;
        }
        .bg-glow {
          position: absolute;
          top: -120px;
          right: -120px;
          width: 650px;
          height: 650px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(9, 9, 11, 0) 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .domain-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(90deg, #fbbf24 0%, #d97706 100%);
          color: #000;
          padding: 7px 18px;
          border-radius: 20px;
          font-size: 16px;
          font-weight: 800;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 14px rgba(251, 191, 36, 0.3);
        }
        .live-tag {
          color: #a1a1aa;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .hero-section {
          margin-top: 10px;
        }
        .main-title {
          font-size: 54px;
          font-weight: 900;
          letter-spacing: -1.5px;
          line-height: 1.05;
          color: #ffffff;
        }
        .gold-text {
          background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .subtitle {
          font-size: 21px;
          color: #a1a1aa;
          font-weight: 500;
          margin-top: 10px;
          line-height: 1.35;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 18px;
        }
        .stat-card {
          background: #18181b;
          border: 1px solid #27272a;
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .stat-value {
          font-size: 28px;
          font-weight: 800;
          color: #ffffff;
        }
        .stat-delta {
          font-size: 13px;
          color: #22c55e;
          font-weight: 700;
          margin-left: 6px;
        }
        .stat-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #71717a;
          font-weight: 700;
          margin-top: 4px;
        }
        .heatmap-container {
          background: #111113;
          border: 1px solid #27272a;
          border-radius: 12px;
          padding: 14px 18px;
          margin-top: 14px;
        }
        .heatmap-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          font-weight: 700;
          color: #a1a1aa;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .grid-wrap {
          display: flex;
          gap: 3px;
          justify-content: space-between;
        }
      </style>
    </head>
    <body>
      <div class="bg-glow"></div>
      
      <div class="top-row">
        <div class="domain-badge">🌐 jasonvaughan.com</div>
        <div class="live-tag">⚡ Live Production & AI Telemetry</div>
      </div>

      <div class="hero-section">
        <h1 class="main-title">
          JASON VAUGHAN <br/>
          <span class="gold-text">AV Production Specialist & Live Systems TPM</span>
        </h1>
        <p class="subtitle">
          25+ years leading high-stakes live events (Google I/O, Cloud Next, Made by Google) & building AI workflow automation.
        </p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">5,100+ <span class="stat-delta">+351 / 7d</span></div>
          <div class="stat-label">Commits</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">30 <span class="stat-delta" style="color: #fbbf24;">+2 / 7d</span></div>
          <div class="stat-label">Projects Shipped</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">3,600+ <span class="stat-delta">+165 / 7d</span></div>
          <div class="stat-label">2026 Contributions</div>
        </div>
      </div>

      <div class="heatmap-container">
        <div class="heatmap-header">
          <span>GitHub Contribution Activity Grid</span>
          <span style="color: #22c55e;">🟩 3,600+ Contributions</span>
        </div>
        <div class="grid-wrap">
          ${squaresHtml}
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(htmlContent);
  await page.screenshot({ path: OUT_PATH, type: "png" });
  console.log(`✅ Generated social preview card with GitHub contribution heat map at ${OUT_PATH}`);

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
