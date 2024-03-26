import { Page } from '@playwright/test';

// Constants
import { baseRequestTimeout } from '../../src/app/core/constants/timeout';

export const createFolder = async (page: Page) => {
  await page.locator('.side-menu__add-button button').click();

  await page.locator('app-add-link app-select[placeholder="Type"] button').click();

  await page.locator('app-add-link app-select[placeholder="Type"] app-option button#folder').click();

  const name = Math.random().toString();

  await page.locator('app-add-link #folder-name').fill(name);
  await page.locator('app-add-link #folder-description').fill(`${Math.random()}${Math.random()}`);

  await page.locator('.add-link__submit button').click();

  await page.locator('app-add-link').waitFor({
    state: 'detached',
    timeout: baseRequestTimeout,
  });

  return name;
};

export const editFolder = async (page: Page, folderName: string, data: { name: string, description: string }) => {
  const folder = page.getByText(folderName).locator('../..');

  await folder.locator('button[aria-label="Edit"]').click();

  await page.locator('app-add-link #folder-name').fill(data.name);
  await page.locator('app-add-link #folder-description').fill(data.description);

  await page.locator('.add-link__submit button').click();

  await page.locator('app-add-link').waitFor({
    state: 'detached',
    timeout: baseRequestTimeout,
  });

  return data.name;
};

export const deleteFolder = async (page: Page, folderName: string) => {
  const folder = page.getByText(folderName).locator('../..');

  await folder.locator('button[aria-label="Delete"]').click();

  await page.locator('app-confirm-modal .confirm-modal-actions__submit button').click();

  await page.locator('app-confirm-modal').waitFor({
    state: 'detached',
    timeout: baseRequestTimeout,
  });
};
