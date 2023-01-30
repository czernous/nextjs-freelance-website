import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Button from '../components/atoms/button';
import Navbar from '../components/organisms/navbar';
import { Color, Size } from '../enums';
import styles from '../styles/pages/Home.module.scss';
import { navItems } from '../settings/navbar-settings';
import { IHomePage } from '../interfaces';
import { getFilePath, getPageData } from '../utils';

interface IHomeProps {
  data: IHomePage;
}

const Home: NextPage<IHomeProps> = ({ ...props }: IHomeProps) => {
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
        {props.data?.imageUrl !== null && props.data?.imageUrl !== undefined ? (
          <Image
            className={styles.background}
            src={props.data?.imageUrl}
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
            {props.data?.ctaHeadline}
          </h1>
          <h2 className={`${styles.subtitle} col-sm-10 col-xl-9 col-xxl-11`}>
            {props.data?.ctaSubheadline}
          </h2>
          <Button
            buttonColor={Color.Brick}
            buttonSize={Size.Large}
            buttonType={'button'}
            buttonHref={props.data?.ctaBtnHref}
            buttonTarget={'_blank'}
            buttonStyle={'main-cta'}
            buttonText={props.data?.ctaBtnText}
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
    const pageData: IHomePage = await getPageData(
      getFilePath('./src/public/data/pages', 'home', 'json'),
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
export default Home;
