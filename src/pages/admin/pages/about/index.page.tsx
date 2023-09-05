/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminPageLayout from '@src/components/layouts/admin-page-layout';
import { IAboutPage, ICustomSnackbarProps, IError } from '@src/interfaces';
import { NextPageWithLayout } from '@src/pages/_app.page';
import { handleServerError, serverSideBackendFetch } from '@src/utils';
import { ReactElement, useCallback, useContext, useRef, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  accordionStyleOverrides,
  customMuiButtonBrick,
  customMuiTextFieldBrick,
  flexColumn,
} from '@src/mui-theme/custom-styles';
import { handleSubmit } from '@src/utils/data-fetching/client';
import CustomSnackbar from '@src/components/molecules/custom-snackbar';
import { updateSnackbarProps } from '@src/components/molecules/custom-snackbar/utils';
import SeoFormFields from '@src/components/molecules/seo-form-fields';
import { NextPageContext } from 'next';
import { ServerResponse } from 'http';
import RichEditor from '@src/components/organisms/rich-editor';
import SelectImageField from '@src/components/molecules/select-image-field';
import ImageGallery from '@src/components/organisms/image-gallery';
import { ImageGalleryProvider } from '@src/components/organisms/image-gallery/state/image-gallery.provider';
import { GalleryContext } from '@src/components/organisms/image-gallery/state/image-gallery.base';

interface IAboutPageAdminProps {
  data: IAboutPage;
  error?: Error;
  statusCode: number;
}

const AboutAdmin: NextPageWithLayout<IAboutPageAdminProps> = ({
  ...props
}: IAboutPageAdminProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [editorHtml, setEditorHtml] = useState(
    props.data?.pageFields?.description ?? '',
  );
  const [snackbarProps, setSnackbarProps] =
    useState<ICustomSnackbarProps | null>(null);

  const galleryIdent = 'about-page-image';

  const galleryContext = useContext(GalleryContext);

  const { toggleOpen, selectedImages, setInstanceId } = galleryContext;

  /* istanbul ignore next */
  const handleOpen = useCallback(() => {
    setInstanceId(galleryIdent);
    toggleOpen();
  }, [setInstanceId, toggleOpen]);

  return (
    <>
      <Box
        component="form"
        action="/"
        method="PUT"
        ref={formRef}
        sx={{ marginBottom: 5 }}
        onSubmit={async (e) => {
          /* istanbul ignore next */
          const response = await handleSubmit({
            event: e as unknown as SubmitEvent,
            formRef,
            fetchOptions: {
              baseUrl: window.location.origin,
              pagePath: 'about',
              url:
                `${new URL('/api/blog-data', window.location.origin)}?url=${
                  props.statusCode === 404 ? '/pages' : '/pages/about'
                }&method=${props.statusCode === 404 ? 'POST' : 'PUT'}` ?? '', // conditionally add based on query params
            },
          });
          /* istanbul ignore next */
          updateSnackbarProps(response as Response, setSnackbarProps);
        }}
      >
        <Accordion defaultExpanded sx={accordionStyleOverrides}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              sx={{ fontFamily: 'Sanchez, sans-serif', fontWeight: 700 }}
            >
              Description
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={() => flexColumn(2)}>
            <TextField
              id="desc"
              name="pageFields.description"
              label="description"
              hidden
              value={editorHtml}
            />

            <RichEditor onEditorUpdate={setEditorHtml} content={editorHtml} />
            <TextField
              id="slug"
              name="slug"
              label="Page Slug"
              required
              variant="outlined"
              value="about"
              hidden
              sx={customMuiTextFieldBrick}
            />
            <SelectImageField
              fieldId={'image'}
              fieldName={'image'}
              fieldLabel={'image'}
              defaultValue={props?.data?.image}
              value={selectedImages[galleryIdent]?.secureUrl}
              onClick={handleOpen}
              required={true}
            />
          </AccordionDetails>
        </Accordion>

        <SeoFormFields meta={props?.data?.meta} />
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

      <ImageGallery identifier={galleryIdent} />
    </>
  );
};
/* istanbul ignore next */
AboutAdmin.getLayout = function getLayout(page: ReactElement) {
  return (
    <ImageGalleryProvider>
      <AdminPageLayout title="Pages/About">{page} </AdminPageLayout>
    </ImageGalleryProvider>
  );
};
/* istanbul ignore next */
export async function getServerSideProps(ctx: NextPageContext) {
  const { res } = ctx;

  try {
    const { data, statusCode } = await serverSideBackendFetch<IAboutPage>({
      endpoint: '/pages/about',
      method: 'GET',
      headers: process.env.API_KEY
        ? new Headers({
            'Content-Type': 'application/json',
            apiKey: process.env.API_KEY,
          })
        : null,
      serverUrl: process.env.BLOG_API_URL ?? null,
    });

    return {
      props: {
        data,
        statusCode,
      },
    };
  } catch (error) {
    return handleServerError(res as ServerResponse, error as IError);
  }
}
export default AboutAdmin;
