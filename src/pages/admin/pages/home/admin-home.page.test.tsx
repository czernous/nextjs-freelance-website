import { render, RenderResult, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import AdminHome from './index.page';
import { act } from 'react-dom/test-utils';
import React from 'react';
import { homePageMock } from '../../../../mocks';

import { mockNextRouter } from '../../../../utils';

expect.extend(toHaveNoViolations);

let component: RenderResult;
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    STRAPI_HOST: process.env.STRAPI_HOST,
  },
}));

beforeEach(async () => {
  mockNextRouter();
  component = render(<AdminHome data={homePageMock} />);
});

describe('Home', () => {
  it('renders an accordion heading', () => {
    const heading = screen.getByText('SEO');

    expect(heading).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = component;
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
