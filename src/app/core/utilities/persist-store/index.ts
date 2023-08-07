// Store
import { AppStore } from '../../../store/app.reducer';

// Utilities
import { copyObject } from '../copy-object';

// Constants
import { localStorageStoreKey } from '../../constants/local-storage-keys';

export const persistStore = (state: AppStore) => {
  const newState = copyObject(state);

  for (const key in newState) {
    const reducer = newState[<keyof AppStore>key];

    for (const reducerKey in reducer) {
      if (reducerKey === 'loading' || reducerKey === 'error' || reducerKey === 'requested') {
        const statePropertyToBeChanged = reducer[<keyof typeof reducer>reducerKey];

        if (typeof statePropertyToBeChanged === 'object' && !Array.isArray(statePropertyToBeChanged)) {
          for (const propertyKey in <Record<string, unknown>>statePropertyToBeChanged) {
            (<unknown>statePropertyToBeChanged[<keyof typeof statePropertyToBeChanged>propertyKey]) = false;
          }
        }
      }
    }
  }

  localStorage.setItem(localStorageStoreKey, JSON.stringify(newState));
};
