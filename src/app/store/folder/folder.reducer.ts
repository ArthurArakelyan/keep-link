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
import { deleteUserFulfilled } from '../user';

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
  error: {
    getFolders: false,
  },
  requested: {
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
      error: {
        ...state.error,
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
      error: {
        ...state.error,
        getFolders: false,
      },
      requested: {
        ...state.requested,
        getFolders: true,
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
      error: {
        ...state.error,
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
  on(logout, deleteUserFulfilled, () => {
    return initialState;
  }),
);
