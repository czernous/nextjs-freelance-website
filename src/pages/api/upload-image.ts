import { NextApiRequest, NextApiResponse } from 'next';

import { serverSideBackendFetch } from '@src/utils';
import { IHttpMethod } from '@src/interfaces';
import formidable from 'formidable';
import { Writable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface IUploadImageApiQuery {
  url: string;
  method: IHttpMethod;
  body?: unknown;
  filename?: string;
  contentType?: string;
}
const formidableConfig = {
  keepExtensions: true,
  maxFileSize: 10_000_000,
  maxFieldsSize: 10_000_000,
  maxFields: 7,
  allowEmptyFiles: false,
  multiples: false,
};

const fileConsumer = <T = unknown>(acc: T[]) => {
  const writable = new Writable({
    write: (chunk, _enc, next) => {
      acc.push(chunk);
      next();
    },
  });

  return writable;
};

function formidablePromise(
  req: NextApiRequest,
  opts?: Parameters<typeof formidable>[0],
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((accept, reject) => {
    const form = formidable(opts);

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      return accept({ fields, files });
    });
  });
}

const CLOUDINARY_FOLDER = process.env.NODE_ENV === 'production' ?'test-api-folder/test-images/' : process.env.CLOUDINARY_FOLDER;
const IMAGE_UPLOAD_PARAMS = `&folder=${CLOUDINARY_FOLDER}&maxWidth=2400&widths=512,768,1140,1920&quality=70`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url, method, filename, contentType }: Partial<IUploadImageApiQuery> =
    req.query;

  if (
    !req.headers['content-type']?.includes('multipart/form-data') ||
    req.method !== 'POST'
  ) {
    return res.status(400).json({
      ok: false,
      error: {
        message:
          'The request must be POST with multipart/form-data content-type',
      },
    });
  }
  if (method && url) {
    let endpoint = url;
    try {
      const headers = process.env.API_KEY
        ? new Headers({
            Accept: 'application/json',
            apiKey: process.env.API_KEY,
          })
        : null;

      if (filename) {
        endpoint = `${url}?filename=${filename}${IMAGE_UPLOAD_PARAMS}`;
        headers?.append('Method', 'POST');
        contentType && headers?.append('Content-Type', contentType);
      }

      const serverUrl = process.env.BLOG_API_URL ?? null;

      try {
        const chunks: never[] = [];

        await formidablePromise(req, {
          ...formidableConfig,
          // consume this, otherwise formidable tries to save the file to disk
          fileWriteStreamHandler: () => fileConsumer(chunks),
        });
        const fileData = Buffer.concat(chunks);

        // Send the in-memory stream as the request body
        const data = await serverSideBackendFetch({
          endpoint,
          method,
          body: fileData,
          headers,
          serverUrl,
        });

        return res.status(data.statusCode).json({
          ok: String(data.statusCode).startsWith('2'),
          code: data.statusCode,
          error: {
            message: String(data.statusCode).startsWith('2')
              ? null
              : data.message.text,
          },
        });
      } catch (e) {
        return res.status(500).json({
          ok: false,
          code: 500,
          error: {
            message: 'Error parsing FormData',
          },
        });
      }
    } catch (e) {
      console.log(e, 'error');
      return res.status(500).send({
        ok: false,
        code: 500,
        error: {
          message: 'Could not get data from the server',
        },
      });
    }
  }

  return res.status(400).send('Invalid request');
}
