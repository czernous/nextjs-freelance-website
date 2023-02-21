import { IHomePage, IServicesPage } from '@src/interfaces';

export const homePageMock: IHomePage = {
  pageFields: {
    ctaBtnHref: 'https://google.com',
    ctaBtnText: 'Get stuff',
    ctaHeadline: 'Are you looking to get awesome stuff??',
    ctaSubheadline: 'We have the most awesome stuff on the internet!',
  },
  slug: 'home',
  meta: {
    metaDescription: 'Test',
    metaKeywords: 'test',
    openGraph: {
      title: 'Test',
      description: 'test',
      imageUrl: 'http://g.com',
    },
  },

  updatedAt: '2023-02-16T15:47:25.559Z',
};

export const servicesPageMock: IServicesPage = {
  pageFields: {
    content:
      '<h2>Service #1</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis nunc libero. Nullam tincidunt lectus ut maximus dignissim. Mauris et risus in metus ornare convallis. Nullam in orci leo. Aenean sit amet arcu vitae ipsum mollis blandit. Pellentesque pellentesque sapien mollis, pharetra magna sit amet, varius eros. Donec eu dui ullamcorper ligula rutrum tincidunt. Sed eu venenatis mi. Nullam rutrum sagittis tortor, id feugiat dolor commodo a. Nullam venenatis rutrum elementum. Vestibulum vehicula lectus in nisl porta scelerisque at id metus. Sed porttitor purus eu cursus porta. Donec suscipit semper ligula, ut eleifend nunc commodo ut. Aenean sed mauris molestie, gravida nisi et, lobortis sapien. Nullam et massa mi. </p> <p>Nulla a sem sit amet nisl interdum tincidunt. Fusce pellentesque nec risus et lacinia. Donec dignissim enim ac vehicula malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at varius augue. Phasellus varius, sem ac posuere mattis, augue turpis sollicitudin arcu, ut tincidunt arcu tellus vel sapien. Nulla sagittis auctor velit, ut tristique nulla sollicitudin et. Duis ac purus efficitur, congue purus egestas, ultricies quam. Nulla tincidunt nibh risus, vel semper lacus consectetur quis. Aenean luctus enim in justo rhoncus dignissim. Donec pellentesque fermentum sapien vitae aliquam.</p><h2>Service #1</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis nunc libero. Nullam tincidunt lectus ut maximus dignissim. Mauris et risus in metus ornare convallis. Nullam in orci leo. Aenean sit amet arcu vitae ipsum mollis blandit. Pellentesque pellentesque sapien mollis, pharetra magna sit amet, varius eros. Donec eu dui ullamcorper ligula rutrum tincidunt. Sed eu venenatis mi. Nullam rutrum sagittis tortor, id feugiat dolor commodo a. Nullam venenatis rutrum elementum. Vestibulum vehicula lectus in nisl porta scelerisque at id metus. Sed porttitor purus eu cursus porta. Donec suscipit semper ligula, ut eleifend nunc commodo ut. Aenean sed mauris molestie, gravida nisi et, lobortis sapien. Nullam et massa mi. </p> <p>Nulla a sem sit amet nisl interdum tincidunt. Fusce pellentesque nec risus et lacinia. Donec dignissim enim ac vehicula malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at varius augue. Phasellus varius, sem ac posuere mattis, augue turpis sollicitudin arcu, ut tincidunt arcu tellus vel sapien. Nulla sagittis auctor velit, ut tristique nulla sollicitudin et. Duis ac purus efficitur, congue purus egestas, ultricies quam. Nulla tincidunt nibh risus, vel semper lacus consectetur quis. Aenean luctus enim in justo rhoncus dignissim. Donec pellentesque fermentum sapien vitae aliquam.</p>',
  },
  slug: 'services',
  meta: {
    metaDescription: 'string',
    metaKeywords: 'string',
    openGraph: {
      title: 'string',
      description: 'string',
      imageUrl: 'string',
    },
  },

  updatedAt: '2023-02-16T07:05:35.214Z',
};
