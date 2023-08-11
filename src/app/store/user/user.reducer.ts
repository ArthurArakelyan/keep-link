import { createReducer, on } from '@ngrx/store';

// Actions
import {
  getUserFulfilled,
  getUserRejected,
  addUserFulfilled,
  editUserName,
  editUserNameFulfilled,
  editUserNameRejected,
} from './user.actions';
import { logout } from '../auth';

// Types
import { UserState } from './user.state';

export const initialState: UserState = {
  user: null,
  loading: {
    editUserName: false,
  },
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
  on(editUserName, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        editUserName: true,
      },
    };
  }),
  on(editUserNameFulfilled, (state, action) => {
    return {
      ...state,
      user: state.user ? {
        ...state.user,
        name: action.payload.name,
      } : null,
      loading: {
        ...state.loading,
        editUserName: false,
      },
    };
  }),
  on(editUserNameRejected, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        editUserName: false,
      },
    };
  }),
  on(logout, () => {
    return initialState;
  }),
);
