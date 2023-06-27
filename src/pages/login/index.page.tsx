import { ChangeEvent, useState } from 'react';
import { Box, Button, CircularProgress, TextField } from '@mui/material';

import { NextPage } from 'next';
import getConfig from 'next/config';
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

  const cfg = getConfig();

  const tryAuthenticate = async () => {
    const allowedEmails: string[] = cfg.publicRuntimeConfig.ADMIN_EMAILS;

    if (!allowedEmails) {
      setErrorText('Could not find email whitelist, contact administrator');
      return;
    }

    if (!allowedEmails.includes(email)) {
      setErrorText('This email does not have admin privileges');
      return;
    }

    setStatus('loading');
    const response = await fetch(
      `${window.location.origin}/auth/token?email=${email}&protected-url=${window.location.origin}/admin`,
    );

    const clonedResponse = response.clone();

    try {
      const r: { Ok: boolean; Message: string } = await response.json();
      if (!r.Ok) {
        setErrorText(`Error: ${r.Message}`);
      }

      console.log(r.Message);
      return setStatus('done');
    } catch (e) {
      console.warn((e as Error).message);
    }

    try {
      const msg = await clonedResponse.text();
      setErrorText(`Error: ${msg}`);
    } catch (e) {
      console.warn((e as Error).message);
    }
    setStatus('default');
  };

  const renderUi = () => {
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
  };

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
