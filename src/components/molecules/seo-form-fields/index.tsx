import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
} from '@mui/material';
import {
  accordionStyleOverrides,
  flexColumn,
  customMuiTextFieldBrick,
} from '@src/mui-theme/custom-styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { FunctionComponent, memo, useCallback, useContext } from 'react';
import { ISeo } from '@src/interfaces';
import ImageGallery from '@src/components/organisms/image-gallery';
import SelectImageField from '../select-image-field';
import { GalleryContext } from '@src/components/organisms/image-gallery/state/image-gallery.base';

const CustomFormFields: FunctionComponent<{ meta?: ISeo }> = memo(
  ({ ...props }: { meta?: ISeo }) => {
    const galleryIdent = 'openGraph-seo-image';

    const galleryContext = useContext(GalleryContext);

    const { toggleOpen, selectedImages, setInstanceId } = galleryContext;

    /* istanbul ignore next */
    const handleOpen = useCallback(() => {
      setInstanceId(galleryIdent);
      toggleOpen();
    }, [setInstanceId, toggleOpen]);

    return (
      <Accordion sx={accordionStyleOverrides}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            sx={{ fontFamily: 'Sanchez, sans-serif', fontWeight: 700 }}
          >
            SEO
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={() => flexColumn(2)}>
          <TextField
            id="metaDescription"
            name="meta.metaDescription"
            label="Meta Description"
            required
            variant="outlined"
            defaultValue={props?.meta?.metaDescription ?? ''}
            multiline
            maxRows={4}
            inputProps={{ maxLength: 155 }}
            helperText="Enter 155 characters max"
            sx={customMuiTextFieldBrick}
          />{' '}
          <TextField
            id="metaKeywords"
            name="meta.metaKeywords"
            label="Meta Keywords"
            required
            variant="outlined"
            defaultValue={props?.meta?.metaKeywords ?? ''}
            helperText="Enter keywords separated by comma w/o spaces"
            multiline
            maxRows={4}
            sx={customMuiTextFieldBrick}
          />
          <TextField
            id="title"
            name="meta.openGraph.title"
            label="OG Title"
            required
            variant="outlined"
            defaultValue={props?.meta?.openGraph?.title ?? ''}
            multiline
            maxRows={4}
            sx={customMuiTextFieldBrick}
          />
          <TextField
            id="description"
            name="meta.openGraph.description"
            label="OG Description"
            required
            variant="outlined"
            defaultValue={props?.meta?.openGraph?.description ?? ''}
            multiline
            maxRows={4}
            inputProps={{ maxLength: 60 }}
            helperText="Enter 60 characters max"
            sx={customMuiTextFieldBrick}
          />
          <SelectImageField
            fieldId={'ogImageUrl'}
            fieldName={'meta.openGraph.imageUrl'}
            fieldLabel={'OG Image'}
            defaultValue={props?.meta?.openGraph?.imageUrl ?? ''}
            value={selectedImages[galleryIdent]?.secureUrl}
            onClick={handleOpen}
            required={false}
          />
        </AccordionDetails>
        <ImageGallery identifier={galleryIdent} />
      </Accordion>
    );
  },
);

CustomFormFields.displayName = 'CustomFormFields';

export default CustomFormFields;
