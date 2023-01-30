/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminPageLayout from '@src/components/layouts/admin-page-layout';
import { IHomePage } from '@src/interfaces';
import { NextPageWithLayout } from '@src/pages/_app.page';
import { getFilePath, getPageData } from '@src/utils';
import { ReactElement, useRef } from 'react';
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

interface IHomePageAdminProps {
  data: IHomePage;
}

const HomeAdmin: NextPageWithLayout<IHomePageAdminProps> = ({
  ...props
}: IHomePageAdminProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <>
      <Box
        component="form"
        action="/"
        method="PUT"
        ref={formRef}
        sx={{ marginBottom: 5 }}
        onSubmit={(e) =>
          /* istanbul ignore next */
          handleSubmit({
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
          })
        }
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
        <Accordion sx={accordionStyleOverrides}>
          {/* TODO: move the SEO fields to a separate component for reusability */}
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h5>SEO</h5>
          </AccordionSummary>
          <AccordionDetails sx={() => flexColumn(2)}>
            <TextField
              id="metaDescription"
              name="metaDescription"
              label="Meta Description"
              required
              variant="outlined"
              defaultValue={props.data?.meta?.metaDescription}
              multiline
              maxRows={4}
              inputProps={{ maxLength: 155 }}
              helperText="Enter 155 characters max"
              sx={customMuiTextFieldBrick}
            />{' '}
            <TextField
              id="metaKeywords"
              name="metaKeywords"
              label="Meta Keywords"
              required
              variant="outlined"
              defaultValue={props.data?.meta?.metaKeywords}
              helperText="Enter keywords separated by comma w/o spaces"
              multiline
              maxRows={4}
              sx={customMuiTextFieldBrick}
            />
            <TextField
              id="title"
              name="title"
              label="OG Title"
              required
              variant="outlined"
              defaultValue={props.data?.meta?.openGraph?.title}
              multiline
              maxRows={4}
              sx={customMuiTextFieldBrick}
            />
            <TextField
              id="description"
              name="description"
              label="OG Description"
              required
              variant="outlined"
              defaultValue={props.data?.meta?.openGraph?.description}
              multiline
              maxRows={4}
              inputProps={{ maxLength: 60 }}
              helperText="Enter 60 characters max"
              sx={customMuiTextFieldBrick}
            />
            {/* TODO: get the url from image gallery when it is created */}
            <TextField
              id="OgImageUrl"
              name="OgImageUrl"
              label="OG Image"
              required
              variant="outlined"
              defaultValue={props.data?.meta?.openGraph?.imageUrl}
              multiline
              maxRows={4}
              sx={customMuiTextFieldBrick}
            />
          </AccordionDetails>
        </Accordion>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ ...customMuiButtonBrick, marginTop: 2 }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

HomeAdmin.getLayout = function getLayout(page: ReactElement) {
  return <AdminPageLayout title="Pages/Home">{page} </AdminPageLayout>;
};
/* istanbul ignore next */
export async function getServerSideProps() {
  try {
    const pageData: IHomePage = await getPageData(
      getFilePath('./src/public/data/pages', 'home', 'json'),
    );

    return {
      props: {
        data: pageData,
      },
    };
  } catch (error: unknown) {
    const err = JSON.parse(JSON.stringify(error));
    return {
      props: {
        err,
      },
    };
  }
}
export default HomeAdmin;
