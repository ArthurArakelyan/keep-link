import { test, expect, Page } from '@playwright/test';

// Constants
import { testEmail, testPassword, wrongTestEmail } from '../constants';
import { VALIDATION_LENGTHS } from '../../src/app/core/constants/validation';

// Utilities
import { login } from '../utilities/auth';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('login', () => {
  test('should open login', async ({ page }) => {
    await expect(page).toHaveURL(/login/);
    await expect(page).toHaveTitle(/Login/);
  });

  test('should login', async ({ page }) => {
    await login(page);

    // Check for home page
    await expect(page.locator('app-header')).toBeVisible();
    await expect(page.locator('app-side-menu')).toBeVisible();
  });

  test('should not login if the credentials are wrong', async ({ page }) => {
    await page.locator('input[type="email"]').fill(wrongTestEmail);
    await page.locator('input[type="password"]').fill(testPassword);

    await page.getByRole('button').click();

    await page.waitForResponse(/accounts:signInWithPassword/);

    // Should stay on login page
    await page.waitForURL(/login/);
    await expect(page).toHaveURL(/login/);
  });

  test('should not login if the inputs are not valid', async ({ page }) => {
    // Required case
    await page.locator('input[type="email"]').fill('');
    await page.locator('input[type="password"]').fill('');
    await page.getByRole('button').click();

    await checkInputErrorAlerts(page);

    // Wrong email case
    await page.locator('input[type="email"]').fill('wrong');
    await page.locator('input[type="password"]').fill('');
    await page.getByRole('button').click();

    await checkInputErrorAlerts(page);

    // Password Min length case
    await page.locator('input[type="email"]').fill('');
    await page.locator('input[type="password"]').fill('123');
    await page.getByRole('button').click();

    await checkInputErrorAlerts(page);

    // Max length case
    await page.locator('input[type="email"]').fill(`${[...Array(VALIDATION_LENGTHS.long).keys()].join('')}@mail.loc`);
    await page.locator('input[type="password"]').fill(`${[...Array(VALIDATION_LENGTHS.base).keys()].join('')}`);
    await page.getByRole('button').click();

    await checkInputErrorAlerts(page);
  });

  test('should have links to sign up and forgot password pages', async ({ page }) => {
    await expect(page.locator('a[href="/signup"]')).toBeVisible();
    await expect(page.locator('a[href="/forgot-password"]')).toBeVisible();
  });
});

async function checkInputErrorAlerts(page: Page) {
  await expect(page.locator('input[type="email"] + .input-error')).toBeVisible();
  await expect(page.locator('input[type="password"] + .input-error')).toBeVisible();
}
