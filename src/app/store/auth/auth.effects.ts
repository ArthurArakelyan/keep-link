import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, switchMap, tap } from 'rxjs';

// Services
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

// Store
import { AppStore } from '../app.reducer';

// Actions
import {
  login,
  loginFulfilled,
  loginRejected,
  signup,
  signupFulfilled,
  signupRejected,
} from './auth.actions';
import { addUser } from '../user';

// Utilities
import { getFirebaseError } from '../../core/utilities/get-firebase-error';

// Constants
import { authErrors } from '../../core/constants/auth-errors';
import { verificationMessage } from '../../core/constants/error-messages';

@Injectable()
export class AuthEffects {
  login = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap(({ payload }) => {
      return this.authService.login(payload.email, payload.password)
        .pipe(
          switchMap(({ user }) => {
            if (user.emailVerified) {
              return of(loginFulfilled({ payload: user.uid }));
            }

            return this.authService.sendEmailVerification(user)
              .pipe(
                switchMap(() => {
                  this.showVerificationMessage();

                  return of(loginRejected());
                }),
                catchError((error) => {
                  this.toast.error(getFirebaseError(error.toString(), authErrors));
                  return of(loginRejected());
                }),
              );
          }),
          catchError((error) => {
            this.toast.error(getFirebaseError(error.toString(), authErrors));
            return of(loginRejected());
          }),
        );
    }),
  ));

  signup = createEffect(() => this.actions$.pipe(
    ofType(signup),
    switchMap(({ payload }) => {
      return this.authService.signup(payload.email, payload.password)
        .pipe(
          tap(({ user }) => {
            this.store.dispatch(addUser({
              payload: {
                id: user.uid,
                name: payload.name,
                email: payload.email,
                avatar: '',
              },
            }));
          }),
          switchMap(({ user }) => {
            return this.userService.addedUser$
              .pipe(
                switchMap(() => {
                  if (user.emailVerified) {
                    return of(signupFulfilled({ payload: user.uid }));
                  }

                  return this.authService.sendEmailVerification(user)
                    .pipe(
                      switchMap(() => {
                        this.showVerificationMessage();

                        this.router.navigate(['/login']);

                        return of(signupRejected());
                      }),
                      catchError((error) => {
                        this.toast.error(getFirebaseError(error.toString(), authErrors));
                        return of(signupRejected());
                      }),
                    );
                }),
                catchError(() => {
                  return of(signupRejected());
                }),
              );
          }),
          catchError((error) => {
            this.toast.error(getFirebaseError(error.toString(), authErrors));
            return of(signupRejected());
          }),
        );
    }),
  ));

  redirectOnAuth = createEffect(() => this.actions$.pipe(
    ofType(loginFulfilled, signupFulfilled),
    tap(() => {
      this.router.navigate(['/'], { replaceUrl: true });
    }),
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private toast: ToastrService,
    private router: Router,
    private store: Store<AppStore>,
  ) {}

  private showVerificationMessage() {
    this.toast.info(verificationMessage, undefined, {
      timeOut: 30000,
      progressBar: true,
    });
  }
}
