import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Router from 'next/router';
import ErrorPage from './_error.page';

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

const mockedRouter = Router as jest.Mocked<typeof Router>;

describe('ErrorPage', () => {
  it('renders the error code and message', () => {
    const { getByText } = render(
      <ErrorPage statusCode={404} errorMessage="Not found" />,
    );
    expect(getByText('404')).toBeInTheDocument();
    expect(getByText('Not found')).toBeInTheDocument();
  });

  it('renders the default error code and message if not passed in', () => {
    const { getByText } = render(<ErrorPage />);
    expect(getByText('404')).toBeInTheDocument();
    expect(getByText('Not found')).toBeInTheDocument();
  });

  it('redirects to home when the Go back to home button is clicked', () => {
    const { getByText } = render(<ErrorPage />);
    fireEvent.click(getByText('Go back to home'));
    expect(mockedRouter.push).toHaveBeenCalledWith('/');
  });
  it('gets initial props from query string', () => {
    const mockQuery = { statusCode: 404, error: { message: 'Not Found' } };
    const props = ErrorPage.getInitialProps({ query: mockQuery });
    expect(props).toEqual({
      statusCode: 404,
      errorMessage: 'Not Found',
    });
  });

  it('gets initial props from query string and stringifies error object if it contains no message', () => {
    const mockQuery = {
      statusCode: null as unknown as number,
      error: 'Not Found',
    };
    const props = ErrorPage.getInitialProps({ query: mockQuery });
    expect(props).toEqual({
      statusCode: 404,
      errorMessage: '"Not Found"',
    });
  });
});
