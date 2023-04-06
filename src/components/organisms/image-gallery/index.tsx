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
  useCallback,
  useEffect,
  useState,
} from 'react';
import { IImage } from '@src/interfaces';
import { TransitionProps } from '@mui/material/transitions';

import { fetchAndConvertToBase64 } from '@src/utils/data-fetching/client';
import { imageGalleryStyles } from '@src/mui-theme/custom-styles';
import { AddAPhotoOutlined } from '@mui/icons-material';
import ImageUpload from '@src/components/molecules/image-upload';

interface IImageGalleryProps {
  images: IImage[];
  isOpen: boolean;
  onClose: (open: boolean) => void;
  onImageSelect: (image: IImage) => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ImageGallery = memo(
  ({ images, isOpen, onClose, onImageSelect }: IImageGalleryProps) => {
    const [currentImage, setCurrentImage] = useState<IImage | null>(null);
    const [updatedImages, setUpdatedImages] = useState<IImage[] | null>(null);
    const [openZoom, setOpenZoom] = useState(false);
    const [isImageUploadOpen, setImageUploadOpen] = useState(false);
    /* istanbul ignore next */
    const showZoomedImage = useCallback((image: IImage) => {
      setCurrentImage(image);
      setOpenZoom(true);
    }, []);
    /* istanbul ignore next */
    const handleClose = useCallback(() => {
      onClose(false);
    }, [onClose]);
    /* istanbul ignore next */
    const handleZoomClose = useCallback(() => {
      setOpenZoom(false);
    }, [setOpenZoom]);

    /* istanbul ignore next */
    const toggleImageUploadOpen = useCallback(() => {
      setImageUploadOpen(!isImageUploadOpen);
    }, [isImageUploadOpen]);

    useEffect(() => {
      (async () => {
        const updatedImages = await Promise.all(
          images.map(async (img) => {
            /* istanbul ignore next */
            if (img.blurredImageUrl.includes('https', 0)) {
              // fetch only if is a link and not base64 string
              const url = (await fetchAndConvertToBase64(
                img.blurredImageUrl,
              )) as string;
              img.blurredImageUrl = url;
            }
            return img;
          }),
        );
        setUpdatedImages(updatedImages);
      })();
    }, [images]);

    /* istanbul ignore next */
    if (!images) return null;

    return (
      <>
        <div>
          <Dialog
            fullScreen
            open={isOpen}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <AppBar sx={imageGalleryStyles.header}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
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
                  onClick={toggleImageUploadOpen}
                >
                  <AddAPhotoOutlined />
                </IconButton>
              </Toolbar>
            </AppBar>
            {!updatedImages || !updatedImages.length ? (
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
                {updatedImages.map((image) => (
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
                                    () => onImageSelect(image)
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
              open={openZoom}
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
                  currentImage && (
                    <Image
                      src={currentImage?.secureUrl}
                      /* istanbul ignore next */
                      alt={currentImage.altText ?? ''}
                      style={{
                        display: 'flex',
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                      }}
                      fill
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={currentImage.blurredImageUrl}
                    />
                  )
                }
              </DialogContent>
            </Dialog>
            <ImageUpload
              isOpen={isImageUploadOpen}
              toggleOpen={toggleImageUploadOpen}
            />
          </Dialog>
        </div>
      </>
    );
  },
);

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery;
