import { IAboutPage, IError } from '@src/interfaces';
import { serverSideBackendFetch } from '@src/utils';
import { NextPageWithLayout } from '../_app.page';
import ClientPageLayout from '@src/components/layouts/client-page-layout';
import { ReactElement } from 'react';
import StaticPageError from '@src/components/atoms/static-page-error';
import Image from 'next/image';
import styles from './About.module.scss';

interface IAboutProps {
  data: IAboutPage;
  error?: IError;
}

const About: NextPageWithLayout<IAboutProps> = ({ ...props }: IAboutProps) => {
  /* istanbul ignore next*/
  if (props.error) return <StaticPageError {...props.error} />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <Image src={props.data.image} alt="photo of blog's author" fill />
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: props.data?.pageFields.description }}
      />
    </div>
  );
};
/* istanbul ignore next */
About.getLayout = function getLayout(page: ReactElement) {
  return (
    <ClientPageLayout
      pageTitle={'About me'}
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
    const data = await serverSideBackendFetch<IAboutPage>('/pages/about');

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
export default About;
