import { AppStore } from '../app.reducer';

export const selectAuth = (state: AppStore) => state.auth;
