import { expect, test } from '@playwright/test';

// Utilities
import { login } from '../utilities/auth';

// Constants
import { themes } from '../../src/app/core/constants/themes';
import { colors } from '../../src/app/core/constants/colors';

test.beforeEach(async ({ page }) => {
  await login(page);

  await page.goto('/settings');
});

test.describe('settings', () => {
  test('should render settings', async ({ page }) => {
    await expect(page).toHaveURL('/settings');
    await expect(page).toHaveTitle('Settings | KeepLink');

    await page.locator('app-settings').isVisible();
  });

  test.describe('theme', () => {
    test('should render themes', async ({ page }) => {
      expect(await page.locator('app-settings-themes').getByRole('radio', { checked: true }).getAttribute('aria-label'))
        .toBe(themes[0].name);

      for (const theme of themes) {
        await page.locator('button[role="radio"]').getByText(theme.name, { exact: true }).isVisible();
      }
    });

    test('should change theme', async ({ page }) => {
      await page.locator('button[role="radio"]').getByText(themes[1].name, { exact: true }).click();

      expect(await page.locator('app-root').getAttribute('class')).toContain('light');

      await page.locator('button[role="radio"]').getByText(themes[2].name, { exact: true }).click();

      expect(await page.locator('app-root').getAttribute('class')).toContain('dark');

      await page.locator('button[role="radio"]').getByText(themes[3].name, { exact: true }).click();

      expect(await page.locator('app-root').getAttribute('class')).toContain('dark-high-contrast');

      // System default
      await page.emulateMedia({ colorScheme: 'dark' });

      await page.waitForTimeout(100);

      await page.locator('button[role="radio"]').getByText(themes[0].name, { exact: true }).click();

      expect(await page.locator('app-root').getAttribute('class')).toContain('dark');

      await page.emulateMedia({ colorScheme: 'light' });

      await page.waitForTimeout(100);

      expect(await page.locator('app-root').getAttribute('class')).toContain('light');
    });
  });

  test.describe('color', () => {
    test('should render colors', async ({ page }) => {
      expect(await page.locator('app-settings-colors').getByRole('radio', { checked: true }).getAttribute('aria-label'))
        .toBe(colors[0].name);

      for (const color of colors) {
        await page.locator('app-settings-color button[role="radio"]').getByText(color.name, { exact: true }).isVisible();
      }
    });

    test('should change color', async ({ page }) => {
      for (const color of colors) {
        await page.locator(`app-settings-color button[aria-label="${color.name}"]`).click();

        await page.waitForTimeout(100);

        expect(await page.locator('app-root').getAttribute('class')).toContain(color.name);
      }
    });
  });
});
