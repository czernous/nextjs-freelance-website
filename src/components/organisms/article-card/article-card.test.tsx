import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArticleCard from './index';
import { cardMock, imageMock } from './mocks';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';

expect.extend(toHaveNoViolations);

const mockedFetch = jest.fn();
global.fetch = mockedFetch;

jest.mock('../../../utils/data-fetching/client', () => ({
  fetchAndConvertToBase64: jest
    .fn()
    .mockImplementation(() => Promise.resolve('base64')),
}));

describe('Article Card', () => {
  let card;

  const mockResponse = { data: imageMock };

  mockedFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockResponse,
  });
  beforeEach(async () => {
    await act(async () => {
      card = render(
        <ArticleCard
          imageUrl={cardMock.imageUrl}
          imageAltText={cardMock.imageAltText}
          blurredImageUrl={cardMock.blurredImageUrl}
          title={'Test Card'}
          description={'This is a test card'}
          ctaText={'Read More'}
          ctaUrl={'#'}
          unoptimized={false}
        />,
      );
    });
  });

  it('passes axe audit', async () => {
    const { container } = card;
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it('is present in layout', () => {
    const card = screen.getByText('Test Card');
    waitFor(() => expect(card).toBeInTheDocument());
  });

  it('is rendered unchanged', () => {
    const { container } = card;
    expect(container).toMatchSnapshot();
  });
});
