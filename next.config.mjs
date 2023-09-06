/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  output: 'standalone',
  staticPageGenerationTimeout: 2000,
  pageExtensions: ['page.tsx', 'page.jsx', 'ts'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
        port: '',
      },
      {
        protocol: 'http',
        hostname: '**.cloudinary.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: process.env.HOST ?? '**',
        port: '',
      },
    ],

    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  env: {
    APP_HOST: process.env.HOST,
    APP_NAME: process.env.APP_NAME ?? '',
    API_KEY: process.env.API_KEY,
    BLOG_API_URL: process.env.BLOG_API_URL,
    NEXT_PUBLIC_BLOG_API_URL: process.env.BLOG_API_URL,
    AUTH_API_URL: process.env.AUTH_API_URL,
    AUTH_API_KEY: process.env.AUTH_API_KEY,
    ADMIN_EMAILS: process.env.ADMIN_EMAILS,
    CLIENT_URL: process.env.CLIENT_URL,
    NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
    APP_DOMAIN: process.env.APP_DOMAIN,
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: process.cwd(),
    APP_HOST: process.env.HOST,
    APP_NAME: process.env.APP_NAME ?? '',
    API_KEY: process.env.API_KEY,
    BLOG_API_URL: process.env.BLOG_API_URL,
    NEXT_PUBLIC_BLOG_API_URL: process.env.BLOG_API_URL,
    AUTH_API_URL: process.env.AUTH_API_URL,
    AUTH_API_KEY: process.env.AUTH_API_KEY,
    ADMIN_EMAILS: process.env.ADMIN_EMAILS,
    CLIENT_URL: process.env.CLIENT_URL,
    APP_DOMAIN: process.env.APP_DOMAIN,
  },
  publicRuntimeConfig: {
    APP_HOST: process.env.HOST,
    APP_NAME: process.env.APP_NAME ?? '',
    API_KEY: process.env.API_KEY,
    BLOG_API_URL: process.env.BLOG_API_URL,
    NEXT_PUBLIC_BLOG_API_URL: process.env.BLOG_API_URL,
    AUTH_API_URL: process.env.AUTH_API_URL,
    AUTH_API_KEY: process.env.AUTH_API_KEY,
    ADMIN_EMAILS: process.env.ADMIN_EMAILS,
    CLIENT_URL: process.env.CLIENT_URL,
    APP_DOMAIN: process.env.APP_DOMAIN,
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
};

export default nextConfig;
