import { act, render, screen, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import Services from './index._page';

import React from 'react';
import { servicesPageMock } from '../../mocks';

expect.extend(toHaveNoViolations);

describe('Services', () => {
  it('renders a heading (h1 - title)', async () => {
    render(<Services data={servicesPageMock} />);

    const heading = screen.getAllByRole('heading');

    await waitFor(() => expect(heading[0]).toBeInTheDocument());
  });

  it('renders homepage unchanged', () => {
    const { container } = render(<Services data={servicesPageMock} />);
    expect(container).toMatchSnapshot();
  });

  it('has no axe violations', async () => {
    const { container } = render(<Services data={servicesPageMock} />);
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
