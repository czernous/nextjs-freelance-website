import { getFilePath, getPageData, writePageData } from '.';

jest.mock('next/config', () => () => ({
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
}));

let path: string;

beforeEach(async () => {
  path = getFilePath('../../public/data/pages/', 'test', 'json');
});

afterEach(async () => {
  await writePageData(path, { 'test-value': null });
});

describe('getFilePath()', () => {
  it('should return filepath (string) without errors', () => {
    expect(path).toBeDefined();
  });
});

describe('writePageData() / getPageData()', () => {
  it('write to and read from file correctly', async () => {
    await writePageData(path, { 'test-value': 'test' });

    const testJson: { 'test-value': string | null } = await getPageData(path);

    expect(testJson['test-value']).toEqual('test');
  });
});
