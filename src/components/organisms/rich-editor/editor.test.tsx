import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RichEditor from '.';
import { axe, toHaveNoViolations } from 'jest-axe';

import React from 'react';
import { mockNextRouter } from '../../../utils';

expect.extend(toHaveNoViolations);

jest.mock('next/config', () => () => ({
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
}));

describe('Rich Editor', () => {
  let layout;

  beforeEach(async () => {
    mockNextRouter();

    layout = render(<RichEditor test-id="editor" />);
  });

  it('passes axe audit', async () => {
    const { container } = layout;
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it('is present in layout', () => {
    const layout = screen.findByTestId('layout');
    waitFor(() => expect(layout).toBeInTheDocument());
  });
});
