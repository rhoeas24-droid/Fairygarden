import { test, expect } from '@playwright/test';
import { waitForAppReady, switchLanguage, dismissToasts } from '../fixtures/helpers';

test.describe('Language Switching and Navigation i18n', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForAppReady(page);
    await dismissToasts(page);
  });

  test('should load homepage with English language by default', async ({ page }) => {
    // Check navigation links are in English (using case-insensitive regex due to CSS text-transform: uppercase)
    await expect(page.getByTestId('nav-link-hero')).toHaveText(/home/i);
    await expect(page.getByTestId('nav-link-gallery')).toHaveText(/shop/i);
    await expect(page.getByTestId('nav-link-diy-kits')).toHaveText(/diy kits/i);
    await expect(page.getByTestId('nav-link-for-business')).toHaveText(/for business/i);
    await expect(page.getByTestId('nav-link-workshops')).toHaveText(/workshops/i);
    await expect(page.getByTestId('nav-link-blog')).toHaveText(/blog/i);
    await expect(page.getByTestId('nav-link-privacy-policy')).toHaveText(/privacy/i);
  });

  test('should switch to Hungarian language', async ({ page }) => {
    await switchLanguage(page, 'hu');
    
    // Check navigation links are in Hungarian
    await expect(page.getByTestId('nav-link-hero')).toHaveText(/kezdőlap/i);
    await expect(page.getByTestId('nav-link-gallery')).toHaveText(/bolt/i);
    await expect(page.getByTestId('nav-link-diy-kits')).toHaveText(/barkács készletek/i);
    await expect(page.getByTestId('nav-link-for-business')).toHaveText(/vállalkozásoknak/i);
    await expect(page.getByTestId('nav-link-workshops')).toHaveText(/workshopok/i);
    await expect(page.getByTestId('nav-link-blog')).toHaveText(/blog/i);
    await expect(page.getByTestId('nav-link-privacy-policy')).toHaveText(/adatvédelem/i);
  });

  test('should switch to Greek language', async ({ page }) => {
    await switchLanguage(page, 'el');
    
    // Check navigation links are in Greek
    await expect(page.getByTestId('nav-link-hero')).toHaveText(/αρχική/i);
    await expect(page.getByTestId('nav-link-gallery')).toHaveText(/κατάστημα/i);
    await expect(page.getByTestId('nav-link-diy-kits')).toHaveText(/diy σετ/i);
    await expect(page.getByTestId('nav-link-for-business')).toHaveText(/για επιχειρήσεις/i);
    await expect(page.getByTestId('nav-link-workshops')).toHaveText(/εργαστήρια/i);
    await expect(page.getByTestId('nav-link-blog')).toHaveText(/blog/i);
    await expect(page.getByTestId('nav-link-privacy-policy')).toHaveText(/απόρρητο/i);
  });

  test('should switch to Italian language', async ({ page }) => {
    await switchLanguage(page, 'it');
    
    // Check navigation links are in Italian
    await expect(page.getByTestId('nav-link-hero')).toHaveText(/home/i);
    await expect(page.getByTestId('nav-link-gallery')).toHaveText(/negozio/i);
    await expect(page.getByTestId('nav-link-diy-kits')).toHaveText(/kit fai da te/i);
    await expect(page.getByTestId('nav-link-for-business')).toHaveText(/per aziende/i);
    await expect(page.getByTestId('nav-link-workshops')).toHaveText(/workshop/i);
    await expect(page.getByTestId('nav-link-blog')).toHaveText(/blog/i);
    await expect(page.getByTestId('nav-link-privacy-policy')).toHaveText(/privacy/i);
  });

  test('should display language switcher dropdown with all 4 languages', async ({ page }) => {
    await page.getByTestId('language-switcher-button').first().click();
    
    // Check all language options are visible
    await expect(page.getByTestId('language-option-en').first()).toBeVisible();
    await expect(page.getByTestId('language-option-hu').first()).toBeVisible();
    await expect(page.getByTestId('language-option-el').first()).toBeVisible();
    await expect(page.getByTestId('language-option-it').first()).toBeVisible();
    
    // Check language names
    await expect(page.getByTestId('language-option-en').first()).toContainText('English');
    await expect(page.getByTestId('language-option-hu').first()).toContainText('Magyar');
    await expect(page.getByTestId('language-option-el').first()).toContainText('Ελληνικά');
    await expect(page.getByTestId('language-option-it').first()).toContainText('Italiano');
  });
});
