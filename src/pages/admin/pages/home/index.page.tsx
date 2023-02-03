/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminPageLayout from '@src/components/layouts/admin-page-layout';
import { ICustomSnackbarProps, IError, IHomePage } from '@src/interfaces';
import { NextPageWithLayout } from '@src/pages/_app.page';
import { getFilePath, getPageData, handleServerError } from '@src/utils';
import { ReactElement, useRef, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  accordionStyleOverrides,
  customMuiButtonBrick,
  customMuiTextFieldBrick,
  flexColumn,
} from '@src/mui-theme/custom-styles';
import { handleSubmit, submitData } from '@src/utils/data-fetching/client';
import CustomSnackbar from '@src/components/molecules/custom-snackbar';
import { updateSnackbarProps } from '@src/components/molecules/custom-snackbar/utils';
import SeoFormFields from '@src/components/molecules/seo-form-fields';
import { NextPageContext } from 'next';
import { ServerResponse } from 'http';

interface IHomePageAdminProps {
  data: IHomePage;
  error?: Error;
}

const HomeAdmin: NextPageWithLayout<IHomePageAdminProps> = ({
  ...props
}: IHomePageAdminProps) => {
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
            handler: submitData,
            handlerProps: {
              url: '/api/pages?name=home',
              options: {
                method: 'PUT',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              },
            },
          });
          /* istanbul ignore next */
          updateSnackbarProps(response as Response, setSnackbarProps);
        }}
      >
        <Accordion defaultExpanded sx={accordionStyleOverrides}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h5>Content</h5>
          </AccordionSummary>
          <AccordionDetails sx={() => flexColumn(2)}>
            <TextField
              id="ctaHeadline"
              name="ctaHeadline"
              label="CTA headline"
              required
              variant="outlined"
              defaultValue={props.data.ctaHeadline}
              multiline
              maxRows={4}
              sx={customMuiTextFieldBrick}
            />
            <TextField
              id="ctaSubheadline"
              name="ctaSubheadline"
              label="CTA subheadline"
              required
              variant="outlined"
              defaultValue={props.data.ctaSubheadline}
              multiline
              maxRows={4}
              sx={customMuiTextFieldBrick}
            />
            <TextField
              id="ctaBtnText"
              name="ctaBtnText"
              label="Button text"
              required
              variant="outlined"
              defaultValue={props.data.ctaBtnText}
              multiline
              maxRows={4}
              sx={customMuiTextFieldBrick}
            />
            <TextField
              id="ctaBtnHref"
              name="ctaBtnHref"
              label="Button href"
              required
              variant="outlined"
              defaultValue={props.data.ctaBtnHref}
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

HomeAdmin.getLayout = function getLayout(page: ReactElement) {
  return <AdminPageLayout title="Pages/Home">{page} </AdminPageLayout>;
};
/* istanbul ignore next */
export async function getServerSideProps(ctx: NextPageContext) {
  const { res } = ctx;

  try {
    const pageData: IHomePage = await getPageData(
      getFilePath('./src/public/data/pages', 'home', 'json'),
    );

    return {
      props: {
        data: pageData,
      },
    };
  } catch (error) {
    return handleServerError(res as ServerResponse, error as IError);
  }
}
export default HomeAdmin;
