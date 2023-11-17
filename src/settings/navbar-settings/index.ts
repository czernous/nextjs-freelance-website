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
    text: 'Blog',
    url: '/blog',
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
