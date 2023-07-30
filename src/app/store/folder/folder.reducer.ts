import { createReducer, on } from '@ngrx/store';

// Actions
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
} from './folder.actions';
import { logout } from '../auth';

// Types
import { FolderState } from './folder.state';

export const initialState: FolderState = {
  list: [],
  loading: {
    getFolders: false,
    addFolder: false,
    editFolder: false,
    deleteFolder: false,
  },
  errors: {
    getFolders: false,
  },
};

export const folderReducer = createReducer(
  initialState,
  on(getFolders, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        getFolders: true,
      },
      errors: {
        ...state.errors,
        getFolders: false,
      },
    };
  }),
  on(getFoldersFulfilled, (state, action) => {
    return {
      ...state,
      list: action.payload,
      loading: {
        ...state.loading,
        getFolders: false,
      },
      errors: {
        ...state.errors,
        getFolders: false,
      },
    };
  }),
  on(getFoldersRejected, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        getFolders: false,
      },
      errors: {
        ...state.errors,
        getFolders: true,
      },
    };
  }),
  on(addFolder, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        addFolder: true,
      },
    };
  }),
  on(addFolderFulfilled, addFolderRejected, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        addFolder: false,
      },
    };
  }),
  on(editFolder, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        editFolder: true,
      },
    };
  }),
  on(editFolderFulfilled, editFolderRejected, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        editFolder: false,
      },
    };
  }),
  on(deleteFolder, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        deleteFolder: true,
      },
    };
  }),
  on(deleteFolderFulfilled, deleteFolderRejected, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        deleteFolder: false,
      },
    };
  }),
  on(logout, () => {
    return initialState;
  }),
);
