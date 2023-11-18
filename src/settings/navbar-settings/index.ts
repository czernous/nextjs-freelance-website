import { nanoid } from 'nanoid';
import { INavItem } from '../../interfaces';

export const navItems: INavItem[] = [
  {
    uuid: nanoid(),
    text: 'Home',
    url: '/',
  },
  {
    uuid: nanoid(),
    text: 'About',
    url: '/about',
  },
  {
    uuid: nanoid(),
    text: 'Case studies',
    url: '/case-studies',
  },
  // {
  //   uuid: nanoid(),
  //   text: 'Services',
  //   url: '/services',
  // },
  {
    uuid: nanoid(),
    text: 'Contact',
    url: '/contact',
  },
];
