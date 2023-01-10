import { createTheme } from '@mui/material';
import { colors } from './colors';
import React from 'react';

export const theme = createTheme({
  customColors: { ...colors } as unknown as {
    [key: string]: { [key: number]: React.CSSProperties['color'] };
  },
});
