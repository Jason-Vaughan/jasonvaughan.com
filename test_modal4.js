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
  
  let modalVisible = await page.evaluate(() => {
    const h3s = Array.from(document.querySelectorAll('h3'));
    return h3s.some(h3 => h3.textContent.includes('Qwen2.5-Coder'));
  });
  console.log('Modal visible after 500ms:', modalVisible);
  
  await page.waitForTimeout(2000);
  
  modalVisible = await page.evaluate(() => {
    const h3s = Array.from(document.querySelectorAll('h3'));
    return h3s.some(h3 => h3.textContent.includes('Qwen2.5-Coder'));
  });
  console.log('Modal visible after 2.5s:', modalVisible);
  
  await browser.close();
})();
