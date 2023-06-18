import { createReducer, on } from '@ngrx/store';

// Actions
import { changeTheme } from './theme.actions';

// Types
import { ThemeState } from './theme.state';

export const initialState: ThemeState = {
  theme: 'light',
  isChanged: false,
};

export const themeReducer = createReducer(
  initialState,
  on(changeTheme, (state, action) => {
    return {
      ...state,
      theme: action.payload,
      isChanged: true,
    };
  }),
);
