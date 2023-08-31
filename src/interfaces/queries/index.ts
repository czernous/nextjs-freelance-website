export type IHttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface INextApiServerResponseError {
  error: {
    message: string | null;
  };
}

export interface INextApiServerResponse {
  ok: boolean;
  data: unknown | null;
  code: number;
  error: INextApiServerResponseError;
}
