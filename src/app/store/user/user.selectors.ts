import { AppStore } from '../app.reducer';

export const selectUser = (state: AppStore) => state.user;
