import { Page, expect } from '@playwright/test';

export async function waitForAppReady(page: Page) {
  await page.waitForLoadState('domcontentloaded');
}

export async function dismissToasts(page: Page) {
  await page.addLocatorHandler(
    page.locator('[data-sonner-toast], .Toastify__toast, [role="status"].toast, .MuiSnackbar-root'),
    async () => {
      const close = page.locator('[data-sonner-toast] [data-close], [data-sonner-toast] button[aria-label="Close"], .Toastify__close-button, .MuiSnackbar-root button');
      await close.first().click({ timeout: 2000 }).catch(() => {});
    },
    { times: 10, noWaitAfter: true }
  );
}

export async function checkForErrors(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const errorElements = Array.from(
      document.querySelectorAll('.error, [class*="error"], [id*="error"]')
    );
    return errorElements.map(el => el.textContent || '').filter(Boolean);
  });
}

export async function switchLanguage(page: Page, languageCode: string) {
  // Use first() since there may be desktop and mobile language switchers
  await page.getByTestId('language-switcher-button').first().click();
  await page.getByTestId(`language-option-${languageCode}`).first().click();
  // Wait for language change to take effect
  await page.waitForLoadState('domcontentloaded');
}

export async function scrollToSection(page: Page, sectionId: string) {
  await page.evaluate((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, sectionId);
  // Wait for scroll to complete
  await page.waitForLoadState('domcontentloaded');
}
