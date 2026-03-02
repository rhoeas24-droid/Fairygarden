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

test.describe('File-Based Cache API Tests', () => {
  test('cache status endpoint returns file-based cache info', async ({ request }) => {
    const response = await request.get('/api/wc/cache/status');
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.cache_type).toBe('file');
    expect(data.cache_dir).toContain('product_cache');
    expect(data.entries).toBeInstanceOf(Array);
    expect(data.entries.length).toBeGreaterThan(0);
    
    // Verify entry structure
    const entry = data.entries[0];
    expect(entry).toHaveProperty('file');
    expect(entry).toHaveProperty('count');
    expect(entry).toHaveProperty('size_bytes');
    expect(entry).toHaveProperty('modified');
  });

  test('products endpoint returns products from file cache (not empty)', async ({ request }) => {
    const response = await request.get('/api/wc/products?lang=en');
    expect(response.ok()).toBeTruthy();
    
    const products = await response.json();
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBeGreaterThan(0);
    
    // Verify product structure
    const product = products[0];
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('image');
    expect(product).toHaveProperty('category');
  });

  test('Greek products load from file cache', async ({ request }) => {
    const response = await request.get('/api/wc/products?lang=el');
    expect(response.ok()).toBeTruthy();
    
    const products = await response.json();
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('name');
    expect(products[0].price).toBeGreaterThan(0);
  });

  test('ready-florarium filter returns products', async ({ request }) => {
    const response = await request.get('/api/wc/products?lang=en&product_type=ready-florarium');
    expect(response.ok()).toBeTruthy();
    
    const products = await response.json();
    expect(products.length).toBeGreaterThan(0);
  });

  test('diy-kit filter returns products', async ({ request }) => {
    const response = await request.get('/api/wc/products?lang=en&product_type=diy-kit');
    expect(response.ok()).toBeTruthy();
    
    const products = await response.json();
    expect(products.length).toBeGreaterThan(0);
  });
});
