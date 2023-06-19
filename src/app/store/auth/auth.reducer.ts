import { createReducer, on } from '@ngrx/store';

// Actions
import {
  login,
  loginFulfilled,
  loginRejected,
  signup,
  signupFulfilled,
  signupRejected,
} from './auth.actions';

// Types
import { AuthState } from './auth.state';

export const initialState: AuthState = {
  isAuth: false,
  loading: {
    login: false,
    signup: false,
  },
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        login: true,
      },
    };
  }),
  on(loginFulfilled, (state) => {
    return {
      ...state,
      isAuth: true,
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
  on(signupFulfilled, (state) => {
    return {
      ...state,
      isAuth: true,
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
      loading: {
        ...state.loading,
        signup: false,
      },
    };
  }),
);
