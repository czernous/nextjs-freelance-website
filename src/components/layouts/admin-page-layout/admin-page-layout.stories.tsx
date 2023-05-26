import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import AdminPageLayout from '.';

export default {
  title: 'Layouts/Admin Page',
  component: AdminPageLayout,
} satisfies Meta<typeof AdminPageLayout>;

const Template: StoryFn<typeof AdminPageLayout> = (args) => (
  <AdminPageLayout {...args}>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
      repellendus aliquid cupiditate sed laboriosam cum ullam explicabo
      quibusdam iste voluptatem harum nihil consequuntur vero provident, error
      ea assumenda alias ipsum.
    </p>
  </AdminPageLayout>
);

export const ClientPageLayoutTemplate = Template.bind({});
ClientPageLayoutTemplate.args = {
  title: 'Pages/Home',
};
