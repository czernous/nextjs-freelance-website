import { IArticleCard, IImage } from '../../../../interfaces';
import { base64ImgSmall, base64ImgMedium, base64ImgLarge } from './images.mock';

const imageMock: IImage = {
  publicId: 'fakeurl.com/asd',
  version: 1,
  signature: 'fakeSignature',
  width: 1000,
  height: 666,
  format: 'jpg',
  resourceType: 'fake resource',
  bytes: 111,
  type: '',
  url: base64ImgLarge,
  secureUrl: base64ImgLarge,
  responsiveUrls: [
    { width: 1000, url: base64ImgLarge },
    { width: 700, url: base64ImgMedium },
    { width: 500, url: base64ImgSmall },
  ],
  thumbnailUrl: base64ImgSmall,
  blurredImageUrl: base64ImgSmall,
  path: 'fakeurl',
  id: {
    timestamp: 111,
    machine: 111,
    pid: -999,
    increment: 111,
    creationTime: '2022-06-25T15:44:40.411Z',
  },
  _id: '12345',
  createdAt: '2022-06-25T15:44:40.411Z',
  updatedAt: '2022-06-25T15:44:40.411Z',
  altText: 'mock image',
};

export const cardMock: IArticleCard = {
  title: 'Article title',
  unoptimized: true,
  description:
    'Some random article short summary. This will be taken from the article itself or prefilled when the article is posted',
  ctaText: 'Read more',
  ctaUrl: 'https//google.com',
  image: imageMock,
};
