import { ICustomSnackbarProps } from '@src/interfaces/components-props';
import { SetStateAction } from 'react';

export const updateSnackbarProps = async (
  r: Response,
  callback: (value: SetStateAction<ICustomSnackbarProps | null>) => void,
) => {
  if (!r) return;
  const severity = r.status === 200 || r.status === 204 ? 'success' : 'error';
  const hasJson = r.headers.get('Content-Type')?.includes('application/json');

  let statusMsg;

  try {
    statusMsg = hasJson
      ? await r.json()
      : {
          message:
            r.status === 204 ? 'Successfully saved data' : await r.text(),
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
