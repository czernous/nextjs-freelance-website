import AdminPageLayout from '@src/components/layouts/admin-page-layout';
import PostForm from '@src/components/organisms/post-form';

import { IPaginationSettings, IPostsResponse } from '@src/interfaces';

import { NextPageWithLayout } from '@src/pages/_app.page';
import { fetchData } from '@src/utils/data-fetching/client';
import getConfig from 'next/config';

import { useRouter } from 'next/router';

import React, { ReactElement, useEffect, useState } from 'react';
import PostsList from '@src/components/organisms/posts-list';
import { NextConfig } from 'next';

const PostsAdmin: NextPageWithLayout = () => {
  const [postsResponse, setPostsResponse] = useState<IPostsResponse | null>(
    null,
  );

  const [paginationSettings, setPaginationSettings] =
    useState<IPaginationSettings>({
      page: 0,
      pageSize: postsResponse?.pageSize ?? 10,
    });

  const cfg: NextConfig = getConfig();
  const router = useRouter();

  useEffect(() => {
    fetchData({
      url: `/backend/posts?page=${paginationSettings.page + 1}&pageSize=${
        paginationSettings.pageSize
      }`,
      options: {
        method: 'GET',
        headers: {
          apiKey: cfg.publicRuntimeConfig?.API_KEY,
        },
      },
      location: window.location.origin,
    })
      .then((r) => r?.json())
      .then((p) => setPostsResponse(p));
  }, [
    paginationSettings.page,
    paginationSettings.pageSize,
    cfg.publicRuntimeConfig?.API_KEY,
  ]);

  const isNewPost = router.query.id === 'new';
  /* istanbul ignore next */
  if (router.query.id && (isNewPost || router.query.id.length === 24)) {
    return (
      <>
        {postsResponse?.data && (
          <PostForm
            isNewPost={isNewPost}
            paginationSettings={paginationSettings}
            postsResponse={postsResponse}
            updatePaginationSettings={setPaginationSettings}
            updatePostsResponse={setPostsResponse}
            router={router}
            currentPost={
              isNewPost
                ? undefined
                : postsResponse.data.find((p) => p._id === router.query.id)
            }
          />
        )}
      </>
    );
  }

  return (
    <>
      {postsResponse?.data && (
        <PostsList
          postsResponse={postsResponse}
          paginationSettings={paginationSettings}
          updatePaginationSettings={setPaginationSettings}
          updatePostsResponse={setPostsResponse}
          cfg={cfg}
        />
      )}{' '}
    </>
  );
};
/* istanbul ignore next */
PostsAdmin.getLayout = function getLayout(page: ReactElement) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter(); // TODO: find a better way to do this later
  const { query } = router;
  const title = `Posts${
    query.id !== undefined && query.id !== null && query.id.length
      ? '/' + query.id
      : ''
  }`;

  return <AdminPageLayout title={title}>{page} </AdminPageLayout>;
};

export default PostsAdmin;
