import { test } from '@playwright/test';

// Utilities
import { login } from '../utilities/auth';

// Constants
import { navLinks } from '../../src/app/core/constants/nav-links';

test.beforeEach(async ({ page }) => {
  await login(page);
});

test.describe('side-menu', () => {
  test('should render side menu', async ({ page }) => {
    await page.locator('app-side-menu').isVisible();
    await page.locator('app-side-menu .side-menu-content').isVisible();
    await page.locator('app-side-menu .side-menu__add-button').isVisible();
    await page.locator('app-side-menu .side-menu__links').isVisible();

    for (const navLink of navLinks) {
      await page.locator('app-side-menu').getByText(navLink.name).isVisible();
    }
  });
});
