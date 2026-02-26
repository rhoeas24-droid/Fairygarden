import { test, expect } from '@playwright/test';
import { waitForAppReady, dismissToasts, scrollToSection } from '../fixtures/helpers';

const uniqueId = () => `test_${Date.now()}_${Math.random().toString(36).substring(7)}`;

test.describe('For Business Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForAppReady(page);
    await dismissToasts(page);
    await scrollToSection(page, 'for-business');
  });

  test('should display privacy and newsletter checkboxes', async ({ page }) => {
    await expect(page.getByTestId('privacy-checkbox')).toBeVisible();
    await expect(page.getByTestId('newsletter-checkbox')).toBeVisible();
  });

  test('should submit successfully with privacy checkbox checked', async ({ page }) => {
    const testId = uniqueId();
    await page.getByTestId('contact-name-input').fill(`TEST_User_${testId}`);
    await page.getByTestId('contact-email-input').fill(`${testId}@example.com`);
    await page.getByTestId('contact-message-input').fill('Test message');
    
    await page.getByTestId('privacy-checkbox').check({ force: true });
    await page.getByTestId('contact-submit-button').click({ force: true });
    
    // Should show success toast
    const toast = page.locator('[data-sonner-toast]').first();
    await expect(toast).toContainText(/thank you|köszönjük|ευχαριστούμε|grazie/i, { timeout: 10000 });
  });

  test('should verify email address is contact@fairygarden4u.com', async ({ page }) => {
    const emailText = page.locator('text=contact@fairygarden4u.com').first();
    await expect(emailText).toBeVisible();
  });
});

test.describe('Workshop Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForAppReady(page);
    await dismissToasts(page);
    await scrollToSection(page, 'workshops');
  });

  test('should display privacy and newsletter checkboxes', async ({ page }) => {
    await expect(page.getByTestId('workshop-privacy-checkbox')).toBeVisible();
    await expect(page.getByTestId('workshop-newsletter-checkbox')).toBeVisible();
  });

  test('should submit successfully with privacy checkbox checked', async ({ page }) => {
    const testId = uniqueId();
    await page.getByTestId('workshop-name-input').fill(`TEST_User_${testId}`);
    await page.getByTestId('workshop-email-input').fill(`workshop_${testId}@example.com`);
    await page.getByTestId('workshop-type-select').selectOption('beginner');
    
    // Use force to bypass any overlay issues
    await page.getByTestId('workshop-privacy-checkbox').check({ force: true });
    await page.getByTestId('workshop-submit-button').click({ force: true });
    
    // Should show success toast
    const toast = page.locator('[data-sonner-toast]').first();
    await expect(toast).toContainText(/success|sikeres|επιτυχ|completat/i, { timeout: 10000 });
  });

  test('should display all workshop types in dropdown', async ({ page }) => {
    const dropdown = page.getByTestId('workshop-type-select');
    await expect(dropdown.locator('option[value="beginner"]')).toBeAttached();
    await expect(dropdown.locator('option[value="intermediate"]')).toBeAttached();
    await expect(dropdown.locator('option[value="group"]')).toBeAttached();
    await expect(dropdown.locator('option[value="private"]')).toBeAttached();
  });
});

test.describe('Footer Newsletter Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForAppReady(page);
    await dismissToasts(page);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  });

  test('should show footer with correct email and elements', async ({ page }) => {
    const contactEmail = page.locator('text=contact@fairygarden4u.com').first();
    await expect(contactEmail).toBeVisible();
    await expect(page.getByTestId('footer-logo')).toBeVisible();
    await expect(page.getByTestId('newsletter-email-input')).toBeVisible();
    await expect(page.getByTestId('footer-privacy-checkbox')).toBeVisible();
    await expect(page.getByTestId('newsletter-submit-button')).toBeVisible();
  });

  test('should subscribe successfully with privacy checkbox', async ({ page }) => {
    const testId = uniqueId();
    await page.getByTestId('newsletter-email-input').fill(`newsletter_${testId}@example.com`);
    await page.getByTestId('footer-privacy-checkbox').check({ force: true });
    await page.getByTestId('newsletter-submit-button').click({ force: true });
    
    // Should show success toast
    const toast = page.locator('[data-sonner-toast]').first();
    await expect(toast).toContainText(/thank you|köszönjük|ευχαριστούμε|grazie|subscribing/i, { timeout: 10000 });
  });
});
