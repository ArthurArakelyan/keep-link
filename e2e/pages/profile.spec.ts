import { test, expect, Page } from '@playwright/test';
import * as path from 'path';

// Utilities
import { login } from '../utilities/auth';
import { waitForProfileData } from '../utilities/profile';

// Constants
import {
  testEmail,
  testName,
  testPassword,
  testSecondName,
  wrongTestEmail,
} from '../constants';
import { baseRequestTimeout } from '../../src/app/core/constants/timeout';
import { profileTabs } from '../../src/app/core/constants/profile-tabs';
import { VALIDATION_LENGTHS } from '../../src/app/core/constants/validation';

test.beforeEach(async ({ page }) => {
  await login(page);

  await page.goto('/profile');
});

test.describe('profile', () => {
  test('should render profile', async ({ page }) => {
    await expect(page).toHaveURL('/profile');
    await expect(page).toHaveTitle('Profile | KeepLink');

    await page.locator('app-profile').isVisible();

    await waitForProfileData(page);

    for (const profileTab of profileTabs) {
      await page.locator('app-profile-tabs').getByText(profileTab.label).isVisible();
    }
  });

  test.describe('name', () => {
    async function checkInputErrorAlerts(page: Page) {
      await expect(page.locator('app-profile-name input[name="name"] + .input-error')).toBeVisible();
    }

    test.beforeEach(async ({ page }) => {
      await page.goto('/profile/name');
    });

    test('should change the name', async ({ page }) => {
      await waitForProfileData(page);

      await page.locator('app-profile-name input[name="name"]').fill(
        (await page.locator('.profile-header-name').innerText()) === testSecondName
          ? testName
          : testSecondName
      );

      await page.locator('app-profile-name').getByRole('button').click();

      await page.locator('app-profile-name').getByRole('button').locator('app-loader').waitFor({
        state: 'detached',
        timeout: baseRequestTimeout,
      });
    });

    test('should not change the name if the inputs are not valid', async ({ page }) => {
      // Required case
      await page.locator('app-profile-name input[name="name"]').fill('');
      await page.locator('app-profile-name').getByRole('button').click();

      await checkInputErrorAlerts(page);

      // Max length case
      await page.locator('app-profile-name input[name="name"]').fill([...Array(VALIDATION_LENGTHS.short).keys()].join(''));
      await page.locator('app-profile-name').getByRole('button').click();

      await checkInputErrorAlerts(page);
    });
  });

  test.describe('avatar', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/profile/avatar');
    });

    test('should upload an avatar, then delete it', async ({ page }) => {
      await waitForProfileData(page);

      const fileChooserPromise = page.waitForEvent('filechooser');

      await page.locator('app-profile-avatar').getByText('Upload Avatar').locator('../..').click();

      const fileChooser = await fileChooserPromise;

      await fileChooser.setFiles([path.join(__dirname, '../assets/avatar.png')])

      await page.getByText('Upload Avatar').locator('../..').locator('app-loader').waitFor({
        state: 'detached',
        timeout: baseRequestTimeout,
      });

      await page.waitForTimeout(1000);

      await page.getByText('Delete Avatar').locator('../..').click();

      await page.waitForTimeout(300);

      await page.locator('app-confirm-modal .confirm-modal-actions__submit button').click();

      await page.locator('app-confirm-modal').waitFor({
        state: 'detached',
        timeout: baseRequestTimeout,
      });
    });
  });

  test.describe('email', () => {
    async function checkInputErrorAlerts(page: Page) {
      await expect(page.locator('app-profile-email input[type="email"] + .input-error')).toBeVisible();
      await expect(page.locator('app-profile-email input[type="password"] + .input-error')).toBeVisible();
    }

    test.beforeEach(async ({ page }) => {
      await page.goto('/profile/email');
    });

    test('should change the email', async ({ page }) => {
      await waitForProfileData(page);

      await page.locator('app-profile-email input[type="email"]').fill(testEmail);
      await page.locator('app-profile-email input[type="password"]').fill(testPassword);

      await page.locator('app-profile-email').getByRole('button').click();

      await page.locator('app-profile-email').getByRole('button').locator('app-loader').waitFor({
        state: 'detached',
        timeout: baseRequestTimeout,
      });

      expect(await page.locator('app-profile-email input[type="email"]').inputValue()).toBe(testEmail);
    });

    test('should not change the email if the credentials are wrong', async ({ page }) => {
      await waitForProfileData(page);

      await page.locator('app-profile-email input[type="email"]').fill(wrongTestEmail);
      await page.locator('app-profile-email input[type="password"]').fill(testPassword);

      await page.locator('app-profile-email').getByRole('button').click();

      await page.locator('app-profile-email').getByRole('button').locator('app-loader').waitFor({
        state: 'detached',
        timeout: baseRequestTimeout,
      });

      expect(await page.locator('app-profile-email input[type="email"]').inputValue()).toBe(testEmail);
    });

    test('should not change the email if the inputs are not valid', async ({ page }) => {
      // Required case
      await page.locator('app-profile-email input[type="email"]').fill('');
      await page.locator('app-profile-email input[type="password"]').fill('');
      await page.locator('app-profile-email').getByRole('button').click();

      await checkInputErrorAlerts(page);

      // Wrong email case
      await page.locator('app-profile-email input[type="email"]').fill('wrong');
      await page.locator('app-profile-email input[type="password"]').fill('');
      await page.locator('app-profile-email').getByRole('button').click();

      await checkInputErrorAlerts(page);

      // Password Min length case
      await page.locator('app-profile-email input[type="email"]').fill('');
      await page.locator('app-profile-email input[type="password"]').fill('123');
      await page.locator('app-profile-email').getByRole('button').click();

      await checkInputErrorAlerts(page);

      // Max length case
      await page.locator('app-profile-email input[type="email"]').fill(`${[...Array(VALIDATION_LENGTHS.long).keys()].join('')}@mail.loc`);
      await page.locator('app-profile-email input[type="password"]').fill(`${[...Array(VALIDATION_LENGTHS.base).keys()].join('')}`);
      await page.locator('app-profile-email').getByRole('button').click();

      await checkInputErrorAlerts(page);
    });
  });

  test.describe('password', () => {
    async function checkInputErrorAlerts(page: Page) {
      await expect(page.locator('app-profile-password input[name="old-password"] + .input-error')).toBeVisible();
      await expect(page.locator('app-profile-password input[name="password"] + .input-error')).toBeVisible();
    }

    test.beforeEach(async ({ page }) => {
      await page.goto('/profile/password');
    });

    test('should change the password', async ({ page }) => {
      await waitForProfileData(page);

      await page.locator('app-profile-password input[name="old-password"]').fill(testPassword);
      await page.locator('app-profile-password input[name="password"]').fill(testPassword);

      await page.locator('app-profile-password').getByRole('button').click();

      await page.locator('app-profile-password').getByRole('button').locator('app-loader').waitFor({
        state: 'detached',
        timeout: baseRequestTimeout,
      });
    });

    test('should not change the password if the inputs are not valid', async ({ page }) => {
      // Required case
      await page.locator('app-profile-password input[name="old-password"]').fill('');
      await page.locator('app-profile-password input[name="password"]').fill('');
      await page.locator('app-profile-password').getByRole('button').click();

      await checkInputErrorAlerts(page);

      // Password Min length case
      await page.locator('app-profile-password input[name="old-password"]').fill('123');
      await page.locator('app-profile-password input[name="password"]').fill('123');
      await page.locator('app-profile-password').getByRole('button').click();

      await checkInputErrorAlerts(page);

      // Max length case
      await page.locator('app-profile-password input[name="old-password"]').fill(`${[...Array(VALIDATION_LENGTHS.base).keys()].join('')}`);
      await page.locator('app-profile-password input[name="password"]').fill(`${[...Array(VALIDATION_LENGTHS.base).keys()].join('')}`);
      await page.locator('app-profile-password').getByRole('button').click();

      await checkInputErrorAlerts(page);
    });
  });
});
