import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const COOKIE_NAME = `${process.env.HOST}-auth-token`;

const validateToken = async (token: string) => {
  const response = await fetch(
    `${process.env.AUTH_API_URL}/api/token?validate=${token}`,
    {
      headers: new Headers({ authApiKey: process.env.AUTH_API_KEY ?? '' }),
    }, // read auth url from env variable
  );

  const json: { Ok: boolean; Message: string } = await response.json();

  return json;
};

const tryGetToken = (req: NextRequest) => {
  const cookie = req.cookies.get(COOKIE_NAME);

  return cookie?.value;
};

const loginIfTokenIsInValid = async (
  token: string | null,
): Promise<boolean> => {
  const t = token;

  if (!t) {
    return true;
  }

  try {
    const json = await validateToken(t);
    console.log(json);
    if (!json.Ok) {
      return true;
    }
  } catch (e) {
    console.log(e);
    return true;
  }

  return false;
};

export default async function middleware(req: NextRequest) {
  // restrict /api routes to only be used from /admin
  if (req?.url?.includes('/api/')) {
    const { headers } = req;
    const referer = headers.get('referer');

    // console.log(referer, req.url);
    return process.env?.CLIENT_URL &&
      !referer?.includes(process.env?.CLIENT_URL)
      ? NextResponse.json(
          {
            status: 403,
            success: false,
            message: 'You cannot access this resource',
          },
          { status: 403 },
        )
      : NextResponse.next();
  }

  if (req?.url?.includes('/admin')) {
    // try to get token out of cookie

    // verify token with /auth/token?verify=<token>

    // next() if valid

    // redirect to /login if no cookie or invalid

    // verify new token and set cookie

    const token = tryGetToken(req) ?? req?.nextUrl.searchParams.get('token');

    const mustLogin = await loginIfTokenIsInValid(token);

    if (mustLogin) {
      cookies().delete(COOKIE_NAME);

      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (token) {
      cookies().set(COOKIE_NAME, token, {
        path: '/',
        httpOnly: true,
      });

      return NextResponse.next();
    }
  }

  if (req?.url.endsWith('/logout')) {
    cookies().delete(COOKIE_NAME);
    return NextResponse.redirect(new URL('/', req.url));
  }
}
