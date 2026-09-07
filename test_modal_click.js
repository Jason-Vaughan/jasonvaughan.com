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
      el.click();
    }
  });
  
  await page.waitForTimeout(500);
  
  console.log("Clicking inside the modal dialog...");
  // Find the H3 inside the modal and click it
  await page.evaluate(() => {
    const h3s = Array.from(document.querySelectorAll('h3'));
    const target = h3s.find(h3 => h3.textContent.includes('Qwen2.5-Coder'));
    if (target) {
      target.click(); // Click the text
      // also click the dialog background
      target.parentElement.parentElement.click();
    }
  });
  
  await page.waitForTimeout(500);
  
  const modalVisible = await page.evaluate(() => {
    const h3s = Array.from(document.querySelectorAll('h3'));
    return h3s.some(h3 => h3.textContent.includes('Qwen2.5-Coder'));
  });
  console.log('Modal visible after clicking inside it:', modalVisible);
  
  await browser.close();
})();
