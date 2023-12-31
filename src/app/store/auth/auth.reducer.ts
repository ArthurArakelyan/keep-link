import { createReducer, on } from '@ngrx/store';

// Actions
import {
  changeAuth,
  login,
  loginFulfilled,
  loginRejected,
  signup,
  signupFulfilled,
  signupRejected,
  forgotPassword,
  forgotPasswordFulfilled,
  forgotPasswordRejected,
  logout,
} from './auth.actions';
import { deleteUserFulfilled } from '../user/user.actions';

// Types
import { AuthState } from './auth.state';

export const initialState: AuthState = {
  id: null,
  isAuth: false,
  loading: {
    login: false,
    signup: false,
    forgotPassword: false,
  },
};

export const authReducer = createReducer(
  initialState,
  on(changeAuth, (state, action) => {
    return {
      ...state,
      isAuth: action.payload,
    };
  }),
  on(login, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        login: true,
      },
    };
  }),
  on(loginFulfilled, (state, action) => {
    return {
      ...state,
      isAuth: true,
      id: action.payload,
      loading: {
        ...state.loading,
        login: false,
      },
    };
  }),
  on(loginRejected, (state) => {
    return {
      ...state,
      isAuth: false,
      id: null,
      loading: {
        ...state.loading,
        login: false,
      },
    };
  }),
  on(signup, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        signup: true,
      },
    };
  }),
  on(signupFulfilled, (state, action) => {
    return {
      ...state,
      isAuth: true,
      id: action.payload,
      loading: {
        ...state.loading,
        signup: false,
      },
    };
  }),
  on(signupRejected, (state) => {
    return {
      ...state,
      isAuth: false,
      id: null,
      loading: {
        ...state.loading,
        signup: false,
      },
    };
  }),
  on(forgotPassword, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        forgotPassword: true,
      },
    };
  }),
  on(forgotPasswordFulfilled, forgotPasswordRejected, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        forgotPassword: false,
      },
    };
  }),
  on(logout, deleteUserFulfilled, () => {
    return initialState;
  }),
);
