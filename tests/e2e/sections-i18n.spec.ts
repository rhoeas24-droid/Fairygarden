import { test, expect } from '@playwright/test';
import { waitForAppReady, switchLanguage, dismissToasts, scrollToSection } from '../fixtures/helpers';

test.describe('Section Translations (DIY Kits, For Business, Workshops, Blog)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForAppReady(page);
    await dismissToasts(page);
  });

  test('DIY Kits section should be translated in English', async ({ page }) => {
    await scrollToSection(page, 'diy-kits');
    await expect(page.getByTestId('diy-kits-title')).toHaveText(/Create Your Own Magic/i);
    await expect(page.getByTestId('shop-diy-kits-button')).toBeVisible();
    await expect(page.getByTestId('shop-diy-kits-button')).toHaveText(/Shop DIY Kits/i);
  });

  test('DIY Kits section should be translated in Hungarian', async ({ page }) => {
    await switchLanguage(page, 'hu');
    await scrollToSection(page, 'diy-kits');
    await expect(page.getByTestId('diy-kits-title')).toHaveText(/Alkoss Saját Varázslatot/i);
    await expect(page.getByTestId('shop-diy-kits-button')).toHaveText(/Barkács Készletek/i);
  });

  test('For Business section should be translated in English', async ({ page }) => {
    await scrollToSection(page, 'for-business');
    await expect(page.getByTestId('for-business-title')).toHaveText(/For Business/i);
    
    // Check email address is correct
    const emailText = await page.locator('text=contact@fairygarden4u.com').first();
    await expect(emailText).toBeVisible();
    
    // Check form elements
    await expect(page.getByTestId('contact-name-input')).toBeVisible();
    await expect(page.getByTestId('contact-email-input')).toBeVisible();
    await expect(page.getByTestId('contact-company-input')).toBeVisible();
    await expect(page.getByTestId('contact-message-input')).toBeVisible();
    await expect(page.getByTestId('privacy-checkbox')).toBeVisible();
    await expect(page.getByTestId('newsletter-checkbox')).toBeVisible();
    await expect(page.getByTestId('contact-submit-button')).toHaveText(/Send Inquiry/i);
  });

  test('For Business section should be translated in Hungarian', async ({ page }) => {
    await switchLanguage(page, 'hu');
    await scrollToSection(page, 'for-business');
    await expect(page.getByTestId('for-business-title')).toHaveText(/Vállalkozásoknak/i);
    await expect(page.getByTestId('contact-submit-button')).toHaveText(/Üzenet Küldése/i);
  });

  test('Workshops section should be translated in English', async ({ page }) => {
    await scrollToSection(page, 'workshops');
    await expect(page.getByTestId('workshops-title')).toHaveText(/Terrarium Workshops/i);
    
    // Check form elements
    await expect(page.getByTestId('workshop-name-input')).toBeVisible();
    await expect(page.getByTestId('workshop-email-input')).toBeVisible();
    await expect(page.getByTestId('workshop-phone-input')).toBeVisible();
    await expect(page.getByTestId('workshop-type-select')).toBeVisible();
    await expect(page.getByTestId('workshop-privacy-checkbox')).toBeVisible();
    await expect(page.getByTestId('workshop-newsletter-checkbox')).toBeVisible();
    await expect(page.getByTestId('workshop-submit-button')).toHaveText(/Register Now/i);
    
    // Check workshop types in dropdown
    const dropdown = page.getByTestId('workshop-type-select');
    await expect(dropdown.locator('option[value="beginner"]')).toHaveText(/Beginner - Introduction to Terrariums/i);
    await expect(dropdown.locator('option[value="intermediate"]')).toHaveText(/Intermediate - Advanced Techniques/i);
    await expect(dropdown.locator('option[value="group"]')).toHaveText(/Group\/Corporate - Team Building/i);
    await expect(dropdown.locator('option[value="private"]')).toHaveText(/Private - One-on-One Session/i);
  });

  test('Workshops section should be translated in Hungarian', async ({ page }) => {
    await switchLanguage(page, 'hu');
    await scrollToSection(page, 'workshops');
    await expect(page.getByTestId('workshops-title')).toHaveText(/Terrárium Workshopok/i);
    await expect(page.getByTestId('workshop-submit-button')).toHaveText(/Jelentkezés/i);
    
    // Check workshop types in dropdown
    const dropdown = page.getByTestId('workshop-type-select');
    await expect(dropdown.locator('option[value="beginner"]')).toHaveText(/Kezdő - Bevezetés a Terráriumokba/i);
  });

  test('Blog section should be translated in English', async ({ page }) => {
    await scrollToSection(page, 'blog');
    await expect(page.getByTestId('blog-title')).toHaveText(/From Our Garden/i);
  });

  test('Blog section should be translated in Hungarian', async ({ page }) => {
    await switchLanguage(page, 'hu');
    await scrollToSection(page, 'blog');
    await expect(page.getByTestId('blog-title')).toHaveText(/Kertünkből/i);
  });
});
