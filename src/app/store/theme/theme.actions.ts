import { createAction, props } from '@ngrx/store';

// Models
import { ColorSchemeType, ThemeType } from '../../core/models/theme.model';
import { ColorType } from '../../core/models/color.model';

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

export const changeColor = createAction(
  '[Theme] Change color',
  props<{ payload: ColorType }>(),
);
