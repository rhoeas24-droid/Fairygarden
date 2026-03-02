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
    // Wait for products to load from WooCommerce API
    await page.waitForResponse(resp => 
      resp.url().includes('/api/wc/products') && 
      resp.url().includes('product_type=ready-florarium') &&
      resp.status() === 200
    );
    
    // Scroll to gallery section
    await page.evaluate(() => {
      const gallery = document.getElementById('gallery');
      if (gallery) gallery.scrollIntoView({ behavior: 'instant' });
    });
    
    // Verify at least one product card is visible
    const productCards = page.locator('[data-testid^="product-card-"]');
    await expect(productCards.first()).toBeVisible({ timeout: 10000 });
    
    // Verify product has name and price
    const firstProductId = await productCards.first().getAttribute('data-testid');
    const id = firstProductId?.replace('product-card-', '');
    if (id) {
      await expect(page.getByTestId(`product-name-${id}`)).toBeVisible();
      await expect(page.getByTestId(`product-price-${id}`)).toBeVisible();
    }
  });

  test('DIY kits section displays correctly', async ({ page }) => {
    // Scroll to DIY kits section
    await page.evaluate(() => {
      const diy = document.getElementById('diy-kits');
      if (diy) diy.scrollIntoView({ behavior: 'instant' });
    });
    
    // Wait for DIY kits API call
    await page.waitForResponse(resp => 
      resp.url().includes('/api/wc/products') && 
      resp.url().includes('product_type=diy-kit') &&
      resp.status() === 200
    );
    
    // Verify DIY kits title
    await expect(page.getByTestId('diy-kits-title')).toBeVisible({ timeout: 10000 });
    
    // Verify at least one DIY product is visible
    const diyProducts = page.locator('[data-testid^="diy-product-"]');
    await expect(diyProducts.first()).toBeVisible({ timeout: 10000 });
  });

  test('DIY kit prices display correctly (no 0.85 multiplier bug)', async ({ page }) => {
    // Scroll to DIY kits section
    await page.evaluate(() => {
      const diy = document.getElementById('diy-kits');
      if (diy) diy.scrollIntoView({ behavior: 'instant' });
    });
    
    // Wait for products
    await page.waitForResponse(resp => 
      resp.url().includes('/api/wc/products') && 
      resp.url().includes('product_type=diy-kit') &&
      resp.status() === 200
    );
    
    // Scroll down to see products
    await page.evaluate(() => window.scrollBy(0, 500));
    
    // Check that DIY Starter Kit shows €34.99 (not 0.85 of some base price)
    const starterKitPrice = page.locator('[data-testid^="diy-product-36"]').locator('text=€34.99');
    await expect(starterKitPrice).toBeVisible({ timeout: 5000 });
  });
});
