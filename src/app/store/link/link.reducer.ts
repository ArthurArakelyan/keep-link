import { createReducer, on } from '@ngrx/store';

// Actions
import {
  getLinks,
  getLinksFulfilled,
  getLinksRejected,
  addLink,
  addLinkFulfilled,
  addLinkRejected,
  editLink,
  editLinkFulfilled,
  editLinkRejected,
  deleteLink,
  deleteLinkFulfilled,
  deleteLinkRejected,
} from './link.actions';
import { logout } from '../auth';

// Types
import { LinkState } from './link.state';

export const initialState: LinkState = {
  list: [],
  loading: {
    getLinks: false,
    addLink: false,
    editLink: false,
    deleteLink: false,
  },
  error: {
    getLinks: false,
  },
  requested: {
    getLinks: false,
  },
};

export const linkReducer = createReducer(
  initialState,
  on(getLinks, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        getLinks: true,
      },
      error: {
        ...state.error,
        getLinks: false,
      },
    };
  }),
  on(getLinksFulfilled, (state, action) => {
    return {
      ...state,
      list: action.payload,
      loading: {
        ...state.loading,
        getLinks: false,
      },
      error: {
        ...state.error,
        getLinks: false,
      },
      requested: {
        ...state.requested,
        getLinks: true,
      },
    };
  }),
  on(getLinksRejected, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        getLinks: false,
      },
      error: {
        ...state.error,
        getLinks: true,
      },
    };
  }),
  on(addLink, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        addLink: true,
      },
    };
  }),
  on(addLinkFulfilled, addLinkRejected, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        addLink: false,
      },
    };
  }),
  on(editLink, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        editLink: true,
      },
    };
  }),
  on(editLinkFulfilled, editLinkRejected, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        editLink: false,
      },
    };
  }),
  on(deleteLink, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        deleteLink: true,
      },
    };
  }),
  on(deleteLinkFulfilled, deleteLinkRejected, (state) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        deleteLink: false,
      },
    };
  }),
  on(logout, () => {
    return initialState;
  }),
);
