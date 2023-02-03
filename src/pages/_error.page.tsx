import React from 'react';
import Router from 'next/router';
import { IError } from '@src/interfaces';

interface Props {
  statusCode?: number;
  errorMessage?: string;
}

const ErrorPage = ({ statusCode = 404, errorMessage = 'Not found' }: Props) => {
  return (
    <div>
      <h1>{statusCode}</h1>
      <p>{errorMessage}</p>
      <button onClick={() => Router.push('/')}>Go back to home</button>
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
