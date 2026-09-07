import { chromium } from 'playwright';
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3301');
  await page.waitForSelector('text="✨ AI Models Evaluated"', { timeout: 10000 });
  
  await page.click('text="✨ AI Models Evaluated"');
  await page.waitForTimeout(1000);
  
  await page.click('text="Qwen2.5-Coder 32B"');
  await page.waitForTimeout(500);
  
  let modalVisible = await page.evaluate(() => {
    return document.querySelector('h3')?.textContent.includes('Qwen2.5-Coder 32B');
  });
  console.log('Modal visible 500ms after click:', modalVisible);
  
  await page.waitForTimeout(2000);
  modalVisible = await page.evaluate(() => {
    return document.querySelector('h3')?.textContent.includes('Qwen2.5-Coder 32B');
  });
  console.log('Modal visible 2.5s after click:', modalVisible);
  
  await browser.close();
})();
