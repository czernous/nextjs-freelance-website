import {
  PlusOneOutlined,
  EditOutlined,
  DeleteOutline,
} from '@mui/icons-material';
import {
  IconButton,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ICustomSnackbarProps, IPost, IPostsListProps } from '@src/interfaces';
import Link from 'next/link';
import Image from 'next/image';
import React, { memo, useCallback, useState } from 'react';
import { revalidatePosts } from '@src/utils/data-fetching/client';
import { updateSnackbarProps } from '@src/components/molecules/custom-snackbar/utils';
import CustomSnackbar from '@src/components/molecules/custom-snackbar';
import {
  customMuiButtonBrick,
  customMuiButtonDanger,
  customMuiTable,
} from '@src/mui-theme/custom-styles';

const PostsList = memo(({ ...props }: IPostsListProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const [markedPost, setMarkedPost] = useState<IPost | null>(null);
  const [snackbarProps, setSnackbarProps] =
    useState<ICustomSnackbarProps | null>(null);

  /* istanbul ignore next */
  const handleClose = useCallback(() => setOpen(false), []);

  /* istanbul ignore next */
  const handlePageChange = useCallback(
    (e: React.MouseEvent<HTMLButtonElement> | null) => {
      const target = e?.currentTarget;
      const ariaLabel = target?.getAttribute('aria-label');
      const isNext = !!ariaLabel?.includes('next');

      if (
        props.postsResponse &&
        props.postsResponse?.totalDocuments > props.postsResponse?.page + 1 &&
        ariaLabel
      )
        props.updatePaginationSettings({
          ...props.paginationSettings,
          page: isNext
            ? props.paginationSettings.page + 1
            : props.paginationSettings.page - 1,
        });
    },
    [props],
  );

  /* istanbul ignore next */
  const handleRowsPerpageChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const rpp = e?.target?.value ?? null;
      if (rpp)
        props.updatePaginationSettings({
          ...props.paginationSettings,
          pageSize: Number(rpp),
        });
    },
    [props],
  );

  const handleMarkForDeletion = useCallback((post: IPost) => {
    setMarkedPost(post);
    setOpen(true);
  }, []);

  /* istanbul ignore next */
  const deletePostAndRevalidate = useCallback(
    async (post: IPost) => {
      const deleteResponse = await fetch(
        `${new URL('/api/blog-data', window.location.origin)}?url=/posts/${
          post._id
        }&method=DELETE`,
      );

      if (deleteResponse?.ok && props.postsResponse) {
        const filteredPosts = props.postsResponse.data.filter(
          (r) => r._id !== post._id,
        );

        // revalidate all posts pages
        try {
          props.updatePostsResponse({
            ...props.postsResponse,
            data: filteredPosts,
          });
          await revalidatePosts(
            window.location.origin,
            props.postsResponse.totalDocuments,
            props.postsResponse.pageSize,
            post,
          );
          // update state
        } catch (error) {
          /* istanbul ignore next */
          console.warn(`Error revalidating posts: ${error}`);
        }
      }

      /* istanbul ignore next */
      await updateSnackbarProps(deleteResponse as Response, setSnackbarProps);
    },
    [props],
  );
  /* istanbul ignore next */
  const handleDeletePost = useCallback(() => {
    if (markedPost) {
      deletePostAndRevalidate(markedPost);
      setOpen(false);
    }
  }, [deletePostAndRevalidate, markedPost]);

  return (
    <div className="d-flex flex-column">
      <Link
        href="?id=new"
        passHref
        style={{ marginBottom: 20 }}
        data-testid="new-post"
      >
        <IconButton title="Add new post">
          <PlusOneOutlined />
        </IconButton>
      </Link>
      <Paper
        sx={{
          width: '100%',
          overflow: 'hidden',
          marginBottom: '2em',
        }}
      >
        <TableContainer
          sx={{
            maxHeight: '70vh',
            '& *': {
              fontFamily: 'Sanchez, sans-serif!important',
            },
          }}
        >
          <Table stickyHeader aria-label="sticky table" sx={customMuiTable}>
            <TableHead>
              <TableRow>
                {[
                  {
                    id: 1,
                    label: 'Title',
                  },
                  {
                    id: 2,
                    label: 'Publish Date',
                  },
                  {
                    id: 3,
                    label: 'Image',
                    style: {
                      '@media(max-width: 900px)': { display: 'none' },
                    },
                  },
                  {
                    id: 4,
                    label: 'Actions',
                  },
                  {
                    id: 5,
                    label: 'Status',
                  },
                ].map((column) => (
                  <TableCell key={column.id} sx={column?.style}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.postsResponse?.data?.map((post) => {
                return (
                  <TableRow
                    data-testid="post-item"
                    hover
                    tabIndex={-1}
                    key={post._id}
                  >
                    <TableCell>{post.title}</TableCell>
                    <TableCell>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      sx={{
                        '@media(max-width: 900px)': { display: 'none' },
                      }}
                    >
                      {post.responsiveImgs?.length !== 0 && (
                        <Image
                          src={
                            post.responsiveImgs?.find(
                              (img) => img.width === 768,
                            )?.url ?? ''
                          }
                          alt={post?.imageAltText ?? ''}
                          width={150}
                          height={80}
                          style={{ objectFit: 'cover' }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Link href={`?id=${post._id}`} passHref>
                        <IconButton title="Edit post">
                          <EditOutlined />
                        </IconButton>
                      </Link>
                      <IconButton
                        data-testid="delete-button"
                        onClick={() => handleMarkForDeletion(post)}
                      >
                        <DeleteOutline />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <p>
                        {
                          /* istanbul ignore next */
                          post.isPublished ? 'published' : 'draft'
                        }
                      </p>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={
            /* istanbul ignore next */
            props.postsResponse?.totalDocuments ?? 1
          }
          rowsPerPage={props.paginationSettings?.pageSize}
          page={props.paginationSettings?.page} // is zero-based
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerpageChange}
          sx={{
            '& p': {
              marginTop: 'unset',
              marginBottom: 'unset',
            },
            ...customMuiTable,
          }}
        />
      </Paper>
      {
        /* istanbul ignore next */
        markedPost && (
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle
              id="responsive-dialog-title"
              sx={{ fontFamily: 'Mulish, sans-serif', fontWeight: 700 }}
            >
              {'Are you sure you want to delete this post?'}
            </DialogTitle>
            <DialogContent sx={{ '*': { fontFamily: 'Sanchez, sans-serif' } }}>
              <DialogContentText component={'div'}>
                <h4>Title: {markedPost.title}</h4>
                <p>Short description: {markedPost.shortDescription}</p>
                <p>
                  Published on:{' '}
                  {new Date(markedPost.createdAt).toLocaleTimeString()}
                </p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} sx={customMuiButtonBrick}>
                Cancel
              </Button>
              <Button
                onClick={handleDeletePost}
                sx={customMuiButtonDanger}
                data-testid="delete-post"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        )
      }
      <CustomSnackbar
        severity={
          /* istanbul ignore next */
          snackbarProps?.severity ?? null
        }
        text={
          /* istanbul ignore next */
          snackbarProps?.text ?? null
        }
        clearPropsFn={setSnackbarProps}
      />
    </div>
  );
});

PostsList.displayName = 'PostsList';

export default PostsList;
