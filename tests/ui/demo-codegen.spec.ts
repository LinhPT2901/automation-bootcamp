import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

// go to product page (Campaign by Product Base)
  await page.goto('https://staging-tib.myshopify.com/en-vn/products/camp-by-product-base?variant=40234304503880');

// personalize form (upload photo + input text) + ATC

  // await page.locator('.tee-photo-placeholder').click();
  // await page.locator('#tee-photo-layer-739662').setInputFiles('tests/data/files/1-dog.jpeg');
  // await page.locator('.vm--modal .tee-btn--primary').click();

  await page.locator('#layer-734443').fill('Linh checks demo playwright codegen');
  await page.locator('#teeAtcButton').click();
  await page.getByRole('link', { name: 'View cart' }).click();

  // view cart and check customization id 
  await expect(page.locator('.tee-preview-button')).toBeVisible;

  // view customization data in LS
  

  // Get teeinblue-customizations from LS
  const raw = await page.evaluate(() => localStorage.getItem('teeinblue-customizations'));
  const actual = raw ? JSON.parse(raw) : null;
  
  const items: Array<{
    productId: string;
    customization: Record<string, string>;
    timestamp: number;
  }> = actual;

  // assert each field
  expect(items[0].productId).toBe('6850819293256');
  expect(items[0].customization['541691']).toBe('template-914261');
  expect(items[0].customization['layer-734443']).toBe('Linh checks demo playwright codegen');
  expect(items[0].customization.platform_linked_id).toBe('40234304503880');
});