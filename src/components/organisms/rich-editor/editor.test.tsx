import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RichEditor from '.';
import { axe, toHaveNoViolations } from 'jest-axe';

import React from 'react';

expect.extend(toHaveNoViolations);

describe('Rich Editor', () => {
  const template = <RichEditor test-id="editor" />;

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
      layout = await screen.findByTestId('editor');
      expect(layout).toBeInTheDocument();
    });
  });
});
