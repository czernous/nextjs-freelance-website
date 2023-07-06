/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminPageLayout from '@src/components/layouts/admin-page-layout';
import {
  IAboutPage,
  ICustomSnackbarProps,
  IError,
  IErrorResponse,
} from '@src/interfaces';
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
import { handleSubmit, fetchData } from '@src/utils/data-fetching/client';
import CustomSnackbar from '@src/components/molecules/custom-snackbar';
import { updateSnackbarProps } from '@src/components/molecules/custom-snackbar/utils';
import SeoFormFields from '@src/components/molecules/seo-form-fields';
import { NextPageContext } from 'next';
import { ServerResponse } from 'http';
import getConfig from 'next/config';
import RichEditor from '@src/components/organisms/rich-editor';
import SelectImageField from '@src/components/molecules/select-image-field';
import ImageGallery from '@src/components/organisms/image-gallery';
import { ImageGalleryProvider } from '@src/components/organisms/image-gallery/state/image-gallery.provider';
import { GalleryContext } from '@src/components/organisms/image-gallery/state/image-gallery.base';

interface IAboutPageAdminProps {
  data: IAboutPage;
  error?: Error;
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
            handler: fetchData,
            handlerProps: {
              url:
                /* istanbul ignore next */
                (props.data as unknown as IErrorResponse)?.status === 404
                  ? '/backend/pages'
                  : '/backend/pages/about',
              options: {
                method:
                  /* istanbul ignore next */
                  (props.data as unknown as IErrorResponse)?.status === 404
                    ? 'POST'
                    : 'PUT',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  apiKey: getConfig().publicRuntimeConfig.API_KEY,
                },
              },
              location: window.location.origin,
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
    const data = await serverSideBackendFetch<IAboutPage>('/pages/about');

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return handleServerError(res as ServerResponse, error as IError);
  }
}
export default AboutAdmin;
