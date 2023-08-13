import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, switchMap, take, tap, combineLatest, map } from 'rxjs';

// Services
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';

// Store
import { AppStore } from '../app.reducer';
import { selectAuthId } from '../auth';
import { selectUser } from './user.selectors';
import { selectFolders } from '../folder';

// Actions
import {
  getUser,
  getUserFulfilled,
  getUserRejected,
  addUser,
  addUserFulfilled,
  addUserRejected,
  editUserName,
  editUserNameFulfilled,
  editUserNameRejected,
  editUserAvatar,
  editUserAvatarFulfilled,
  editUserAvatarRejected,
  deleteUserAvatar,
  deleteUserAvatarFulfilled,
  deleteUserAvatarRejected,
  editUserEmail,
  editUserEmailFulfilled,
  editUserEmailRejected,
  editUserPassword,
  editUserPasswordFulfilled,
  editUserPasswordRejected,
  deleteUser,
  deleteUserFulfilled,
  deleteUserRejected,
} from './user.actions';

// Utilities
import { deleteIdFromObject } from '../../core/utilities/delete-id-from-object';
import { getSuccessActionMessage } from '../../core/utilities/get-success-action-message';
import { getFirebaseError } from '../../core/utilities/get-firebase-error';

// Constants
import { authErrorMessage } from '../../core/constants/error-messages';
import { authErrors } from '../../core/constants/auth-errors';

// Models
import { IUserWithoutId } from '../../core/models/user.model';
import { FolderService } from '../../core/services/folder.service';
import { LinkService } from '../../core/services/link.service';
import { selectLink, selectLinks } from '../link';

@Injectable()
export class UserEffects {
  getUser = createEffect(() => this.actions$.pipe(
    ofType(getUser),
    switchMap(() => {
      return this.store.select(selectAuthId)
        .pipe(
          take(1),
          switchMap((uid) => {
            if (!uid) {
              return of(getUserRejected());
            }

            return this.userService.getUser(uid)
              .pipe(
                switchMap((user) => {
                  return of(getUserFulfilled({ payload: user }));
                }),
                catchError((error) => {
                  this.toast.error(error.message);
                  return of(getUserRejected());
                }),
              );
          }),
        );
    }),
  ));

  addUser = createEffect(() => this.actions$.pipe(
    ofType(addUser),
    switchMap(({ payload }) => {
      const user = deleteIdFromObject(payload);

      return this.userService.addUser(user, payload.id)
        .pipe(
          switchMap(() => {
            return of(addUserFulfilled({ payload }));
          }),
          catchError((error) => {
            this.toast.error(error.message);
            return of(addUserRejected());
          }),
        );
    }),
  ));

  addedUser = createEffect(() => this.actions$.pipe(
    ofType(addUserFulfilled, addUserRejected),
    tap(({ type }) => {
      if (type.toLocaleLowerCase().includes('rejected')) {
        this.userService.addedUser$.error('');
        return;
      }

      this.userService.addedUser$.next(true);
    }),
  ), { dispatch: false });

  editUserName = createEffect(() => this.actions$.pipe(
    ofType(editUserName),
    switchMap(({ payload }) => {
      return this.store.select(selectUser).pipe(
        take(1),
        switchMap(({ user }) => {
          if (!user) {
            this.toast.error(authErrorMessage);
            return of(editUserNameRejected());
          }

          const userWithoutId: IUserWithoutId = {
            ...deleteIdFromObject(user),
            name: payload.name,
          };

          return this.userService.editUser(user.id, userWithoutId).pipe(
            switchMap(() => {
              this.toast.success(getSuccessActionMessage('Name', 'updated'));
              return of(editUserNameFulfilled({ payload: { name: payload.name } }));
            }),
            catchError((error) => {
              this.toast.error(error.message);
              return of(editUserNameRejected());
            }),
          );
        }),
      );
    }),
  ));

  editUserAvatar = createEffect(() => this.actions$.pipe(
    ofType(editUserAvatar),
    switchMap(({ payload }) => {
      return this.store.select(selectUser).pipe(
        take(1),
        switchMap(({ user }) => {
          if (!user) {
            this.toast.error(authErrorMessage);
            return of(editUserAvatarRejected());
          }

          return this.userService.addAvatar(payload, user.id).pipe(
            switchMap(() => {
              return this.userService.getAvatar(user.id).pipe(
                switchMap((avatar) => {
                  const userWithoutId: IUserWithoutId = {
                    ...deleteIdFromObject(user),
                    avatar,
                  };

                  return this.userService.editUser(user.id, userWithoutId).pipe(
                    switchMap(() => {
                      this.toast.success(getSuccessActionMessage('Avatar', 'updated'));
                      return of(editUserAvatarFulfilled({ payload: { avatar } }));
                    }),
                    catchError((error) => {
                      this.toast.error(error.message);
                      return of(editUserAvatarRejected());
                    }),
                  );
                }),
                catchError((error) => {
                  this.toast.error(error.message);
                  return of(editUserAvatarRejected());
                }),
              );
            }),
            catchError((error) => {
              this.toast.error(error.message);
              return of(editUserAvatarRejected());
            }),
          );
        }),
      );
    }),
  ));

