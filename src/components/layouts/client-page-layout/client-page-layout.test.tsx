import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClientPageLayout from './index';
import { clientPageMock } from './mocks';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';

expect.extend(toHaveNoViolations);

const mockNextRouter = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');

  useRouter.mockImplementation(() => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
    beforePopState: jest.fn(() => null),
    prefetch: jest.fn(() => null),
  }));
};

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
