import { Page } from '@playwright/test';

// Constants
import { baseRequestTimeout } from '../../src/app/core/constants/timeout';

export const waitForProfileData = async (page: Page) => {
  await page.locator('app-profile-header').waitFor({
    state: 'visible',
    timeout: baseRequestTimeout,
  });

  await page.waitForTimeout(50);
};
