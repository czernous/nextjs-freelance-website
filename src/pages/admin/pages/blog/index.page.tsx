/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminPageLayout from '@src/components/layouts/admin-page-layout';
import {
  IBlogPage,
  ICustomSnackbarProps,
  IError,
  IErrorResponse,
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
import { ImageGalleryProvider } from '@src/components/organisms/image-gallery/state/image-gallery.provider';

interface IBlogPageAdminProps {
  data: IBlogPage;
  error?: Error;
}

const BlogAdmin: NextPageWithLayout<IBlogPageAdminProps> = ({
  ...props
}: IBlogPageAdminProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [snackbarProps, setSnackbarProps] =
    useState<ICustomSnackbarProps | null>(null);

  return (
    <>
      <Box
        component="form"
        action="/"
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
                  : 'backend/pages/blog',
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
              Content
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={() => flexColumn(2)}>
            <TextField
              id="page-fields"
              name="pageFields.unused"
              label="Description"
              hidden
              variant="outlined"
              defaultValue={props.data.pageFields?.unused}
              value=""
              multiline
              maxRows={4}
              sx={customMuiTextFieldBrick}
            />
            <TextField
              id="slug"
              name="slug"
              label="Page Slug"
              required
              variant="outlined"
              value="blog"
              multiline
              maxRows={4}
              sx={customMuiTextFieldBrick}
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
    </>
  );
};
/* istanbul ignore next */
BlogAdmin.getLayout = function getLayout(page: ReactElement) {
  return (
    <ImageGalleryProvider>
      <AdminPageLayout title="Pages/Blog">{page} </AdminPageLayout>
    </ImageGalleryProvider>
  );
};
/* istanbul ignore next */
export async function getServerSideProps(ctx: NextPageContext) {
  const { res } = ctx;

  try {
    const response = await serverSideBackendFetch<IBlogPage>('/pages/blog');

    const data = response;

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return handleServerError(res as ServerResponse, error as IError);
  }
}
export default BlogAdmin;
