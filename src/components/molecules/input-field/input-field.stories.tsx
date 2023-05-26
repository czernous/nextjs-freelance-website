import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import InputField from '.';
import { Color, InputTypes } from '../../../enums';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/Input Field',
  component: InputField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    inputColor: {
      inputType: 'text',
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
    fieldLabel: 'Name',
    isRequired: true,
    inputId: 'example_input',
    inputAdditionalClasses: '',
    type: 'input',
  },
} satisfies Meta<typeof InputField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof InputField> = (args) => <InputField {...args} />;

export const InputFieldTemplate = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
InputFieldTemplate.args = {
  inputId: 'example_input',
  type: 'input',
  inputType: InputTypes.Text,
  inputAdditionalClasses: 'form-control',
  isRequired: true,
  inputColor: Color.Brick,
  inputPlaceholder: 'Enter your name',
  fieldLabel: 'Name',
};
