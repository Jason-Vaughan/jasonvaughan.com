import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER:', msg.text()));
  
  await page.goto('http://localhost:3301');
  
  // Wait for Infrastructure section to be ready
  await page.waitForSelector('#infrastructure');
  
  // Click the drawer to open it
  console.log('Clicking drawer toggle...');
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('div')).find(el => el.textContent.includes('✨ AI Models Evaluated'));
    if (el) el.click();
  });
  
  // Wait for drawer to open
  await page.waitForTimeout(1000);
  
  // Click the first model card
  console.log('Clicking first model card...');
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('div')).find(el => el.textContent.includes('Qwen2.5-Coder 32B'));
    if (el) el.click();
  });
  
  await page.waitForTimeout(500);
  
  // Check if modal is visible
  const modalVisible = await page.evaluate(() => {
    const h3 = Array.from(document.querySelectorAll('h3')).find(el => el.textContent.includes('Qwen2.5-Coder 32B'));
    return h3 !== undefined;
  });
  
  console.log('Modal visible after 500ms:', modalVisible);
  
  await page.waitForTimeout(2000);
  
  const modalVisibleAfter2s = await page.evaluate(() => {
    const h3 = Array.from(document.querySelectorAll('h3')).find(el => el.textContent.includes('Qwen2.5-Coder 32B'));
    return h3 !== undefined;
  });
  
  console.log('Modal visible after 2s:', modalVisibleAfter2s);
  
  await browser.close();
})();
