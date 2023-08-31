import path from 'path';
import { promises as fs } from 'fs';
import getConfig from 'next/config';
import { ServerResponse } from 'http';
import { IError } from '@src/interfaces';

const { serverRuntimeConfig } = getConfig();

export const getFilePath = (dir: string, filename: string, extension: string) =>
  `${path.join(
    serverRuntimeConfig.PROJECT_ROOT,
    dir,
  )}/${filename}.${extension}`;

/* istanbul ignore next */
export const getPageData = async <T>(filename: string) => {
  const fileContents = await fs.readFile(filename, 'utf8');
  const pageData: T = JSON.parse(fileContents);

  return pageData;
};

/* istanbul ignore next */
export const writePageData = async <T>(filename: string, filebody: T) => {
  const date = new Date();

  try {
    await fs.writeFile(
      filename,
      JSON.stringify(Object.assign({ updatedAt: date }, filebody)),
    );
    return null;
  } catch (error) {
    return error;
  }
};

/* istanbul ignore next */
export const getDirNamesAsync = async (rootDir: string) => {
  try {
    const res = (
      await fs.readdir(path.join(serverRuntimeConfig.PROJECT_ROOT, rootDir), {
        withFileTypes: true,
      })
    ).filter((dir) => dir.isDirectory());
    const dirNames: string[] = [];

    for (const d of res) {
      dirNames.push(d.name);
    }

    return dirNames;
  } catch (error: unknown) {
    console.debug(error);
    return [];
  }
};

interface IServerSideFetchProps {
  /**
   * Origin of server were data is fetched from
   * @example <caption>https://server.com/api </caption>
   */
  serverUrl: string | null;
  /** Fetch headers */
  headers: Headers | null;
  /** Server endpoint
   * @example <caption> /pages/home </caption>
   */
  endpoint: string;
  /** Method */
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  duplex?: boolean;
}

export interface IServerSideFetchResult<T> {
  message: {
    text: string;
    severity: 'success' | 'error' | 'warning' | null;
  };
  data: T | null;
  statusCode: number;
}

/* istanbul ignore next */
export const serverSideBackendFetch = async <T>({
  serverUrl,
  headers,
  method,
  endpoint,
  body,
}: IServerSideFetchProps): Promise<IServerSideFetchResult<T>> => {
  if (!serverUrl) throw new Error('Server url is not provided or null');

  if (!headers)
    throw new Error(
      'Headers are not provided or one of the headers is null or undefined',
    );

  const response = await fetch(`${serverUrl}${endpoint}`, {
    method,
    headers,
    body,
  });

  const clonedRes = response.clone();

  return {
    statusCode: response.status,
    message: await createResponseMessage(clonedRes),
    data: response.status !== 200 ? null : ((await response.json()) as T),
  };
};
/* istanbul ignore next */
export const handleServerError = (res: ServerResponse, error: IError) => {
  const statusCode = error.statusCode ?? 500;
  res.statusCode = 302;
  res.setHeader('Location', `/error?statusCode=${statusCode}&error=${error}`);
  res.end();
};
/* istanbul ignore next */
const tryParseMessageFromRes = async (r: Response) => {
  try {
    return {
      message: await r.text(),
    };
  } catch {
    const json = await r.json();
    if (json.message) {
      return json;
    }
  } finally {
    return r.statusText;
  }
};
/* istanbul ignore next */
const createTextResponse = async (r: Response): Promise<string> => {
  switch (r.status) {
    case 204:
      return 'Data was successfully updated';
    case 201:
      return 'Data was successfully created';
    case 200: {
      if (r.headers?.get('Method') === 'PUT') {
        ('Successfully saved data');
      } else {
        return r.statusText;
      }
    }
    case 400:
      return await r.text();
    default:
      return (
        (await tryParseMessageFromRes(r)) ??
        'Error occurred while handling data'
      );
  }
};
/* istanbul ignore next */
const createResponseMessage = async (r: Response) => {
  const severity =
    r.status === 200 || r.status === 204 || r.status === 201
      ? 'success'
      : 'error';

  return {
    severity,
    text: await createTextResponse(r),
  } as {
    severity: 'success' | 'error' | 'warning' | null;
    text: string;
  };
};
