import { Page } from '@playwright/test';

// Constants
import { baseRequestTimeout } from '../../src/app/core/constants/timeout';

export const waitForHomeData = async (page: Page) => {
  await page.locator('app-home app-page-loader').waitFor({
    state: 'detached',
    timeout: baseRequestTimeout,
  });

  await page.waitForTimeout(50);
};
