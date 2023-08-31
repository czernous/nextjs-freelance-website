import { NextApiRequest, NextApiResponse } from 'next';

import { serverSideBackendFetch } from '@src/utils';
import { IHttpMethod } from '@src/interfaces';

interface IBlogApiQuery {
  url: string;
  method: IHttpMethod;
  body?: unknown;
  filename?: string;
  contentType?: string;
  pageSize?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url, method, pageSize }: Partial<IBlogApiQuery> = req.query;

  if (method && url) {
    try {
      const headers = process.env.API_KEY
        ? new Headers({
            Accept: 'application/json',
            apiKey: process.env.API_KEY,
          })
        : null;

      const body =
        req.method !== 'GET' && req.method !== 'DELETE' ? req.body : undefined;

      if (method === 'PUT') {
        headers?.append('Content-Type', 'application/json');
      }

      const serverUrl = process.env.BLOG_API_URL ?? null;

      const endpoint = pageSize ? `${url}&pageSize=${pageSize}` : url;

      const data = await serverSideBackendFetch({
        endpoint,
        method,
        body,
        headers,
        serverUrl,
      });

      return res.status(data.statusCode !== 204 ? data.statusCode : 200).json({
        ok: String(data.statusCode).startsWith('2'),
        data: data?.data ?? null,
        code: data.statusCode,
        message: data.message,
      });
    } catch (e) {
      console.log(e, 'error');
      return res.status(500).json({
        ok: false,
        code: 500,
        error: {
          message: 'Error uploading data to the server',
        },
      });
    }
  }

  return res.status(400).send('Invalid request');
}
