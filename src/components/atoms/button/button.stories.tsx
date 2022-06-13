import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Button from '.';
import { Color, Size } from '../../../enums';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    buttonText: 'primaryCta',
    buttonColor: {
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
    buttonSize: {
      control: {
        type: 'select',
        options: ['small', 'regular', 'large', 'extra-large'],
      },
    },
    hasShadow: false,
    buttonFullWidth: false,
    buttonType: 'button',
  },
} as unknown as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  buttonText: 'Primary CTA',
  buttonColor: Color.Brick,
  buttonSize: Size.Regular,
  hasShadow: false,
  buttonFullWidth: false,
  buttonType: 'button',
  buttonStyle: 'primary',
};

export const PrimaryLink = Template.bind({});

PrimaryLink.args = {
  buttonText: 'Primary CTA',
  buttonColor: Color.Brick,
  buttonSize: Size.Regular,
  buttonHref: 'https://www.google.com',
  hasShadow: false,
  buttonFullWidth: false,
  buttonType: 'button',
  buttonStyle: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  buttonText: 'Secondary CTA',
  buttonColor: Color.Brick,
  buttonSize: Size.Regular,
  hasShadow: false,
  buttonFullWidth: false,
  buttonType: 'button',
  buttonStyle: 'secondary',
};

export const SecondaryLink = Template.bind({});
SecondaryLink.args = {
  buttonText: 'Secondary CTA',
  buttonColor: Color.Brick,
  buttonSize: Size.Regular,
  buttonHref: 'https://www.google.com',
  buttonTarget: '_blank',
  hasShadow: false,
  buttonFullWidth: false,
  buttonType: 'button',
  buttonStyle: 'secondary',
};

export const MainCta = Template.bind({});
MainCta.args = {
  buttonText: 'Main CTA',
  buttonColor: Color.Brick,
  buttonSize: Size.Regular,
  buttonHref: 'https://www.google.com',
  buttonTarget: '_blank',
  hasShadow: true,
  buttonFullWidth: false,
  buttonType: 'button',
  buttonStyle: 'main-cta',
};
