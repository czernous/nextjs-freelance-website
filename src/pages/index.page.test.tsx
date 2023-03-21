import { act, render, screen, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import Home from './index.page';

import React from 'react';

import { homePageMock } from '../mocks';

expect.extend(toHaveNoViolations);

describe('Home', () => {
  it('renders a heading (h1 - title)', async () => {
    render(<Home data={homePageMock} />);

    const heading = screen.getAllByRole('heading');

    await waitFor(() => expect(heading[0]).toBeInTheDocument());
  });

  it('renders homepage unchanged', async () => {
    const { container } = render(<Home data={homePageMock} />);
    expect(container).toMatchSnapshot();
  });

  it('has no axe violations', async () => {
    const { container } = render(<Home data={homePageMock} />);

    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
