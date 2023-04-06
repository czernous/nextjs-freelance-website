import { ComponentMeta, ComponentStory } from '@storybook/react';
import ImageUpload from '.';

export default {
  title: 'Molecules/Image Upload',
  component: ImageUpload,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    isOpen: true,
  },
} as unknown as ComponentMeta<typeof ImageUpload>;

const Template: ComponentStory<typeof ImageUpload> = (args) => (
  <ImageUpload {...args} />
);

export const Default = Template.bind({});

Default.args = {
  isOpen: true,
};
