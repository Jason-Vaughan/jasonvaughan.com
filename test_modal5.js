import { chromium } from 'playwright';
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3301');
  
  await page.evaluate(() => {
    const section = document.querySelector('[data-collapsible="infrastructure"]');
    if (section) {
       const btn = section.querySelector('button');
       if (btn) btn.click();
    }
  });
  
  await page.waitForTimeout(1000);
  
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('div')).find(el => el.textContent.includes('✨ AI Models Evaluated'));
    if (el) el.click();
  });
  
  await page.waitForTimeout(1000);
  
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('div')).find(el => el.textContent.includes('Qwen2.5-Coder 32B') && el.style.cursor === 'pointer');
    if (el) {
      // simulate mousedown on row, then mouseup on backdrop!
      const rect = el.getBoundingClientRect();
      // we can't easily simulate cross-element mousedown/up via evaluate simply.
    }
  });
  
  await browser.close();
})();
