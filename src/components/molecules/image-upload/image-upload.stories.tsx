import { Meta, StoryFn } from '@storybook/react';
import ImageUpload from '.';

export default {
  title: 'Molecules/Image Upload',
  component: ImageUpload,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    isOpen: true,
  },
} satisfies Meta<typeof ImageUpload>;

const Template: StoryFn<typeof ImageUpload> = (args) => (
  <ImageUpload {...args} />
);

export const Default = Template.bind({});

Default.args = {
  isOpen: true,
};
