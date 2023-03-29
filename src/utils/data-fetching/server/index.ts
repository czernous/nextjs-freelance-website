import path from 'path';
import { promises as fs } from 'fs';
import getConfig from 'next/config';
import { ServerResponse } from 'http';
import { IError } from '@src/interfaces';
import { fetchData } from '../client';

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

/* istanbul ignore next */
export const serverSideBackendFetch = async <T>(
  backendEndpoint: string,
): Promise<T> => {
  const cfg = getConfig();
  const apiKey = cfg.publicRuntimeConfig.API_KEY;

  const response = await fetchData({
    url: backendEndpoint,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apiKey,
      },
    },
    location: `http://${cfg.publicRuntimeConfig.BACKEND_URL}`,
  });

  const data: T = (await response?.json()) ?? null;

  return data;
};
export const handleServerError = (res: ServerResponse, error: IError) => {
  const statusCode = error.statusCode || 500;
  res.statusCode = 302;
  res.setHeader('Location', `/error?statusCode=${statusCode}&error=${error}`);
  res.end();
};
