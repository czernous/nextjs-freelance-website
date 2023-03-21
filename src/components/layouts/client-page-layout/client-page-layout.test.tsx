import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClientPageLayout from './index';
import { clientPageMock } from './mocks';
import { axe, toHaveNoViolations } from 'jest-axe';

import React from 'react';

expect.extend(toHaveNoViolations);

// jest.mock('next/config', () => () => ({
//   serverRuntimeConfig: {
//     PROJECT_ROOT: __dirname,
//   },
//   publicRuntimeConfig: {
//     APP_NAME: 'test',
//   },
// }));

describe('Client Page Layout', () => {
  const template = (
    <ClientPageLayout
      test-id="layout"
      pageTitle={clientPageMock.pageTitle}
      meta={clientPageMock.meta}
    />
  );

  it('passes axe audit', async () => {
    const { container } = render(template);
    await waitFor(async () =>
      expect(await axe(container)).toHaveNoViolations(),
    );
  });

  it('is present in layout', async () => {
    render(template);

    const layout = await screen.findByTestId('client-layout');
    await waitFor(() => {
      expect(layout).toBeInTheDocument();
    });
  });

  it('is rendered unchanged', async () => {
    const { container } = render(template);
    expect(container).toMatchSnapshot();
  });
});
