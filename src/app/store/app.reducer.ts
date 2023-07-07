import { ActionReducerMap } from '@ngrx/store';

// Reducers
import { themeReducer, ThemeState } from './theme';
import { authReducer, AuthState } from './auth';
import { userReducer, UserState } from './user';
import { linkReducer, LinkState } from './link';
import { folderReducer, FolderState } from './folder';

export interface AppStore {
  theme: ThemeState;
  auth: AuthState;
  user: UserState;
  link: LinkState;
  folder: FolderState;
}

export const appReducer: ActionReducerMap<AppStore> = {
  theme: themeReducer,
  auth: authReducer,
  user: userReducer,
  link: linkReducer,
  folder: folderReducer,
};
