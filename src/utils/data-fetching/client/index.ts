import { IError } from '@src/interfaces';
import { NextRouter } from 'next/router';
import { MutableRefObject } from 'react';

interface ISubmitDataProps {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
}

interface ISubmitHandlerOptions {
  event: SubmitEvent;
  formRef: MutableRefObject<HTMLFormElement | null>;
  handler: ISubmitDataFunc; // send formData to the API
  handlerProps: ISubmitDataProps;
  appendFields?: { [key: string]: string }[];
}

type ISubmitDataFunc = {
  ({ ...props }: ISubmitDataProps): Promise<Response | undefined>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const submitData: ISubmitDataFunc = async ({
  ...props
}: ISubmitDataProps) => {
  const { url, options } = props;

  const location = window.location.hostname;

  try {
    const res = await fetch(`//${location}${url}`, options);

    return res;
  } catch (error) {
    console.warn('Could not submit form', error);
  }
};

export const handleSubmit = async ({ ...options }: ISubmitHandlerOptions) => {
  options.event.preventDefault();
  if (!options.formRef) return;

  const formData = new FormData(options.formRef.current as HTMLFormElement);

  if (options.appendFields !== null && options.appendFields?.length) {
    options.appendFields.forEach((field: { [key: string]: string }) => {
      formData.append(Object.keys(field)[0], Object.values(field)[0]);
    });
  }

  const formDataObject = Object.fromEntries(formData);
  const metaData = {
    meta: {
      metaDescription: formDataObject?.metaDescription ?? null,
      metaKeywords: formDataObject?.metaKeywords ?? null,
      openGraph: {
        title: formDataObject?.title ?? null,
        description: formDataObject?.description ?? null,
        imageUrl: formDataObject?.OgImageUrl ?? null,
      },
    },
  };
  delete formDataObject?.metaKeywords;
  delete formDataObject?.metaDescription;
  delete formDataObject?.title;
  delete formDataObject?.description;
  delete formDataObject?.OgImageUrl;

  const formattedObject = { ...formDataObject, ...metaData };

  let { handlerProps } = options;
  const fetchOptions = handlerProps.options;
  const handlerOptions = {
    ...fetchOptions,
    body: JSON.stringify(formattedObject),
  };

  handlerProps = { ...handlerProps, options: handlerOptions };

  const response = await options.handler(handlerProps);
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
