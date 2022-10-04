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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id: IObjectId;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface ICategory extends IEntity {
  name: string;
}

interface IPost extends IEntity {
  title: string;
  categories: ICategory[];
  imageUrl: string;
  responsiveImgs: IResponsiveImage[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta: any; // seo
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
