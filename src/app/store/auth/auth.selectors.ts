import { createSelector } from '@ngrx/store';

// Store
import { AppStore } from '../app.reducer';

export const selectAuth = (state: AppStore) => state.auth;
export const selectAuthId = createSelector(
  selectAuth,
  (authState) => {
    return authState.id;
  },
);
