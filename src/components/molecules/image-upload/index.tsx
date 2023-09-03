import { AddAPhoto, Close } from '@mui/icons-material';
import {
  useMediaQuery,
  useTheme,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  CircularProgress,
  Input,
} from '@mui/material';
import { customMuiButtonBrick } from '@src/mui-theme/custom-styles';
import { fileToBase64 } from '@src/utils/data-fetching/client';
import Image from 'next/image';
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import style from './image-upload.module.scss';
import { GalleryContext } from '@src/components/organisms/image-gallery/state/image-gallery.base';

interface IImageUploadProps {
  isOpen: boolean;
  toggleOpen: (isOpen: boolean) => void;
}

const ImageUpload = ({ isOpen, toggleOpen }: IImageUploadProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const fileRef = useRef<File | null>(null);
  const formDataRef = useRef<FormData | null>(null);
  const [base64Image, setBase64FromImage] = useState('');
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const [fileName, setFilename] = useState('');
  const galleryContext = useContext(GalleryContext);
  const { fetchImages } = galleryContext;

  /* istanbul ignore next */
  const resetState = useCallback(() => {
    setBase64FromImage('');

    setResponseMessage(null);
    setIsloading(false);
  }, []);
  /* istanbul ignore next */
  const handleClose = useCallback(() => {
    resetState();
    toggleOpen(false);
  }, [resetState, toggleOpen]);

  /* istanbul ignore next */
  const handleFilenameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFilename(e.target.value);
    },
    [],
  );

  /* istanbul ignore next */
  const uploadImage = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      if (!e?.currentTarget) return;

      e.preventDefault();

      if (fileName.length < 1) {
        setResponseMessage('Filename cannot be blank');
        return;
      }

      setIsloading(true);

      formDataRef.current = new FormData();
      formDataRef.current.append('image', fileRef.current as File);

      const response = await fetch(
        `${new URL(
          '/api/upload-image',
          window.location.origin,
        )}?url=/images&filename=${fileName}&method=POST&contentType=${fileRef
          .current?.type}`,
        {
          method: 'POST',

          body: formDataRef.current,
        },
      );

      const clonedResponse = response.clone();

      const res = await response?.json();

      if (String(clonedResponse.status).startsWith('2')) {
        await fetchImages();
        setResponseMessage('Image successfully uploaded.');
        // add a way to refetch images within image gallery on image upload
      } else {
        const errorMsg = res.error.message;
        setResponseMessage(errorMsg);
      }
      setIsloading(false);
    },
    [fetchImages, fileName, base64Image],
  );

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <form onSubmit={async (e) => await uploadImage(e)}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="button-file"
            type="file"
            name="binaryImage"
            title="binaryImage"
            onChange={
              /* istanbul ignore next */
              async (e) => {
                if (e.target.files?.length) {
                  const b64 = await fileToBase64(
                    e.target.files[0] as unknown as File,
                  );
                  fileRef.current = e.target.files[0];

                  if (b64 && typeof b64 === 'string') setBase64FromImage(b64);
                }
              }
            }
          />
          <label htmlFor="button-file">
            <IconButton
              component="span"
              title="Select image"
              onClick={resetState}
            >
              <AddAPhoto />
            </IconButton>
          </label>
          <Input
            name="filename"
            placeholder="Enter filename"
            defaultValue={fileName}
            onChange={handleFilenameChange}
          />
          <IconButton title="close" onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '*': { fontFamily: 'Sanchez, sans-serif' },
          }}
        >
          {
            /* istanbul ignore next */
            responseMessage ? (
              <div className={style.message}>
                <p>Message: {JSON.stringify(responseMessage)}</p>
              </div>
            ) : (
              <div className={style.preview}>
                <>
                  {
                    /* istanbul ignore next */
                    !base64Image && <p>Image preview</p>
                  }
                  {
                    /* istanbul ignore next */
                    base64Image && (
                      <Image src={base64Image} alt={'Image to upload'} fill />
                    )
                  }
                </>
              </div>
            )
          }
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ ...customMuiButtonBrick, gap: 1 }}
            disabled={isLoading}
            type="submit"
          >
            <span>Submit</span>
            {
              /* istanbul ignore next */
              isLoading && (
                <CircularProgress
                  size={15}
                  sx={{ color: customMuiButtonBrick.color, opacity: 0.4 }} // show when image is being uploaded/hide by default
                />
              )
            }
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ImageUpload;
