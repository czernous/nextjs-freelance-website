import { act, render, screen, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import BlogPost from './[slug].page';

import React from 'react';
import { posts } from '../../mocks';

expect.extend(toHaveNoViolations);

const mockPost = posts[0];

const template = <BlogPost data={mockPost} />;

describe('Blog post', () => {
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
