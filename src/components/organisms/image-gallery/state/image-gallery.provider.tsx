import React, { FC, HTMLAttributes, ReactNode } from 'react';
import {
  GalleryContext,
  useGalleryReducer,
  useMockGalleryReducer,
} from './image-gallery.base';

export interface IImageGalleryProviderProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/* istanbul ignore next */
export const ImageGalleryProvider: FC<IImageGalleryProviderProps> = ({
  children,
}) => {
  const contextValue = useGalleryReducer();

  return (
    <GalleryContext.Provider value={contextValue}>
      {children}
    </GalleryContext.Provider>
  );
};

export const MockGalleryProvider: FC<IImageGalleryProviderProps> = ({
  children,
}) => {
  const contextValue = useMockGalleryReducer();

  return (
    <GalleryContext.Provider value={contextValue}>
      {children}
    </GalleryContext.Provider>
  );
};
