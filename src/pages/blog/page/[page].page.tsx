import { serverSideBackendFetch } from '@src/utils';
import { NextPageWithLayout } from '../../_app.page';
import ClientPageLayout from '@src/components/layouts/client-page-layout';
import { ReactElement } from 'react';
import StaticPageError from '@src/components/atoms/static-page-error';
import { IBlogProps, IPost } from '@src/interfaces';
import { GetStaticProps, GetStaticPaths } from 'next';
import PaginatedCards from '@src/components/organisms/paginated-cards';
import SearchField from '@src/components/molecules/search-field';

const PaginatedBlog: NextPageWithLayout<
  IBlogProps & { currentPage: number }
> = ({ ...props }: IBlogProps & { currentPage: number }) => {
  /* istanbul ignore next*/
  if (props.error) return <StaticPageError {...props.error} />;

  return (
    <div id="blog" className="d-flex flex-column gap-5">
      <SearchField searchUrl="/blog/search" />
      <PaginatedCards
        currentPage={props.currentPage}
        currentUrl="/blog"
        pageUrl="/page/"
        data={props.data}
      />
    </div>
  ); // TODO: add DOMpurify
};
/* istanbul ignore next */
PaginatedBlog.getLayout = function getLayout(page: ReactElement) {
  return (
    <ClientPageLayout pageTitle={'Blog'} meta={page.props.data?.meta}>
      {page}
    </ClientPageLayout>
  );
};

/* istanbul ignore next */
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Array.from({ length: 5 }).map((_, i) => `/blog/page/${i + 2}`),

    fallback: 'blocking',
  };
};

/* istanbul ignore next */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = Number(params?.page) || 1;

  if (page === 1) {
    return {
      redirect: {
        destination: '/blog',
        permanent: false,
      },
    };
  }

  try {
    const data = await serverSideBackendFetch<{ data: IPost[] }>(
      `/posts?page=${page}&pagesize=10`,
    );

    return {
      props: {
        data,
        currentPage: page,
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
export default PaginatedBlog;
