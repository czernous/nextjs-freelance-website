import {
  AppBar,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Slide,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import ZoomInIcon from '@mui/icons-material/ZoomIn';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import {
  forwardRef,
  memo,
  ReactElement,
  Ref,
  useContext,
  useEffect,
} from 'react';

import { TransitionProps } from '@mui/material/transitions';
import { imageGalleryStyles } from '@src/mui-theme/custom-styles';
import { AddAPhotoOutlined, DeleteOutline } from '@mui/icons-material';
import ImageUpload from '@src/components/molecules/image-upload';
import { GalleryContext } from './state/image-gallery.base';

interface IImageGalleryProps {
  identifier: string;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// TODO: handle base64 placeholder creation on the backend
const ImageGallery = memo(({ identifier }: IImageGalleryProps) => {
  const galleryContext = useContext(GalleryContext);

  const {
    images,
    zoomedImage,
    isZoomed,
    isLoading,
    isOpen,
    hasImageUpload,
    showZoomedImage,
    fetchImages,
    deleteImage,
    toggleOpen,
    toggleImageUpload,
    handleZoomClose,
    selectImage,
  } = galleryContext;

  useEffect(() => {
    /* istanbul ignore next */
    if (!images) {
      (async () => {
        await fetchImages();
      })();
    }
  }, [images]);

  if (!identifier) return null;
  return (
    <>
      <div data-testid="image-gallery">
        <Dialog
          fullScreen
          open={isOpen}
          onClose={toggleOpen}
          TransitionComponent={Transition}
        >
          <AppBar sx={imageGalleryStyles.header}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={toggleOpen}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography
                sx={imageGalleryStyles.headerText}
                role="heading"
                variant="h6"
                component="div"
              >
                Image gallery
              </Typography>

              <IconButton
                component="span"
                title="Upload image"
                onClick={toggleImageUpload}
              >
                <AddAPhotoOutlined />
              </IconButton>
            </Toolbar>
          </AppBar>
          {isLoading || !images ? (
            <CircularProgress
              size={80}
              sx={{
                position: 'absolute',
                top: '48%',
                left: '48%',
              }}
            />
          ) : (
            <ImageList sx={imageGalleryStyles.imageList}>
              {images?.map((image) => (
                <ImageListItem key={image._id}>
                  <Image
                    src={image.secureUrl}
                    data-testid="gallery-image"
                    alt={image.altText ?? ''}
                    loading="lazy"
                    width={400}
                    height={400}
                    placeholder="blur"
                    blurDataURL={image.blurredImageUrl}
                    style={{
                      width: '100%',
                      objectFit: 'cover',
                      maxHeight: '100%',
                    }}
                  />
                  <ImageListItemBar
                    sx={imageGalleryStyles.listItemActionBar}
                    actionIcon={
                      <SpeedDial
                        direction="left"
                        ariaLabel={'Image actions'}
                        icon={<SpeedDialIcon />}
                        sx={imageGalleryStyles.speedDial}
                      >
                        <SpeedDialAction
                          icon={
                            <Tooltip title="zoom" placement="bottom">
                              <ZoomInIcon />
                            </Tooltip>
                          }
                          onClick={
                            /* istanbul ignore next */
                            () => showZoomedImage(image)
                          }
                        />

                        <SpeedDialAction
                          data-testid="select-image"
                          icon={
                            <Tooltip title="select image" placement="bottom">
                              <InsertPhotoIcon
                                onClick={
                                  /* istanbul ignore next */
                                  () => selectImage(image)
                                }
                              />
                            </Tooltip>
                          }
                        />

                        <SpeedDialAction
                          data-testid="delete-image"
                          icon={
                            <Tooltip title="delete image" placement="bottom">
                              <DeleteOutline
                                onClick={
                                  /* istanbul ignore next */
                                  () => {
                                    (async () =>
                                      await deleteImage(image._id))();
                                  }
                                }
                              />
                            </Tooltip>
                          }
                        />
                      </SpeedDial>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          <Dialog
            open={isZoomed}
            sx={{
              '.MuiPaper-root': { maxWidth: 'unset' },
              zIndex: 9999,
              '.MuiButtonBase-root': imageGalleryStyles.closeZoomButton,
            }}
          >
            <DialogActions>
              <IconButton
                sx={{
                  zIndex: 9999,
                }}
                onClick={handleZoomClose}
              >
                <CloseIcon />
              </IconButton>
            </DialogActions>
            <DialogContent
              sx={{
                minWidth: '60vw',
                aspectRatio: '16/9',
                maxHeight: '70vh',
              }}
            >
              {
                /* istanbul ignore next */
                zoomedImage && (
                  <Image
                    src={zoomedImage?.secureUrl}
                    alt={
                      /* istanbul ignore next */
                      zoomedImage.altText ?? ''
                    }
                    style={{
                      display: 'flex',
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                    }}
                    fill
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={zoomedImage.blurredImageUrl}
                  />
                )
              }
            </DialogContent>
          </Dialog>
          <ImageUpload isOpen={hasImageUpload} toggleOpen={toggleImageUpload} />
        </Dialog>
      </div>
    </>
  );
});

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery;
