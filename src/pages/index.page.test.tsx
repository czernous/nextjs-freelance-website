import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import Home from './index.page';
import { act } from 'react-dom/test-utils';

expect.extend(toHaveNoViolations);

describe('Home', () => {
  it('renders a heading (h1 - title)', () => {
    render(<Home />);

    const heading = screen.getAllByRole('heading');

    expect(heading[0]).toBeInTheDocument();
  });

  it('renders homepage unchanged', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  test('has no axe violations', async () => {
    const { container } = render(<Home />);
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
