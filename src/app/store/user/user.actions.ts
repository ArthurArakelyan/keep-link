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

export const editUserAvatar = createAction(
  '[User] Edit user avatar',
  props<{
    payload: File;
  }>(),
);

export const editUserAvatarFulfilled = createAction(
  '[User] Edit user avatar fulfilled',
  props<{
    payload: {
      avatar: string;
    };
  }>(),
);

export const editUserAvatarRejected = createAction(
  '[User] Edit user avatar rejected',
);

export const deleteUserAvatar = createAction(
  '[User] Delete user avatar',
);

export const deleteUserAvatarFulfilled = createAction(
  '[User] Delete user avatar fulfilled',
);

export const deleteUserAvatarRejected = createAction(
  '[User] Delete user avatar rejected',
);

export const editUserEmail = createAction(
  '[User] Edit user email',
  props<{
    payload: {
      email: string;
      password: string;
    };
  }>(),
);

export const editUserEmailFulfilled = createAction(
  '[User] Edit user email fulfilled',
  props<{
    payload: {
      email: string;
    };
  }>(),
);

export const editUserEmailRejected = createAction(
  '[User] Edit user email rejected',
);
