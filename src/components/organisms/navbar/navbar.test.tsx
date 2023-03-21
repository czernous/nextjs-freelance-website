import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './index';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Navbar', () => {
  let navbar;

  beforeEach(async () => {
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

  it('opens mobile menu(drawer)', async () => {
    await act(async () => {
      const { container } = navbar;
      const button = await container.querySelector('[test-id="drawerButton"]');
      waitFor(() => expect(button).toBeInTheDocument());
      fireEvent(
        button,
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      );
    });
  });
});
