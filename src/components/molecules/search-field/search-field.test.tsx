import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import SearchField from '.';
import React from 'react';

expect.extend(toHaveNoViolations);

describe('SearchField', () => {
  const searchUrl = '/search';

  it('renders correctly', async () => {
    const component = render(<SearchField searchUrl={searchUrl} />);
    const textField = screen.getByPlaceholderText('Search');
    expect(textField).toBeInTheDocument();
    await waitFor(async () => {
      const searchButton = screen.getByRole('button');
      expect(searchButton).toBeInTheDocument();
      expect(await axe(component.container)).toHaveNoViolations();
    });
  });

  it('updates the search term on input change', () => {
    render(<SearchField searchUrl={searchUrl} />);
    const textField = screen.getByPlaceholderText('Search');
    fireEvent.change(textField, { target: { value: 'test' } });
    expect((textField as HTMLInputElement).value).toBe('test');
  });
});
