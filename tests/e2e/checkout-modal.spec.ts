import { test, expect } from '@playwright/test';

test.describe('Checkout Modal Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Set unique session ID
    const uniqueSession = `test_checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await page.evaluate((session) => {
      localStorage.setItem('sessionId', session);
    }, uniqueSession);
    
    // Accept cookies
    const acceptButton = page.getByRole('button', { name: /accept all/i });
    await expect(acceptButton).toBeVisible({ timeout: 5000 });
    await acceptButton.click({ force: true });
    
    // Scroll to gallery and add item
    await page.evaluate(() => {
      const gallery = document.getElementById('gallery');
      if (gallery) gallery.scrollIntoView({ behavior: 'instant' });
    });
    
    const addToCartButtons = page.locator('[data-testid^="add-to-cart-"]');
    await expect(addToCartButtons.first()).toBeVisible({ timeout: 15000 });
    await addToCartButtons.first().click({ force: true });
    
    // Wait for cart drawer to open
    await expect(page.getByTestId('cart-drawer-title')).toBeVisible({ timeout: 5000 });
    
    // Open checkout modal
    await page.getByTestId('checkout-button').click();
    await expect(page.getByTestId('cart-drawer-title')).not.toBeVisible({ timeout: 3000 });
    await expect(page.getByTestId('checkout-modal')).toBeVisible({ timeout: 5000 });
  });

  test('checkout modal shows order summary with cart items', async ({ page }) => {
    // Verify checkout elements
    await expect(page.getByTestId('checkout-title')).toBeVisible();
    await expect(page.getByTestId('checkout-summary')).toBeVisible();
    await expect(page.getByTestId('checkout-total')).toContainText('€');
  });

  test('checkout modal has billing and shipping fields', async ({ page }) => {
    // Verify billing fields
    await expect(page.getByTestId('checkout-first-name')).toBeVisible();
    await expect(page.getByTestId('checkout-last-name')).toBeVisible();
    await expect(page.getByTestId('checkout-email')).toBeVisible();
    await expect(page.getByTestId('checkout-phone')).toBeVisible();
    
    // Verify shipping fields
    await expect(page.getByTestId('checkout-address')).toBeVisible();
    await expect(page.getByTestId('checkout-city')).toBeVisible();
    await expect(page.getByTestId('checkout-postcode')).toBeVisible();
    await expect(page.getByTestId('checkout-country')).toBeVisible();
    
    // Verify notes and submit
    await expect(page.getByTestId('checkout-notes')).toBeVisible();
    await expect(page.getByTestId('checkout-submit')).toBeVisible();
  });

  test('checkout form can be filled and closed', async ({ page }) => {
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
    
    // Verify fields
    await expect(page.getByTestId('checkout-first-name')).toHaveValue('Test');
    await expect(page.getByTestId('checkout-city')).toHaveValue('Budapest');
    
    // Close modal
    await page.getByTestId('checkout-close').click();
    await expect(page.getByTestId('checkout-modal')).not.toBeVisible({ timeout: 3000 });
  });
});
