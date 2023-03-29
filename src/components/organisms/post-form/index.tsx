import { ArrowCircleLeftOutlined } from '@mui/icons-material';
import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
  Button,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import CustomSnackbar from '@src/components/molecules/custom-snackbar';
import { updateSnackbarProps } from '@src/components/molecules/custom-snackbar/utils';
import SeoFormFields from '@src/components/molecules/seo-form-fields';
import {
  ICustomSnackbarProps,
  IImage,
  IPaginationSettings,
  IPost,
  IPostsResponse,
} from '@src/interfaces';
import {
  accordionStyleOverrides,
  flexColumn,
  customMuiTextFieldBrick,
  customMuiButtonBrick,
  customMuiCheckbox,
} from '@src/mui-theme/custom-styles';
import {
  handleSubmit,
  fetchData,
  revalidatePosts,
} from '@src/utils/data-fetching/client';
import getConfig from 'next/config';
import { NextRouter } from 'next/router';
import React, { memo, useCallback, useRef, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RichEditor from '../rich-editor';
import ImageGallery from '../image-gallery';
import SelectImageField from '@src/components/molecules/select-image-field';
import { handleGalleryOpen } from '../image-gallery/utils';

interface IPostFormProps {
  currentPost?: IPost | null;
  postsResponse: IPostsResponse;
  paginationSettings: IPaginationSettings;
  isNewPost: boolean;
  router: NextRouter;
  updatePaginationSettings: (paginationSettings: IPaginationSettings) => void;
  updatePostsResponse: (postsResponse: IPostsResponse) => void;
}

const PostForm = memo(({ ...props }: IPostFormProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [snackbarProps, setSnackbarProps] =
    useState<ICustomSnackbarProps | null>(null);

  const [editorHtml, setEditorHtml] = useState(props.currentPost?.body ?? '');

  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
  const [images, setImages] = useState<IImage[] | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isPublished, setIsPublished] = useState(
    props.currentPost?.isPublished ?? true,
  );

  const goBackToList = () => props.router.back();

  const togglePublished = useCallback(
    () => setIsPublished(!isPublished),
    [isPublished],
  );

  /* istanbul ignore next */
  const handleGallery = useCallback(() => {
    handleGalleryOpen(setImages);
    setIsGalleryOpen(true);
  }, []);

  /* istanbul ignore next */
  const handleImageSelection = useCallback((image: IImage) => {
    setSelectedImage(image);
    setIsGalleryOpen(false);
    setTimeout(() => {
      setSelectedImage(null);
    }, 500);
  }, []);

  const handleFormSubmit = useCallback(
    async (e: unknown) => {
      /* istanbul ignore next */
      const response = await handleSubmit({
        event: e as SubmitEvent,
        formRef,
        handler: fetchData,
        handlerProps: {
          url: `/backend/posts/${props?.currentPost?._id ?? ''}`, // conditionally add based on query params
          options: {
            method: !props.isNewPost ? 'PUT' : 'POST', // conditionally set to PUT or POST depending on query parms id{24} or id=new
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              apiKey: getConfig().publicRuntimeConfig.API_KEY,
            },
          },
          location: window.location.origin,
        },
      });

      try {
        const currentPost: IPost | null = props.currentPost ?? null;
        const posts = await fetch(
          `${window.location.origin}/backend/posts?page=${
            props.paginationSettings.page + 1
          }&pageSize=${props.paginationSettings.pageSize}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              apiKey: getConfig().publicRuntimeConfig.API_KEY,
            },
          },
        );
        /* istanbul ignore next */
        const postsResponse = await posts?.json();
        /* istanbul ignore next */
        if (postsResponse) {
          await revalidatePosts(
            window.location.origin,
            props.postsResponse.totalDocuments,
            props.postsResponse.pageSize,
            currentPost,
          );

          props.updatePostsResponse(postsResponse);
        }
      } catch (error) {
        /* istanbul ignore next */
        console.warn(`Error revalidating posts: ${error}`);
      }
      /* istanbul ignore next */
      updateSnackbarProps(response as Response, setSnackbarProps);
    },
    [props],
  );

  if (props.currentPost === null)
    return <h3>The post you have requested does not exist</h3>;

  return (
    <>
      <IconButton
        onClick={goBackToList}
        title="Back to list"
        sx={{ width: 'fit-content', marginBottom: 2 }}
      >
        <ArrowCircleLeftOutlined />
      </IconButton>
      <Box
        component="form"
        action="/"
        method="PUT"
        ref={formRef}
        sx={{ marginBottom: 5 }}
        onSubmit={handleFormSubmit}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={isPublished}
              onChange={togglePublished}
              value={isPublished}
              sx={customMuiCheckbox}
            />
          }
          id="isPublished"
          name="isPublished"
          label="Publish"
          sx={{ fontFamily: 'Sanchez, sans-serif' }}
        />

        <Accordion defaultExpanded sx={accordionStyleOverrides}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              sx={{ fontFamily: 'Sanchez, sans-serif', fontWeight: 700 }}
            >
              Content
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={() => flexColumn(2)}>
            <TextField
              id="title"
              name="title"
              label="Post title"
              required
              variant="outlined"
              /* istanbul ignore next*/
              defaultValue={props?.currentPost?.title ?? ''}
              multiline
              maxRows={4}
              sx={customMuiTextFieldBrick}
            />
            <TextField
              id="short-description"
              name="shortDescription"
              label="Short description"
              required
              variant="outlined"
              /* istanbul ignore next*/
              defaultValue={props?.currentPost?.shortDescription ?? ''}
              inputProps={{ maxLength: 120 }}
              multiline
              maxRows={4}
              helperText="120 characters max"
              sx={customMuiTextFieldBrick}
            />
            <TextField
              id="slug"
              name="slug"
              label="Post Slug"
              required
              variant="outlined"
              /* istanbul ignore next*/
              defaultValue={props?.currentPost?.slug ?? ''}
              multiline
              maxRows={4}
              sx={customMuiTextFieldBrick}
            />
            <TextField
              id="body"
              name="body"
              label="body"
              hidden
              value={editorHtml}
            />

            <RichEditor onEditorUpdate={setEditorHtml} content={editorHtml} />
            <SelectImageField
              fieldId={'imageUrl'}
              fieldName={'imageUrl'}
              fieldLabel={'imageUrl'}
              /* istanbul ignore next*/
              defaultValue={props?.currentPost?.imageUrl ?? ''}
              value={selectedImage?.secureUrl}
              onClick={handleGallery}
              required={true}
            />
          </AccordionDetails>
        </Accordion>
        <SeoFormFields meta={props?.currentPost?.meta} />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ ...customMuiButtonBrick, marginTop: 2 }}
        >
          Submit
        </Button>
      </Box>
      <CustomSnackbar
        severity={snackbarProps?.severity ?? null}
        text={snackbarProps?.text ?? null}
        clearPropsFn={setSnackbarProps}
      />
      {
        /* istanbul ignore next */
        images && (
          <ImageGallery
            images={images}
            isOpen={isGalleryOpen}
            onClose={
              /* istanbul ignore next */
              () => setIsGalleryOpen(false)
            }
            onImageSelect={handleImageSelection}
          />
        )
      }
    </>
  );
});

PostForm.displayName = 'PostForm';

export default PostForm;
