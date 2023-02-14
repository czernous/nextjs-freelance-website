import { IImage } from '@src/interfaces';
import { fetchData } from '@src/utils/data-fetching/client';
import getConfig from 'next/config';
import { Dispatch, SetStateAction } from 'react';

/* istanbul ignore next */
export const handleGalleryOpen = async (
  setImages: Dispatch<SetStateAction<IImage[] | null>>,
) => {
  const cfg = getConfig();
  const apiKey = cfg.publicRuntimeConfig.API_KEY;

  const imageResponse = await fetchData({
    url: '/backend/images',
    options: {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        apiKey,
      },
    },
  });

  const imagesData = await imageResponse?.json();
  setImages(imagesData);
};
