import { render, RenderResult, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import Services from './index.page';
import { act } from 'react-dom/test-utils';
import React from 'react';
import { mockNextRouter } from '../../utils';
import { servicesPageMock } from '../../mocks';

expect.extend(toHaveNoViolations);

jest.mock('next/config', () => () => ({
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
}));

let component: RenderResult;

beforeEach(async () => {
  mockNextRouter();
  component = render(<Services data={servicesPageMock} />);
});

describe('Services', () => {
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
