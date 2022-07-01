import { StaticImageData } from 'next/image';
import { Color, InputTypes, Size } from '../enums';

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

export interface IResponsiveImage {
  ext: string;
  url: string | StaticImageData;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}

export interface IImage extends IResponsiveImage {
  name: string;
  alternativeText: string;
  caption: string;
  previewUrl: string | null;
  formats: {
    large?: IResponsiveImage;
    small?: IResponsiveImage;
    medium?: IResponsiveImage;
    thumbnail?: IResponsiveImage;
  };
  provider: string;
  provider_metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
}

export interface IArticleCard {
  image: IImage;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  unoptimized: boolean;
}
