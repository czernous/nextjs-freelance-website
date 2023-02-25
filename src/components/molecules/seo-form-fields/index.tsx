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
import React, { FunctionComponent, useState } from 'react';
import { IImage, ISeo } from '@src/interfaces';
import { handleGalleryOpen } from '@src/components/organisms/image-gallery/utils';
import ImageGallery from '@src/components/organisms/image-gallery';
import SelectImageField from '../select-image-field';

const CustomFormFields: FunctionComponent<{ meta: ISeo }> = ({
  ...props
}: {
  meta: ISeo;
}) => {
  const [images, setImages] = useState<IImage[] | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
  /* istanbul ignore next */
  const handleImageSelection = (image: IImage) => {
    setSelectedImage(image);
    setIsGalleryOpen(false);
    // make the field editable again
    setTimeout(() => {
      setSelectedImage(null);
    }, 500);
  };
  return (
    <Accordion sx={accordionStyleOverrides}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ fontFamily: 'Sanchez, sans-serif', fontWeight: 700 }}>
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
          defaultValue={props.meta?.metaDescription}
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
          defaultValue={props.meta?.metaKeywords}
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
          defaultValue={props.meta?.openGraph?.title}
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
          defaultValue={props.meta?.openGraph?.description}
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
          defaultValue={props.meta?.openGraph?.imageUrl}
          value={selectedImage?.secureUrl}
          onClick={
            /* istanbul ignore next */
            () => {
              handleGalleryOpen(setImages);
              setIsGalleryOpen(true);
            }
          }
          required={false}
        />
      </AccordionDetails>
      {images && (
        <ImageGallery
          images={images}
          isOpen={isGalleryOpen}
          onClose={
            /* istanbul ignore next */
            () => setIsGalleryOpen(false)
          }
          onImageSelect={handleImageSelection}
        />
      )}
    </Accordion>
  );
};

export default CustomFormFields;
