import { Component } from '@angular/core';

// Models
import { IFolder } from '../../../core/models/folder.model';

@Component({
  selector: 'app-folders',
  templateUrl: 'folders.component.html',
  styleUrls: ['folders.component.scss'],
})
export class FoldersComponent {
  folders: IFolder[] = [
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
  ];
}
