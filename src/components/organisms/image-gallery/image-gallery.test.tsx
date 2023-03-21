import { render, screen, act, waitFor } from '@testing-library/react';
import React from 'react';
import ImageGallery from '.';
import { imageMock } from '../article-card/mocks';
import '@testing-library/jest-dom';

const mockedFetch = jest.fn();
global.fetch = mockedFetch;

describe('ImageGallery', () => {
  const imageMockCopy = JSON.parse(JSON.stringify(imageMock));

  imageMockCopy._id = '9999';

  const images = [imageMock, imageMockCopy];

  const mockResponse = { data: images };

  mockedFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockResponse,
  });

  test('renders image gallery with images', async () => {
    const onImageSelect = jest.fn();
    await act(async () => {
      render(
        <ImageGallery
          images={images}
          isOpen={true}
          onClose={jest.fn()}
          onImageSelect={onImageSelect}
        />,
      );
    });

    expect(
      screen.getByRole('heading', { name: 'Image gallery' }),
    ).toBeInTheDocument();

    expect(screen.getAllByTestId('gallery-image')).toHaveLength(2);
  });

  test('renders loading spinner when images are not loaded', async () => {
    await act(async () => {
      render(
        <ImageGallery
          images={[]}
          isOpen={true}
          onClose={jest.fn()}
          onImageSelect={jest.fn()}
        />,
      );
    });

    waitFor(() => expect(screen.getByRole('progressbar')).toBeInTheDocument());
  });
});
