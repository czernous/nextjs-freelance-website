import { Stack, TextField, Button, Tooltip } from '@mui/material';

import {
  customMuiTextFieldBrick,
  customMuiButtonBrick,
} from '@src/mui-theme/custom-styles';
import { memo } from 'react';

interface ISelectImageFieldProps {
  fieldId: string;
  fieldName: string;
  fieldLabel: string;
  defaultValue: string;
  value: string | undefined;
  required: boolean;
  onClick: () => void;
}
/* istanbul ignore next */
export const SelectImageField = memo<ISelectImageFieldProps>(
  ({
    fieldId,
    fieldName,
    fieldLabel,
    defaultValue,
    value,
    required,
    onClick,
  }) => (
    <Stack direction="row" spacing={2}>
      <Tooltip title={value ?? defaultValue}>
        <TextField
          id={fieldId}
          name={fieldName}
          label={fieldLabel}
          required={required}
          variant="outlined"
          value={
            /* istanbul disable next */
            value ?? defaultValue
          }
          fullWidth
          inputMode="url"
          sx={customMuiTextFieldBrick}
        />
      </Tooltip>
      <Button onClick={onClick} sx={customMuiButtonBrick}>
        Gallery
      </Button>
    </Stack>
  ),
);

SelectImageField.displayName = 'SelectImageField';

export default SelectImageField;
