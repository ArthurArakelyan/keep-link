import { MetaReducer } from '@ngrx/store';

// Reducers
import { hydrationMetaReducer } from './hydration/hydartion.reducer';

export const metaReducers: MetaReducer[] = [
  hydrationMetaReducer,
];
