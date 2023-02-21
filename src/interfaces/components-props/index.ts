import { Color, InputTypes, Size } from '../../enums';
import { IImage, ISeo } from '../entities';

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
  customClass?: string;
  onClick?: () => void;
}

export interface IInputProps {
  type: 'input' | 'textarea';
  inputType?: InputTypes;
  inputAdditionalClasses?: string;
  inputColor: Color;
  inputId: string;
  inputPlaceholder: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  ariaDescribedBy?: string;
}

export interface IArticleCard {
  image: IImage;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  unoptimized: boolean;
}

export interface IPaginationButtonProps {
  text: string;
  action: string;
  active: boolean;
  disabled: boolean;
}

export interface INavbarProps {
  companyName: string;
  drawerWidth: number;
  navItems: INavItem[];
}

export interface INavItem {
  uuid: string;
  text: string;
  url: string;
}

export interface IClientPageLayoutProps {
  pageTitle: string;
  appTitle: string;
  meta: ISeo;
}

export interface ICustomSnackbarProps {
  text: string | null;
  severity: 'success' | 'error' | 'warning' | null;
  clearPropsFn?: ({ ...props }: ICustomSnackbarProps | null) => void;
}
