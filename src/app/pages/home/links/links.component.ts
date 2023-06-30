import { Component } from '@angular/core';

// Models
import { ILink } from '../../../core/models/link.model';

@Component({
  selector: 'app-links',
  templateUrl: 'links.component.html',
  styleUrls: ['links.component.scss'],
})
export class LinksComponent {
  links: ILink[] = [
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
  ];
}
