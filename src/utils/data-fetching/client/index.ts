import { imagePlaceholder } from '@src/assets/image-placeholder';
import { IError } from '@src/interfaces';
import { NextRouter } from 'next/router';
import { ChangeEvent, MutableRefObject } from 'react';

interface IFetchDataProps {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
  location: string;
}

interface ISubmitHandlerOptions {
  event: SubmitEvent;
  formRef: MutableRefObject<HTMLFormElement | null>;
  handler: IFetchDataFunc; // send formData to the API
  handlerProps: IFetchDataProps;
  appendFields?: { [key: string]: string }[];
}

type IFetchDataFunc = {
  ({ ...props }: IFetchDataProps): Promise<Response | undefined>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchData: IFetchDataFunc = async ({
  ...props
}: IFetchDataProps) => {
  const { url, options, location } = props;

  try {
    const res = await fetch(`https://${location ?? ''}${url}`, options);
    return res;
  } catch (error) {
    console.warn('Could not fetch', error);
  }
};

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
    obj[keys[keys.length - 1]] = value;
  }

  const { handlerProps } = options;
  const handlerOptions = {
    ...handlerProps.options,
    body: JSON.stringify(formattedObject),
  };

  const response = await options.handler({
    ...handlerProps,
    options: handlerOptions,
  });

  if (options.handlerProps.url.includes('pages')) {
    const pagePath = options.handlerProps.url.split('/').at(-1);
    const path = pagePath === 'home' ? '/' : `/${pagePath}`;

    const revalidateResponse = await fetchData({
      url: `/api/revalidate?path=${path}`,
      options: {
        method: 'GET',
      },
      location: options.handlerProps.location,
    });

    try {
      await revalidateResponse?.json();
    } catch (error) {
      console.error(error);
    }
  }

  return response;
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