  deleteUserAvatar = createEffect(() => this.actions$.pipe(
    ofType(deleteUserAvatar),
    switchMap(() => {
      return this.store.select(selectUser).pipe(
        take(1),
        switchMap(({ user }) => {
          if (!user) {
            this.toast.error(authErrorMessage);
            return of(deleteUserAvatarRejected());
          }

          return this.userService.deleteAvatar(user.id).pipe(
            switchMap(() => {
              const userWithoutId: IUserWithoutId = {
                ...deleteIdFromObject(user),
                avatar: '',
              };

              return this.userService.editUser(user.id, userWithoutId).pipe(
                switchMap(() => {
                  this.toast.success(getSuccessActionMessage('Avatar', 'deleted'));
                  return of(deleteUserAvatarFulfilled());
                }),
                catchError((error) => {
                  this.toast.error(error.message);
                  return of(deleteUserAvatarRejected());
                }),
              );
            }),
            catchError((error) => {
              this.toast.error(error.message);
              return of(deleteUserAvatarRejected());
            }),
          );
        }),
      );
    }),
  ));

  editUserEmail = createEffect(() => this.actions$.pipe(
    ofType(editUserEmail),
    switchMap(({ payload }) => {
      return this.store.select(selectUser).pipe(
        take(1),
        switchMap(({ user }) => {
          if (!user) {
            this.toast.error(authErrorMessage);
            return of(editUserEmailRejected());
          }

          return this.authService.login(user.email, payload.password).pipe(
            switchMap(() => {
              return this.authService.changeEmail(payload.email).pipe(
                switchMap(() => {
                  this.toast.success(getSuccessActionMessage('Email', 'updated'));
                  return of(editUserEmailFulfilled({ payload: { email: payload.email } }));
                }),
                catchError((error) => {
                  this.toast.error(getFirebaseError(error.toString(), authErrors));
                  return of(editUserEmailRejected());
                }),
              );
            }),
            catchError((error) => {
              this.toast.error(getFirebaseError(error.toString(), authErrors));
              return of(editUserEmailRejected());
            }),
          );
        }),
      );
    }),
  ));

  editUserPassword = createEffect(() => this.actions$.pipe(
    ofType(editUserPassword),
    switchMap(({ payload }) => {
      return this.store.select(selectUser).pipe(
        take(1),
        switchMap(({ user }) => {
          if (!user) {
            this.toast.error(authErrorMessage);
            return of(editUserPasswordRejected());
          }

          return this.authService.login(user.email, payload.oldPassword).pipe(
            switchMap(() => {
              return this.authService.changePassword(payload.password).pipe(
                switchMap(() => {
                  this.toast.success(getSuccessActionMessage('Password', 'updated'));
                  return of(editUserPasswordFulfilled());
                }),
                catchError((error) => {
                  this.toast.error(getFirebaseError(error.toString(), authErrors));
                  return of(editUserPasswordRejected());
                }),
              );
            }),
            catchError((error) => {
              this.toast.error(getFirebaseError(error.toString(), authErrors));
              return of(editUserPasswordRejected());
            }),
          );
        }),
      );
    }),
  ));

  deleteUser = createEffect(() => this.actions$.pipe(
    ofType(deleteUser),
    switchMap(({ payload }) => {
      return this.store.select(selectUser).pipe(
        take(1),
        switchMap(({ user }) => {
          if (!user) {
            this.toast.error(authErrorMessage);
            return of(deleteUserRejected());
          }

          return this.authService.login(user.email, payload.password).pipe(
            switchMap(() => {
              return combineLatest(
                [
                  this.userService.deleteUser(user.id),
                  this.userService.deleteAvatar(user.id),
                  this.store.select(selectFolders).pipe(
                    map((folders) => {
                      return folders.filter((folder) => folder.userId === user.id);
                    }),
                    switchMap((folders) => {
                      return combineLatest(
                        folders.map((folder) => {
                          return this.folderService.deleteFolder(folder.id);
                        }),
                      );
                    }),
                  ),
                  this.store.select(selectLinks).pipe(
                    map((links) => {
                      return links.filter((folder) => folder.userId === user.id);
                    }),
                    switchMap((links) => {
                      return combineLatest(
                        links.map((link) => {
                          return this.linkService.deleteLink(link.id);
                        }),
                      );
                    }),
                  ),
                ],
              ).pipe(
                switchMap(() => {
                  return this.authService.deleteUser().pipe(
                    switchMap(() => {
                      return of(deleteUserFulfilled());
                    }),
                    catchError((error) => {
                      this.toast.error(getFirebaseError(error.toString(), authErrors));
                      return of(deleteUserRejected());
                    }),
                  );
                }),
                catchError((error) => {
                  this.toast.error(error.message);
                  return of(deleteUserRejected());
                }),
              );
            }),
            catchError((error) => {
              this.toast.error(getFirebaseError(error.toString(), authErrors));
              return of(deleteUserRejected());
            }),
          );
        }),
      );
    }),
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private authService: AuthService,
    private folderService: FolderService,
    private linkService: LinkService,
    private toast: ToastrService,
    private store: Store<AppStore>,
  ) {}
}
