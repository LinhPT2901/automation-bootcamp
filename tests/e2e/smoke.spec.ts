import { test, expect } from '@playwright/test';

test('home page loads (title & heading)', async ({ page }) => {
  await page.goto('/');                                 // dùng baseURL từ config
  await expect(page).toHaveTitle(/Example Domain/i);    // title của example.com

  const h1 = page.locator('h1');
  await expect(h1).toHaveText(/Example Domain/i);       // xác nhận heading chính
});
