import { test, expect, Page } from '@playwright/test';

// Constants
import { testEmail, wrongTestEmail } from '../constants';
import { VALIDATION_LENGTHS } from '../../src/app/core/constants/validation';

test.beforeEach(async ({ page }) => {
  await page.goto('/forgot-password');
});

test.describe('forgot-password', () => {
  test('should open forgot password', async ({ page }) => {
    await expect(page).toHaveURL(/forgot-password/);
    await expect(page).toHaveTitle(/Forgot Password/);
  });

  test('should send forgot password request', async ({ page }) => {
    await page.locator('input[type="email"]').fill(testEmail);

    await page.getByRole('button').click();

    await page.waitForResponse(/accounts:sendOobCode/);

    // Wait for login page
    await page.waitForURL('/login');
    await expect(page).toHaveURL('/login');

    // Check for login page
    await expect(page).toHaveTitle(/Login/);
  });

  test('should not login if the credentials are wrong', async ({ page }) => {
    await page.locator('input[type="email"]').fill(wrongTestEmail);

    await page.getByRole('button').click();

    await page.waitForResponse(/accounts:sendOobCode/);

    // Should stay on forgot password page
    await page.waitForURL(/forgot-password/);
    await expect(page).toHaveURL(/forgot-password/);
  });

  test('should not login if the inputs are not valid', async ({ page }) => {
    // Required case
    await page.locator('input[type="email"]').fill('');
    await page.getByRole('button').click();

    await checkInputErrorAlerts(page);

    // Wrong email case
    await page.locator('input[type="email"]').fill('wrong');
    await page.getByRole('button').click();

    await checkInputErrorAlerts(page);

    // Max length case
    await page.locator('input[type="email"]').fill(`${[...Array(VALIDATION_LENGTHS.long).keys()].join('')}@mail.loc`);
    await page.getByRole('button').click();

    await checkInputErrorAlerts(page);
  });

  test('should have link to login page', async ({ page }) => {
    await expect(page.locator('a[href="/login"]')).toBeVisible();
  });
});

async function checkInputErrorAlerts(page: Page) {
  await expect(page.locator('input[type="email"] + .input-error')).toBeVisible();
}
