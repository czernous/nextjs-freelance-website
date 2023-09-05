import { imagePlaceholder } from '@src/assets/image-placeholder';
import { IError, IHttpMethod, IPost } from '@src/interfaces';
import { NextRouter } from 'next/router';
import { ChangeEvent, MutableRefObject } from 'react';

interface IFetchDataProps {
  /** next api url with qs params to fetch data from blog api */
  url: string;
  /** page path without slash only for `/pages/*` paths */
  pagePath?: string;
  /** base */
  baseUrl: string;
  /** method */
  method?: IHttpMethod;
}

interface ISubmitHandlerOptions {
  event: SubmitEvent;
  formRef: MutableRefObject<HTMLFormElement | null>;
  fetchOptions: IFetchDataProps;
  appendFields?: { [key: string]: string }[];
}

export const handleSubmit = async ({ ...options }: ISubmitHandlerOptions) => {
  options.event.preventDefault();
  if (!options.formRef) return;

  const formData = new FormData(options.formRef.current as HTMLFormElement);

  if (options.appendFields?.length) {
    options.appendFields.forEach((field) => {
      formData.append(Object.keys(field)[0], Object.values(field)[0]);
    });
  }

  const formattedObject: Record<string, unknown> = {};
  const formDataEntries = [...formData.entries()].sort(([keyA], [keyB]) =>
    keyA.localeCompare(keyB),
  );
  for (const [key, value] of formDataEntries) {
    const keys = key.split('.');
    let obj = formattedObject;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      obj[k] = obj[k] || {};
      obj = obj[k] as Record<string, unknown>;
    }

    const isBoolean = value === 'true' || value === 'false';
    const isTrue = isBoolean && value === 'true';

    obj[keys[keys.length - 1]] = isBoolean ? isTrue : value;
  }

  const { url } = options.fetchOptions;

  const method =
    options.fetchOptions.url.split('method=').at(-1)?.split('&')[0] ?? 'POST';

  const response = await fetch(url, {
    body: JSON.stringify(formattedObject),
    method,
  });

  if (options.fetchOptions.url.includes('pages')) {
    const path =
      options.fetchOptions.pagePath === 'home'
        ? '/'
        : `/${options.fetchOptions.pagePath}`;

    console.debug(options.fetchOptions.pagePath);

    if (response.status === 404) {
      return response;
    }

    const revalidateResponse = await fetch(
      `${options.fetchOptions.baseUrl}/api/revalidate?path=${path}`,
      { method: 'POST' },
    );

    try {
      await revalidateResponse?.json();
    } catch (error) {
      console.error(error);
    }
  }
  return response;
};
/* istanbul ignore next */
export const revalidatePosts = async (
  originUrl: string,
  totalDocuments: number,
  pageSize: number,
  post?: IPost | null | undefined,
) => {
  if (!post || !post.isPublished) return;
  // create paths to revalidate
  const pagePaths: string[] = [];

  const totalPages = Math.ceil(totalDocuments / pageSize); //TODO: pageSize comes in null and pageSIze is 1, find other way

  for (let i = totalPages; i > 0; i--) {
    pagePaths.push(`/blog/page/${i}`);
  }

  const revalidatePaths = [`/blog`, ...pagePaths];
  if (post) revalidatePaths.push(`/blog/${post.slug}`);
  const revalidatePostsResposne = await Promise.all(
    revalidatePaths.map(
      async (path) =>
        await fetch(`${new URL('/api/revalidate', originUrl)}?path=${path}`, {
          method: 'POST',
        }),
    ),
  );
  try {
    await Promise.all(revalidatePostsResposne.map(async (r) => await r.json()));
  } catch (error) {
    console.error(error);
  }
};

export const handleClientError = (error: IError, router: NextRouter) => {
  const errorMessage = error?.message || JSON.stringify(error);
  const statusCode = error?.statusCode || 400;
  router.push({
    pathname: '/error',
    query: { statusCode, errorMessage },
  });
};

export const fetchAndConvertToBase64 = async (imageUrl: string) => {
  const protocol = imageUrl.split(':')[0];

  if (protocol !== 'http' && protocol !== 'https')
    return Promise.resolve(imagePlaceholder);

  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
    });
  } catch (error: unknown) {
    console.warn(
      `Error fetching and converting to b64: ${(error as Error).message}`,
    );
    return Promise.resolve(imagePlaceholder);
  }
};
/* istanbul ignore next */
export const handlePageChange = (
  e: ChangeEvent<unknown>,
  router: NextRouter,
  baseUrl: string,
  currentPage: number,
) => {
  const target = e.currentTarget as HTMLElement;
  const targetAriaLabel = target.ariaLabel;
  const isNumber =
    target.innerText !== null &&
    target.innerText !== undefined &&
    !Number.isNaN(parseInt(target.innerText));

  let prevOrNextPage = 0;
  const isPrevOrNext =
    targetAriaLabel?.includes('previous') || targetAriaLabel?.includes('next');

  if (!target.innerText && isPrevOrNext) {
    prevOrNextPage = targetAriaLabel?.includes('previous')
      ? currentPage - 1
      : currentPage + 1;
  }

  const goToPage = isNumber ? parseInt(target.innerText) : prevOrNextPage;

  router.push(`${baseUrl}${goToPage}`);
};

/* istanbul ignore next */ //is only used for storybook
export const base64toFileObject = async (url: string): Promise<Blob | null> => {
  try {
    const base64Response = await fetch(url);
    const mimeType = base64Response.headers.get('content-type') || 'image/jpeg'; // Default MIME type
    const base64Image = await base64Response.text();
    const blob = new Blob([Buffer.from(base64Image, 'base64')], {
      type: mimeType,
    });
    return blob;
  } catch (error) {
    console.error('Error converting Base64 to Blob:', error);
    return null;
  }
};

/* istanbul ignore next */ //no point testing this
export const fileToBase64 = async (
  file: File,
): Promise<string | ArrayBuffer | null> => {
  try {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result) as unknown as string;
      reader.onerror = reject;
    });
  } catch (error: unknown) {
    console.warn(
      `Error converting file to base64 string: ${(error as Error).message}`,
    );
    return Promise.resolve(null);
  }
};
/* istanbul ignore next */ //no point testing this
export const fileToBinaryString = async (
  file: File,
): Promise<string | ArrayBuffer | null> => {
  try {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result) as unknown as string;
      reader.onerror = reject;
    });
  } catch (error: unknown) {
    console.warn(
      `Error converting file to base64 string: ${(error as Error).message}`,
    );
    return Promise.resolve(null);
  }
};
