import { IError, IPost } from '@src/interfaces';
import { serverSideBackendFetch } from '@src/utils';

import StaticPageError from '@src/components/atoms/static-page-error';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { navItems } from '@src/settings/navbar-settings';
import Head from 'next/head';
import getConfig from 'next/config';
import Navbar from '@src/components/organisms/navbar';
import Image from 'next/image';

import style from './styles/blog-post.module.scss';

interface IBlogPostProps {
  data: IPost;
  error?: IError;
}

const BlogPost: NextPage<IBlogPostProps> = ({ ...props }: IBlogPostProps) => {
  const APP_NAME = getConfig().publicRuntimeConfig.APP_NAME;

  const pageTitle = `| ${props.data.slug}`;
  const fullTitle = `${APP_NAME} ${pageTitle}`;

  /* istanbul ignore next*/
  if (props.error) return <StaticPageError {...props.error} />;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={props.data.meta?.metaDescription} />
        <meta name="keywords" content={props.data.meta?.metaKeywords} />
        <meta property="og:title" content={props.data.meta?.openGraph.title} />
        <meta
          property="og:description"
          content={props.data.meta?.openGraph.description}
        />

        {props.data.meta?.openGraph?.imageUrl && (
          /* istanbul ignore next */
          <meta
            property="og:image"
            content={props.data.meta?.openGraph.imageUrl}
          />
        )}
        {props.data.meta?.openGraph?.type && (
          /* istanbul ignore next */
          <meta property="og:type" content={props.data.meta?.openGraph.type} />
        )}
        {props.data.meta?.openGraph?.url && (
          /* istanbul ignore next */
          <meta property="og:url" content={props.data.meta?.openGraph.url} />
        )}

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar companyName={APP_NAME} navItems={navItems} drawerWidth={243} />

      <div id="blog-post" style={{ marginTop: '88px' }}>
        <div className={style.feature}>
          <div
            className="w-100 position-absolute top-0 start-0"
            style={{ zIndex: 3 }}
          >
            <div className="custom-container">
              <h1>{props.data.title}</h1>
            </div>
          </div>
          <div className={style.gradient}></div>
          <Image src={props.data.imageUrl} alt={props.data.imageAltText} fill />
        </div>
        <div className={`custom-container w-100 ${style.body}`}>
          <h1 className={style.title}>{props.data.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: props.data.body }} />
        </div>
      </div>
    </>
  ); // TODO: add DOMpurify
};

/* istanbul ignore next */
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await serverSideBackendFetch<{ data: IPost[] }>('/posts');

  const paths = res?.data.filter((p) => p.isPublished) ?? [];

  return {
    paths: paths.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};

/* istanbul ignore next */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  try {
    const data = await serverSideBackendFetch<IPost>(`/posts/slug/${slug}`);

    return {
      props: {
        data,
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
export default BlogPost;
