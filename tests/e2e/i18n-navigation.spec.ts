import { test, expect } from '@playwright/test';
import { waitForAppReady, switchLanguage, scrollToSection, dismissToasts } from '../fixtures/helpers';

test.describe('Language Switching and Navigation i18n', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForAppReady(page);
    await dismissToasts(page);
  });

  test('should load homepage with English language by default', async ({ page }) => {
    // Check navigation links are in English
    await expect(page.getByTestId('nav-link-hero')).toHaveText('HOME');
    await expect(page.getByTestId('nav-link-gallery')).toHaveText('SHOP');
    await expect(page.getByTestId('nav-link-diy-kits')).toHaveText('DIY KITS');
    await expect(page.getByTestId('nav-link-for-business')).toHaveText('FOR BUSINESS');
    await expect(page.getByTestId('nav-link-workshops')).toHaveText('WORKSHOPS');
    await expect(page.getByTestId('nav-link-blog')).toHaveText('BLOG');
    await expect(page.getByTestId('nav-link-privacy-policy')).toHaveText('PRIVACY');
  });

  test('should switch to Hungarian language', async ({ page }) => {
    await switchLanguage(page, 'hu');
    
    // Check navigation links are in Hungarian
    await expect(page.getByTestId('nav-link-hero')).toHaveText('KEZDŐLAP');
    await expect(page.getByTestId('nav-link-gallery')).toHaveText('BOLT');
    await expect(page.getByTestId('nav-link-diy-kits')).toHaveText('BARKÁCS KÉSZLETEK');
    await expect(page.getByTestId('nav-link-for-business')).toHaveText('VÁLLALKOZÁSOKNAK');
    await expect(page.getByTestId('nav-link-workshops')).toHaveText('WORKSHOPOK');
    await expect(page.getByTestId('nav-link-blog')).toHaveText('BLOG');
    await expect(page.getByTestId('nav-link-privacy-policy')).toHaveText('ADATVÉDELEM');
  });

  test('should switch to Greek language', async ({ page }) => {
    await switchLanguage(page, 'el');
    
    // Check navigation links are in Greek
    await expect(page.getByTestId('nav-link-hero')).toHaveText('ΑΡΧΙΚΉ');
    await expect(page.getByTestId('nav-link-gallery')).toHaveText('ΚΑΤΆΣΤΗΜΑ');
    await expect(page.getByTestId('nav-link-diy-kits')).toHaveText('DIY ΣΕΤ');
    await expect(page.getByTestId('nav-link-for-business')).toHaveText('ΓΙΑ ΕΠΙΧΕΙΡΉΣΕΙΣ');
    await expect(page.getByTestId('nav-link-workshops')).toHaveText('ΕΡΓΑΣΤΉΡΙΑ');
    await expect(page.getByTestId('nav-link-blog')).toHaveText('BLOG');
    await expect(page.getByTestId('nav-link-privacy-policy')).toHaveText('ΑΠΌΡΡΗΤΟ');
  });

  test('should switch to Italian language', async ({ page }) => {
    await switchLanguage(page, 'it');
    
    // Check navigation links are in Italian
    await expect(page.getByTestId('nav-link-hero')).toHaveText('HOME');
    await expect(page.getByTestId('nav-link-gallery')).toHaveText('NEGOZIO');
    await expect(page.getByTestId('nav-link-diy-kits')).toHaveText('KIT FAI DA TE');
    await expect(page.getByTestId('nav-link-for-business')).toHaveText('PER AZIENDE');
    await expect(page.getByTestId('nav-link-workshops')).toHaveText('WORKSHOP');
    await expect(page.getByTestId('nav-link-blog')).toHaveText('BLOG');
    await expect(page.getByTestId('nav-link-privacy-policy')).toHaveText('PRIVACY');
  });

  test('should switch language in sequence EN -> HU -> EL -> IT -> EN', async ({ page }) => {
    // Start with English
    await expect(page.getByTestId('nav-link-hero')).toHaveText('HOME');
    
    // Switch to Hungarian
    await switchLanguage(page, 'hu');
    await expect(page.getByTestId('nav-link-hero')).toHaveText('KEZDŐLAP');
    
    // Switch to Greek
    await switchLanguage(page, 'el');
    await expect(page.getByTestId('nav-link-hero')).toHaveText('ΑΡΧΙΚΉ');
    
    // Switch to Italian
    await switchLanguage(page, 'it');
    await expect(page.getByTestId('nav-link-hero')).toHaveText('HOME');
    
    // Back to English
    await switchLanguage(page, 'en');
    await expect(page.getByTestId('nav-link-hero')).toHaveText('HOME');
    await expect(page.getByTestId('nav-link-gallery')).toHaveText('SHOP');
  });

  test('should display language switcher dropdown with all 4 languages', async ({ page }) => {
    await page.getByTestId('language-switcher-button').click();
    
    // Check all language options are visible
    await expect(page.getByTestId('language-option-en')).toBeVisible();
    await expect(page.getByTestId('language-option-hu')).toBeVisible();
    await expect(page.getByTestId('language-option-el')).toBeVisible();
    await expect(page.getByTestId('language-option-it')).toBeVisible();
    
    // Check language names
    await expect(page.getByTestId('language-option-en')).toContainText('English');
    await expect(page.getByTestId('language-option-hu')).toContainText('Magyar');
    await expect(page.getByTestId('language-option-el')).toContainText('Ελληνικά');
    await expect(page.getByTestId('language-option-it')).toContainText('Italiano');
  });
});
