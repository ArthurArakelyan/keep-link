// Constants
import { themes } from '../../constants/themes';

// Models
import { ColorSchemeType, ThemeType } from '../../models/theme.model';

export const changeThemeColor = (themeName: ThemeType, preferredTheme: ColorSchemeType) => {
  try {
    const themeData = themes.find((theme) => theme.theme === (themeName === 'default' ? preferredTheme : themeName));

    if (!themeData || !themeData.headerColor) {
      return;
    }

    const themeColor = document.head.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

    if (!themeColor) {
      return;
    }

    themeColor.content = themeData.headerColor;
  } catch (e) {
    console.error(e);
  }
};
