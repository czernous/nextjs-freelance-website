import { ICustomSnackbarProps } from '@src/interfaces/components-props';
import { SetStateAction } from 'react';

export const updateSnackbarProps = async (
  r: Response,
  callback: (value: SetStateAction<ICustomSnackbarProps | null>) => void,
) => {
  const json = await r?.json();

  callback(json?.message);
};
