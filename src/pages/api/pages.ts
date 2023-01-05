import { NextApiRequest, NextApiResponse } from 'next';
import { getFilePath, writePageData } from '../../utils/data-fetching';

interface IPageQuery {
  name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name }: Partial<IPageQuery> = req.query;

  if (!name) return res.status(400).send('Please specify the name of the page');

  const filename = getFilePath('./src/public/data/pages', name, 'json');

  if (req.method === 'PUT' && req.body.ctaHeadline) {
    await writePageData(filename, req.body);
  }
}
