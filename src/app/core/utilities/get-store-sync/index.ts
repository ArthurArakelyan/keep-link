// Store
import { AppStore } from '../../../store/app.reducer';

// Utilities
import { parseJson } from '../parse-json';

// Constants
import { localStorageStoreKey } from '../../constants/local-storage-keys';

export const getStoreSync = <T>(
  reducerName: keyof AppStore,
  fallback: T,
): T => {
  try {
    const store = parseJson<AppStore>(localStorage.getItem(localStorageStoreKey));

    if (!store) {
      return fallback;
    }

    const reducerState = store[reducerName];

    if (!reducerState) {
      return fallback;
    }

    return <T>reducerState;
  } catch (e) {
    console.error(e);
    return fallback;
  }
};
