import { ChangeEvent, useCallback, useState } from 'react';
import { Box, Button, CircularProgress, TextField } from '@mui/material';

import { NextPage } from 'next';

import {
  customMuiButtonBrick,
  customMuiTextFieldBrick,
} from '@src/mui-theme/custom-styles';

type IStatus = 'loading' | 'default' | 'done';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [errorText, setErrorText] = useState('');
  const [status, setStatus] = useState<IStatus>('default');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setErrorText(
      e.target.value.includes('@') ? '' : 'Please provide a valid email',
    ); // some arbitrary validation, replace with regex or something
    setEmail(e.target.value);
  };

  const tryAuthenticate = useCallback(async () => {
    setStatus('loading');

    const response = await fetch(
      new URL(
        `/api/auth?email=${email}&protected_url=${window.location.origin}/admin`,
        window.location.origin,
      ),
    );

    try {
      const r = await response.json();

      if (!r.ok) {
        setErrorText(`Error: ${r.message}`);
      } else {
        return setStatus('done');
      }
    } catch (e) {
      console.warn((e as Error).message);
    }

    setStatus('default');
  }, [email]);

  const renderUi = useCallback(() => {
    switch (status) {
      case 'loading':
        return <CircularProgress size={90} sx={{ color: 'unset' }} />;

      case 'done':
        return (
          <h2>
            Link was generated and sent to your email, <br /> you may now close
            this tab
          </h2>
        );

      default:
        return (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              sx={customMuiTextFieldBrick}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              error={errorText.length > 1}
              helperText={errorText.length > 1 ? errorText : undefined}
              color={errorText.length > 1 ? 'error' : undefined}
            />
            <Button
              sx={{ ...customMuiButtonBrick, height: 56 }}
              onClick={tryAuthenticate}
            >
              Login with Email
            </Button>
          </Box>
        );
    }
  }, [errorText, status, tryAuthenticate]);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {renderUi()}
    </Box>
  );
};

export default Login;
