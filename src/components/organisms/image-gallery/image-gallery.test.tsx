import { screen, act, waitFor } from '@testing-library/react';
import React from 'react';
import ImageGallery from '.';

import '@testing-library/jest-dom';
import { render } from '../../../utils/testing';

const mockedFetch = jest.fn();
global.fetch = mockedFetch;

describe('ImageGallery', () => {
  test('renders image gallery with images', async () => {
    await act(async () => {
      render(<ImageGallery identifier="1" />);
    });

    expect(screen.getByTestId('image-gallery')).toBeInTheDocument();

    waitFor(() =>
      expect(screen.getAllByTestId('gallery-image')).toHaveLength(1),
    );
  });

  test('renders loading spinner when images are not loaded', async () => {
    await act(async () => {
      render(<ImageGallery identifier="2" />);
    });

    waitFor(() => expect(screen.getByRole('progressbar')).toBeInTheDocument());
  });
});
