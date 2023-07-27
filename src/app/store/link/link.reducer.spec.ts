import * as fromLink from './index';

describe('link', () => {
  describe('getLinks', () => {
    it('should set the getLinks loading to true', () => {
      const { initialState, linkReducer, getLinks } = fromLink;
      const action = getLinks();
      const state = linkReducer(initialState, action);

      expect(state.loading.getLinks).toBeTrue();
    });
  });
});
