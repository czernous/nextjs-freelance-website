import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { axe, toHaveNoViolations } from 'jest-axe';

import React from 'react';
import { mockNextRouter } from '../../../utils';
import AdminPageLayout from './index';

expect.extend(toHaveNoViolations);

jest.mock('next/config', () => () => ({
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
}));

describe('Admin Page Layout', () => {
  let layout;

  beforeEach(async () => {
    mockNextRouter();

    layout = render(<AdminPageLayout test-id="layout" title="test" />);
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

  it('is rendered unchanged', () => {
    const { container } = layout;
    expect(container).toMatchSnapshot();
  });
});
