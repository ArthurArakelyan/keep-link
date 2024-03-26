import { expect, Page } from '@playwright/test';

// Constants
import { testEmail, testPassword } from '../constants';

export const login = async (page: Page) => {
  await page.goto('/login');

  await page.locator('input[type="email"]').fill(testEmail);
  await page.locator('input[type="password"]').fill(testPassword);

  await page.getByRole('button').click();

  await page.waitForResponse(/accounts:signInWithPassword/);

  // Wait for home page
  await page.waitForURL('/');
  await expect(page).toHaveURL('/');
};
