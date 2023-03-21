import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ClientPageLayout from '.';
import { clientPageMock } from './mocks';

export default {
  title: 'Layouts/Client Page',
  component: ClientPageLayout,
  argTypes: clientPageMock,
} as unknown as ComponentMeta<typeof ClientPageLayout>;

const Template: ComponentStory<typeof ClientPageLayout> = (args) => (
  <ClientPageLayout {...args}>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
      repellendus aliquid cupiditate sed laboriosam cum ullam explicabo
      quibusdam iste voluptatem harum nihil consequuntur vero provident, error
      ea assumenda alias ipsum.
    </p>{' '}
  </ClientPageLayout>
);

export const ClientPageLayoutTemplate = Template.bind({});
ClientPageLayoutTemplate.args = {
  pageTitle: clientPageMock.pageTitle,
  meta: clientPageMock.meta,
};
