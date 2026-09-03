import { chromium } from 'playwright';
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  await page.goto('https://jasonvaughan.com', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot.png' });
  console.log("Screenshot saved!");
  await browser.close();
})();
