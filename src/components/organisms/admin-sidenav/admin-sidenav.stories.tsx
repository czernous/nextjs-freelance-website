import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import AdminSidenav from '.';

export default {
  title: 'Organisms/Admin Sidenav',
  component: AdminSidenav,
} as unknown as ComponentMeta<typeof AdminSidenav>;

const Template: ComponentStory<typeof AdminSidenav> = () => <AdminSidenav />;

export const AdminSidenavTemplate = Template.bind({});
