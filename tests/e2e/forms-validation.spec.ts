import { test, expect } from '@playwright/test';
import { waitForAppReady, switchLanguage, dismissToasts, scrollToSection } from '../fixtures/helpers';

const uniqueId = () => `test_${Date.now()}_${Math.random().toString(36).substring(7)}`;

test.describe('Forms - Privacy and Newsletter Checkboxes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForAppReady(page);
    await dismissToasts(page);
  });

  test('For Business form - privacy checkbox validation shows error when not checked', async ({ page }) => {
    await scrollToSection(page, 'for-business');
    
    const testId = uniqueId();
    await page.getByTestId('contact-name-input').fill(`TEST_User_${testId}`);
    await page.getByTestId('contact-email-input').fill(`${testId}@example.com`);
    await page.getByTestId('contact-message-input').fill('Test message for API testing');
    
    // Don't check privacy checkbox
    await page.getByTestId('contact-submit-button').click();
    
    // Should show error toast for privacy
    const toast = page.locator('[data-sonner-toast]').first();
    await expect(toast).toContainText(/privacy|adatvédel|απόρρητ|privacy/i, { timeout: 5000 });
  });

  test('For Business form - successful submission with privacy checkbox checked', async ({ page }) => {
    await scrollToSection(page, 'for-business');
    
    const testId = uniqueId();
    await page.getByTestId('contact-name-input').fill(`TEST_User_${testId}`);
    await page.getByTestId('contact-email-input').fill(`${testId}@example.com`);
    await page.getByTestId('contact-company-input').fill('TEST_Company');
    await page.getByTestId('contact-message-input').fill('Test message for API testing');
    
    // Check privacy checkbox
    await page.getByTestId('privacy-checkbox').check();
    
    // Submit form
    await page.getByTestId('contact-submit-button').click();
    
    // Should show success toast
    const toast = page.locator('[data-sonner-toast]').first();
    await expect(toast).toContainText(/thank you|köszönjük|ευχαριστούμε|grazie/i, { timeout: 5000 });
  });

  test('For Business form - submission with newsletter checkbox checked', async ({ page }) => {
    await scrollToSection(page, 'for-business');
    
    const testId = uniqueId();
    await page.getByTestId('contact-name-input').fill(`TEST_User_${testId}`);
    await page.getByTestId('contact-email-input').fill(`${testId}@example.com`);
    await page.getByTestId('contact-message-input').fill('Test message with newsletter');
    
    // Check both checkboxes
    await page.getByTestId('privacy-checkbox').check();
    await page.getByTestId('newsletter-checkbox').check();
    
    // Submit form
    await page.getByTestId('contact-submit-button').click();
    
    // Should show success toast
    const toast = page.locator('[data-sonner-toast]').first();
    await expect(toast).toContainText(/thank you|köszönjük|ευχαριστούμε|grazie/i, { timeout: 5000 });
  });

  test('Workshop form - privacy checkbox validation shows error when not checked', async ({ page }) => {
    await scrollToSection(page, 'workshops');
    
    const testId = uniqueId();
    await page.getByTestId('workshop-name-input').fill(`TEST_User_${testId}`);
    await page.getByTestId('workshop-email-input').fill(`${testId}@example.com`);
    
    // Don't check privacy checkbox
    await page.getByTestId('workshop-submit-button').click();
    
    // Should show error toast
    const toast = page.locator('[data-sonner-toast]').first();
    await expect(toast).toContainText(/privacy|adatvédel|απόρρητ|privacy/i, { timeout: 5000 });
  });

  test('Workshop form - successful submission with privacy checkbox checked', async ({ page }) => {
    await scrollToSection(page, 'workshops');
    
    const testId = uniqueId();
    await page.getByTestId('workshop-name-input').fill(`TEST_User_${testId}`);
    await page.getByTestId('workshop-email-input').fill(`workshop_${testId}@example.com`);
    await page.getByTestId('workshop-phone-input').fill('+1234567890');
    await page.getByTestId('workshop-type-select').selectOption('intermediate');
    
    // Check privacy checkbox
    await page.getByTestId('workshop-privacy-checkbox').check();
    
    // Submit form
    await page.getByTestId('workshop-submit-button').click();
    
    // Should show success toast
    const toast = page.locator('[data-sonner-toast]').first();
    await expect(toast).toContainText(/success|sikeres|επιτυχ|completat/i, { timeout: 5000 });
  });

  test('Workshop form - submission with all workshop types', async ({ page }) => {
    await scrollToSection(page, 'workshops');
    
    const workshopTypes = ['beginner', 'intermediate', 'group', 'private'];
    
    for (const wtype of workshopTypes) {
      const testId = uniqueId();
      await page.getByTestId('workshop-name-input').fill(`TEST_User_${testId}`);
      await page.getByTestId('workshop-email-input').fill(`${wtype}_${testId}@example.com`);
      await page.getByTestId('workshop-type-select').selectOption(wtype);
      await page.getByTestId('workshop-privacy-checkbox').check();
      
      await page.getByTestId('workshop-submit-button').click();
      
      // Wait for success toast
      const toast = page.locator('[data-sonner-toast]').first();
      await expect(toast).toContainText(/success|sikeres|επιτυχ|completat/i, { timeout: 5000 });
      
      // Wait for form to reset
      await expect(page.getByTestId('workshop-name-input')).toHaveValue('', { timeout: 3000 });
    }
  });
});

