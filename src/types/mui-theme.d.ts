import React from 'react';

declare module '@mui/material/styles' {
  interface Theme {
    customColors: {
      [key: string]: { [key: number]: React.CSSProperties['color'] };
    };
  }

  interface ThemeOptions {
    customColors: {
      [key: string]: { [key: number]: React.CSSProperties['color'] };
    };
  }
}
