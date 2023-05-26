import { IImage } from '@src/interfaces';
import {
  Dispatch,
  createContext,
  useCallback,
  useMemo,
  useReducer,
} from 'react';
import { getImages, handleImageDelete } from '../utils';
import { imageMock } from '../../article-card/mocks';

// types
export interface IImageGalleryContext {
  images: IImage[] | null;
  image: IImage | null;
  instanceid: string;
  selectedImages: Record<string, IImage | null>;
  zoomedImage: IImage | null;
  hasImageUpload: boolean;
  isZoomed: boolean;
  isOpen: boolean;
  isLoading: boolean;
  fetchImages: () => Promise<void>;
  deleteImage: (imageId: string) => Promise<void>;
  toggleOpen: () => void;
  toggleImageUpload: () => void;
  handleZoomClose: () => void;
  showZoomedImage: (zoomedImage: IImage) => void;
  selectImage: (image: IImage | null) => void;
  setInstanceId: (instanceid: string) => void;
}
// initial context(state)
const initialState = {
  images: null,
  image: null,
  instanceid: '',
  selectedImages: {},
  zoomedImage: null,
  hasImageUpload: false,
  isZoomed: false,
  isOpen: false,
  isLoading: false,
} as IImageGalleryContext;
// actions
export enum GalleryActions {
  FETCH_IMAGES = 'FETCH_IMAGES',
  SELECT_IMAGE = 'SELECT_IMAGE',
  ZOOM_IMAGE = 'ZOOM_IMAGE',
  SET_INSTANCEID = 'SET_INSTANCEID',
  TOGGLE_OPEN = 'TOGGLE_OPEN',
  TOGGLE_ZOOMED = 'TOGGLE_ZOOMED',
  TOGGLE_UPLOAD = 'TOGGLE_UPLOAD',
  TOGGLE_LOADING = 'TOGGLE_LOADING',
}

export interface IGalleryAction {
  type: string;
  payload: IImageGalleryContext;
}

export const GalleryContext = createContext(initialState);
// reducer
const reducer = (state: IImageGalleryContext, action: IGalleryAction) => {
  switch (action.type) {
    case GalleryActions.FETCH_IMAGES:
      return {
        ...state,
        images: action.payload.images ?? state.images,
      };

    case GalleryActions.SET_INSTANCEID:
      return {
        ...state,
        instanceid: action.payload.instanceid,
      };

    case GalleryActions.SELECT_IMAGE:
      return {
        ...state,
        selectedImages: {
          ...state.selectedImages,
          [`${state.instanceid}`]: action.payload.image,
        },
      };

    case GalleryActions.ZOOM_IMAGE:
      return {
        ...state,
        zoomedImage: action.payload.zoomedImage ?? null,
      };

    case GalleryActions.TOGGLE_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };

    case GalleryActions.TOGGLE_OPEN:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case GalleryActions.TOGGLE_ZOOMED:
      return {
        ...state,

        isZoomed: !state.isZoomed,
      };
    case GalleryActions.TOGGLE_UPLOAD:
      return {
        ...state,
        hasImageUpload: !state.hasImageUpload,
      };

    default:
      return state;
  }
};
// usereducer/dispatching actions
/* istanbul ignore next */
export const useGalleryReducer = () => {
  const [gallery, dispatch]: [IImageGalleryContext, Dispatch<IGalleryAction>] =
    useReducer(reducer, initialState);

  const fetchImages = useCallback(async () => {
    // set loading status
    dispatch({
      type: GalleryActions.TOGGLE_LOADING,
      payload: gallery,
    });

    const images = await getImages();

    dispatch({
      type: GalleryActions.FETCH_IMAGES,
      payload: { ...gallery, images },
    });

    // set loading status
    dispatch({
      type: GalleryActions.TOGGLE_LOADING,
      payload: gallery,
    });
  }, [gallery]);

  const deleteImage = useCallback(
    async (imageId: string) => {
      // set loading status
      dispatch({
        type: GalleryActions.TOGGLE_LOADING,
        payload: gallery,
      });
      // delete
      await handleImageDelete(imageId);

      // refetch
      const images = await getImages();

      dispatch({
        type: GalleryActions.FETCH_IMAGES,
        payload: { ...gallery, images },
      });
      // clear loading status
      dispatch({
        type: GalleryActions.TOGGLE_LOADING,
        payload: gallery,
      });
    },
    [gallery],
  );

  const toggleOpen = useCallback(() => {
    dispatch({
      type: GalleryActions.TOGGLE_OPEN,
      payload: gallery,
    });
  }, [gallery]);

  const toggleImageUpload = useCallback(() => {
    dispatch({
      type: GalleryActions.TOGGLE_UPLOAD,
      payload: gallery,
    });
  }, [gallery]);

  const showZoomedImage = useCallback(
    (zoomedImage: IImage) => {
      dispatch({
        type: GalleryActions.ZOOM_IMAGE,
        payload: { ...gallery, zoomedImage },
      });
      dispatch({
        type: GalleryActions.TOGGLE_ZOOMED,
        payload: gallery,
      });
    },
    [gallery],
  );

  const handleZoomClose = useCallback(() => {
    dispatch({
      type: GalleryActions.TOGGLE_ZOOMED,
      payload: gallery,
    });

    dispatch({
      type: GalleryActions.ZOOM_IMAGE,
      payload: { ...gallery, zoomedImage: null },
    });
  }, [gallery]);

  const selectImage = useCallback(
    (image: IImage | null) => {
      dispatch({
        type: GalleryActions.SELECT_IMAGE,
        payload: {
          ...gallery,
          image,
        },
      });

      setTimeout(() => {
        dispatch({
          type: GalleryActions.TOGGLE_OPEN,
          payload: gallery,
        });
      }, 500);
    },
    [gallery],
  );

  const setInstanceId = useCallback(
    (instanceid: string) => {
      dispatch({
        type: GalleryActions.SET_INSTANCEID,
        payload: {
          ...gallery,
          instanceid,
        },
      });
    },
    [gallery],
  );

  return useMemo(
    () => ({
      images: gallery.images,
      image: gallery.image,
      instanceid: gallery.instanceid,
      selectedImages: gallery.selectedImages,
      zoomedImage: gallery.zoomedImage,
      hasImageUpload: gallery.hasImageUpload,
      isZoomed: gallery.isZoomed,
      isOpen: gallery.isOpen,
      isLoading: gallery.isLoading,
      fetchImages,
      deleteImage,
      toggleOpen,
      toggleImageUpload,
      handleZoomClose,
      showZoomedImage,
      selectImage,
      setInstanceId,
    }),
    [
      gallery.images,
      gallery.image,
      gallery.instanceid,
      gallery.selectedImages,
      gallery.zoomedImage,
      gallery.hasImageUpload,
      gallery.isZoomed,
      gallery.isOpen,
      gallery.isLoading,
      fetchImages,
      deleteImage,
      toggleOpen,
      toggleImageUpload,
      handleZoomClose,
      showZoomedImage,
      selectImage,
      setInstanceId,
    ],
  );
};

