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

export const handleServerError = (res: ServerResponse, error: IError) => {
  const statusCode = error.statusCode || 500;
  res.statusCode = 302;
  res.setHeader('Location', `/error?statusCode=${statusCode}&error=${error}`);
  res.end();
};
