import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, switchMap, withLatestFrom } from 'rxjs';

// Services
import { FolderService } from '../../core/services/folder.service';

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
} from './folder.actions';

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

  constructor(
    private actions$: Actions,
    private store: Store<AppStore>,
    private folderService: FolderService,
    private toast: ToastrService,
  ) {}
}
