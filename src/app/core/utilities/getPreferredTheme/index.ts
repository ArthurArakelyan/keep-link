// Models
import { ThemeType } from '../../models/theme.model';

export const getPreferredTheme = (): ThemeType => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return isDark ? 'dark' : 'light';
};
