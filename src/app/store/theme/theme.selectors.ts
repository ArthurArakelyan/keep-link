import { AppStore } from '../app.reducer';

export const selectTheme = (state: AppStore) => state.theme;
