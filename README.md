This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project is built as a part of a bigger project using Docker, however it can be used on it's own.

It relies on data provided by [external API](https://github.com/czernous/dotnetcore-blog-api) and a simple JWT [auth API](https://github.com/czernous/email-auth). You might want to make some changes to the way Auth works in case if you want custom auth.


In order for it to work, the following environment variables must be defined:

`CLIENT_URL` - the domain your app is hosted on, internal docker url (e.g.: http://frontend:3000), org url of your proxy in docker. Can be just the name of your domain without http or .com.
`APP_DOMAIN` - full url of your domain (http://yourdomain.com) or url of your proxy.
`CLOUDINARY_FOLDER` - cloudinary folder to save images to
`ADMIN_EMAILS` - a list of emails that are allowed to access `/admin`
`API_KEY` - value of apiKey header appended to API requests
`AUTH_API_KEY` -value of authApiKey header appended to API requests
`APP_NAME` - the name of the app shown in title and navbar
`NODE_VERSION`
`BLOG_API_URL`
`AUTH_API_URL`

Cloudinary details:
`CLOUDINARY_NAME`
`CLOUDINARY_KEY`
`CLOUDINARY_SECRET`

Auth details:
`AUTH_JWT_SECRET`
`SMTP_HOST`
`SMTP_PORT`
`SMTP_LOGIN`
`SMTP_PASSWORD`


It runs on vercel and should run on netlify or any similar hosting. It will work on VPS with docker but there are caveats with creating production build using docker-compose as services have to be built in a specific order. API should be available (built) by the time the client starts building which is almost never the case as .NET app takes a lot longer to build. 