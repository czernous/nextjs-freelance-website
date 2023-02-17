import { render, RenderResult, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import AdminHome from './index.page';
import { act } from 'react-dom/test-utils';
import React from 'react';

import { IHomePage } from '../../../../interfaces';
import { mockNextRouter } from '../../../../utils';

expect.extend(toHaveNoViolations);

const data: IHomePage = {
  pageFields: {
    ctaBtnHref: 'https://google.com',
    ctaBtnText: 'Get stuff',
    ctaHeadline: 'Are you looking to get awesome stuff??',
    ctaSubheadline: 'We have the most awesome stuff on the internet!',
  },
  slug: 'home',
  meta: {
    metaDescription: 'Test',
    metaKeywords: 'test',
    openGraph: {
      title: 'Test',
      description: 'test',
      imageUrl: 'http://g.com',
    },
  },

  updatedAt: '2023-02-16T15:47:25.559Z',
};

let component: RenderResult;
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    STRAPI_HOST: process.env.STRAPI_HOST,
  },
}));

beforeEach(async () => {
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
