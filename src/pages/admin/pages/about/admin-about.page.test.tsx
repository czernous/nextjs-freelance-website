import { act, screen, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import AboutAdmin from './index.page';
import { render } from '../../../../utils/testing';

import React from 'react';
import { aboutPageMock } from '../../../../mocks';

expect.extend(toHaveNoViolations);

describe('About', () => {
  const template = <AboutAdmin data={aboutPageMock} />;

  it('renders an accordion heading', async () => {
    render(template);
    const heading = screen.getByText('SEO');
    await waitFor(() => expect(heading).toBeInTheDocument());
  });

  it('renders component with no data', async () => {
    render(<AboutAdmin />);
    const description = screen.getByLabelText('description');
    await waitFor(() => expect(description.textContent).toBe(''));
  });

  it('has no axe violations', async () => {
    await act(async () => {
      const { container } = render(template);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
