import { render, RenderResult } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import Pages from './index.page';
import { act } from 'react-dom/test-utils';
import React from 'react';

import { mockNextRouter } from '../../../utils';

expect.extend(toHaveNoViolations);

let component: RenderResult;
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    STRAPI_HOST: process.env.STRAPI_HOST,
  },
}));

beforeEach(async () => {
  mockNextRouter();
  component = render(<Pages data={['contact', 'about']} />);
});

describe('Pages index', () => {
  it('has no axe violations', async () => {
    const { container } = component;
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
