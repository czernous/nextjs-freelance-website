import { IBlogProps, IPost, IPaginatedData, IBlogPage } from '@src/interfaces';
import { serverSideBackendFetch } from '@src/utils';
import { NextPageWithLayout } from '../_app.page';
import ClientPageLayout from '@src/components/layouts/client-page-layout';
import { ReactElement } from 'react';
import StaticPageError from '@src/components/atoms/static-page-error';
import { GetStaticProps } from 'next';
import PaginatedCards from '@src/components/organisms/paginated-cards';
import SearchField from '@src/components/molecules/search-field';

const Blog: NextPageWithLayout<IBlogProps> = ({ ...props }: IBlogProps) => {
  /* istanbul ignore next*/
  if (props.error) return <StaticPageError {...props.error} />;

  // posts are stored in data.data
  return (
    <div id="blog" className="d-flex flex-column gap-5">
      <SearchField searchUrl="/blog/search" />

      {
        /* istanbul ignore next */
        props.data && (
          <PaginatedCards
            currentPage={1}
            currentUrl="/blog"
            data={props.data}
            pageUrl="/page/"
          />
        )
      }
    </div>
  );
};
/* istanbul ignore next */
Blog.getLayout = function getLayout(page: ReactElement) {
  return (
    <ClientPageLayout pageTitle={'Blog'} meta={page.props.meta}>
      {page}
    </ClientPageLayout>
  );
};

/* istanbul ignore next */
export const getStaticProps: GetStaticProps = async () => {
  try {
    const data = await serverSideBackendFetch<IPaginatedData<IPost>>(
      '/posts?page=1&pagesize=10',
    );

    const pageMetaData = await serverSideBackendFetch<IBlogPage>('/pages/blog');

    const publishedPosts = data.data.filter((p) => p.isPublished);
    const filteredData = { ...data, data: publishedPosts };

    return {
      props: {
        data: filteredData,
        meta: pageMetaData.meta,
      },
    };
  } catch (error) {
    return {
      props: {
        error: {
          statusCode: 400,
          message: JSON.stringify(error),
        },
      },
    };
  }
};
export default Blog;
