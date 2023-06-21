// Models
import { INavLink } from '../models/nav-link.model';

export const navLinks: INavLink[] = [
  {
    name: 'Links',
    icon: 'link',
    link: '/',
    exact: true,
  },
  {
    name: 'Profile',
    icon: 'user',
    link: '/profile',
    exact: false,
  },
  {
    name: 'Settings',
    icon: 'gear',
    link: '/settings',
    exact: false,
  },
];
