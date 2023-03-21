import { act, render, RenderResult } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

import React from 'react';
import { contactPageMock } from '../../mocks';
import Contact from './index.page';

expect.extend(toHaveNoViolations);

let component: RenderResult;

beforeEach(async () => {
  component = render(<Contact data={contactPageMock} />);
});

describe('Contact', () => {
  it('renders contact page unchanged', () => {
    const { container } = component;
    expect(container).toMatchSnapshot();
  });

  it('has no axe violations', async () => {
    const { container } = component;
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
