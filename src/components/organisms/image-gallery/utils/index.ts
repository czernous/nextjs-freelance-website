import { IImage } from '@src/interfaces';
import { Dispatch, SetStateAction } from 'react';

/* istanbul ignore next */
export const getImages = async (): Promise<IImage[]> => {
  const imageResponse = await fetch(
    `${new URL(
      '/api/blog-data',
      window.location.origin,
    )}?url=/images&method=GET`,
  );

  const r = await imageResponse?.json();

  return r?.data;
};

/* istanbul ignore next */
export const handleGalleryOpen = async (
  setImages: Dispatch<SetStateAction<IImage[] | null>>,
) => {
  const imageResponse = await fetch(
    `${new URL(
      '/api/blog-data',
      window.location.origin,
    )}?url=/images&method=GET`,
  );

  const imagesData = await imageResponse?.json();

  setImages(imagesData?.data);
};

/* istanbul ignore next */
export const handleImageDelete = async (imageId: string) => {
  const imageDeleteResponse = await fetch(
    `${new URL(
      '/api/blog-data',
      window.location.origin,
    )}?url=/images/${imageId}&method=DELETE`,
  );

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
