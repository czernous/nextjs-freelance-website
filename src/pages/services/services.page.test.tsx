import { render, RenderResult, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import Services from './index.page';
import { act } from 'react-dom/test-utils';
import React from 'react';

import { IServicesPage } from '../../interfaces';
import { mockNextRouter } from '../../utils';

expect.extend(toHaveNoViolations);

jest.mock('next/config', () => () => ({
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
}));

const data: IServicesPage = {
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
let component: RenderResult;

beforeEach(async () => {
  mockNextRouter();
  component = render(<Services data={data} />);
});

describe('Services', () => {
  it('renders a heading (h1 - title)', () => {
    const heading = screen.getAllByRole('heading');

    expect(heading[0]).toBeInTheDocument();
  });

  it('renders homepage unchanged', () => {
    const { container } = component;
    expect(container).toMatchSnapshot();
  });

  it('has no axe violations', async () => {
    const { container } = component;
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
