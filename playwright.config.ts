import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.BASE_URL || 'https://example.com';

export default defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  retries: 1,
  reporter: [['line'], ['html']], // báo cáo HTML sẽ nằm ở playwright-report
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } }
    // có thể bật WebKit sau nếu cần: { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});
