import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaginatedCards from '.';
import { axe, toHaveNoViolations } from 'jest-axe';
import { mockPagedData } from '../../../mocks';

import React from 'react';

expect.extend(toHaveNoViolations);

describe('Paginated Cards', () => {
  const template = (
    <PaginatedCards
      test-id="editor"
      data={mockPagedData}
      currentPage={mockPagedData.page}
      currentUrl={'example.com'}
      pageUrl="/blog"
    />
  );

  it('passes axe audit', async () => {
    await act(async () => {
      const { container } = render(template);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it('is present in layout', async () => {
    let layout;
    await act(async () => {
      render(template);
    });
    await waitFor(async () => {
      layout = await screen.findByTestId('paginated-cards');
      expect(layout).toBeInTheDocument();
    });
  });
});
