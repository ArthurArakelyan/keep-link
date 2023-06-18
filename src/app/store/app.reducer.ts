import { ActionReducerMap } from '@ngrx/store';

// Reducers
import { themeReducer, ThemeState } from './theme';

export interface AppStore {
  theme: ThemeState;
}

export const appReducer: ActionReducerMap<AppStore> = {
  theme: themeReducer,
};
