import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

import '../styles/globals.scss';

import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { Analytics } from '@vercel/analytics/react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <StyledEngineProvider injectFirst>
      {getLayout(
        <>
          <Component {...pageProps} />
          <Analytics
            beforeSend={(event) => {
              switch (true) {
                case event.url.includes('/admin'):
                  return null;
                case event.url.includes('/login'):
                  return null;
                case event.url.includes('/logout'):
                  return null;
                default:
                  return event;
              }
            }}
          />
        </>,
      )}
    </StyledEngineProvider>
  );
}

export default MyApp;
