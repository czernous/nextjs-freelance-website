import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Button from '@src/components/atoms/button';
import Navbar from '@src/components/organisms/navbar';
import { Color, Size } from '../enums';
import styles from '@src/styles/pages/Home.module.scss';
import { navItems } from '@src/settings/navbar-settings';
import { IError, IHomePage } from '@src/interfaces';
import { serverSideBackendFetch } from '@src/utils';
import StaticPageError from '@src/components/atoms/static-page-error';

interface IHomeProps {
  data: IHomePage;
  error?: IError;
}

const Home: NextPage<IHomeProps> = ({ ...props }: IHomeProps) => {
  if (props.error) return <StaticPageError {...props.error} />;

  return (
    <>
      <Head>
        <title>Ruth Chernous</title>
        <meta name="description" content={props.data.meta.metaDescription} />
        <meta name="keywords" content={props.data.meta.metaKeywords} />
        <meta property="og:title" content={props.data.meta.openGraph.title} />
        <meta
          property="og:description"
          content={props.data.meta.openGraph.description}
        />

        {props.data.meta.openGraph?.imageUrl && (
          /* istanbul ignore next */
          <meta
            property="og:image"
            content={props.data.meta.openGraph.imageUrl}
          />
        )}
        {props.data.meta.openGraph?.type && (
          /* istanbul ignore next */
          <meta property="og:type" content={props.data.meta.openGraph.type} />
        )}
        {props.data.meta.openGraph?.url && (
          /* istanbul ignore next */
          <meta property="og:url" content={props.data.meta.openGraph.url} />
        )}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.gradient}>
        {props.data?.image?.secureUrl !== null &&
        props.data?.image?.secureUrl !== undefined ? (
          <Image
            className={styles.background}
            src={props.data.image.secureUrl}
            objectFit={'cover'}
            alt={''}
            fill
          />
        ) : null}
        <Navbar
          navItems={navItems}
          drawerWidth={243}
          companyName={'Ruth Chernous'}
        />
        <main className={`${styles.main} custom-container`}>
          <h1 className={`${styles.title} col-sm-10 col-md-11 col-lg-10`}>
            {props.data?.pageFields.ctaHeadline}
          </h1>
          <h2 className={`${styles.subtitle} col-sm-10 col-xl-9 col-xxl-11`}>
            {props.data?.pageFields.ctaSubheadline}
          </h2>
          <Button
            buttonColor={Color.Brick}
            buttonSize={Size.Large}
            buttonType={'button'}
            buttonHref={props.data?.pageFields.ctaBtnHref}
            buttonTarget={'_blank'}
            buttonStyle={'main-cta'}
            buttonText={props.data?.pageFields.ctaBtnText}
            buttonFullWidth={false}
            hasShadow={true}
          />
        </main>
      </div>
    </>
  );
};

/* istanbul ignore next */
export async function getStaticProps() {
  try {
    const data = await serverSideBackendFetch<IHomePage>('/pages/home');

    return {
      props: {
        data,
      },
    };
  } catch (error: unknown) {
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
export default Home;
