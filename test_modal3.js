import { chromium } from 'playwright';
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3301');
  
  // Expose function to log
  page.on('console', msg => console.log('BROWSER:', msg.text()));
  
  await page.evaluate(() => {
    // Open the collapsible
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
  
  console.log("Clicking model...");
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('div')).find(el => el.textContent.includes('Qwen2.5-Coder 32B') && el.style.cursor === 'pointer');
    if (el) {
      console.log('Found model row, clicking!');
      el.click();
    }
  });
  
  await page.waitForTimeout(500);
  
  let h3 = await page.evaluate(() => document.querySelector('h3')?.textContent);
  console.log('Modal H3 after 500ms:', h3);
  
  await page.waitForTimeout(2000);
  
  h3 = await page.evaluate(() => document.querySelector('h3')?.textContent);
  console.log('Modal H3 after 2.5s:', h3);
  
  await browser.close();
})();
