import { IBlogProps, IPost, IPaginatedData } from '@src/interfaces';
import { serverSideBackendFetch } from '@src/utils';
import { NextPageWithLayout } from '../../_app.page';
import ClientPageLayout from '@src/components/layouts/client-page-layout';
import { ReactElement } from 'react';
import StaticPageError from '@src/components/atoms/static-page-error';
import { GetServerSideProps } from 'next';
import PaginatedCards from '@src/components/organisms/paginated-cards';
import SearchField from '@src/components/molecules/search-field';

const BlogSearchResults: NextPageWithLayout<
  IBlogProps & { query: string; currentPage: number }
> = ({ ...props }: IBlogProps & { query: string; currentPage: number }) => {
  /* istanbul ignore next*/
  if (props.error) return <StaticPageError {...props.error} />;
  /* istanbul ignore next*/
  if (!props.data.data.length)
    return <h3>No posts matching your search term were found.</h3>;

  const isPaginated = props?.data?.totalPages > 1;
  /* istanbul ignore next*/
  const baseUrl = isPaginated ? '/case-studies/search/' : '/case-studies';

  return (
    <div id="blog-search" className="d-flex flex-column gap-5">
      <SearchField searchUrl="/case-studies/search" />
      <PaginatedCards
        currentPage={props?.currentPage}
        currentUrl={`${baseUrl}${
          /* istanbul ignore next*/
          !isPaginated ? '' : props.query
        }`}
        pageUrl="?page="
        data={props.data}
      />
    </div>
  );
};
/* istanbul ignore next */
BlogSearchResults.getLayout = function getLayout(page: ReactElement) {
  return (
    <ClientPageLayout
      pageTitle={`You've searched for: ${page.props?.children[0]?.props.query}`}
      meta={page.props.data?.meta} // TODO: this is undefined, define own meta
    >
      {page}
    </ClientPageLayout>
  );
};

/* istanbul ignore next */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.searchterm;
  const page = Number(context.query?.page) || 1;

  try {
    const { data } = await serverSideBackendFetch<IPaginatedData<IPost>>({
      endpoint: `/posts?search=${query}&page=${page}&pagesize=10`,
      method: 'GET',
      headers: process.env.API_KEY
        ? new Headers({
            'Content-Type': 'application/json',
            apiKey: process.env.API_KEY,
          })
        : null,
      serverUrl: process.env.BLOG_API_URL ?? null,
    });
    const publishedPosts = data?.data.filter((p) => p.isPublished);
    const filteredData = { ...data, data: publishedPosts };
    return {
      props: {
        data: filteredData,
        query,
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
export default BlogSearchResults;
