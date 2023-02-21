import React from 'react';
import Router from 'next/router';
import { IError } from '@src/interfaces';
import styles from '@src/styles/pages/Error.module.scss';
import Button from '@src/components/atoms/button';
import { Color, Size } from '@src/enums';

interface Props {
  statusCode?: number;
  errorMessage?: string;
}

const ErrorPage = ({ statusCode = 404, errorMessage = 'Not found' }: Props) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.status}>{statusCode}</h1>
      <p className={styles.message}>{errorMessage}</p>
      <Button
        buttonText="Go Home"
        onClick={() => Router.push('/')}
        buttonColor={Color.Brick}
        buttonSize={Size.Regular}
        buttonType={'button'}
        buttonStyle={'primary'}
        buttonFullWidth={false}
        hasShadow={false}
      />
    </div>
  );
};

ErrorPage.getInitialProps = ({
  query,
}: {
  query: {
    statusCode: number;
    error: IError;
  };
}) => {
  const { statusCode, error } = query;

  return {
    statusCode: Number(statusCode) || 404,
    errorMessage: error?.message ?? JSON.stringify(error, null, 2),
  };
};

export default ErrorPage;
