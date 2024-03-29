import { createReducer, on } from '@ngrx/store';

// Actions
import { changePreferredContrast, changePreferredTheme, changeTheme, changeColor } from './theme.actions';

// Types
import { ThemeState } from './theme.state';

export const initialState: ThemeState = {
  theme: 'default',
  preferredTheme: 'light',
  preferredContrast: false,
  color: 'blue',
};

export const themeReducer = createReducer(
  initialState,
  on(changeTheme, (state, action) => {
    return {
      ...state,
      theme: action.payload,
    };
  }),
  on(changePreferredTheme, (state, action) => {
    return {
      ...state,
      preferredTheme: action.payload,
    };
  }),
  on(changePreferredContrast, (state, action) => {
    return {
      ...state,
      preferredContrast: action.payload,
    };
  }),
  on(changeColor, (state, action) => {
    return {
      ...state,
      color: action.payload,
    };
  }),
);
