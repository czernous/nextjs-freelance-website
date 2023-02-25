/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminPageLayout from '@src/components/layouts/admin-page-layout';
import {
  IAboutPage,
  ICustomSnackbarProps,
  IError,
  IImage,
} from '@src/interfaces';
import { NextPageWithLayout } from '@src/pages/_app.page';
import { handleServerError, serverSideBackendFetch } from '@src/utils';
import { ReactElement, useRef, useState } from 'react';
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
import { handleGalleryOpen } from '@src/components/organisms/image-gallery/utils';

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
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
  const [images, setImages] = useState<IImage[] | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  /* istanbul ignore next */
  const handleImageSelection = (image: IImage) => {
    setSelectedImage(image);
    setIsGalleryOpen(false);
    setTimeout(() => {
      setSelectedImage(null);
    }, 500);
  };

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
              url: '/backend/pages/about',
              options: {
                method: 'PUT',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  apiKey: getConfig().publicRuntimeConfig.API_KEY,
                },
              },
              location: window.location.hostname,
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
              defaultValue={props?.data?.slug}
              multiline
              maxRows={4}
              sx={customMuiTextFieldBrick}
            />
            <SelectImageField
              fieldId={'image'}
              fieldName={'image'}
              fieldLabel={'image'}
              defaultValue={props?.data?.image}
              value={selectedImage?.secureUrl}
              onClick={
                /* istanbul ignore next */
                () => {
                  handleGalleryOpen(setImages);
                  setIsGalleryOpen(true);
                }
              }
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
};
/* istanbul ignore next */
AboutAdmin.getLayout = function getLayout(page: ReactElement) {
  return <AdminPageLayout title="Pages/About">{page} </AdminPageLayout>;
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
