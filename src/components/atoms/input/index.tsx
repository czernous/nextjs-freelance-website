import React from 'react';
import { IInputProps } from '../../../interfaces';
import styles from './input.module.scss';

function Input({ ...props }: IInputProps) {
  const { inputColor, inputAdditionalClasses } = props;
  const inputClasses = `${inputAdditionalClasses} ${inputColor} ${styles.input}`;

  return props.inputType === 'textarea' ? (
    <textarea
      id={props.inputId}
      className={inputClasses}
      placeholder={props.inputPlaceholder}
      required={props.isRequired}
      disabled={props.isDisabled}
      aria-describedby={props.ariaDescribedBy}
    />
  ) : (
    <input
      id={props.inputId}
      className={inputClasses}
      placeholder={props.inputPlaceholder}
      required={props.isRequired}
      disabled={props.isDisabled}
      aria-describedby={props.ariaDescribedBy}
    />
  );
}

export default Input;
