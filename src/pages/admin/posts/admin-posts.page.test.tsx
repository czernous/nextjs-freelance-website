import { act, render, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import PostsAdmin from './index.page';

import React from 'react';
import { mockPagedData } from '../../../mocks';

expect.extend(toHaveNoViolations);

const mockedFetch = jest.fn();
global.fetch = mockedFetch;

describe('Posts list', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      json: jest
        .fn()
        .mockResolvedValue({ message: 'Success', data: mockPagedData }),
    } as unknown as Response);
  });
  const template = <PostsAdmin />;

  it('has no axe violations', async () => {
    // Mock the fetch call inside useEffect
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({
        data: mockPagedData,
      }),
    });

    await act(async () => {
      const { container } = render(template);

      expect(await axe(container)).toHaveNoViolations();
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1); // Check if fetch is called
    });
  });
});
