import { createAction, props } from '@ngrx/store';

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
);

export const signupRejected = createAction(
  '[Auth] Signup Rejected',
);
