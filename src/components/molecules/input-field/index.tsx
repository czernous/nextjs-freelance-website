import React from 'react';
import { IInputProps } from '@src/interfaces';
import Input from '@src/components/atoms/input';
import styles from './input-field.module.scss';

function InputField({
  ...props
}: IInputProps & { fieldLabel: string; fieldClasses: string }) {
  return (
    <div className={`${props.fieldClasses} ${styles.input}`}>
      <label htmlFor={props.inputId}>{props.fieldLabel}</label>
      <Input
        inputType={props.inputType}
        type={props.type}
        inputColor={props.inputColor}
        inputId={props.inputId}
        inputPlaceholder={props.inputPlaceholder}
        isRequired={props.isRequired}
        isDisabled={props.isDisabled}
        ariaDescribedBy={props.ariaDescribedBy}
      />
    </div>
  );
}

export default InputField;
