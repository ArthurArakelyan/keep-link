import { createReducer, on } from '@ngrx/store';

// Actions
import { changePreferredContrast, changePreferredTheme, changeTheme } from './theme.actions';

// Types
import { ThemeState } from './theme.state';

export const initialState: ThemeState = {
  theme: 'default',
  preferredTheme: 'light',
  preferredContrast: false,
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
);
