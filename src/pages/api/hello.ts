// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const r = await fetch('http://ruthchernous.loc/cms/home?populate=*');
  const data = await r.json();
  res.status(200).json(data);
}
