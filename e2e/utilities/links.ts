import { expect, Page, BrowserContext } from '@playwright/test';

// Constants
import { testUrl } from '../constants';
import { baseRequestTimeout } from '../../src/app/core/constants/timeout';

export const createLink = async (page: Page, folderName?: string) => {
  await page.locator('.side-menu__add-button button').click();

  const name = Math.random().toString();

  await page.locator('app-add-link #link-name').fill(name);
  await page.locator('app-add-link #link-url').fill(testUrl);

  if (folderName) {
    await page.locator('app-add-link app-select[placeholder="Folder"] button').click();

    await page.locator('app-add-link app-select[placeholder="Folder"] input[type="search"]').fill(folderName);

    await page.locator('app-add-link app-select[placeholder="Folder"]').getByText(folderName).locator('..').click();
  }

  await page.locator('.add-link__submit button').click();

  await page.locator('app-add-link').waitFor({
    state: 'detached',
    timeout: baseRequestTimeout,
  });

  return name;
};

export const editLink = async (page: Page, linkName: string, data: {
  name: string,
  url: string,
  folderName?: string,
}, folderModalName?: string) => {
  const link = folderModalName
    ? page.locator('app-folder-modal').getByText(linkName).locator('../../..')
    : page.getByText(linkName).locator('../../..');

  await link.locator('app-dropdown').hover();

  await link.locator('app-dropdown .dropdown').getByText('Edit').locator('..').click();

  await page.locator('app-add-link #link-name').fill(data.name);
  await page.locator('app-add-link #link-url').fill(data.url);

  if (data.folderName) {
    await page.locator('app-add-link app-select[placeholder="Folder"] button').click();

    await page.locator('app-add-link app-select[placeholder="Folder"] input[type="search"]').fill(data.folderName);

    const option = page.locator('app-add-link app-select[placeholder="Folder"]').getByRole('option', { name: data.folderName });

    if ((await option.getAttribute('aria-selected')) !== 'true') {
      await option.click();
    }
  }

  await page.locator('.add-link__submit button').click();

  await page.locator('app-add-link').waitFor({
    state: 'detached',
    timeout: baseRequestTimeout,
  });

  return data.name;
};

export const copyLink = async (page: Page, context: BrowserContext, linkName: string, url = testUrl) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);

  const link = page.getByText(linkName).locator('../../..');

  await link.locator('app-dropdown').hover();

  await link.locator('app-dropdown .dropdown').getByText('Copy').locator('..').click();

  const handle = await page.evaluateHandle(() => navigator.clipboard.readText());
  const clipboardContent = await handle.jsonValue();

  expect(clipboardContent).toEqual(url);
};

export const deleteLink = async (page: Page, linkName: string, folderModalName?: string) => {
  const link = folderModalName
    ? page.locator('app-folder-modal').getByText(linkName).locator('../../..')
    : page.getByText(linkName).locator('../../..');

  await link.locator('app-dropdown').hover();

  await link.locator('app-dropdown .dropdown').getByText('Delete').locator('..').click();

  await page.locator('app-confirm-modal .confirm-modal-actions__submit button').click();

  await page.locator('app-confirm-modal').waitFor({
    state: 'detached',
    timeout: baseRequestTimeout,
  });
};
