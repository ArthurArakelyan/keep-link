import { test, expect, Page } from '@playwright/test';

// Constants
import { signupTestEmail, testEmail, testName, testPassword } from '../constants';
import { VALIDATION_LENGTHS } from '../../src/app/core/constants/validation';

test.beforeEach(async ({ page }) => {
  await page.goto('/signup');
});

test.describe('signup', () => {
  test('should open signup', async ({ page }) => {
    await expect(page).toHaveURL(/signup/);
    await expect(page).toHaveTitle(/Signup/);
  });

  test('should signup', async ({ page }) => {
    await page.goto('/signup');

    await page.locator('input[name="name"]').fill(testName);
    await page.locator('input[name="email"]').fill(signupTestEmail);
    await page.locator('input[name="password"]').fill(testPassword);
    await page.locator('input[name="confirm-password"]').fill(testPassword);

    await page.getByRole('button').click();

    const response = await page.waitForResponse(/accounts:signUp/);

    if (!((await response.json()).error)) {
      // Wait for login page
      await page.waitForURL('/login');
      await expect(page).toHaveURL('/login');
    }
  });

  test('should not signup if the credentials are wrong', async ({ page }) => {
    await page.locator('input[name="name"]').fill(testName);
    // Use email which already exists
    await page.locator('input[name="email"]').fill(testEmail);
    await page.locator('input[name="password"]').fill(testPassword);
    await page.locator('input[name="confirm-password"]').fill(testPassword);

    await page.getByRole('button').click();

    await page.waitForResponse(/accounts:signUp/);

    // Should stay on signup page
    await page.waitForURL(/signup/);
    await expect(page).toHaveURL(/signup/);
  });

  test('should not signup if the inputs are not valid', async ({ page }) => {
    // Required case
    await page.locator('input[name="name"]').fill('');
    await page.locator('input[name="email"]').fill('');
    await page.locator('input[name="password"]').fill('');
    await page.locator('input[name="confirm-password"]').fill('');
    await page.getByRole('button').click();

    await checkInputErrorAlerts(page);

    // Wrong email case
    await page.locator('input[name="name"]').fill('');
    await page.locator('input[name="email"]').fill('wrong');
    await page.locator('input[name="password"]').fill('');
    await page.locator('input[name="confirm-password"]').fill('');
    await page.getByRole('button').click();

    await checkInputErrorAlerts(page);

    // Password Min length case
    await page.locator('input[name="name"]').fill('');
    await page.locator('input[name="email"]').fill('');
    await page.locator('input[name="password"]').fill('123');
    await page.locator('input[name="confirm-password"]').fill('');
    await page.getByRole('button').click();

    await checkInputErrorAlerts(page);

    // Max length case
    await page.locator('input[name="name"]').fill([...Array(VALIDATION_LENGTHS.short).keys()].join(''));
    await page.locator('input[name="email"]').fill(`${[...Array(VALIDATION_LENGTHS.long).keys()].join('')}@mail.loc`);
    await page.locator('input[name="password"]').fill(`${[...Array(VALIDATION_LENGTHS.base).keys()].join('')}`);
    await page.locator('input[name="confirm-password"]').fill('');
    await page.getByRole('button').click();

    // Confirm password match case
    await page.locator('input[name="name"]').fill('');
    await page.locator('input[name="email"]').fill('');
    await page.locator('input[name="password"]').fill('123');
    await page.locator('input[name="confirm-password"]').fill('12');

    await checkInputErrorAlerts(page);
  });

  test('should have link to login page', async ({ page }) => {
    await expect(page.locator('a[href="/login"]')).toBeVisible();
  });
});

async function checkInputErrorAlerts(page: Page) {
  await expect(page.locator('input[name="name"] + .input-error')).toBeVisible();
  await expect(page.locator('input[name="email"] + .input-error')).toBeVisible();
  await expect(page.locator('input[name="password"] + .input-error')).toBeVisible();
  await expect(page.locator('input[name="confirm-password"] + .input-error')).toBeVisible();
}
