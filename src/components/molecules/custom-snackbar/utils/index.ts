import { ICustomSnackbarProps } from '@src/interfaces/components-props';
import { SetStateAction } from 'react';

export const updateSnackbarProps = async (
  r: Response,
  callback: (value: SetStateAction<ICustomSnackbarProps | null>) => void,
) => {
  if (!r) return;
  const severity = r.status === 200 || r.status === 204 ? 'success' : 'error';

  let statusMsg;

  if (r.headers.get('Content-Type')?.includes('application/json')) {
    try {
      statusMsg = await r.json();
    } catch (error) {
      /* istanbul ignore next */
      statusMsg = {
        message:
          statusMsg.message ||
          (r.status === 200 ? 'Successfully saved data' : 'Error saving data'),
      };
    }
  } else {
    try {
      statusMsg = {
        message: r.status === 204 ? 'Successfully saved data' : await r.text(),
      };
    } catch (error) {
      /* istanbul ignore next */
      statusMsg = { message: 'Error reading response as text' };
    }
  }

  callback({
    severity,
    text: statusMsg?.message ?? statusMsg,
  });
};
