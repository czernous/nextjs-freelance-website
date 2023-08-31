import { IError, IServicesPage } from '@src/interfaces';
import { serverSideBackendFetch } from '@src/utils';
import { NextPageWithLayout } from '../_app.page';
import ClientPageLayout from '@src/components/layouts/client-page-layout';
import { ReactElement } from 'react';
import StaticPageError from '@src/components/atoms/static-page-error';

interface IServicesProps {
  data: IServicesPage;
  error?: IError;
}

const Services: NextPageWithLayout<IServicesProps> = ({
  ...props
}: IServicesProps) => {
  /* istanbul ignore next*/
  if (props.error) return <StaticPageError {...props.error} />;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.data?.pageFields.content }}
      className="rich-text"
    />
  ); // TODO: add DOMpurify
};
/* istanbul ignore next */
Services.getLayout = function getLayout(page: ReactElement) {
  return (
    <ClientPageLayout pageTitle={'Services'} meta={page.props.data?.meta}>
      {page}
    </ClientPageLayout>
  );
};

/* istanbul ignore next */
export async function getStaticProps() {
  try {
    const { data } = await serverSideBackendFetch<IServicesPage>({
      endpoint: '/pages/services',
      method: 'GET',
      headers: process.env.API_KEY
        ? new Headers({
            'Content-Type': 'application/json',
            apiKey: process.env.API_KEY,
          })
        : null,
      serverUrl: process.env.BLOG_API_URL ?? null,
    });
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
}
export default Services;
