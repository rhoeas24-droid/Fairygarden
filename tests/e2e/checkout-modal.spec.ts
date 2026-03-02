import { test, expect } from '@playwright/test';

test.describe('Multi-Step Checkout Modal Flow', () => {
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
    
    // Checkout modal first shows "How would you like to proceed?" options
    // Click "Buy Without Registration" to proceed as guest
    const guestCheckoutOption = page.getByText('Buy Without Registration');
    await expect(guestCheckoutOption).toBeVisible({ timeout: 5000 });
    await guestCheckoutOption.click();
    
    // Wait for step 1 to be visible
    await expect(page.getByTestId('checkout-step-address')).toBeVisible({ timeout: 5000 });
  });

  test('step 1: checkout modal shows address form (billing/shipping)', async ({ page }) => {
    // Verify step 1 - Address
    await expect(page.getByTestId('checkout-title')).toBeVisible();
    await expect(page.getByTestId('checkout-step-address')).toBeVisible();
    
    // Verify billing fields
    await expect(page.getByTestId('checkout-first-name')).toBeVisible();
    await expect(page.getByTestId('checkout-last-name')).toBeVisible();
    await expect(page.getByTestId('checkout-email')).toBeVisible();
    await expect(page.getByTestId('checkout-phone')).toBeVisible();
    await expect(page.getByTestId('checkout-address')).toBeVisible();
    await expect(page.getByTestId('checkout-city')).toBeVisible();
    await expect(page.getByTestId('checkout-postcode')).toBeVisible();
    await expect(page.getByTestId('checkout-country')).toBeVisible();
    
    // Verify same as billing checkbox is visible
    await expect(page.getByTestId('same-as-billing')).toBeVisible();
    
    // Verify Next button is visible
    await expect(page.getByTestId('checkout-next')).toBeVisible();
  });

  test('step 1: separate shipping address fields appear when unchecked', async ({ page }) => {
    // Uncheck "same as billing"
    const sameAsBilling = page.getByTestId('same-as-billing').locator('input[type="checkbox"]');
    await sameAsBilling.uncheck();
    
    // Verify separate shipping fields appear
    await expect(page.getByTestId('checkout-ship-first')).toBeVisible();
    await expect(page.getByTestId('checkout-ship-last')).toBeVisible();
    await expect(page.getByTestId('checkout-ship-address')).toBeVisible();
    await expect(page.getByTestId('checkout-ship-city')).toBeVisible();
    await expect(page.getByTestId('checkout-ship-postcode')).toBeVisible();
    await expect(page.getByTestId('checkout-ship-country')).toBeVisible();
  });

  test('step 2: shipping method selection and order notes', async ({ page }) => {
    // Fill step 1 - required billing fields
    await page.getByTestId('checkout-first-name').fill('Test');
    await page.getByTestId('checkout-last-name').fill('User');
    await page.getByTestId('checkout-email').fill('test@example.com');
    await page.getByTestId('checkout-address').fill('123 Test Street');
    await page.getByTestId('checkout-city').fill('Athens');
    await page.getByTestId('checkout-postcode').fill('10557');
    await page.getByTestId('checkout-country').fill('Greece');
    
    // Go to step 2
    await page.getByTestId('checkout-next').click();
    await expect(page.getByTestId('checkout-step-shipping')).toBeVisible({ timeout: 5000 });
    
    // Verify shipping method options
    await expect(page.getByTestId('shipping-flat_rate')).toBeVisible();
    await expect(page.getByTestId('shipping-express')).toBeVisible();
    await expect(page.getByTestId('shipping-local_pickup')).toBeVisible();
    
    // Verify order notes field
    await expect(page.getByTestId('checkout-notes')).toBeVisible();
    
    // Test selecting express shipping
    await page.getByTestId('shipping-express').click();
    
    // Fill order notes
    await page.getByTestId('checkout-notes').fill('Please handle with care');
    
    // Verify Back button is visible
    await expect(page.getByTestId('checkout-back')).toBeVisible();
    await expect(page.getByTestId('checkout-next')).toBeVisible();
  });

  test('step 3: summary with payment method and checkboxes', async ({ page }) => {
    // Fill step 1 - required billing fields
    await page.getByTestId('checkout-first-name').fill('Test');
    await page.getByTestId('checkout-last-name').fill('Summary');
    await page.getByTestId('checkout-email').fill('summary@example.com');
    await page.getByTestId('checkout-address').fill('456 Summary Avenue');
    await page.getByTestId('checkout-city').fill('Athens');
    await page.getByTestId('checkout-postcode').fill('10558');
    await page.getByTestId('checkout-country').fill('Greece');
    
    // Go to step 2
    await page.getByTestId('checkout-next').click();
    await expect(page.getByTestId('checkout-step-shipping')).toBeVisible({ timeout: 5000 });
    
    // Go to step 3
    await page.getByTestId('checkout-next').click();
    await expect(page.getByTestId('checkout-step-summary')).toBeVisible({ timeout: 5000 });
    
    // Verify order summary with grand total
    await expect(page.getByTestId('checkout-grand-total')).toContainText('€');
    
    // Verify T&C and Privacy checkboxes
    await expect(page.getByTestId('accept-terms')).toBeVisible();
    await expect(page.getByTestId('accept-privacy')).toBeVisible();
    await expect(page.getByTestId('subscribe-newsletter')).toBeVisible();
    
    // Verify Place Order button
    await expect(page.getByTestId('checkout-submit')).toBeVisible();
  });

  test('step 3: bank transfer payment option available', async ({ page }) => {
    // Fill and navigate to step 3
    await page.getByTestId('checkout-first-name').fill('Bank');
    await page.getByTestId('checkout-last-name').fill('Transfer');
    await page.getByTestId('checkout-email').fill('bank@example.com');
    await page.getByTestId('checkout-address').fill('789 Bank Street');
    await page.getByTestId('checkout-city').fill('Athens');
    await page.getByTestId('checkout-postcode').fill('10559');
    await page.getByTestId('checkout-country').fill('Greece');
    
    await page.getByTestId('checkout-next').click();
    await expect(page.getByTestId('checkout-step-shipping')).toBeVisible({ timeout: 5000 });
    
    await page.getByTestId('checkout-next').click();
    await expect(page.getByTestId('checkout-step-summary')).toBeVisible({ timeout: 5000 });
    
    // Verify both payment methods are visible
    const onlinePayment = page.locator('input[type="radio"][value="online"]');
    const bacsPayment = page.locator('input[type="radio"][value="bacs"]');
    
    await expect(onlinePayment).toBeVisible();
    await expect(bacsPayment).toBeVisible();
    
    // Select bank transfer
    await bacsPayment.click();
    await expect(bacsPayment).toBeChecked();
  });

  test('checkout navigation - back button works', async ({ page }) => {
    // Fill step 1
    await page.getByTestId('checkout-first-name').fill('Back');
    await page.getByTestId('checkout-last-name').fill('Test');
    await page.getByTestId('checkout-email').fill('back@example.com');
    await page.getByTestId('checkout-address').fill('Back Street');
    await page.getByTestId('checkout-city').fill('Athens');
    await page.getByTestId('checkout-postcode').fill('10560');
    await page.getByTestId('checkout-country').fill('Greece');
    
    // Go to step 2
    await page.getByTestId('checkout-next').click();
    await expect(page.getByTestId('checkout-step-shipping')).toBeVisible({ timeout: 5000 });
    
    // Go back to step 1
    await page.getByTestId('checkout-back').click();
    await expect(page.getByTestId('checkout-step-address')).toBeVisible({ timeout: 5000 });
    
    // Verify form data is preserved
    await expect(page.getByTestId('checkout-first-name')).toHaveValue('Back');
    await expect(page.getByTestId('checkout-last-name')).toHaveValue('Test');
  });

  test('checkout modal can be closed', async ({ page }) => {
    // Close modal
    await page.getByTestId('checkout-close').click();
    await expect(page.getByTestId('checkout-modal')).not.toBeVisible({ timeout: 3000 });
  });
});
