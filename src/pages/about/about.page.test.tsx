import { render, RenderResult, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import About from './index.page';
import { act } from 'react-dom/test-utils';
import React from 'react';
import { mockNextRouter } from '../../utils';
import { aboutPageMock } from '../../mocks';

expect.extend(toHaveNoViolations);

jest.mock('next/config', () => () => ({
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
}));

let component: RenderResult;

beforeEach(async () => {
  mockNextRouter();
  component = render(<About data={aboutPageMock} />);
});

describe('About', () => {
  it('renders a content (p - description)', () => {
    const p = screen.getByTestId('paragraph');
    expect(p).toBeInTheDocument();
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
