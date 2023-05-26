import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import ArticleCard from '.';
import { cardMock } from './mocks';

export default {
  title: 'Organisms/Article Card',
  component: ArticleCard,
  args: cardMock,
} satisfies Meta<typeof ArticleCard>;

const Template: StoryFn<typeof ArticleCard> = (args) => (
  <div style={{ width: '450px', display: 'flex', maxWidth: '100%' }}>
    <ArticleCard {...args} />
  </div>
);

export const ArticleCardTemplate = Template.bind({});
ArticleCardTemplate.args = {
  title: cardMock.title,
  description: cardMock.description,
  ctaText: cardMock.ctaText,
  ctaUrl: cardMock.ctaUrl,
  imageUrl: cardMock.imageUrl,
  imageAltText: cardMock.imageAltText,
  blurredImageUrl: cardMock.blurredImageUrl,
  unoptimized: cardMock.unoptimized,
};
