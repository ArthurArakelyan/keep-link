// Types
import { IProfileTab } from '../models/tab.model';

export const profileTabs: IProfileTab[] = [
  {
    label: 'Name',
    link: '/profile/name',
  },
  {
    label: 'Avatar',
    link: '/profile/avatar',
  },
  {
    label: 'Email',
    link: '/profile/email',
  },
  {
    label: 'Password',
    link: '/profile/password',
  },
  {
    label: 'Delete Account',
    link: '/profile/delete-account',
    red: true,
  },
];
