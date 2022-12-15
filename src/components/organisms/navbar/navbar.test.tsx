import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './index';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Navbar', () => {
  let navbar;

  beforeEach(async () => {
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

    navbar = render(
      <Navbar
        test-id="navbar"
        navItems={[
          { uuid: '1', text: 'Home', url: '/' },
          { uuid: '2', text: 'About', url: '/about' },
        ]}
        drawerWidth={200}
      />,
    );
  });

  it('passes axe audit', async () => {
    const { container } = navbar;
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it('is present in layout', () => {
    const navbar = screen.findByTestId('navbar');
    waitFor(() => expect(navbar).toBeInTheDocument());
  });

  it('is rendered unchanged', () => {
    const { container } = navbar;
    expect(container).toMatchSnapshot();
  });
});
