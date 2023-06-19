// Models
import { ThemeType } from '../../models/theme.model';

export const addColorSchemeGlobalStyle = (theme: ThemeType) => {
  try {
    const themeStyle = document.querySelector('style#theme');

    if (!themeStyle) {
      return;
    }

    themeStyle.innerHTML = `:root { color-scheme: ${theme} }`;
  } catch (e) {
    console.error(e);
  }
};
