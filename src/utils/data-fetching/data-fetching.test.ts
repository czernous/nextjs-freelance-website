import { getFilePath } from '.';

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
