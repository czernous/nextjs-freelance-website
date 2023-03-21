import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { IClientPageLayoutProps } from '@src/interfaces';
import { navItems } from '@src/settings/navbar-settings';
import Navbar from '@src/components/organisms/navbar';

import styles from './client-page-layout.module.scss';
import getConfig from 'next/config';

const ClientPageLayout = ({
  children,
  ...props
}: PropsWithChildren & IClientPageLayoutProps) => {
  const APP_NAME = getConfig().publicRuntimeConfig.APP_NAME;

  const pageTitle = `| ${props.pageTitle}`;
  const fullTitle = `${APP_NAME} ${props.pageTitle.length > 1 && pageTitle}`;

  return (
    <div data-testid="client-layout">
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={props.meta?.metaDescription} />
        <meta name="keywords" content={props.meta?.metaKeywords} />
        <meta property="og:title" content={props.meta?.openGraph.title} />
        <meta
          property="og:description"
          content={props.meta?.openGraph.description}
        />

        {props.meta?.openGraph?.imageUrl && (
          /* istanbul ignore next */
          <meta property="og:image" content={props.meta?.openGraph.imageUrl} />
        )}
        {props.meta?.openGraph?.type && (
          /* istanbul ignore next */
          <meta property="og:type" content={props.meta?.openGraph.type} />
        )}
        {props.meta?.openGraph?.url && (
          /* istanbul ignore next */
          <meta property="og:url" content={props.meta?.openGraph.url} />
        )}

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.wrapper}>
        <Navbar companyName={APP_NAME} navItems={navItems} drawerWidth={243} />
        <main className={`${styles.layout} custom-container`}>
          <h1 className={styles.heading}>{props.pageTitle}</h1>
          <section className={styles.content}>{children}</section>{' '}
        </main>
      </div>
    </div>
  );
};

export default ClientPageLayout;
