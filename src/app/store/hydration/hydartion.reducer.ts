import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

// Store
import { AppStore } from '../app.reducer';

// Utilities
import { persistStore } from '../../core/utilities/persist-store';

// Constants
import { localStorageStoreKey } from '../../core/constants/local-storage-keys';

export const hydrationMetaReducer = (
  reducer: ActionReducer<AppStore>,
): ActionReducer<AppStore> => {
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem(localStorageStoreKey);

      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem(localStorageStoreKey);
        }
      }
    }

    const nextState = reducer(state, action);

    persistStore(nextState);

    return nextState;
  };
};
