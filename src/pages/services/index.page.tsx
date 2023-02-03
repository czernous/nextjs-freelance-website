import { IError, IServicesPage } from '@src/interfaces';
import { getFilePath, getPageData } from '@src/utils';
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

  return <div dangerouslySetInnerHTML={{ __html: props.data?.content }} />; // TODO: add DOMpurify
};
/* istanbul ignore next */
Services.getLayout = function getLayout(page: ReactElement) {
  return (
    <ClientPageLayout
      pageTitle={'Services'}
      appTitle={'Ruth Chernous'}
      meta={page.props.data?.meta}
    >
      {page}
    </ClientPageLayout>
  );
};

/* istanbul ignore next */
export async function getStaticProps() {
  try {
    const pageData: IServicesPage = await getPageData(
      getFilePath('./src/public/data/pages', 'services', 'json'),
    );

    return {
      props: {
        data: pageData,
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
