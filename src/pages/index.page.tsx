import type { NextPage } from 'next';
import getConfig from 'next/config';
//import getConfig from 'next/config';
import Head from 'next/head';
import Button from '../components/atoms/button';
import { Color, Size } from '../enums';
import styles from '../styles/Home.module.scss';
/* istanbul ignore next */
const { publicRuntimeConfig } = getConfig();

const Home: NextPage = ({ ...props }: unknown) => {
  console.log(props);
  return (
    <div className={styles.gradient}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} custom-container`}>
        <h1 className={`${styles.title} col-sm-10 col-md-11 col-lg-10`}>
          {props.data?.data?.attributes.ctaHeadline ?? 'Test headline'}
        </h1>
        <h2 className={`${styles.subtitle} col-sm-10 col-xl-9 col-xxl-11`}>
          {props.data?.data?.attributes.ctaSubheadline ?? 'Test subheadline'}
        </h2>
        <Button
          buttonColor={Color.Brick}
          buttonSize={Size.Large}
          buttonType={'button'}
          buttonHref={
            props.data?.data?.attributes.ctaBtnHref ?? 'http://google.com'
          }
          buttonTarget={'_blank'}
          buttonStyle={'main-cta'}
          buttonText={props.data?.data?.attributes.ctaBtnText ?? 'Test button'}
          buttonFullWidth={false}
          hasShadow={true}
        />
      </main>
    </div>
  );
};
/* istanbul ignore next */
async function loadHome() {
  const res = await fetch(
    `http://${publicRuntimeConfig.STRAPI_HOST}/api/home?populate=*`,
  );
  const data = await res.json();
  return data;
}

/* istanbul ignore next */
export async function getStaticProps() {
  try {
    const data = await loadHome();
    return {
      props: {
        data,
      },
    };
  } catch (error: unknown) {
    const err = JSON.parse(JSON.stringify(error));
    console.log(error);
    return {
      props: {
        err,
      },
    };
  }
}
export default Home;
