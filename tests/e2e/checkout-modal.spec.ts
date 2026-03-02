import { test, expect } from '@playwright/test';

test.describe('Checkout Modal Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Accept cookies if modal appears
    const acceptButton = page.getByText('ACCEPT ALL');
    if (await acceptButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await acceptButton.click();
    }
    
    // Set unique session ID for test isolation
    const uniqueSession = `test_checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await page.evaluate((session) => {
      localStorage.setItem('sessionId', session);
    }, uniqueSession);
  });

  test('checkout button opens checkout modal with order summary', async ({ page }) => {
    // Scroll to gallery and add item
    await page.evaluate(() => {
      const gallery = document.getElementById('gallery');
      if (gallery) gallery.scrollIntoView({ behavior: 'instant' });
    });
    
    const addToCartButtons = page.locator('[data-testid^="add-to-cart-"]');
    await expect(addToCartButtons.first()).toBeVisible({ timeout: 15000 });
    await addToCartButtons.first().click();
    
    // Wait for cart drawer to open
    await expect(page.getByTestId('cart-drawer-title')).toBeVisible({ timeout: 5000 });
    
    // Click checkout button
    await page.getByTestId('checkout-button').click();
    
    // Wait for cart drawer to close and checkout modal to open
    await expect(page.getByTestId('checkout-modal')).toBeVisible({ timeout: 5000 });
    
    // Verify checkout title
    await expect(page.getByTestId('checkout-title')).toBeVisible();
    
    // Verify order summary is visible with item
    await expect(page.getByTestId('checkout-summary')).toBeVisible();
    await expect(page.getByTestId('checkout-total')).toContainText('€');
  });

  test('checkout modal has all billing fields', async ({ page }) => {
    // Add item and open checkout
    await page.evaluate(() => {
      const gallery = document.getElementById('gallery');
      if (gallery) gallery.scrollIntoView({ behavior: 'instant' });
    });
    
    const addToCartButtons = page.locator('[data-testid^="add-to-cart-"]');
    await expect(addToCartButtons.first()).toBeVisible({ timeout: 15000 });
    await addToCartButtons.first().click();
    
    await expect(page.getByTestId('cart-drawer-title')).toBeVisible({ timeout: 5000 });
    await page.getByTestId('checkout-button').click();
    await expect(page.getByTestId('checkout-modal')).toBeVisible({ timeout: 5000 });
    
    // Verify billing fields
    await expect(page.getByTestId('checkout-first-name')).toBeVisible();
    await expect(page.getByTestId('checkout-last-name')).toBeVisible();
    await expect(page.getByTestId('checkout-email')).toBeVisible();
    await expect(page.getByTestId('checkout-phone')).toBeVisible();
  });

  test('checkout modal has all shipping fields', async ({ page }) => {
    // Add item and open checkout
    await page.evaluate(() => {
      const gallery = document.getElementById('gallery');
      if (gallery) gallery.scrollIntoView({ behavior: 'instant' });
    });
    
    const addToCartButtons = page.locator('[data-testid^="add-to-cart-"]');
    await expect(addToCartButtons.first()).toBeVisible({ timeout: 15000 });
    await addToCartButtons.first().click();
    
    await expect(page.getByTestId('cart-drawer-title')).toBeVisible({ timeout: 5000 });
    await page.getByTestId('checkout-button').click();
    await expect(page.getByTestId('checkout-modal')).toBeVisible({ timeout: 5000 });
    
    // Verify shipping fields
    await expect(page.getByTestId('checkout-address')).toBeVisible();
    await expect(page.getByTestId('checkout-city')).toBeVisible();
    await expect(page.getByTestId('checkout-postcode')).toBeVisible();
    await expect(page.getByTestId('checkout-country')).toBeVisible();
  });

  test('checkout modal has order notes textarea', async ({ page }) => {
    // Add item and open checkout
    await page.evaluate(() => {
      const gallery = document.getElementById('gallery');
      if (gallery) gallery.scrollIntoView({ behavior: 'instant' });
    });
    
    const addToCartButtons = page.locator('[data-testid^="add-to-cart-"]');
    await expect(addToCartButtons.first()).toBeVisible({ timeout: 15000 });
    await addToCartButtons.first().click();
    
    await expect(page.getByTestId('cart-drawer-title')).toBeVisible({ timeout: 5000 });
    await page.getByTestId('checkout-button').click();
    await expect(page.getByTestId('checkout-modal')).toBeVisible({ timeout: 5000 });
    
    // Verify notes textarea
    await expect(page.getByTestId('checkout-notes')).toBeVisible();
    
    // Test that we can type in the textarea
    await page.getByTestId('checkout-notes').fill('Test order notes');
    await expect(page.getByTestId('checkout-notes')).toHaveValue('Test order notes');
  });

  test('checkout modal can be closed', async ({ page }) => {
    // Add item and open checkout
    await page.evaluate(() => {
      const gallery = document.getElementById('gallery');
      if (gallery) gallery.scrollIntoView({ behavior: 'instant' });
    });
    
    const addToCartButtons = page.locator('[data-testid^="add-to-cart-"]');
    await expect(addToCartButtons.first()).toBeVisible({ timeout: 15000 });
    await addToCartButtons.first().click();
    
    await expect(page.getByTestId('cart-drawer-title')).toBeVisible({ timeout: 5000 });
    await page.getByTestId('checkout-button').click();
    await expect(page.getByTestId('checkout-modal')).toBeVisible({ timeout: 5000 });
    
    // Close checkout modal
    await page.getByTestId('checkout-close').click();
    await expect(page.getByTestId('checkout-modal')).not.toBeVisible({ timeout: 3000 });
  });

  test('checkout form can be filled with data', async ({ page }) => {
    // Add item and open checkout
    await page.evaluate(() => {
      const gallery = document.getElementById('gallery');
      if (gallery) gallery.scrollIntoView({ behavior: 'instant' });
    });
    
    const addToCartButtons = page.locator('[data-testid^="add-to-cart-"]');
    await expect(addToCartButtons.first()).toBeVisible({ timeout: 15000 });
    await addToCartButtons.first().click();
    
    await expect(page.getByTestId('cart-drawer-title')).toBeVisible({ timeout: 5000 });
    await page.getByTestId('checkout-button').click();
    await expect(page.getByTestId('checkout-modal')).toBeVisible({ timeout: 5000 });
    
    // Fill billing details
    await page.getByTestId('checkout-first-name').fill('Test');
    await page.getByTestId('checkout-last-name').fill('User');
    await page.getByTestId('checkout-email').fill('test@example.com');
    await page.getByTestId('checkout-phone').fill('+36301234567');
    
    // Fill shipping details
    await page.getByTestId('checkout-address').fill('123 Test Street');
    await page.getByTestId('checkout-city').fill('Budapest');
    await page.getByTestId('checkout-postcode').fill('1066');
    await page.getByTestId('checkout-country').fill('Hungary');
    
    // Add order notes
    await page.getByTestId('checkout-notes').fill('Please deliver in morning');
    
    // Verify all fields are filled
    await expect(page.getByTestId('checkout-first-name')).toHaveValue('Test');
    await expect(page.getByTestId('checkout-last-name')).toHaveValue('User');
    await expect(page.getByTestId('checkout-email')).toHaveValue('test@example.com');
    await expect(page.getByTestId('checkout-phone')).toHaveValue('+36301234567');
    await expect(page.getByTestId('checkout-address')).toHaveValue('123 Test Street');
    await expect(page.getByTestId('checkout-city')).toHaveValue('Budapest');
    await expect(page.getByTestId('checkout-postcode')).toHaveValue('1066');
    await expect(page.getByTestId('checkout-country')).toHaveValue('Hungary');
  });

  test('checkout submit button is visible', async ({ page }) => {
    // Add item and open checkout
    await page.evaluate(() => {
      const gallery = document.getElementById('gallery');
      if (gallery) gallery.scrollIntoView({ behavior: 'instant' });
    });
    
    const addToCartButtons = page.locator('[data-testid^="add-to-cart-"]');
    await expect(addToCartButtons.first()).toBeVisible({ timeout: 15000 });
    await addToCartButtons.first().click();
    
    await expect(page.getByTestId('cart-drawer-title')).toBeVisible({ timeout: 5000 });
    await page.getByTestId('checkout-button').click();
    await expect(page.getByTestId('checkout-modal')).toBeVisible({ timeout: 5000 });
    
    // Verify submit button is visible
    await expect(page.getByTestId('checkout-submit')).toBeVisible();
  });
});
