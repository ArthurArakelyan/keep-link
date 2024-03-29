export type ThemeType = 'default' | 'light' | 'dark' | 'darkHighContrast';

export type ColorSchemeType = 'light' | 'dark';

export interface ITheme {
  theme: ThemeType;
  name: string;
  headerColor?: string;
  backgroundColor: string;
  textColor: string;
  second?: {
    backgroundColor: string;
    textColor: string;
  };
}
