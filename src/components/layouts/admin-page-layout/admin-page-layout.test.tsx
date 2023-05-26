import { act, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { axe, toHaveNoViolations } from 'jest-axe';

import React from 'react';

import AdminPageLayout from './index';

import { render } from '../../../utils/testing';

expect.extend(toHaveNoViolations);

describe('Admin Page Layout', () => {
  let layout;

  beforeEach(async () => {
    layout = render(<AdminPageLayout title="test" />);
  });

  it('passes axe audit', async () => {
    const { container } = layout;
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it('is present in layout', async () => {
    const layout = await screen.findByTestId('admin-layout');
    await waitFor(() => expect(layout).toBeInTheDocument());
  });

  it('is rendered unchanged', () => {
    const { container } = layout;
    expect(container).toMatchSnapshot();
  });
});
