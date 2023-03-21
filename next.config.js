/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
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
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  publicRuntimeConfig: {
    APP_HOST: process.env.HOST,
    APP_NAME: process.env.APP_NAME,
    API_KEY: process.env.API_KEY,
    BACKEND_URL: process.env.BACKEND_URL,
  },
};

module.exports = nextConfig;
