import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, switchMap, tap } from 'rxjs';

// Services
import { AuthService } from '../../core/services/auth.service';

// Actions
import {
  login,
  loginFulfilled,
  loginRejected,
  signup,
  signupFulfilled,
  signupRejected,
} from './auth.actions';

// Utilities
import { getFirebaseError } from '../../core/utilities/getFirebaseError';

// Constants
import { authErrors } from '../../core/constants/auth-errors';

@Injectable()
export class AuthEffects {
  login = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap(({ payload }) => {
      return this.authService.login(payload.email, payload.password)
        .pipe(
          switchMap(() => {
            return of(loginFulfilled());
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
          switchMap(() => {
            return of(signupFulfilled());
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
    private toast: ToastrService,
    private router: Router,
  ) {}
}
