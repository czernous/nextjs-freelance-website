import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import Input from '.';
import { Color } from '../../../enums';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Input',
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    inputColor: {
      control: {
        type: 'select',
        options: [
          'olive',
          'gray',
          'bark',
          'brick',
          'info',
          'success',
          'warning',
          'danger',
        ],
      },
    },
  },
  args: {
    inputId: 'example_input',
    inputAdditionalClasses: '',
    type: 'input',
    isRequired: true,
  },
} satisfies Meta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const PlainInput = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
PlainInput.args = {
  inputId: 'example_input',
  type: 'input',
  inputAdditionalClasses: 'form-control',
  isRequired: true,
  inputColor: Color.Brick,
  inputPlaceholder: 'Enter your name',
};
