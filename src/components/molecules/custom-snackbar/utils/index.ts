import { ICustomSnackbarProps } from '@src/interfaces/components-props';
import { SetStateAction } from 'react';

export const updateSnackbarProps = async (
  r: Response,
  callback: (value: SetStateAction<ICustomSnackbarProps | null>) => void,
) => {
  if (!r) return;
  const severity =
    r.status === 200 || r.status === 204 || r.status === 201
      ? 'success'
      : 'error';
  const hasJson = r.headers.get('Content-Type')?.includes('application/json');
  /* istanbul ignore next */
  const statusMessageText = async (r: Response) => {
    switch (r.status) {
      case 204:
        return 'Successfully saved data';
      case 201:
        return 'Successfully created';
      default:
        return await r.text();
    }
  };

  let statusMsg;

  try {
    statusMsg =
      hasJson && r.headers.get('Method') === 'PUT'
        ? await r.json()
        : {
            message: await statusMessageText(r),
          };
  } catch (error) {
    /* istanbul ignore next */
    statusMsg = hasJson
      ? {
          message:
            statusMsg.message ||
            (r.status === 200
              ? 'Successfully saved data'
              : 'Error saving data'),
        }
      : { message: 'Error reading response as text' };
  }

  callback({
    severity,
    text: statusMsg?.message ?? statusMsg,
  });
};
