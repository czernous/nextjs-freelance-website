import { IServicesPage } from '@src/interfaces';
import { getFilePath, getPageData } from '@src/utils';
import { NextPageWithLayout } from '../_app.page';
import ClientPageLayout from '@src/components/layouts/client-page-layout';
import { ReactElement } from 'react';

interface IServicesProps {
  data: IServicesPage;
}

const Services: NextPageWithLayout<IServicesProps> = ({
  ...props
}: IServicesProps) => {
  return <div dangerouslySetInnerHTML={{ __html: props.data.content }} />;
};
/* istanbul ignore next */
Services.getLayout = function getLayout(page: ReactElement) {
  return (
    <ClientPageLayout
      pageTitle={'Services'}
      appTitle={'Ruth Chernous'}
      meta={page.props.data.meta}
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
  } catch (error: unknown) {
    const err = JSON.parse(JSON.stringify(error));
    return {
      props: {
        err,
      },
    };
  }
}
export default Services;
