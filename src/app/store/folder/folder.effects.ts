import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, switchMap, take, withLatestFrom, combineLatest, delay } from 'rxjs';

// Services
import { FolderService } from '../../core/services/folder.service';
import { LinkService } from '../../core/services/link.service';

// Store
import { AppStore } from '../app.reducer';
import { selectAuthId } from '../auth';
import {
  getFolders,
  getFoldersFulfilled,
  getFoldersRejected,
  addFolder,
  addFolderFulfilled,
  addFolderRejected,
  editFolder,
  editFolderFulfilled,
  editFolderRejected,
  deleteFolder,
  deleteFolderFulfilled,
  deleteFolderRejected,
  deleteFolderLinks,
  deleteFolderLinksFulfilled,
  deleteFolderLinksRejected,
} from './folder.actions';
import { getLinks, getLinksFulfilled, getLinksRejected, selectLinksWithFolder } from '../link';

// Utilities
import { getSuccessActionMessage } from '../../core/utilities/get-success-action-message';

// Constants
import { authErrorMessage } from '../../core/constants/error-messages';

// Models
import { IFolderWithoutId } from '../../core/models/folder.model';

@Injectable()
export class FolderEffects {
  private readonly itemName: string = 'Folder';

  getFolders = createEffect(() => this.actions$.pipe(
    ofType(getFolders),
    withLatestFrom(this.store.select(selectAuthId)),
    switchMap(([action, userId]) => {
      if (!userId) {
        this.toast.error(authErrorMessage);
        return of(getFoldersRejected());
      }

      return this.folderService.getFolders(userId)
        .pipe(
          switchMap((folders) => {
            return of(getFoldersFulfilled({ payload: folders }));
          }),
          catchError((error) => {
            this.toast.error(error.message);
            return of(getFoldersRejected());
          }),
        );
    }),
  ));

  addFolder = createEffect(() => this.actions$.pipe(
    ofType(addFolder),
    withLatestFrom(this.store.select(selectAuthId)),
    switchMap(([action, userId]) => {
      if (!userId) {
        this.toast.error(authErrorMessage);
        return of(addFolderRejected());
      }

      const folder: IFolderWithoutId = {
        ...action.payload,
        userId,
        createdAt: Date.now(),
      };

      return this.folderService.addFolder(folder)
        .pipe(
          switchMap(() => {
            this.store.dispatch(getFolders());

            return this.actions$.pipe(
              ofType(getFoldersFulfilled, getFoldersRejected),
              take(1),
              switchMap(() => {
                this.toast.success(getSuccessActionMessage(this.itemName, 'added'));
                return of(addFolderFulfilled());
              }),
            );
          }),
          catchError((error) => {
            this.toast.error(error.message);
            return of(addFolderRejected());
          }),
        );
    }),
  ));

  editFolder = createEffect(() => this.actions$.pipe(
    ofType(editFolder),
    switchMap(({ payload }) => {
      return this.folderService.editFolder(payload.id, payload.folder).pipe(
        switchMap(() => {
          this.store.dispatch(getFolders());

          return this.actions$.pipe(
            ofType(getFoldersFulfilled, getFoldersRejected),
            take(1),
            switchMap(() => {
              this.toast.success(getSuccessActionMessage(this.itemName, 'updated'));
              return of(editFolderFulfilled());
            }),
          );
        }),
        catchError((error) => {
          this.toast.error(error.message);
          return of(editFolderRejected());
        }),
      );
    }),
  ));

  deleteFolder = createEffect(() => this.actions$.pipe(
    ofType(deleteFolder),
    switchMap(({ payload }) => {
      return this.folderService.deleteFolder(payload)
        .pipe(
          switchMap(() => {
            this.store.dispatch(deleteFolderLinks({ payload }));

            return this.actions$.pipe(
              ofType(deleteFolderLinksFulfilled, deleteFolderLinksRejected),
              take(1),
              switchMap(() => {
                this.store.dispatch(getFolders());

                return this.actions$.pipe(
                  ofType(getFoldersFulfilled, getFoldersRejected),
                  take(1),
                  switchMap(() => {
                    this.toast.success(getSuccessActionMessage(this.itemName, 'deleted'));
                    return of(deleteFolderFulfilled());
                  }),
                );
              }),
            );
          }),
          catchError((error) => {
            this.toast.error(error.message);
            return of(deleteFolderRejected());
          }),
        );
    }),
  ));

  deleteFolderLinks = createEffect(() => this.actions$.pipe(
    ofType(deleteFolderLinks),
    switchMap(({ payload }) => {
      return this.store.select(selectLinksWithFolder)
        .pipe(
          take(1),
          switchMap((linksWithFolder) => {
            const links = linksWithFolder.filter((link) => {
              return link.folderId === payload;
            });

            if (links.length === 0) {
              return of(deleteFolderLinksFulfilled()).pipe(
                delay(0),
              );
            }

            return combineLatest(links.map((link) => {
              return this.linkService.deleteLink(link.id);
            })).pipe(
              switchMap(() => {
                this.store.dispatch(getLinks());

                return this.actions$.pipe(
                  ofType(getLinksFulfilled, getLinksRejected),
                  take(1),
                  switchMap(() => {
                    return of(deleteFolderLinksFulfilled());
                  }),
                );
              }),
              catchError(() => {
                return of(deleteFolderLinksRejected());
              }),
            );
          }),
        );
    }),
  ));

  constructor(
    private actions$: Actions,
    private store: Store<AppStore>,
    private linkService: LinkService,
    private folderService: FolderService,
    private toast: ToastrService,
  ) {}
}
