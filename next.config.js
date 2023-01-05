/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ['page.tsx', 'page.jsx', 'ts'],
  images: {
    domains: ['images.unsplash.com', `${process.env.HOST}`],
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  publicRuntimeConfig: {
    APP_HOST: process.env.HOST,
  },
  webpack(config) {
    // temporary hack to disable css modules
    // config.module.rules[3].oneOf.forEach((one) => {
    //   if (!`${one.issuer?.and}`.includes('_app')) return;
    //   one.issuer.and = [path.resolve(__dirname)];
    // });
    return config;
  },
};

module.exports = nextConfig;
