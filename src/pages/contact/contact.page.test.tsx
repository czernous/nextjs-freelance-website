import { render, RenderResult } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

import { act } from 'react-dom/test-utils';
import React from 'react';
import { mockNextRouter } from '../../utils';
import { contactPageMock } from '../../mocks';
import Contact from './index.page';

expect.extend(toHaveNoViolations);

jest.mock('next/config', () => () => ({
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
}));

let component: RenderResult;

beforeEach(async () => {
  mockNextRouter();
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
