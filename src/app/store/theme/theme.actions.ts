import { createAction, props } from '@ngrx/store';

// Models
import { ThemeType } from '../../core/models/theme.model';

export const changeTheme = createAction(
  '[Theme] Change theme',
  props<{ payload: ThemeType }>(),
);
