import * as fromFolder from './index';

// Models
import { IFolder, IFolderCreateData, IFolderWithoutId } from '../../core/models/folder.model';

describe('folder', () => {
  describe('getFolders', () => {
    it('should set the getFolders loading to true', () => {
      const { initialState, folderReducer, getFolders } = fromFolder;
      const action = getFolders();
      const state = folderReducer(initialState, action);

      expect(state.loading.getFolders).toBeTrue();
    });

    it('should set the getFolders error to false', () => {
      const { initialState, folderReducer, getFolders } = fromFolder;
      const action = getFolders();
      const state = folderReducer(initialState, action);

      expect(state.error.getFolders).toBeFalse();
    });
  });

  describe('getFoldersFulfilled', () => {
    it('should set the getFolders loading to false', () => {
      const { initialState, folderReducer, getFoldersFulfilled } = fromFolder;
      const action = getFoldersFulfilled({ payload: [] });
      const state = folderReducer(initialState, action);

      expect(state.loading.getFolders).toBeFalse();
    });

    it('should set the getFolders error to false', () => {
      const { initialState, folderReducer, getFoldersFulfilled } = fromFolder;
      const action = getFoldersFulfilled({ payload: [] });
      const state = folderReducer(initialState, action);

      expect(state.error.getFolders).toBeFalse();
    });

    it('should set the getFolders requested to true', () => {
      const { initialState, folderReducer, getFoldersFulfilled } = fromFolder;
      const action = getFoldersFulfilled({ payload: [] });
      const state = folderReducer(initialState, action);

      expect(state.requested.getFolders).toBeTrue();
    });

    it('should set the list to fetched list from payload', () => {
      const list: IFolder[] = [
        {
          id: '1',
          userId: '1',
          createdAt: 0,
          name: 'name',
          description: null,
        },
      ];

      const { initialState, folderReducer, getFoldersFulfilled } = fromFolder;
      const action = getFoldersFulfilled({ payload: list });
      const state = folderReducer(initialState, action);

      expect(state.list).toBe(list);
    });
  });

  describe('getFoldersRejected', () => {
    it('should set the getFolders loading to false', () => {
      const { initialState, folderReducer, getFoldersRejected } = fromFolder;
      const action = getFoldersRejected();
      const state = folderReducer(initialState, action);

      expect(state.loading.getFolders).toBeFalse();
    });

    it('should set the getFolders error to true', () => {
      const { initialState, folderReducer, getFoldersRejected } = fromFolder;
      const action = getFoldersRejected();
      const state = folderReducer(initialState, action);

      expect(state.error.getFolders).toBeTrue();
    });
  });

  describe('addFolder', () => {
    it('should set the addFolder loading to true', () => {
      const folder: IFolderCreateData = {
        name: 'name',
        description: null,
      };

      const { initialState, folderReducer, addFolder } = fromFolder;
      const action = addFolder({ payload: folder });
      const state = folderReducer(initialState, action);

      expect(state.loading.addFolder).toBeTrue();
    });
  });

  describe('addFolderFulfilled', () => {
    it('should set the addFolder loading to false', () => {
      const { initialState, folderReducer, addFolderFulfilled } = fromFolder;
      const action = addFolderFulfilled();
      const state = folderReducer(initialState, action);

      expect(state.loading.addFolder).toBeFalse();
    });
  });

  describe('addFolderRejected', () => {
    it('should set the addFolder loading to false', () => {
      const { initialState, folderReducer, addFolderRejected } = fromFolder;
      const action = addFolderRejected();
      const state = folderReducer(initialState, action);

      expect(state.loading.addFolder).toBeFalse();
    });
  });

  describe('editFolder', () => {
    it('should set the editFolder loading to true', () => {
      const id = '1';
      const folder: IFolderWithoutId = {
        name: 'name',
        description: null,
        createdAt: 0,
        userId: '1',
      };

      const { initialState, folderReducer, editFolder } = fromFolder;
      const action = editFolder({ payload: { id, folder } });
      const state = folderReducer(initialState, action);

      expect(state.loading.editFolder).toBeTrue();
    });
  });

  describe('editFolderFulfilled', () => {
    it('should set the editFolder loading to false', () => {
      const { initialState, folderReducer, editFolderFulfilled } = fromFolder;
      const action = editFolderFulfilled();
      const state = folderReducer(initialState, action);

      expect(state.loading.editFolder).toBeFalse();
    });
  });

  describe('editFolderRejected', () => {
    it('should set the editFolder loading to false', () => {
      const { initialState, folderReducer, editFolderRejected } = fromFolder;
      const action = editFolderRejected();
      const state = folderReducer(initialState, action);

      expect(state.loading.editFolder).toBeFalse();
    });
  });

  describe('deleteFolder', () => {
    it('should set the deleteFolder loading to true', () => {
      const id = '1';

      const { initialState, folderReducer, deleteFolder } = fromFolder;
      const action = deleteFolder({ payload: id });
      const state = folderReducer(initialState, action);

      expect(state.loading.deleteFolder).toBeTrue();
    });
  });

  describe('deleteFolderFulfilled', () => {
    it('should set the deleteFolder loading to false', () => {
      const { initialState, folderReducer, deleteFolderFulfilled } = fromFolder;
      const action = deleteFolderFulfilled();
      const state = folderReducer(initialState, action);

      expect(state.loading.deleteFolder).toBeFalse();
    });
  });

  describe('deleteFolderRejected', () => {
    it('should set the deleteFolder loading to false', () => {
      const { initialState, folderReducer, deleteFolderRejected } = fromFolder;
      const action = deleteFolderRejected();
      const state = folderReducer(initialState, action);

      expect(state.loading.deleteFolder).toBeFalse();
    });
  });
});
