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

export const editUserName = createAction(
  '[User] Edit user name',
  props<{
    payload: {
      name: string;
    };
  }>(),
);

export const editUserNameFulfilled = createAction(
  '[User] Edit user name fulfilled',
  props<{
    payload: {
      name: string;
    };
  }>(),
);

export const editUserNameRejected = createAction(
  '[User] Edit user name rejected',
);
