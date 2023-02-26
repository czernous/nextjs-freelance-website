import React from 'react';
import { IInputProps } from '@src/interfaces';
import styles from './input.module.scss';

function Input({ ...props }: IInputProps) {
  const { inputColor, inputAdditionalClasses } = props;
  const inputClasses = `${inputAdditionalClasses} ${inputColor} ${styles.input}`;

  return props.type === 'textarea' ? (
    <textarea
      id={props.inputId}
      name={props.name}
      className={inputClasses}
      placeholder={props.inputPlaceholder}
      required={props.isRequired}
      disabled={props.isDisabled}
      aria-describedby={props.ariaDescribedBy}
    />
  ) : (
    <input
      id={props.inputId}
      name={props.name}
      className={inputClasses}
      type={props.inputType}
      placeholder={props.inputPlaceholder}
      required={props.isRequired}
      disabled={props.isDisabled}
      aria-describedby={props.ariaDescribedBy}
    />
  );
}

export default Input;
