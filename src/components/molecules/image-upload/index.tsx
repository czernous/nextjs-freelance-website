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
import getConfig from 'next/config';
import Image from 'next/image';
import React, { ChangeEvent, useCallback, useState } from 'react';
import style from './image-upload.module.scss';

interface IImageUploadProps {
  isOpen: boolean;
  toggleOpen: (isOpen: boolean) => void;
}

const ImageUpload = ({ isOpen, toggleOpen }: IImageUploadProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [base64Image, setBase64FromImage] = useState('');
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const [fileName, setFilename] = useState('');
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
      if (!e || !e.currentTarget) return;

      e.preventDefault();
      const apiKey = getConfig()?.publicRuntimeConfig?.API_KEY ?? null;

      if (fileName.length < 1) {
        setResponseMessage('Filename cannot be blank');
        return;
      }

      if (!apiKey) return;
      setIsloading(true);
      const response = await fetch(
        `${window.location.origin}/backend/images?filename=${fileName}&folder=test-api-folder/test-images/&maxWidth=2400&widths=512,768,1140,1920&quality=70`,
        {
          method: 'POST',
          body: new FormData(e.currentTarget),
          headers: {
            Accept: 'application/json',
            apiKey: getConfig()?.publicRuntimeConfig?.API_KEY,
          },
        },
      );

      if (response.ok) {
        setResponseMessage(
          'Image successfully uploaded. If you are using Image Gallery, you should reopen it to fetch new image(s).',
        );
        // add a way to refetch images within image gallery on image upload
      } else {
        const json = await response.json();
        setResponseMessage(json);
      }
      setIsloading(false);
    },
    [fileName],
  );

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <form
        action={`${window.location.origin}/backend/images`}
        method="POST"
        onSubmit={async (e) => await uploadImage(e)}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="button-file"
            type="file"
            name="file"
            title="file"
            onChange={
              /* istanbul ignore next */
              async (e) => {
                if (e.target.files?.length) {
                  const b64 = await fileToBase64(
                    e.target.files[0] as unknown as File,
                  );

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
