import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '/app/tests/e2e',
  outputDir: '/root/.emergent/automation_output/20260302_174902/test-results',
  timeout: 60000,
  retries: 0,
  workers: 1,
  reporter: [
    ['line'],
    ['json', { outputFile: '/root/.emergent/automation_output/20260302_174902/results.json' }],
  ],
  use: {
    baseURL: 'https://corporate-build.preview.emergentagent.com',
    screenshot: 'only-on-failure',
    trace: 'off',
    headless: true,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
