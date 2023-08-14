export type ThemeType = 'default' | 'light' | 'dark' | 'darkHighContrast';

export type ColorSchemeType = 'light' | 'dark';

export interface ITheme {
  theme: ThemeType;
  name: string;
  backgroundColor: string;
  textColor: string;
  second?: Omit<Omit<Omit<ITheme, 'theme'>, 'second'>, 'name'>;
}
