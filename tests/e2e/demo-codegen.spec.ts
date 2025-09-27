import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

// go to product page (Campaign by Product Base)
  await page.goto('https://staging-tib.myshopify.com/en-vn/products/camp-by-product-base');

// personalize form (upload photo + input text) + ATC
  await page.locator('.tee-photo-placeholder').click();
  await page.locator('#tee-photo-layer-739662').setInputFiles('tests/data/1-dog.jpeg');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('#layer-734443').click();
  await page.locator('#layer-734443').fill('Linh checks demo playwright codegen');
  await page.getByRole('button', { name: 'ATC - config' }).click();
  await page.getByRole('link', { name: 'View cart' }).click();

  // view cart and check customization id 
  await expect(page.locator('#CartSection')).toContainText('Camp by product base');
});