import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClientPageLayout from './index';
import { clientPageMock } from './mocks';
import { axe, toHaveNoViolations } from 'jest-axe';

import React from 'react';
import { mockNextRouter } from '../../../utils';

expect.extend(toHaveNoViolations);

jest.mock('next/config', () => () => ({
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
}));

describe('Client Page Layout', () => {
  let layout;

  beforeEach(async () => {
    mockNextRouter();

    layout = render(
      <ClientPageLayout
        test-id="layout"
        pageTitle={clientPageMock.pageTitle}
        appTitle={clientPageMock.appTitle}
        meta={clientPageMock.meta}
      />,
    );
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
