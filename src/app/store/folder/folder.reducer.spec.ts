import * as fromFolder from './index';

describe('folder', () => {
  describe('getFolders', () => {
    it('should set the getFolders loading to true', () => {
      const { initialState, folderReducer, getFolders } = fromFolder;
      const action = getFolders();
      const state = folderReducer(initialState, action);

      expect(state.loading.getFolders).toBeTrue();
    });
  });
});
