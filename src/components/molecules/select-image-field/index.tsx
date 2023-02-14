import { Stack, TextField, Button } from '@mui/material';

import {
  customMuiTextFieldBrick,
  customMuiButtonBrick,
} from '@src/mui-theme/custom-styles';

interface ISelectImageFieldProps {
  fieldId: string;
  fieldName: string;
  fieldLabel: string;
  defaultValue: string;
  value: string | undefined;
  onClick: () => void;
}
/* istanbul ignore next */
export const SelectImageField = ({
  fieldId,
  fieldName,
  fieldLabel,
  defaultValue,
  value,
  onClick,
}: ISelectImageFieldProps) => (
  <Stack direction="row" spacing={2}>
    <TextField
      id={fieldId}
      name={fieldName}
      label={fieldLabel}
      required
      variant="outlined"
      defaultValue={defaultValue}
      value={value}
      multiline
      maxRows={4}
      inputMode="url"
      fullWidth
      sx={customMuiTextFieldBrick}
    />
    <Button onClick={onClick} sx={customMuiButtonBrick}>
      Gallery
    </Button>
  </Stack>
);

export default SelectImageField;
