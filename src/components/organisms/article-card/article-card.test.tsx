import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Color, Size } from '../../../enums';
import ArticleCard from './index';
import { cardMock } from './mocks';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';

expect.extend(toHaveNoViolations);

describe('Article Card', () => {
  let card;

  beforeEach(async () => {
    card = render(
      <ArticleCard
        buttonColor={Color.Brick}
        buttonSize={Size.Regular}
        buttonType={'button'}
        buttonStyle={'secondary'}
        buttonText={''}
        buttonFullWidth={false}
        hasShadow={false}
        image={cardMock.image}
        title={'Test Card'}
        description={'This is a test card'}
        ctaText={'Read More'}
        ctaUrl={'#'}
        unoptimized={false}
      />,
    );
  });

  it('passes axe audit', async () => {
    const { container } = card;
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it('is present in layout', () => {
    const card = screen.getByText('Test Card');
    expect(card).toBeInTheDocument();
  });

  it('is rendered unchanged', () => {
    const { container } = card;
    expect(container).toMatchSnapshot();
  });
});
