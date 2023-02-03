import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
} from '@mui/material';
import {
  accordionStyleOverrides,
  flexColumn,
  customMuiTextFieldBrick,
} from '@src/mui-theme/custom-styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { FunctionComponent } from 'react';
import { ISeo } from '@src/interfaces';

const CustomFormFields: FunctionComponent<{ meta: ISeo }> = ({
  ...props
}: {
  meta: ISeo;
}) => {
  return (
    <Accordion sx={accordionStyleOverrides}>
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
          defaultValue={props.meta.metaDescription}
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
          defaultValue={props.meta.metaKeywords}
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
          defaultValue={props.meta.openGraph?.title}
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
          defaultValue={props.meta.openGraph?.description}
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
          defaultValue={props.meta.openGraph?.imageUrl}
          multiline
          maxRows={4}
          inputMode="url"
          sx={customMuiTextFieldBrick}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomFormFields;
