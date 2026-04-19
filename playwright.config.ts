import { defineConfig, devices } from '@playwright/test';
import { env } from './utils/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: env.baseUrl,
    headless: true,
    viewport: { width: 1440, height: 900 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on',
  },
  projects: [
    {
      name: 'chromium',
      testMatch: /(login|cart)\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testMatch: /.*\.firefox\.spec\.ts/,
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
