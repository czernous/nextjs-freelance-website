import { act, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import PostsAdmin from './index.page';

import React from 'react';
import { mockPagedData } from '../../../mocks';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { fetchData } from '../../../utils/data-fetching/client';

expect.extend(toHaveNoViolations);

const mockedFetch = jest.fn();
global.fetch = mockedFetch;

jest.mock('../../../utils/data-fetching/client', () => ({
  fetchData: jest.fn().mockResolvedValue({
    ok: true,
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      get: (_: string) => 'application/json',
    },
    status: 204,
    json: () => mockPagedData,
  }),
  revalidatePosts: jest.fn(),
}));

describe('Posts list', () => {
  beforeEach(() => {
    jest.spyOn(window, 'fetch');
  });

  const template = <PostsAdmin />;

  it('has no axe violations', async () => {
    await act(async () => {
      const { container } = render(template);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
