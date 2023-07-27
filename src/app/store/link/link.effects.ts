import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, switchMap, withLatestFrom } from 'rxjs';

// Services
import { LinkService } from '../../core/services/link.service';

// Store
import { AppStore } from '../app.reducer';
import { selectAuthId } from '../auth';
import {
  getLinks,
  getLinksFulfilled,
  getLinksRejected,
  addLink,
  addLinkFulfilled,
  addLinkRejected, editLink, editLinkRejected, editLinkFulfilled,
} from './link.actions';

// Utilities
import { getSuccessActionMessage } from '../../core/utilities/get-success-action-message';

// Constants
import { authErrorMessage } from '../../core/constants/error-messages';

// Models
import { ILinkWithoutId } from '../../core/models/link.model';

@Injectable()
export class LinkEffects {
  private readonly itemName: string = 'Link';

  getLinks = createEffect(() => this.actions$.pipe(
    ofType(getLinks),
    withLatestFrom(this.store.select(selectAuthId)),
    switchMap(([action, userId]) => {
      if (!userId) {
        this.toast.error(authErrorMessage);
        return of(getLinksRejected());
      }

      return this.linkService.getLinks(userId)
        .pipe(
          switchMap((links) => {
            return of(getLinksFulfilled({ payload: links }));
          }),
          catchError((error) => {
            this.toast.error(error.message);
            return of(getLinksRejected());
          }),
        );
    }),
  ));

  addLink = createEffect(() => this.actions$.pipe(
    ofType(addLink),
    withLatestFrom(this.store.select(selectAuthId)),
    switchMap(([action, userId]) => {
      if (!userId) {
        this.toast.error(authErrorMessage);
        return of(addLinkRejected());
      }

      const link: ILinkWithoutId = {
        ...action.payload,
        userId,
        createdAt: Date.now(),
      };

      return this.linkService.addLink(link)
        .pipe(
          switchMap(() => {
            this.store.dispatch(getLinks());

            return this.actions$.pipe(
              ofType(getLinksFulfilled, getLinksRejected),
              switchMap(() => {
                this.toast.success(getSuccessActionMessage(this.itemName, 'added'));
                return of(addLinkFulfilled());
              }),
            );
          }),
          catchError((error) => {
            this.toast.error(error.message);
            return of(addLinkRejected());
          }),
        );
    }),
  ));

  editLink = createEffect(() => this.actions$.pipe(
    ofType(editLink),
    switchMap(({ payload }) => {
      return this.linkService.editLink(payload.id, payload.link)
        .pipe(
          switchMap(() => {
            this.store.dispatch(getLinks());

            return this.actions$.pipe(
              ofType(getLinksFulfilled, getLinksRejected),
              switchMap(() => {
                this.toast.success(getSuccessActionMessage(this.itemName, 'updated'));
                return of(editLinkFulfilled());
              }),
            );
          }),
          catchError((error) => {
            this.toast.error(error.message);
            return of(editLinkRejected());
          }),
        );
    }),
  ));

  constructor(
    private actions$: Actions,
    private store: Store<AppStore>,
    private linkService: LinkService,
    private toast: ToastrService,
  ) {}
}
