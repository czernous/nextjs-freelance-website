import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = `${process.env.HOST}-auth-token`;

const validateToken = async (token: string) => {
  const response = await fetch(
    `http://${process.env.AUTH_URL}/token?validate=${token}`, // read auth url from env variable
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const referer = headers.get('referer');

    return !referer?.includes('admin')
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
    const adminEmails =
      process.env.ADMIN_EMAILS?.includes(',') &&
      process.env.ADMIN_EMAILS.split(',');
    console.log('deez nutz', adminEmails);

    // try to get token out of cookie

    // verify token with /auth/token?verify=<token>

    // next() if valid

    // redirect to /login if no cookie or invalid

    // verify new token and set cookie

    const token = tryGetToken(req) ?? req?.nextUrl.searchParams.get('token');

    console.log('asda', token);

    const mustLogin = await loginIfTokenIsInValid(token);

    if (mustLogin) return NextResponse.redirect(new URL('/login', req.url));

    if (token) {
      const res = NextResponse.next();

      res.cookies.set(COOKIE_NAME, token, {
        path: '/',
        httpOnly: true,
      });

      return res;
    }
  }

  if (req?.url.endsWith('/logout')) {
    console.log('logout');
    const cookie = req.cookies.get(COOKIE_NAME);

    if (cookie) {
      const res = NextResponse.next();
      res.cookies.delete(COOKIE_NAME);
      return res.ok ? res : NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.redirect(new URL('/', req.url));
  }
}
