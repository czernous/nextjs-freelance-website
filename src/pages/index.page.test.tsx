import { render, RenderResult, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import Home from './index.page';
import { act } from 'react-dom/test-utils';
import React from 'react';

import { mockNextRouter } from '../utils';
import { homePageMock } from '../mocks';

expect.extend(toHaveNoViolations);

let component: RenderResult;
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    STRAPI_HOST: process.env.STRAPI_HOST,
  },
}));

beforeEach(async () => {
  mockNextRouter();
  component = render(<Home data={homePageMock} />);
});

describe('Home', () => {
  it('renders a heading (h1 - title)', () => {
    const heading = screen.getAllByRole('heading');

    expect(heading[0]).toBeInTheDocument();
  });

  it('renders homepage unchanged', () => {
    const { container } = component;
    expect(container).toMatchSnapshot();
  });

  it('has no axe violations', async () => {
    const { container } = component;
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
