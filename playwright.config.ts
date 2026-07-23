import { defineConfig, devices } from '@playwright/test';

const systemChromiumPath = process.env.BND_SYSTEM_CHROMIUM_PATH?.trim();

export default defineConfig({
  testDir: './src/tests',
  timeout: 45_000,
  expect: { timeout: 8_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  outputDir: 'test-results',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    colorScheme: 'dark',
    locale: 'ru-RU',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [{
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
      browserName: 'chromium',
      launchOptions: systemChromiumPath ? { executablePath: systemChromiumPath } : undefined,
    },
  }],
  webServer: {
    command: 'npm run dev -- --hostname 127.0.0.1',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
