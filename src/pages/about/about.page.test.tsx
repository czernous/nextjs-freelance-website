import { act, render, RenderResult, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import About from './index.page';
import React from 'react';
import { aboutPageMock } from '../../mocks';

expect.extend(toHaveNoViolations);

let component: RenderResult;

beforeEach(async () => {
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
