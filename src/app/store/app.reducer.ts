import { ActionReducerMap } from '@ngrx/store';

// Reducers
import { themeReducer, ThemeState } from './theme';
import { authReducer, AuthState } from './auth';

export interface AppStore {
  theme: ThemeState;
  auth: AuthState;
}

export const appReducer: ActionReducerMap<AppStore> = {
  theme: themeReducer,
  auth: authReducer,
};
