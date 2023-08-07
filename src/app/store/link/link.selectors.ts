import { createSelector } from '@ngrx/store';

// Store
import { AppStore } from '../app.reducer';

export const selectLink = (state: AppStore) => state.link;

export const selectLinksWithoutFolder = createSelector(
  selectLink,
  (state) => {
    return state.list.filter((link) => !link.folderId);
  },
);

export const selectLinksWithFolder = createSelector(
  selectLink,
  (state) => {
    return state.list.filter((link) => link.folderId);
  },
);

export const selectLinkRequested = createSelector(
  selectLink,
  (state) => {
    return state.requested;
  },
);
