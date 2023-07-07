import { createReducer, on } from '@ngrx/store';

// Types
import { FolderState } from './folder.state';
import { getFolders } from './folder.actions';

export const initialState: FolderState = {
  list: [
    {
      id: 'test',
      name: 'Folder',
      description: 'eget dolor morbi non arcu risus quis varius quam quisque id diam vel quam elementum pulvinar etiam non quam lacus',
      links: [
        {
          id: 'test1',
          name: 'Google',
          link: 'https://www.google.com/',
        },
        {
          id: 'test2',
          name: 'Google Google Google Google Google Google Google',
          link: 'https://www.google.com/',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_Homepage.svg/1200px-Google_Homepage.svg.png',
        },
        {
          id: 'test3',
          name: 'Google',
          link: 'https://www.google.com/',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_Homepage.svg/1200px-Google_Homepage.svg.png',
        },
      ],
    },
    {
      id: 'test 2',
      name: 'Folder 2',
      links: [
        {
          id: 'test1',
          name: 'Google',
          link: 'https://www.google.com/',
        },
        {
          id: 'test2',
          name: 'Google Google Google Google Google Google Google',
          link: 'https://www.google.com/',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_Homepage.svg/1200px-Google_Homepage.svg.png',
        },
        {
          id: 'test3',
          name: 'Google Google Google Google Google Google Google',
          link: 'https://www.google.com/',
        },
        {
          id: 'test4',
          name: 'Google Google Google Google Google Google Google',
          link: 'https://www.google.com/',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_Homepage.svg/1200px-Google_Homepage.svg.png',
        },
      ],
    },
    {
      id: 'test 3',
      name: 'Folder 3',
      links: [
        {
          id: 'test1',
          name: 'Google',
          link: 'https://www.google.com/',
        },
        {
          id: 'test2',
          name: 'Google Google Google Google Google Google Google',
          link: 'https://www.google.com/',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_Homepage.svg/1200px-Google_Homepage.svg.png',
        },
      ],
    },
  ],
  loading: {
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
    };
  }),
);
