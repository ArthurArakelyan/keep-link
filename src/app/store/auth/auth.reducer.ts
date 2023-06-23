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
} from './auth.actions';

// Types
import { AuthState } from './auth.state';

export const initialState: AuthState = {
  id: null,
  isAuth: false,
  loading: {
    login: false,
    signup: false,
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
);
