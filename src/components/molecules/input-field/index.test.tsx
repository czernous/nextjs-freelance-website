import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Color } from '../../../enums';
import InputField from './index';
import React from 'react';

describe('Plain Input', () => {
  let input;

  beforeEach(async () => {
    input = render(
      <InputField
        type="input"
        inputId="test_input"
        inputPlaceholder="Enter your name"
        inputColor={Color.Brick}
        fieldLabel={'Name'}
        fieldClasses={''}
      />,
    );
  });

  it('renders input field unchanged', () => {
    const { container } = input;
    expect(container).toMatchSnapshot();
  });

  it('renders Input Field', () => {
    const input = screen.getByPlaceholderText('Enter your name');
    expect(input).toBeInTheDocument();
  });
});
