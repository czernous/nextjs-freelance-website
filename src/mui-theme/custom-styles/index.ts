import { alpha } from '@mui/material';
import { colors } from '../colors';

export const accordionStyleOverrides = {
  boxShadow: 'none',
  borderRadius: 0,
  backgroundColor: colors.bark[100],
  color: colors.olive[700],
};

export const customMuiTextFieldBrick = {
  '.MuiInputBase-input': {
    fontFamily: 'Sanchez, sans-serif',
    color: colors.olive[800],
  },
  '&.MuiTextField-root .MuiOutlinedInput-notchedOutline, .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline':
    {
      borderColor: colors.brick[400],
      background: alpha(colors.brick[400] as unknown as string, 0.05),
    },
  '&.MuiTextField-root .MuiInputBase-root.Mui-focused': {
    background: alpha(colors.brick[500] as unknown as string, 0.03),
  },
  '.MuiFormLabel-root': {
    color: colors.brick[400],
  },
  '.MuiFormLabel-root.Mui-focused': {
    color: colors.brick[600],
  },
};
/* istanbul ignore */
export const customMuiButtonBrick = {
  borderRadius: 0,
  boxShadow: 'none',
  display: 'flex',
  fontFamily: 'Sanchez, sans-serif',
  fontWeight: 700,
  textTransform: 'none',
  backgroundColor: colors.brick[200],
  color: colors.gray[700],
  ':hover': {
    backgroundColor: colors.brick[300],
    color: colors.gray[800],
    boxShadow: 'none',
  },
};
/* istanbul ignore */
export const flexColumn = (gap: number) => {
  return { display: 'flex', flexDirection: 'column', gap };
};
