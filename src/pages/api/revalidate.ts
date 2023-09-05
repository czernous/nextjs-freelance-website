import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Check for secret to confirm this is a valid request
  console.log('hitting revalidate');
  const path = req.query.path;
  if (!path) return res.status(400).json({ error: {} });

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    console.log(path);
    await res.revalidate(path.toString());
    return res.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log(err);
    return res.status(500).send('Error revalidating');
  }
}
