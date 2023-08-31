import { NextApiRequest, NextApiResponse } from 'next';

import { serverSideBackendFetch } from '@src/utils';

//`${window.location.origin}/auth/token?email=${email}&protected-url=${window.location.origin}/admin

interface IAuthApiQuery {
  email?: string;
  protected_url?: string;
  token?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email, protected_url, token }: Partial<IAuthApiQuery> = req.query;

  if (email && !process.env.ADMIN_EMAILS?.includes(email)) {
    return res.status(401).json({
      ok: false,
      message: 'You are not authorized to access this resource',
    });
  }

  try {
    const headers = process.env.AUTH_API_KEY
      ? new Headers({
          Accept: 'application/json',
          authApiKey: process.env.AUTH_API_KEY,
        })
      : null;

    const serverUrl = process.env.AUTH_API_URL
      ? `${process.env.AUTH_API_URL}/api`
      : null;

    const data = await serverSideBackendFetch<{ Message: string; Ok: string }>({
      endpoint: token
        ? `/token?validate=${token}`
        : `/token?email=${email}&protected-url=${protected_url}`,
      method: 'GET',
      body: null,
      headers,
      serverUrl,
    });

    return res.status(data.statusCode).json({
      ok: data?.data?.Ok,
      data: data?.data ?? null,
      code: data.statusCode,
      message: data?.data?.Message,
    });
  } catch (e) {
    console.log(e, 'error');
    return res.status(500).json({
      ok: false,
      code: 500,
      error: {
        message: 'Error connecting to auth server',
      },
    });
  }
}
