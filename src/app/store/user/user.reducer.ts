import { createReducer, on } from '@ngrx/store';

// Actions
import {
  getUserFulfilled,
  getUserRejected,
  addUserFulfilled,
  editUserName,
  editUserNameFulfilled,
  editUserNameRejected,
  editUserAvatar,
  editUserAvatarFulfilled,
  editUserAvatarRejected,
  deleteUserAvatar,
  deleteUserAvatarFulfilled,
  deleteUserAvatarRejected,
} from './user.actions';
import { logout } from '../auth';

// Types
import { UserState } from './user.state';

export const initialState: UserState = {
  user: null,
  loading: {
    editUserName: false,
    editUserAvatar: false,
    deleteUserAvatar: false,
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
  on(editUserAvatar, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        editUserAvatar: true,
      },
    };
  }),
  on(editUserAvatarFulfilled, (state, action) => {
    return {
      ...state,
      user: state.user ? {
        ...state.user,
        avatar: action.payload.avatar,
      } : null,
      loading: {
        ...state.loading,
        editUserAvatar: false,
      },
    };
  }),
  on(editUserAvatarRejected, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        editUserAvatar: false,
      },
    };
  }),
  on(deleteUserAvatar, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        deleteUserAvatar: true,
      },
    };
  }),
  on(deleteUserAvatarFulfilled, (state) => {
    return {
      ...state,
      user: state.user ? {
        ...state.user,
        avatar: '',
      } : null,
      loading: {
        ...state.loading,
        deleteUserAvatar: false,
      },
    };
  }),
  on(deleteUserAvatarRejected, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        deleteUserAvatar: false,
      },
    };
  }),
  on(logout, () => {
    return initialState;
  }),
);
