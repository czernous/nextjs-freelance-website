/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminPageLayout from '@src/components/layouts/admin-page-layout';
import { NextPageWithLayout } from '@src/pages/_app.page';
import { ReactElement } from 'react';
import { ImageGalleryProvider } from '../../components/organisms/image-gallery/state/image-gallery.provider';
import { Link } from '@mui/material';

const subHeadingStyle = {
  marginTop: 20,
  marginBottom: 30,
  textDecoration: 'dotted underline',
};

const Admin: NextPageWithLayout = () => {
  return (
    <div className="d-flex flex-column">
      <h3>Welcome to your admin dashboard! </h3>
      <p className="mb-5">
        Below you can find some information that will help you use it
      </p>
      <Link href="#Login">Login</Link>
      <Link href="#content">Create content</Link>
      <Link href="#seo">SEO</Link>
      <Link href="#technical-considerations">Technical considerations</Link>
      <div>
        <h4 id="login" className="mt-5" style={subHeadingStyle}>
          Login
        </h4>
        <p>
          When the app was deployed, the developer provided a whitelist of
          emails to grant access to /admin routes.
        </p>
        <p>
          When you first try to access /admin route you will be taken to /login
          page. You will be asked to submit your email. Make sure this is the
          one you or developer added to the whitelist.
        </p>
        <p>
          Then, if your email is in the whitelist, you will receive a letter to
          the email you have specified. The letter will contain a link that you
          can use to gain access to the admin page.
        </p>
        <p>
          The server uses token/cookie based authentication and both are valid
          for 2 weeks. That means that unless you clean your cookies or logout,
          you will stay logged in for 2 weeks.
        </p>
        <h4 id="content" style={subHeadingStyle}>
          Create content
        </h4>
        <p>
          You can edit and/or create the following types of content:
          <b>page</b>, <b>post</b>, <b>image</b>
        </p>
        <h5>Pages / Posts</h5>
        <p>
          By default, when the app is first initialized, you start off with no
          content and you have to create all the relevant pages
        </p>
        <p>The pages are: home(/), about, services, blog, contact</p>
        <p>
          They all have required fields, that are separate into{' '}
          <Link href="#seo">SEO</Link> and Content <br />
          SEO fields are the same for all pages and posts.{' '}
        </p>
        <p>
          The images are uploaded to Cloudinary CDN. You can only currently use
          images uploaded to Cloudinary. <br />
          You can upload, delete or use images via the Image Gallery (images
          link in your left navbar). <br />
        </p>
        <p>
          You can also insert images into the body of your posts or some of the
          pages that use Rich Editor. Note that images are displayed differently
          in Rich Editor and on page (subject to change).
        </p>
        <p>
          Inserted images will be centered taking 70% width of the container
          while retaining the original aspect-ratio. <br />
          Visit{' '}
          <Link href="#technical-considerations">
            Technical considerations
          </Link>{' '}
          for more information.
        </p>
        <h5>Posts</h5>
        <p>
          When you create a new post, make sure you ticked &ldquo;publish&rdquo;
          box. Otherwise the post will be saved but will not appear on the
          website. You can unpublish posts by unticking the box.
        </p>
        <h4 id="seo" style={subHeadingStyle}>
          SEO
        </h4>
        <p>
          Each resource you create or edit has SEO fields. Those are required by
          search engines. Required fields are meta description, meta keywords
          (comma separated list of keywords). You have to also fill out the
          fields related to Open Graph (OG). These are necessary to create a
          card when your page is being shared on social media.
        </p>
        <p>
          Not that title is generated from the App name you provided (displayed
          on your navbar) + pipe symbol (|) + page slug.
        </p>
      </div>
    </div>
  );
};
/* istanbul ignore next */
Admin.getLayout = function getLayout(page: ReactElement) {
  return (
    <ImageGalleryProvider>
      <AdminPageLayout title="Admin">{page}</AdminPageLayout>
    </ImageGalleryProvider>
  );
};

export default Admin;
