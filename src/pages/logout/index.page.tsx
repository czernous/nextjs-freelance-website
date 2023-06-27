import { Box } from '@mui/material';
import { getConfig } from '@testing-library/react';
import { NextConfig, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const cfg: NextConfig = getConfig();
const host = cfg?.publicRuntimeConfig?.HOST ?? null;

function getCookie(cname: string) {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (const element of ca) {
    let c = element;
    while (c.startsWith(' ', 0)) {
      c = c.substring(1);
    }
    if (c.startsWith(name, 0)) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

const Logout: NextPage = () => {
  const [cookie, setCookie] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // most likely the cookie will already be deleted, double checking just in case
    const c = getCookie(`${host}-auth-token`);

    if (!c) {
      router.push('/');
    }

    if (!cookie && c) {
      setCookie(c);
    }
  }, [cookie, router]);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
      }}
    >
      <h5>Logging out</h5>
    </Box>
  );
};

export default Logout;
