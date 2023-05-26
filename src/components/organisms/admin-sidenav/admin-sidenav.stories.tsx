import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import AdminSidenav from '.';

export default {
  title: 'Organisms/Admin Sidenav',
  component: AdminSidenav,
} as unknown as Meta<typeof AdminSidenav>;

const Template: StoryFn<typeof AdminSidenav> = () => (
  <AdminSidenav galleryIdent={'test-gallery'} />
);

export const AdminSidenavTemplate = Template.bind({});
