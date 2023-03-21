import { act, render, screen, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import AdminServices from './index.page';

import React from 'react';
import { servicesPageMock } from '../../../../mocks';

expect.extend(toHaveNoViolations);

describe('Services', () => {
  const template = <AdminServices data={servicesPageMock} />;

  it('renders an accordion heading', async () => {
    render(template);
    const heading = screen.getByText('SEO');
    await waitFor(() => expect(heading).toBeInTheDocument());
  });

  it('has no axe violations', async () => {
    await act(async () => {
      const { container } = render(template);
      return expect(await axe(container)).toHaveNoViolations();
    });
  });
});
