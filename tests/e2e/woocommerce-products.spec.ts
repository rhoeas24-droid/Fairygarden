import { test, expect } from '@playwright/test';

test.describe('WooCommerce E-commerce Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Accept cookies if modal appears
    const acceptButton = page.getByText('ACCEPT ALL');
    if (await acceptButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await acceptButton.click();
    }
  });

  test('homepage loads with gallery section', async ({ page }) => {
    await expect(page.getByTestId('gallery-title')).toBeVisible({ timeout: 10000 });
    await expect(page.getByTestId('gallery-title')).toHaveText(/Enchanted Florariums/i);
  });

  test('ready florariums display from WooCommerce', async ({ page }) => {
    // Scroll to gallery section
    await page.evaluate(() => {
      const gallery = document.getElementById('gallery');
      if (gallery) gallery.scrollIntoView({ behavior: 'instant' });
    });
    
    // Wait for at least one product card to be visible (products loaded)
    const productCards = page.locator('[data-testid^="product-card-"]');
    await expect(productCards.first()).toBeVisible({ timeout: 15000 });
    
    // Verify product has name and price
    const firstProductId = await productCards.first().getAttribute('data-testid');
    const id = firstProductId?.replace('product-card-', '');
    if (id) {
      await expect(page.getByTestId(`product-name-${id}`)).toBeVisible();
      await expect(page.getByTestId(`product-price-${id}`)).toBeVisible();
      
      // Price should contain Euro symbol
      await expect(page.getByTestId(`product-price-${id}`)).toContainText('€');
    }
  });

  test('DIY kits section displays correctly', async ({ page }) => {
    // Scroll to DIY kits section
    await page.evaluate(() => {
      const diy = document.getElementById('diy-kits');
      if (diy) diy.scrollIntoView({ behavior: 'instant' });
    });
    
    // Verify DIY kits title
    await expect(page.getByTestId('diy-kits-title')).toBeVisible({ timeout: 10000 });
    
    // Scroll down to see products
    await page.evaluate(() => window.scrollBy(0, 500));
    
    // Verify at least one DIY product is visible
    const diyProducts = page.locator('[data-testid^="diy-product-"]');
    await expect(diyProducts.first()).toBeVisible({ timeout: 15000 });
  });

  test('DIY kit prices display correctly (no 0.85 multiplier bug)', async ({ page }) => {
    // Scroll to DIY kits section
    await page.evaluate(() => {
      const diy = document.getElementById('diy-kits');
      if (diy) diy.scrollIntoView({ behavior: 'instant' });
    });
    
    // Wait for DIY kits title first
    await expect(page.getByTestId('diy-kits-title')).toBeVisible({ timeout: 10000 });
    
    // Scroll down to see products
    await page.evaluate(() => window.scrollBy(0, 500));
    
    // Wait for DIY product cards to load
    const diyProducts = page.locator('[data-testid^="diy-product-"]');
    await expect(diyProducts.first()).toBeVisible({ timeout: 15000 });
    
    // Check DIY Starter Kit shows correct price €34.99
    const starterKitCard = page.locator('[data-testid="diy-product-36"]');
    await expect(starterKitCard).toBeVisible({ timeout: 10000 });
    await expect(starterKitCard).toContainText('€34.99');
  });

  test('custom terrarium card is visible', async ({ page }) => {
    // Scroll to gallery section
    await page.evaluate(() => {
      const gallery = document.getElementById('gallery');
      if (gallery) gallery.scrollIntoView({ behavior: 'instant' });
    });
    
    // Custom terrarium card should be visible
    await expect(page.getByTestId('custom-terrarium-card')).toBeVisible({ timeout: 15000 });
  });
});
