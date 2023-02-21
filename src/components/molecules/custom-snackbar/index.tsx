import { Snackbar, Alert } from '@mui/material';
import { ICustomSnackbarProps } from '@src/interfaces/components-props';
import { memo, useState, useCallback, SyntheticEvent, useEffect } from 'react';

const CustomSnackbar = memo(({ ...props }: ICustomSnackbarProps) => {
  const [open, setOpen] = useState(false);
  /* istanbul ignore next */
  const handleClose = useCallback(
    (event?: SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
      setTimeout(() => {
        if (props.clearPropsFn) {
          props.clearPropsFn(null);
        }
      }, 500);
    },
    [props],
  );

  useEffect(() => {
    if (props.text) {
      setOpen(true);
    }
  }, [props.text]);

  if (!props) return null;

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={props.severity || 'error'}
        sx={{ width: '100%' }}
      >
        {props.text}
      </Alert>
    </Snackbar>
  );
});

CustomSnackbar.displayName = 'CustomSnackbar';

export default CustomSnackbar;
