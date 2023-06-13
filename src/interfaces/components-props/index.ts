import { NextConfig } from 'next';
import { Color, InputTypes, Size } from '../../enums';
import { IBlogPage, IError, IPaginatedData, IPost, ISeo } from '../entities';

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
  name: string;
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
  imageUrl: string;
  imageAltText: string;
  blurredImageUrl: string;
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
  meta: ISeo | null;
}

export interface ICustomSnackbarProps {
  text: string | null;
  severity: 'success' | 'error' | 'warning' | null;
  clearPropsFn?: ({ ...props }: ICustomSnackbarProps | null) => void;
}

export interface IBlogProps {
  data: IPaginatedData<IPost>;
  meta: IBlogPage;
  error?: IError;
}

export interface IPostsResponse {
  data: IPost[];
  hasPagination: boolean;
  page: number;
  pageSize: number;
  totalPages: number;
  totalDocuments: number;
}

export interface IPaginationSettings {
  page: number;
  pageSize: number;
}

export interface IPostsListProps {
  postsResponse: IPostsResponse;
  paginationSettings: IPaginationSettings;
  cfg: NextConfig;
  updatePaginationSettings: (paginationSettings: IPaginationSettings) => void;
  updatePostsResponse: (postsResponse: IPostsResponse) => void;
}
