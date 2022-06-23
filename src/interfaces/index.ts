import { Color, Size } from '../enums';

export interface IButtonProps {
  buttonColor: Color;
  buttonSize: Size;
  buttonType: 'button' | 'submit' | 'reset';
  buttonStyle: 'primary' | 'secondary' | 'main-cta';
  buttonText: string;
  buttonHref?: string;
  buttonTarget?: string;
  buttonFullWidth: boolean;
  hasShadow: boolean;
  isDisabled?: boolean;
}

export interface IInputProps {
  inputType: 'input' | 'textarea';
  inputAdditionalClasses?: string;
  inputColor: Color;
  inputId: string;
  inputPlaceholder: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  ariaDescribedBy?: string;
}
