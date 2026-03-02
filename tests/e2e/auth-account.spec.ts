import { test, expect } from '@playwright/test';

test.describe('AuthModal - Login and Register', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Clear any existing auth
    await page.evaluate(() => {
      localStorage.removeItem('customerToken');
    });
    
    // Accept cookies first - wait for banner and click
    const acceptButton = page.getByRole('button', { name: /accept all/i });
    await expect(acceptButton).toBeVisible({ timeout: 5000 });
    await acceptButton.click({ force: true });
    
    // Wait for banner to disappear
    await expect(page.getByTestId('cookie-consent-banner')).not.toBeVisible({ timeout: 3000 }).catch(() => {});
  });

  test('user icon in navbar opens AuthModal when not logged in', async ({ page }) => {
    // Click user icon in navbar
    const userButton = page.getByTestId('user-button');
    await expect(userButton).toBeVisible({ timeout: 5000 });
    await userButton.click();
    
    // Verify AuthModal opens
    await expect(page.getByTestId('auth-modal')).toBeVisible({ timeout: 5000 });
    await expect(page.getByTestId('auth-title')).toBeVisible();
  });

  test('AuthModal starts in login mode with correct fields', async ({ page }) => {
    // Open AuthModal
    await page.getByTestId('user-button').click();
    await expect(page.getByTestId('auth-modal')).toBeVisible({ timeout: 5000 });
    
    // Verify login mode
    await expect(page.getByTestId('auth-email')).toBeVisible();
    await expect(page.getByTestId('auth-password')).toBeVisible();
    await expect(page.getByTestId('auth-submit')).toBeVisible();
    
    // In login mode, first name/last name/confirm password should NOT be visible
    await expect(page.getByTestId('auth-first-name')).not.toBeVisible();
    await expect(page.getByTestId('auth-last-name')).not.toBeVisible();
    await expect(page.getByTestId('auth-password2')).not.toBeVisible();
  });

  test('AuthModal can switch to register mode', async ({ page }) => {
    // Open AuthModal
    await page.getByTestId('user-button').click();
    await expect(page.getByTestId('auth-modal')).toBeVisible({ timeout: 5000 });
    
    // Click switch button to register mode
    await page.getByTestId('auth-switch').click();
    
    // Verify register mode fields appear
    await expect(page.getByTestId('auth-first-name')).toBeVisible({ timeout: 3000 });
    await expect(page.getByTestId('auth-last-name')).toBeVisible();
    await expect(page.getByTestId('auth-email')).toBeVisible();
    await expect(page.getByTestId('auth-password')).toBeVisible();
    await expect(page.getByTestId('auth-password2')).toBeVisible();
    await expect(page.getByTestId('auth-submit')).toBeVisible();
  });

  test('AuthModal can switch back to login mode from register', async ({ page }) => {
    // Open AuthModal
    await page.getByTestId('user-button').click();
    await expect(page.getByTestId('auth-modal')).toBeVisible({ timeout: 5000 });
    
    // Switch to register mode
    await page.getByTestId('auth-switch').click();
    await expect(page.getByTestId('auth-first-name')).toBeVisible({ timeout: 3000 });
    
    // Switch back to login mode
    await page.getByTestId('auth-switch').click();
    
    // Verify login mode - register fields should be hidden
    await expect(page.getByTestId('auth-first-name')).not.toBeVisible({ timeout: 3000 });
    await expect(page.getByTestId('auth-password2')).not.toBeVisible();
  });

  test('Register form can be filled with all fields', async ({ page }) => {
    // Open AuthModal in register mode
    await page.getByTestId('user-button').click();
    await expect(page.getByTestId('auth-modal')).toBeVisible({ timeout: 5000 });
    await page.getByTestId('auth-switch').click();
    await expect(page.getByTestId('auth-first-name')).toBeVisible({ timeout: 3000 });
    
    // Fill all fields
    await page.getByTestId('auth-first-name').fill('Test');
    await page.getByTestId('auth-last-name').fill('User');
    await page.getByTestId('auth-email').fill('testuser@example.com');
    await page.getByTestId('auth-password').fill('testpassword123');
    await page.getByTestId('auth-password2').fill('testpassword123');
    
    // Verify fields are filled
    await expect(page.getByTestId('auth-first-name')).toHaveValue('Test');
    await expect(page.getByTestId('auth-last-name')).toHaveValue('User');
    await expect(page.getByTestId('auth-email')).toHaveValue('testuser@example.com');
  });

  test('AuthModal can be closed', async ({ page }) => {
    // Open AuthModal
    await page.getByTestId('user-button').click();
    await expect(page.getByTestId('auth-modal')).toBeVisible({ timeout: 5000 });
    
    // Click X to close
    await page.locator('[data-testid="auth-modal"] button:has(svg)').first().click();
    
    await expect(page.getByTestId('auth-modal')).not.toBeVisible({ timeout: 3000 });
  });
});

test.describe('AccountModal - Profile, Orders, Support Tabs', () => {
  // Note: These tests verify the modal structure when opened.
  // Full authentication flow testing requires valid WooCommerce customer credentials.
  
  test('mobile user button is visible on smaller screens', async ({ page }) => {
    // Set smaller viewport
    await page.setViewportSize({ width: 768, height: 720 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Accept cookies
    const acceptButton = page.getByRole('button', { name: /accept all/i });
    await expect(acceptButton).toBeVisible({ timeout: 5000 });
    await acceptButton.click({ force: true });
    await expect(page.getByTestId('cookie-consent-banner')).not.toBeVisible({ timeout: 3000 }).catch(() => {});
    
    // Check mobile user button is visible
    const mobileUserButton = page.getByTestId('mobile-user-button');
    await expect(mobileUserButton).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Guest Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Ensure logged out
    await page.evaluate(() => {
      localStorage.removeItem('customerToken');
    });
    
    // Set unique session ID
    const uniqueSession = `guest_checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await page.evaluate((session) => {
      localStorage.setItem('sessionId', session);
    }, uniqueSession);
    
    // Accept cookies first
    const acceptButton = page.getByRole('button', { name: /accept all/i });
    await expect(acceptButton).toBeVisible({ timeout: 5000 });
    await acceptButton.click({ force: true });
    await expect(page.getByTestId('cookie-consent-banner')).not.toBeVisible({ timeout: 3000 }).catch(() => {});
  });

  test('guest can proceed to checkout without registration', async ({ page }) => {
    // Add product to cart
    await page.evaluate(() => {
      const gallery = document.getElementById('gallery');
      if (gallery) gallery.scrollIntoView({ behavior: 'instant' });
    });
    
    const addToCartButtons = page.locator('[data-testid^="add-to-cart-"]');
    await expect(addToCartButtons.first()).toBeVisible({ timeout: 15000 });
    await addToCartButtons.first().click({ force: true });
    
    // Wait for cart drawer
    await expect(page.getByTestId('cart-drawer-title')).toBeVisible({ timeout: 5000 });
    
    // Click checkout button
    await page.getByTestId('checkout-button').click();
    
    // Verify checkout modal opens (not auth modal)
    await expect(page.getByTestId('checkout-modal')).toBeVisible({ timeout: 5000 });
    
    // Verify we can fill billing details as guest
    await expect(page.getByTestId('checkout-first-name')).toBeVisible();
    await page.getByTestId('checkout-first-name').fill('Guest');
    await expect(page.getByTestId('checkout-first-name')).toHaveValue('Guest');
  });
});
