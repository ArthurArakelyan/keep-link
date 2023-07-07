import { createReducer, on } from '@ngrx/store';

// Actions
import { getLinks } from './link.actions';

// Types
import { LinkState } from './link.state';

export const initialState: LinkState = {
  list: [
    {
      id: '1',
      name: 'Google',
      link: 'https://www.google.com/',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_Homepage.svg/1200px-Google_Homepage.svg.png',
    },
    {
      id: '2',
      name: 'Google',
      link: 'https://www.google.com/',
    },
    {
      id: '3',
      name: 'Google',
      link: 'https://www.google.com/',
    },
    {
      id: '4',
      name: 'Google',
      link: 'https://www.google.com/',
    },
  ],
  loading: {
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
    };
  }),
);
