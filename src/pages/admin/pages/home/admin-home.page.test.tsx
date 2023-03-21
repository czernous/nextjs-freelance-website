import { act, render, screen, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import AdminHome from './index.page';

import React from 'react';
import { homePageMock } from '../../../../mocks';

expect.extend(toHaveNoViolations);

describe('Home', () => {
  const template = <AdminHome data={homePageMock} />;

  it('renders an accordion heading', async () => {
    render(template);
    const heading = screen.getByText('SEO');
    await waitFor(() => expect(heading).toBeInTheDocument());
  });

  it('has no axe violations', async () => {
    await act(async () => {
      const { container } = render(template);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