// mock reducer // TODO: dry up the code
/* istanbul ignore next */
export const useMockGalleryReducer = () => {
  const [gallery]: [IImageGalleryContext, Dispatch<IGalleryAction>] =
    useReducer(reducer, initialState);

  const fetchImages = useCallback(async () => {
    const images = await Promise.resolve([imageMock]);

    gallery.images = images;
  }, [gallery]);

  const deleteImage = async (imageId: string) => {
    // delete
    await Promise.resolve();

    // refetch
    if (gallery.images) {
      const images = gallery.images.filter((i) => i._id !== imageId);
      gallery.images = images;
    }
  };

  const toggleOpen = () => {
    gallery.isOpen = !gallery.isOpen;
  };

  const toggleImageUpload = () => {
    gallery.hasImageUpload = !gallery.hasImageUpload;
  };

  const showZoomedImage = (zoomedImage: IImage) => {
    gallery.zoomedImage = zoomedImage;
    gallery.isOpen = !gallery.isOpen;
  };

  const handleZoomClose = () => {
    gallery.isZoomed = !gallery.isZoomed;
  };

  const selectImage = (image: IImage | null) => {
    gallery.selectedImages = {
      ...gallery.selectedImages,
      [`${gallery.instanceid}`]: image,
    };

    setTimeout(() => {
      gallery.isOpen = !gallery.isOpen;
    }, 500);
  };
  const setInstanceId = (instanceid: string) => {
    gallery.instanceid = instanceid;
  };

  return {
    images: gallery.images,
    image: gallery.image,
    instanceid: gallery.instanceid,
    selectedImages: gallery.selectedImages,
    zoomedImage: gallery.zoomedImage,
    hasImageUpload: gallery.hasImageUpload,
    isZoomed: gallery.isZoomed,
    isOpen: gallery.isOpen,
    isLoading: gallery.isLoading,
    fetchImages,
    deleteImage,
    toggleOpen,
    toggleImageUpload,
    handleZoomClose,
    showZoomedImage,
    selectImage,
    setInstanceId,
  };
};
