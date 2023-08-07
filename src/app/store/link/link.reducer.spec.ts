import * as fromLink from './index';

// Models
import { ILinkWithoutId, ILink, ILinkCreateData } from '../../core/models/link.model';

describe('link', () => {
  describe('getLinks', () => {
    it('should set the getLinks loading to true', () => {
      const { initialState, linkReducer, getLinks } = fromLink;
      const action = getLinks();
      const state = linkReducer(initialState, action);

      expect(state.loading.getLinks).toBeTrue();
    });

    it('should set the getLinks error to false', () => {
      const { initialState, linkReducer, getLinks } = fromLink;
      const action = getLinks();
      const state = linkReducer(initialState, action);

      expect(state.error.getLinks).toBeFalse();
    });
  });

  describe('getLinksFulfilled', () => {
    it('should set the getLinks loading to false', () => {
      const { initialState, linkReducer, getLinksFulfilled } = fromLink;
      const action = getLinksFulfilled({ payload: [] });
      const state = linkReducer(initialState, action);

      expect(state.loading.getLinks).toBeFalse();
    });

    it('should set the getLinks error to false', () => {
      const { initialState, linkReducer, getLinks } = fromLink;
      const action = getLinks();
      const state = linkReducer(initialState, action);

      expect(state.error.getLinks).toBeFalse();
    });

    it('should set the getLinks requested to true', () => {
      const { initialState, linkReducer, getLinks } = fromLink;
      const action = getLinks();
      const state = linkReducer(initialState, action);

      expect(state.requested.getLinks).toBeTrue();
    });

    it('should set the list to fetched list from payload', () => {
      const list: ILink[] = [
        {
          id: '1',
          userId: '1',
          createdAt: 0,
          name: 'name',
          link: 'https://google.com',
          image: '',
          folderId: null,
        },
      ];

      const { initialState, linkReducer, getLinksFulfilled } = fromLink;
      const action = getLinksFulfilled({ payload: list });
      const state = linkReducer(initialState, action);

      expect(state.list).toBe(list);
    });
  });

  describe('getLinksRejected', () => {
    it('should set the getLinks loading to false', () => {
      const { initialState, linkReducer, getLinksRejected } = fromLink;
      const action = getLinksRejected();
      const state = linkReducer(initialState, action);

      expect(state.loading.getLinks).toBeFalse();
    });

    it('should set the getLinks error to true', () => {
      const { initialState, linkReducer, getLinks } = fromLink;
      const action = getLinks();
      const state = linkReducer(initialState, action);

      expect(state.error.getLinks).toBeTrue();
    });
  });

  describe('addLink', () => {
    it('should set the addLink loading to true', () => {
      const link: ILinkCreateData = {
        name: 'name',
        link: 'https://google.com',
        folderId: null,
      };

      const { initialState, linkReducer, addLink } = fromLink;
      const action = addLink({ payload: link });
      const state = linkReducer(initialState, action);

      expect(state.loading.addLink).toBeTrue();
    });
  });

  describe('addLinkFulfilled', () => {
    it('should set the addLink loading to false', () => {
      const { initialState, linkReducer, addLinkFulfilled } = fromLink;
      const action = addLinkFulfilled();
      const state = linkReducer(initialState, action);

      expect(state.loading.addLink).toBeFalse();
    });
  });

  describe('addLinkRejected', () => {
    it('should set the addLink loading to false', () => {
      const { initialState, linkReducer, addLinkRejected } = fromLink;
      const action = addLinkRejected();
      const state = linkReducer(initialState, action);

      expect(state.loading.addLink).toBeFalse();
    });
  });

  describe('editLink', () => {
    it('should set the editLink loading to true', () => {
      const id = '1';
      const link: ILinkWithoutId = {
        userId: '1',
        createdAt: 0,
        name: 'name',
        link: 'https://google.com',
        image: '',
        folderId: null,
      };

      const { initialState, linkReducer, editLink } = fromLink;
      const action = editLink({ payload: { id, link } });
      const state = linkReducer(initialState, action);

      expect(state.loading.editLink).toBeTrue();
    });
  });

  describe('editLinkFulfilled', () => {
    it('should set the editLink loading to false', () => {
      const { initialState, linkReducer, editLinkFulfilled } = fromLink;
      const action = editLinkFulfilled();
      const state = linkReducer(initialState, action);

      expect(state.loading.editLink).toBeFalse();
    });
  });

  describe('editLinkRejected', () => {
    it('should set the editLink loading to false', () => {
      const { initialState, linkReducer, editLinkRejected } = fromLink;
      const action = editLinkRejected();
      const state = linkReducer(initialState, action);

      expect(state.loading.editLink).toBeFalse();
    });
  });

  describe('deleteLink', () => {
    it('should set the deleteLink loading to true', () => {
      const id = '1';

      const { initialState, linkReducer, deleteLink } = fromLink;
      const action = deleteLink({ payload: id });
      const state = linkReducer(initialState, action);

      expect(state.loading.deleteLink).toBeTrue();
    });
  });

  describe('deleteLinkFulfilled', () => {
    it('should set the deleteLink loading to false', () => {
      const { initialState, linkReducer, deleteLinkFulfilled } = fromLink;
      const action = deleteLinkFulfilled();
      const state = linkReducer(initialState, action);

      expect(state.loading.deleteLink).toBeFalse();
    });
  });

  describe('deleteLinkRejected', () => {
    it('should set the deleteLink loading to false', () => {
      const { initialState, linkReducer, deleteLinkRejected } = fromLink;
      const action = deleteLinkRejected();
      const state = linkReducer(initialState, action);

      expect(state.loading.deleteLink).toBeFalse();
    });
  });
});
