import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import Home from './index.page';
import { act } from 'react-dom/test-utils';
import React from 'react';

expect.extend(toHaveNoViolations);

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    STRAPI_HOST: process.env.STRAPI_HOST,
  },
}));

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');

  useRouter.mockImplementation(() => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
    beforePopState: jest.fn(() => null),
    prefetch: jest.fn(() => null),
  }));
});

describe('Home', () => {
  it('renders a heading (h1 - title)', () => {
    render(
      <Home
        data={{
          data: undefined,
        }}
      />,
    );

    const heading = screen.getAllByRole('heading');

    expect(heading[0]).toBeInTheDocument();
  });

  it('renders homepage unchanged', () => {
    const { container } = render(
      <Home
        data={{
          data: undefined,
        }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test('has no axe violations', async () => {
    const { container } = render(
      <Home
        data={{
          data: undefined,
        }}
      />,
    );
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
