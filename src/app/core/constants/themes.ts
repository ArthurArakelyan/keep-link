// Models
import { ITheme } from '../models/theme.model';

export const themes: ITheme[] = [
  {
    theme: 'default',
    name: 'System default',
    backgroundColor: '#f8f8f8',
    textColor: '#081e3b',
    second: {
      backgroundColor: '#121212',
      textColor: '#f0f0f0',
    },
  },
  {
    theme: 'light',
    name: 'Light',
    headerColor: '#ffffff',
    backgroundColor: '#f8f8f8',
    textColor: '#081e3b',
  },
  {
    theme: 'dark',
    name: 'Dark',
    headerColor: '#202020',
    backgroundColor: '#121212',
    textColor: '#f0f0f0',
  },
  {
    theme: 'darkHighContrast',
    name: 'Dark high contrast',
    headerColor: '#141414',
    backgroundColor: '#000000',
    textColor: '#ffffff',
  },
];
