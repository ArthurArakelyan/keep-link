// Models
import { ColorSchemeType, ThemeType } from '../../models/theme.model';

export const addColorSchemeGlobalStyle = (theme: ThemeType, preferredTheme: ColorSchemeType) => {
  try {
    const themeStyle = document.querySelector('style#theme');

    if (!themeStyle) {
      return;
    }

    const isLight = (theme === 'default' ? preferredTheme : theme).includes('light');
    const isDark = (theme === 'default' ? preferredTheme : theme).includes('dark');

    themeStyle.innerHTML = `:root { color-scheme: ${isLight ? 'light' : isDark ? 'dark' : 'light'} }`;
  } catch (e) {
    console.error(e);
  }
};