test.describe('Footer - Newsletter Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForAppReady(page);
    await dismissToasts(page);
  });

  test('Footer should display correct translated content in English', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForLoadState('domcontentloaded');
    
    // Check footer elements
    await expect(page.getByTestId('footer-logo')).toBeVisible();
    await expect(page.getByTestId('footer-link-home')).toBeVisible();
    await expect(page.getByTestId('footer-link-shop')).toBeVisible();
    await expect(page.getByTestId('newsletter-email-input')).toBeVisible();
    await expect(page.getByTestId('footer-privacy-checkbox')).toBeVisible();
    await expect(page.getByTestId('newsletter-submit-button')).toHaveText(/subscribe/i);
    
    // Check email is correct in footer
    const contactEmail = page.locator('text=contact@fairygarden4u.com').first();
    await expect(contactEmail).toBeVisible();
  });

  test('Footer should display correct translated content in Hungarian', async ({ page }) => {
    await switchLanguage(page, 'hu');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    await expect(page.getByTestId('newsletter-submit-button')).toHaveText(/feliratkozás/i);
  });

  test('Footer newsletter - privacy checkbox validation shows error', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const testId = uniqueId();
    await page.getByTestId('newsletter-email-input').fill(`${testId}@example.com`);
    
    // Don't check privacy checkbox
    await page.getByTestId('newsletter-submit-button').click();
    
    // Should show error toast
    const toast = page.locator('[data-sonner-toast]').first();
    await expect(toast).toContainText(/privacy|adatvédel|απόρρητ|privacy/i, { timeout: 5000 });
  });

  test('Footer newsletter - successful subscription with privacy checkbox', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const testId = uniqueId();
    await page.getByTestId('newsletter-email-input').fill(`newsletter_${testId}@example.com`);
    await page.getByTestId('footer-privacy-checkbox').check();
    
    await page.getByTestId('newsletter-submit-button').click();
    
    // Should show success toast
    const toast = page.locator('[data-sonner-toast]').first();
    await expect(toast).toContainText(/thank you|köszönjük|ευχαριστούμε|grazie|subscribing/i, { timeout: 5000 });
  });

  test('Footer newsletter - duplicate subscription shows error', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const testId = uniqueId();
    const email = `dup_${testId}@example.com`;
    
    // First subscription
    await page.getByTestId('newsletter-email-input').fill(email);
    await page.getByTestId('footer-privacy-checkbox').check();
    await page.getByTestId('newsletter-submit-button').click();
    
    // Wait for first success
    const successToast = page.locator('[data-sonner-toast]').first();
    await expect(successToast).toContainText(/thank you|köszönjük|ευχαριστούμε|grazie|subscribing/i, { timeout: 5000 });
    
    // Wait for form to reset
    await expect(page.getByTestId('newsletter-email-input')).toHaveValue('', { timeout: 3000 });
    
    // Second subscription with same email
    await page.getByTestId('newsletter-email-input').fill(email);
    await page.getByTestId('footer-privacy-checkbox').check();
    await page.getByTestId('newsletter-submit-button').click();
    
    // Should show error toast about already subscribed
    const errorToast = page.locator('[data-sonner-toast]').nth(1);
    await expect(errorToast).toContainText(/already|már feliratkozott|ήδη|già/i, { timeout: 5000 });
  });
});
