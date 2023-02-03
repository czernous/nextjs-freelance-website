import { getFilePath, handleServerError } from '.';

jest.mock('next/config', () => () => ({
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
}));

let path: string;

beforeEach(async () => {
  path = getFilePath('../../public/data/pages/', 'test', 'json');
});

describe('getFilePath()', () => {
  it('should return filepath (string) without errors', () => {
    expect(path).toBeDefined();
  });
});

describe('handleServerError', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let res: any;

  beforeEach(() => {
    res = {
      statusCode: 0,
      setHeader: jest.fn(),
      end: jest.fn(),
    };
  });

  it('sets statusCode to 302 if error has a statusCode', () => {
    handleServerError(res, { statusCode: 404 });
    expect(res.statusCode).toBe(302);
  });

  it('sets statusCode to 500 if error does not have a statusCode', () => {
    handleServerError(res, {});
    expect(res.statusCode).toBe(302);
  });

  it('sets the Location header to /error with statusCode and error as query parameters', () => {
    const error = { message: 'Not Found' };
    handleServerError(res, { statusCode: 404, ...error });
    expect(res.setHeader).toHaveBeenCalledWith(
      'Location',
      `/error?statusCode=404&error=${error}`,
    );
  });

  it('calls end on the response object', () => {
    handleServerError(res, {});
    expect(res.end).toHaveBeenCalled();
  });
});
