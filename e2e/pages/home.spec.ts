import { test, expect } from '@playwright/test';

// Utilities
import { login } from '../utilities/auth';
import { waitForHomeData } from '../utilities/home';
import { copyLink, createLink, deleteLink, editLink } from '../utilities/links';
import { createFolder, deleteFolder, editFolder } from '../utilities/folders';

// Constants
import { mobileViewport, testUrlSecond } from '../constants';

test.beforeEach(async ({ page }) => {
  await login(page);
});

test.describe('home', () => {
  test('should render home', async ({ page }) => {
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle('KeepLink');

    await page.locator('app-user-layout').isVisible();
    await page.locator('app-header').isVisible();
    await page.locator('app-side-menu').isVisible();
    expect(page.locator('app-home')).toBeTruthy();
  });

  test('should render add link fab if device is mobile', async ({ page }) => {
    await page.setViewportSize(mobileViewport);

    await page.locator('app-fab button[aria-label="Add link"]').click();

    await page.locator('app-add-link .modal-header-close').click();
  });

  test('should add, edit, copy and delete a link', async ({ page, context }) => {
    await waitForHomeData(page);

    let linkName = await createLink(page);

    linkName = await editLink(page, linkName, {
      name: Math.random().toString(),
      url: testUrlSecond,
    });

    await copyLink(page, context, linkName, testUrlSecond);

    await page.waitForTimeout(300);

    await deleteLink(page, linkName);
  });

  test('should add, edit and delete a folder', async ({ page }) => {
    await waitForHomeData(page);

    let folderName = await createFolder(page);

    folderName = await editFolder(page, folderName, {
      name: Math.random().toString(),
      description: `${Math.random().toString()} ${Math.random().toString()}`,
    });

    await deleteFolder(page, folderName);
  });

  test('should add a folder with links, then delete the folder', async ({ page }) => {
    await waitForHomeData(page);

    let folderName = await createFolder(page);

    const linksCount = 2;

    for (let i = 0; i < linksCount; i++) {
      await createLink(page, folderName);
    }

    await page.getByText(folderName).locator('..').click();

    await page.waitForTimeout(300);

    expect(await page.locator('app-folder-modal app-link').count()).toBe(linksCount);

    await page.locator('app-folder-modal .modal-header-close').click();

    await page.waitForTimeout(300);

    await deleteFolder(page, folderName);
  });

  test('should add a folder with a link, then edit and delete the link and the folder', async ({ page }) => {
    await waitForHomeData(page);

    let folderName = await createFolder(page);

    let linkName = await createLink(page, folderName);

    await page.getByText(folderName).locator('..').click();

    await page.waitForTimeout(300);

    linkName = await editLink(page, linkName, {
      name: Math.random().toString(),
      url: testUrlSecond,
      folderName,
    }, folderName);

    await page.waitForTimeout(300);

    await deleteLink(page, linkName, folderName);

    await page.waitForTimeout(300);

    await page.locator('app-folder-modal .modal-header-close').click();

    await page.waitForTimeout(300);

    await deleteFolder(page, folderName);
  });
});
