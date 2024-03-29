import { IPost } from '@src/interfaces';
import { serverSideBackendFetch } from '@src/utils';
import { NextApiRequest, NextApiResponse } from 'next';

const generateUrls = (pages: string[] | IPost[]) => {
  if (!pages || !pages.length) return;

  let xmlSinppet = '';

  pages.forEach((p) => {
    xmlSinppet += `<url>
          <loc>${process.env.APP_DOMAIN}/${
            typeof p === 'string' ? p : (p as IPost).slug
          }</loc>
          <lastmod>${Date.now().toLocaleString()}</lastmod>
        </url>`;
  });

  return xmlSinppet;
};

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const posts = await serverSideBackendFetch<{ data: IPost[] }>({
    endpoint: '/posts',
    method: 'GET',
    headers: process.env.API_KEY
      ? new Headers({
          'Content-Type': 'application/json',
          apiKey: process.env.API_KEY,
        })
      : null,
    serverUrl: process.env.BLOG_API_URL ?? null,
  });
  const paths = posts?.data?.data?.filter((p) => p.isPublished) ?? [];

  // Instructing the Vercel edge to cache the file
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

  // generate sitemap here
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
        <url>
            <loc>${process.env.APP_DOMAIN}/</loc>
            <lastmod>${Date.now().toLocaleString()}</lastmod>
        </url>
        <url>
            <loc>${process.env.APP_DOMAIN}/about</loc>
            <lastmod>${Date.now().toLocaleString()}</lastmod>
        </url>
        <url>
            <loc>${process.env.APP_DOMAIN}/blog</loc>
            <lastmod>${Date.now().toLocaleString()}</lastmod>
        </url>
        <url>
            <loc>${process.env.APP_DOMAIN}/services</loc>
            <lastmod>${Date.now().toLocaleString()}</lastmod>
        </url>
        <url>
            <loc>${process.env.APP_DOMAIN}/contact</loc>
            <lastmod>${Date.now().toLocaleString()}</lastmod>
        </url>    
    ${paths.length > 0 ? generateUrls(paths) : ''}
      </urlset>`;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');
  res.end(xml);
}
