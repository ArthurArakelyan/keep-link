import { createAction, props } from '@ngrx/store';

// Models
import { IFolder, IFolderCreateData, IFolderWithoutId } from '../../core/models/folder.model';

export const getFolders = createAction(
  '[Folder] Get folders',
);

export const getFoldersFulfilled = createAction(
  '[Folder] Get folders fulfilled',
  props<{
    payload: IFolder[];
  }>(),
);

export const getFoldersRejected = createAction(
  '[Folder] Get folders rejected',
);

export const addFolder = createAction(
  '[Folder] Add folder',
  props<{
    payload: IFolderCreateData;
  }>(),
);

export const addFolderFulfilled = createAction(
  '[Folder] Add folder fulfilled',
);

export const addFolderRejected = createAction(
  '[Folder] Add folder rejected',
);

export const editFolder = createAction(
  '[Folder] Edit folder',
  props<{
    payload: {
      id: string;
      folder: IFolderWithoutId;
    };
  }>(),
);

export const editFolderFulfilled = createAction(
  '[Folder] Edit folder fulfilled',
);

export const editFolderRejected = createAction(
  '[Folder] Edit folder rejected',
);

export const deleteFolder = createAction(
  '[Folder] Delete folder',
  props<{
    payload: string;
  }>(),
);

export const deleteFolderFulfilled = createAction(
  '[Folder] Delete folder fulfilled',
);

export const deleteFolderRejected = createAction(
  '[Folder] Delete folder rejected',
);
