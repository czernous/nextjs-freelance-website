import { act, render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import Input from './index';

import { Color } from '../../../enums';
import React from 'react';

expect.extend(toHaveNoViolations);

describe('Plain Input', () => {
  let plainInput;

  beforeEach(() => {
    act(() => {
      plainInput = render(
        <Input
          type="input"
          inputId="test_input"
          inputPlaceholder="Enter your name"
          inputColor={Color.Brick}
        />,
      );
    });
  });

  test('passes axe audit', async () => {
    const { container } = plainInput;
    window.getComputedStyle = jest.fn();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders Plain Input', () => {
    const input = screen.getByPlaceholderText('Enter your name');
    expect(input).toBeInTheDocument();
  });
});

describe('Texarea Input', () => {
  let plainInput;

  beforeEach(() => {
    act(() => {
      plainInput = render(
        <Input
          type="textarea"
          inputId="test_input"
          inputPlaceholder="Enter your message"
          inputColor={Color.Brick}
        />,
      );
    });
  });

  test('passes axe audit', async () => {
    const { container } = plainInput;
    window.getComputedStyle = jest.fn();
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it('renders Textarea', () => {
    const textarea = screen.getByPlaceholderText('Enter your message');
    expect(textarea).toBeInTheDocument();
  });
});
