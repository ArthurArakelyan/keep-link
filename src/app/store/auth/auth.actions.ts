import { createAction, props } from '@ngrx/store';

export const changeAuth = createAction(
  '[Auth] Change Auth',
  props<{
    payload: boolean;
  }>(),
);

export const login = createAction(
  '[Auth] Login',
  props<{
    payload: {
      email: string;
      password: string;
    };
  }>(),
);

export const loginFulfilled = createAction(
  '[Auth] Login Fulfilled',
  props<{ payload: string }>(),
);

export const loginRejected = createAction(
  '[Auth] Login Rejected',
);

export const signup = createAction(
  '[Auth] Signup',
  props<{
    payload: {
      name: string;
      email: string;
      password: string;
    };
  }>(),
);

export const signupFulfilled = createAction(
  '[Auth] Signup Fulfilled',
  props<{ payload: string }>(),
);

export const signupRejected = createAction(
  '[Auth] Signup Rejected',
);
