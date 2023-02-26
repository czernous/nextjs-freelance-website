export interface IResponsiveImage {
  width: number;
  url: string;
}

interface IObjectId {
  timestamp: number;
  machine: number;
  pid: number;
  increment: number;
  creationTime: Date | string;
}

interface IEntity {
  id: IObjectId;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface IOpenGraph {
  title: string;
  description: string;
  imageUrl: string;
  url?: string;
  type?: string;
}

export interface ISeo {
  metaDescription: string;
  metaKeywords: string;
  openGraph: IOpenGraph;
}

interface ICategory extends IEntity {
  name: string;
}

interface IPost extends IEntity {
  title: string;
  categories: ICategory[];
  imageUrl: string;
  responsiveImgs: IResponsiveImage[];
  meta: ISeo; // seo
  isPublished: boolean;
  body: string;
}

export interface IImage extends IEntity {
  publicId: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resourceType: string;
  bytes: number;
  type: string;
  url: string;
  secureUrl: string;
  usedInPost?: IPost;
  responsiveUrls: IResponsiveImage[];
  thumbnailUrl: string;
  blurredImageUrl: string;
  path: string;
  altText?: string;
}

// FE only entities

interface IPage {
  updatedAt?: string;
  meta: ISeo;
  slug: string;
  pageFields: Record<string, string>;
}

export interface IHomePage extends IPage {
  pageFields: {
    ctaHeadline: string;
    ctaSubheadline: string;
    ctaBtnText: string;
    ctaBtnHref: string;
  };
  image?: IImage;
}

export interface IServicesPage extends IPage {
  pageFields: {
    content: string;
  };
}

export interface IAboutPage extends IPage {
  pageFields: {
    description: string;
  };
  image: string;
}

export interface IContactPage extends IPage {
  pageFields: {
    description?: string;
  };
  formActionUrl: string; // where the form is going to be posted, i.e. Formspree url + id
}

export interface IError {
  statusCode?: number;
  message?: string;
}
