import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';
import AdminSideNav from './index';

expect.extend(toHaveNoViolations);

describe('Admin Sidenav', () => {
  let sidenav;

  beforeEach(async () => {
    sidenav = render(
      <AdminSideNav test-id="admin-sidenav" galleryIdent={'test'} />,
    );
  });

  it('passes axe audit', async () => {
    const { container } = sidenav;
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it('is present in layout', () => {
    const sidenav = screen.findByTestId('admin-sidenav');
    waitFor(() => expect(sidenav).toBeInTheDocument());
  });

  it('is rendered unchanged', () => {
    const { container } = sidenav;
    expect(container).toMatchSnapshot();
  });
});
