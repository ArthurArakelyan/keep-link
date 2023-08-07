import { createSelector } from '@ngrx/store';

// Store
import { AppStore } from '../app.reducer';

export const selectFolder = (state: AppStore) => state.folder;

export const selectFolders = createSelector(
  selectFolder,
  (state) => {
    return state.list;
  },
);

export const selectFolderRequested = createSelector(
  selectFolder,
  (state) => {
    return state.requested;
  },
);
