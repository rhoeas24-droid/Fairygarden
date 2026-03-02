import { test, expect } from '@playwright/test';

test.describe('Cart and Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Accept cookies if modal appears
    const acceptButton = page.getByText('ACCEPT ALL');
    if (await acceptButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await acceptButton.click();
    }
    
    // Set unique session ID for test isolation
    const uniqueSession = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await page.evaluate((session) => {
      localStorage.setItem('sessionId', session);
    }, uniqueSession);
  });

  test('cart drawer opens when clicking cart icon', async ({ page }) => {
    // Click cart icon in header
    const cartIcon = page.locator('nav').getByRole('button').filter({ has: page.locator('svg') }).last();
    await cartIcon.click();
    
    // Verify cart drawer opens
    await expect(page.getByTestId('cart-drawer-title')).toBeVisible({ timeout: 5000 });
  });

  test('empty cart shows empty message', async ({ page }) => {
    // Open cart
    const cartIcon = page.locator('nav').getByRole('button').filter({ has: page.locator('svg') }).last();
    await cartIcon.click();
    
    // Verify empty cart message
    await expect(page.getByTestId('empty-cart-message')).toBeVisible({ timeout: 5000 });
  });

  test('add product to cart from gallery', async ({ page }) => {
    // Scroll to gallery
    await page.evaluate(() => {
      const gallery = document.getElementById('gallery');
      if (gallery) gallery.scrollIntoView({ behavior: 'instant' });
    });
    
    // Find first add to cart button
    const addToCartButtons = page.locator('[data-testid^="add-to-cart-"]');
    await expect(addToCartButtons.first()).toBeVisible({ timeout: 15000 });
    
    // Click add to cart
    await addToCartButtons.first().click();
    
    // Verify cart drawer opens with item
    await expect(page.getByTestId('cart-drawer-title')).toBeVisible({ timeout: 5000 });
    
    // Cart should have at least one item
    const cartItems = page.locator('[data-testid^="cart-item-"]');
    await expect(cartItems.first()).toBeVisible({ timeout: 5000 });
  });

  test('add DIY kit to cart', async ({ page }) => {
    // Scroll to DIY kits section
    await page.evaluate(() => {
      const diy = document.getElementById('diy-kits');
      if (diy) diy.scrollIntoView({ behavior: 'instant' });
    });
    
    // Wait for DIY kits title and scroll down to see products
    await expect(page.getByTestId('diy-kits-title')).toBeVisible({ timeout: 10000 });
    await page.evaluate(() => window.scrollBy(0, 500));
    
    // Find add to cart button for a DIY kit
    const diyAddToCartButtons = page.locator('[data-testid^="diy-add-to-cart-"]');
    await expect(diyAddToCartButtons.first()).toBeVisible({ timeout: 15000 });
    
    // Click add to cart
    await diyAddToCartButtons.first().click();
    
    // Verify cart drawer opens with item
    await expect(page.getByTestId('cart-drawer-title')).toBeVisible({ timeout: 5000 });
    
    // Cart should show item
    const cartItems = page.locator('[data-testid^="cart-item-"]');
    await expect(cartItems.first()).toBeVisible({ timeout: 5000 });
  });

  test('remove item from cart', async ({ page }) => {
    // Scroll to gallery and add item
    await page.evaluate(() => {
      const gallery = document.getElementById('gallery');
      if (gallery) gallery.scrollIntoView({ behavior: 'instant' });
    });
    
    const addToCartButtons = page.locator('[data-testid^="add-to-cart-"]');
    await expect(addToCartButtons.first()).toBeVisible({ timeout: 15000 });
    await addToCartButtons.first().click();
    
    // Wait for cart to open
    await expect(page.getByTestId('cart-drawer-title')).toBeVisible({ timeout: 5000 });
    
    // Click remove button
    const removeButtons = page.locator('[data-testid^="remove-cart-item-"]');
    await expect(removeButtons.first()).toBeVisible({ timeout: 5000 });
    await removeButtons.first().click();
    
    // Cart should show empty message
    await expect(page.getByTestId('empty-cart-message')).toBeVisible({ timeout: 5000 });
  });

  test('cart shows total price with Euro symbol', async ({ page }) => {
    // Scroll to gallery and add item
    await page.evaluate(() => {
      const gallery = document.getElementById('gallery');
      if (gallery) gallery.scrollIntoView({ behavior: 'instant' });
    });
    
    const addToCartButtons = page.locator('[data-testid^="add-to-cart-"]');
    await expect(addToCartButtons.first()).toBeVisible({ timeout: 15000 });
    await addToCartButtons.first().click();
    
    // Verify cart total is visible
    await expect(page.getByTestId('cart-total')).toBeVisible({ timeout: 5000 });
    
    // Total should contain Euro symbol
    await expect(page.getByTestId('cart-total')).toContainText('€');
  });

  test('checkout button is visible when cart has items', async ({ page }) => {
    // Scroll to gallery and add item
    await page.evaluate(() => {
      const gallery = document.getElementById('gallery');
      if (gallery) gallery.scrollIntoView({ behavior: 'instant' });
    });
    
    const addToCartButtons = page.locator('[data-testid^="add-to-cart-"]');
    await expect(addToCartButtons.first()).toBeVisible({ timeout: 15000 });
    await addToCartButtons.first().click();
    
    // Verify checkout button is visible
    await expect(page.getByTestId('checkout-button')).toBeVisible({ timeout: 5000 });
  });

  test('close cart drawer', async ({ page }) => {
    // Open cart
    const cartIcon = page.locator('nav').getByRole('button').filter({ has: page.locator('svg') }).last();
    await cartIcon.click();
    
    // Verify cart is open
    await expect(page.getByTestId('cart-drawer-title')).toBeVisible({ timeout: 5000 });
    
    // Click close button
    await page.getByTestId('close-cart-button').click();
    
    // Cart should be closed
    await expect(page.getByTestId('cart-drawer-title')).not.toBeVisible({ timeout: 3000 });
  });
});
