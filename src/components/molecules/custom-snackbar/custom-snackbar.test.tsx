import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import CustomSnackbar from '.';

describe('CustomSnackbar component', () => {
  it('renders correctly with default values', async () => {
    const { getByText } = render(<CustomSnackbar text="Example text" />);
    await waitFor(() => {
      expect(getByText('Example text')).toBeInTheDocument();
    });
  });
});
