import { test } from '@playwright/test';

// Utilities
import { login } from '../utilities/auth';

// Constants
import { navLinks } from '../../src/app/core/constants/nav-links';
import { mobileViewport } from '../constants';

test.beforeEach(async ({ page }) => {
  await page.setViewportSize(mobileViewport);

  await login(page);
});

test.describe('side-menu-responsive', () => {
  test('should render responsive side menu', async ({ page }) => {
    await page.locator('app-side-menu-responsive app-side-menu').isVisible();
    await page.locator('app-side-menu-responsive app-side-menu .side-menu-content').isVisible();
    await page.locator('app-side-menu-responsive app-side-menu .side-menu__links').isVisible();

    for (const navLink of navLinks) {
      await page.locator('app-side-menu-responsive app-side-menu').getByText(navLink.name).isVisible();
    }
  });

  test('should open and close responsive side menu', async ({ page }) => {
    await page.locator('app-header-menu button.header-menu').click();

    await page.waitForTimeout(300);

    await page.locator('app-side-menu-responsive.open').isVisible();

    await page.locator('app-side-menu-responsive').click();

    await page.locator('app-side-menu-responsive.open').waitFor({
      state: 'detached',
    });
  });

  test('should open and close after navigation responsive side menu', async ({ page }) => {
    await page.locator('app-header-menu button.header-menu').click();

    await page.waitForTimeout(300);

    await page.locator('app-side-menu-responsive.open').isVisible();

    await page.locator('app-side-menu-responsive').getByText(navLinks[1].name).locator('..').click();

    await page.waitForURL(navLinks[1].link);

    await page.locator('app-side-menu-responsive.open').waitFor({
      state: 'detached',
    });
  });
});
