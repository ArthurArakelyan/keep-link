import { createAction, props } from '@ngrx/store';

// Models
import { ColorSchemeType, ThemeType } from '../../core/models/theme.model';

export const changeTheme = createAction(
  '[Theme] Change theme',
  props<{ payload: ThemeType }>(),
);

export const changePreferredTheme = createAction(
  '[Theme] Change preferred theme',
  props<{ payload: ColorSchemeType }>(),
);

export const changePreferredContrast = createAction(
  '[Theme] Change preferred contrast',
  props<{ payload: boolean }>(),
);
