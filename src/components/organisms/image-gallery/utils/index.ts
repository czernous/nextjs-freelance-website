import { IImage } from '@src/interfaces';
import { fetchData } from '@src/utils/data-fetching/client';
import getConfig from 'next/config';
import { Dispatch, SetStateAction } from 'react';

/* istanbul ignore next */
export const getImages = async (): Promise<IImage[]> => {
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
    location: `${window.location.origin}`,
  });

  return await imageResponse?.json();
};

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
    location: `${window.location.origin}`,
  });

  const imagesData = await imageResponse?.json();
  setImages(imagesData);
};

/* istanbul ignore next */
export const handleImageDelete = async (imageId: string) => {
  const cfg = getConfig();
  const apiKey = cfg.publicRuntimeConfig.API_KEY;

  const imageDeleteResponse = await fetchData({
    url: `/backend/images/${imageId}`,
    options: {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        apiKey,
      },
    },
    location: `${window.location.origin}`,
  });

  if (imageDeleteResponse?.status === 204) {
    // TODO: add toast notification upon delete
  }

  if (imageDeleteResponse?.status === 404) {
    alert(
      'This image does not exist, you have probably deleted it already. Please reopen the gallery',
    );

    // TODO: add toast notification upon delete
  }
};
