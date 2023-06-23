import { createReducer, on } from '@ngrx/store';

// Actions
import {
  getUserFulfilled,
  getUserRejected,
  addUserFulfilled,
} from './user.actions';

// Types
import { UserState } from './user.state';

export const initialState: UserState = {
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(getUserFulfilled, (state, action) => {
    return {
      ...state,
      user: action.payload,
    };
  }),
  on(getUserRejected, (state) => {
    return {
      ...state,
      user: null,
    };
  }),
  on(addUserFulfilled, (state, action) => {
    return {
      ...state,
      user: action.payload,
    };
  }),
);
