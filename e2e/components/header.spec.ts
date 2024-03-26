import { test, expect } from '@playwright/test';

// Utilities
import { login } from '../utilities/auth';
import { createLink, deleteLink } from '../utilities/links';
import { waitForHomeData } from '../utilities/home';
import { createFolder, deleteFolder } from '../utilities/folders';

test.beforeEach(async ({ page }) => {
  await login(page);
});

test.describe('header', () => {
  test('should render header', async ({ page }) => {
    await expect(page.locator('app-header')).toBeVisible();
    await expect(page.locator('app-header .search')).toBeVisible();
  });

  test('should show dropdown on avatar, then logout', async ({ page }) => {
    await waitForHomeData(page);

    await expect(page.locator('app-header app-dropdown app-avatar')).toBeVisible();

    await page.locator('app-header app-dropdown').hover();

    await page.locator('app-header app-dropdown .dropdown button:first-child').click();

    await page.waitForTimeout(150);

    await page.waitForURL(/login/);
  });

  test.describe('global-search', () => {
    test('should use global search to find a link', async ({ page }) => {
      await waitForHomeData(page);

      const linkName = await createLink(page);

      await page.locator('app-header input[type="search"]').fill(linkName);

      await page.waitForTimeout(100);

      await page.locator('app-global-search app-global-search-result button').click();

      await page.locator('app-link .link__highlight').isVisible();

      // Cleanup
      await page.waitForTimeout(100);

      await deleteLink(page, linkName);
    });

    test('should use global search to find a folder', async ({ page }) => {
      await waitForHomeData(page);

      const folderName = await createFolder(page);

      await page.locator('app-header input[type="search"]').fill(folderName);

      await page.waitForTimeout(100);

      await page.locator('app-global-search app-global-search-result button').click();

      await page.locator('app-folder-modal').getByText(folderName).isVisible();

      await page.locator('app-folder-modal button.modal-header-close').click();

      // Cleanup
      await page.waitForTimeout(100);

      await deleteFolder(page, folderName);
    });

    test('should use global search to find a link in folder', async ({ page }) => {
      await waitForHomeData(page);

      const folderName = await createFolder(page);

      const linkName = await createLink(page, folderName);

      await page.locator('app-header input[type="search"]').fill(linkName);

      await page.waitForTimeout(100);

      await page.locator('app-global-search').getByText(linkName).locator('..').click();

      await page.locator('app-link .link__highlight').isVisible();

      // Cleanup
      await page.waitForTimeout(100);

      await deleteFolder(page, folderName);
    });
  });
});
