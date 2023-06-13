import { act, screen, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import { render } from '../../../../utils/testing';
import BlogAdmin from './index.page';

import React from 'react';
import { contactPageMock } from '../../../../mocks';

expect.extend(toHaveNoViolations);

describe('Contact', () => {
  const template = <BlogAdmin data={contactPageMock} />;

  it('renders an accordion heading', async () => {
    render(template);
    const heading = screen.getByText('SEO');
    await waitFor(async () => expect(heading).toBeInTheDocument());
  });

  it('has no axe violations', async () => {
    await act(async () => {
      const { container } = render(template);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
