import { jest } from '@jest/globals';

jest.mock('next/config', () => () => ({
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  publicRuntimeConfig: {
    APP_NAME: 'test',
  },
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

useRouter.mockImplementation(() => ({
  route: '/',
  pathname: '',
  query: '',
  asPath: '',
  push: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
  },
  beforePopState: jest.fn(() => null),
  prefetch: jest.fn(() => null),
}));

jest.mock('./utils/data-fetching/client', () => ({
  fetchAndConvertToBase64: jest
    .fn()
    .mockImplementation(() => Promise.resolve('base64')),
}));

jest.mock('@src/utils', () => ({
  serverSideBackendFetch: jest.fn(),
}));
