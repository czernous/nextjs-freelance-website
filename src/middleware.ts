import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export default function middleware(req: NextApiRequest) {
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
}
