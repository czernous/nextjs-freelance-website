import { render, RenderResult, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import AdminHome from './index.page';
import { act } from 'react-dom/test-utils';
import React from 'react';
import * as homePageData from '../../../../public/data/pages/home.json';
import { IHomePage } from '../../../../interfaces';
import { mockNextRouter } from '../../../../utils';

expect.extend(toHaveNoViolations);

let data: IHomePage;
let component: RenderResult;
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    STRAPI_HOST: process.env.STRAPI_HOST,
  },
}));

beforeEach(async () => {
  data = await JSON.parse(JSON.stringify(homePageData));
  mockNextRouter();
  component = render(<AdminHome data={data} />);
});

describe('Home', () => {
  it('renders a heading (h1 - title)', () => {
    const heading = screen.getAllByRole('heading');

    expect(heading[0]).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = component;
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
