import { IClientPageLayoutProps } from '../../../../interfaces';

export const clientPageMock: IClientPageLayoutProps = {
  pageTitle: 'About',
  meta: {
    metaDescription:
      'This is a dummy description designed for testing purposes',
    metaKeywords: 'some meta keywords,testing,typescript,blog',
    openGraph: {
      title: 'This title will be shown on social media',
      description: 'This description will be shown on social media',
      imageUrl: '',
      type: '',
      url: '',
    },
  },
};
