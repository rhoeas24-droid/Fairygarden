import { test, expect } from '@playwright/test';
import { waitForAppReady, switchLanguage, dismissToasts, scrollToSection } from '../fixtures/helpers';

test.describe('Cart Drawer Translations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForAppReady(page);
    await dismissToasts(page);
  });

  test('should display cart drawer in English', async ({ page }) => {
    await page.getByTestId('cart-button').click();
    
    await expect(page.getByTestId('cart-drawer-title')).toHaveText(/Your Cart/i);
    await expect(page.getByTestId('empty-cart-message')).toHaveText(/Your cart is empty/i);
  });

  test('should display cart drawer in Hungarian', async ({ page }) => {
    await switchLanguage(page, 'hu');
    await page.getByTestId('cart-button').click();
    
    await expect(page.getByTestId('cart-drawer-title')).toHaveText(/Kosarad/i);
    await expect(page.getByTestId('empty-cart-message')).toHaveText(/A kosarad üres/i);
  });

  test('should display cart drawer in Greek', async ({ page }) => {
    await switchLanguage(page, 'el');
    await page.getByTestId('cart-button').click();
    
    await expect(page.getByTestId('cart-drawer-title')).toHaveText(/Το Καλάθι σας/i);
    await expect(page.getByTestId('empty-cart-message')).toHaveText(/Το καλάθι σας είναι άδειο/i);
  });

  test('should display cart drawer in Italian', async ({ page }) => {
    await switchLanguage(page, 'it');
    await page.getByTestId('cart-button').click();
    
    await expect(page.getByTestId('cart-drawer-title')).toHaveText(/Il Tuo Carrello/i);
    await expect(page.getByTestId('empty-cart-message')).toHaveText(/Il tuo carrello è vuoto/i);
  });

  test('should close cart drawer', async ({ page }) => {
    await page.getByTestId('cart-button').click();
    await expect(page.getByTestId('cart-drawer-title')).toBeVisible();
    
    await page.getByTestId('close-cart-button').click();
    await expect(page.getByTestId('cart-drawer-title')).not.toBeVisible();
  });
});

test.describe('Footer Translations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForAppReady(page);
    await dismissToasts(page);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  });

  test('should display footer in English', async ({ page }) => {
    await expect(page.getByTestId('newsletter-submit-button')).toHaveText(/subscribe/i);
    await expect(page.locator('text=Quick Links').first()).toBeVisible();
  });

  test('should display footer in Hungarian', async ({ page }) => {
    await switchLanguage(page, 'hu');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    await expect(page.getByTestId('newsletter-submit-button')).toHaveText(/feliratkozás/i);
    await expect(page.locator('text=Gyors Linkek').first()).toBeVisible();
  });

  test('should display footer in Greek', async ({ page }) => {
    await switchLanguage(page, 'el');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    await expect(page.getByTestId('newsletter-submit-button')).toHaveText(/εγγραφή/i);
    await expect(page.locator('text=Γρήγοροι Σύνδεσμοι').first()).toBeVisible();
  });

  test('should display footer in Italian', async ({ page }) => {
    await switchLanguage(page, 'it');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    await expect(page.getByTestId('newsletter-submit-button')).toHaveText(/iscriviti/i);
    await expect(page.locator('text=Link Rapidi').first()).toBeVisible();
  });
});
