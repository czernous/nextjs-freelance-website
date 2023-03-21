import { act, render, screen, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import PaginatedBlog from './[page].page';

import React from 'react';
import { mockPagedData } from '../../../mocks';

expect.extend(toHaveNoViolations);

const template = <PaginatedBlog data={mockPagedData} />;

describe('Blog (list of posts)', () => {
  it('renders a heading (h1 - title)', async () => {
    await act(async () => {
      render(template);
    });

    await waitFor(() => {
      const heading = screen.getAllByRole('heading');
      expect(heading[0]).toBeInTheDocument();
    });
  });

  it('has no axe violations', async () => {
    await act(async () => {
      const { container } = render(template);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
