/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminPageLayout from '@src/components/layouts/admin-page-layout';
import {
  IContactPage,
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
import { handleSubmit } from '@src/utils/data-fetching/client';
import CustomSnackbar from '@src/components/molecules/custom-snackbar';
import { updateSnackbarProps } from '@src/components/molecules/custom-snackbar/utils';
import SeoFormFields from '@src/components/molecules/seo-form-fields';
import { NextPageContext } from 'next';
import { ServerResponse } from 'http';
import { ImageGalleryProvider } from '@src/components/organisms/image-gallery/state/image-gallery.provider';

interface IContactPageAdminProps {
  data: IContactPage;
  error?: Error;
}

const ContactAdmin: NextPageWithLayout<IContactPageAdminProps> = ({
  ...props
}: IContactPageAdminProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [snackbarProps, setSnackbarProps] =
    useState<ICustomSnackbarProps | null>(null);

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
              pagePath: '/posts',
              url:
                `${new URL('/api/blog-data', window.location.origin)}?url=${
                  (props.data as unknown as IErrorResponse)?.status === 404
                    ? '/pages'
                    : '/pages/contact'
                }&method=${
                  (props.data as unknown as IErrorResponse)?.status === 404
                    ? 'POST'
                    : 'PUT'
                }` ?? '', // conditionally add based on query params
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
              id="contact-description"
              name="pageFields.description"
              label="Description"
              variant="outlined"
              defaultValue={props.data.pageFields?.description}
              multiline
              maxRows={4}
              sx={customMuiTextFieldBrick}
            />
            <TextField
              id="formActionUrl"
              name="formActionUrl"
              label="Form action URL"
              required
              variant="outlined"
              defaultValue={props.data.formActionUrl}
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
              value="contact"
              hidden
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
ContactAdmin.getLayout = function getLayout(page: ReactElement) {
  return (
    <ImageGalleryProvider>
      <AdminPageLayout title="Pages/Contact">{page} </AdminPageLayout>
    </ImageGalleryProvider>
  );
};
/* istanbul ignore next */
export async function getServerSideProps(ctx: NextPageContext) {
  const { res } = ctx;

  try {
    const { data } = await serverSideBackendFetch<IContactPage>({
      endpoint: '/pages/contact',
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
      },
    };
  } catch (error) {
    return handleServerError(res as ServerResponse, error as IError);
  }
}
export default ContactAdmin;
