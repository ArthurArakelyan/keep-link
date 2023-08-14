// Models
import { ColorSchemeType, ThemeType } from '../../core/models/theme.model';

export interface ThemeState {
  theme: ThemeType;
  preferredTheme: ColorSchemeType;
  preferredContrast: boolean;
}
