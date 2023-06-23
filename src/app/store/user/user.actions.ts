import { createAction, props } from '@ngrx/store';

// Models
import { IUser } from '../../core/models/user.model';

export const getUser = createAction(
  '[User] Get user',
);

export const getUserFulfilled = createAction(
  '[User] Get user fulfilled',
  props<{ payload: IUser }>(),
);

export const getUserRejected = createAction(
  '[User] Get user rejected',
);

export const addUser = createAction(
  '[User] Add user',
  props<{ payload: IUser }>(),
);

export const addUserFulfilled = createAction(
  '[User] Add user fulfilled',
  props<{ payload: IUser }>(),
);

export const addUserRejected = createAction(
  '[User] Add user rejected',
);
