import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, switchMap, take, timeout, withLatestFrom } from 'rxjs';

// Services
import { LinkService } from '../../core/services/link.service';

// Environment
import { environment } from '../../../environments/environment';

// Store
import { AppStore } from '../app.reducer';
import { selectAuthId } from '../auth';
import {
  getLinks,
  getLinksFulfilled,
  getLinksRejected,
  addLink,
  addLinkFulfilled,
  addLinkRejected,
  editLink,
  editLinkRejected,
  editLinkFulfilled,
  deleteLink,
  deleteLinkFulfilled,
  deleteLinkRejected,
} from './link.actions';

// Utilities
import { getSuccessActionMessage } from '../../core/utilities/get-success-action-message';

// Constants
import { authErrorMessage } from '../../core/constants/error-messages';
import { baseRequestTimeout } from '../../core/constants/timeout';

// Models
import { ILinkWithoutId } from '../../core/models/link.model';
import { IGetLinkOgImageResponse } from '../../core/models/response.model';

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

      const handleOgImageResponse = (response: IGetLinkOgImageResponse) => {
        const link: ILinkWithoutId = {
          ...action.payload,
          userId,
          image: response?.success && response.data?.ogImage ? response.data.ogImage : '',
          createdAt: Date.now(),
        };

        return this.linkService.addLink(link)
          .pipe(
            switchMap(() => {
              this.store.dispatch(getLinks());

              return this.actions$.pipe(
                ofType(getLinksFulfilled, getLinksRejected),
                take(1),
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
      };

      return this.http.get<IGetLinkOgImageResponse>(`${environment.apiUrl}get-og?url=${action.payload.link}`).pipe(
        timeout(baseRequestTimeout),
        switchMap(handleOgImageResponse),
        catchError(handleOgImageResponse),
      );
    }),
  ));

  editLink = createEffect(() => this.actions$.pipe(
    ofType(editLink),
    switchMap(({ payload }) => {
      const handleOgImageResponse = (response: IGetLinkOgImageResponse) => {
        const newLink: ILinkWithoutId = {
          ... payload.link,
          image: response?.success && response.data?.ogImage ? response.data.ogImage : '',
        };

        return this.linkService.editLink(payload.id, newLink)
          .pipe(
            switchMap(() => {
              this.store.dispatch(getLinks());

              return this.actions$.pipe(
                ofType(getLinksFulfilled, getLinksRejected),
                take(1),
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
      };

      return this.http.get<IGetLinkOgImageResponse>(`${environment.apiUrl}get-og?url=${payload.link.link}`).pipe(
        timeout(baseRequestTimeout),
        switchMap(handleOgImageResponse),
        catchError(handleOgImageResponse),
      );
    }),
  ));

  deleteLink = createEffect(() => this.actions$.pipe(
    ofType(deleteLink),
    switchMap(({ payload }) => {
      return this.linkService.deleteLink(payload)
        .pipe(
          switchMap(() => {
            this.store.dispatch(getLinks());

            return this.actions$.pipe(
              ofType(getLinksFulfilled, getLinksRejected),
              take(1),
              switchMap(() => {
                this.toast.success(getSuccessActionMessage(this.itemName, 'deleted'));
                return of(deleteLinkFulfilled());
              }),
            );
          }),
          catchError((error) => {
            this.toast.error(error.message);
            return of(deleteLinkRejected());
          }),
        );
    }),
  ));

  constructor(
    private actions$: Actions,
    private store: Store<AppStore>,
    private linkService: LinkService,
    private toast: ToastrService,
    private http: HttpClient,
  ) {}
}
