// Models
import { ColorSchemeType, ThemeType } from '../../core/models/theme.model';
import { ColorType } from '../../core/models/color.model';

export interface ThemeState {
  theme: ThemeType;
  preferredTheme: ColorSchemeType;
  preferredContrast: boolean;
  color: ColorType;
}
