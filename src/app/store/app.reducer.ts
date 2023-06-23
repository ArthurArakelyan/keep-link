import { ActionReducerMap } from '@ngrx/store';

// Reducers
import { themeReducer, ThemeState } from './theme';
import { authReducer, AuthState } from './auth';
import { userReducer, UserState } from './user';

export interface AppStore {
  theme: ThemeState;
  auth: AuthState;
  user: UserState;
}

export const appReducer: ActionReducerMap<AppStore> = {
  theme: themeReducer,
  auth: authReducer,
  user: userReducer,
};
