/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateSnackbarProps } from '.';

const responseMock = (
  body: any,
  options?: { status?: number; headers?: { [key: string]: string } },
) => {
  return {
    body,
    status: options?.status || 200,
    headers: new Map(Object.entries(options?.headers || {})),
    json: jest.fn(() => Promise.resolve(body)),
    text: jest.fn(() => Promise.resolve(body)),
  };
};

describe('updateSnackbarProps', () => {
  it('updates snackbar props with success severity', async () => {
    const r = responseMock(
      { message: 'Success' },
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const callback = jest.fn();

    await updateSnackbarProps(r as unknown as Response, callback);

    expect(callback).toHaveBeenCalledWith({
      severity: 'success',
      text: 'Success',
    });
  });

  it('updates snackbar props with error severity', async () => {
    const r = responseMock(
      { message: 'Error' },
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const callback = jest.fn();

    await updateSnackbarProps(r as unknown as Response, callback);

    expect(callback).toHaveBeenCalledWith({
      severity: 'error',
      text: 'Error',
    });
  });

  it('handles error reading response as text', async () => {
    const r = responseMock(
      { message: 'Error' },
      {
        status: 400,
        headers: { 'Content-Type': 'text/plain' },
      },
    );

    const callback = jest.fn();

    await updateSnackbarProps(r as unknown as Response, callback);

    expect(callback).toHaveBeenCalledWith({
      severity: 'error',
      text: { message: 'Error' },
    });
  });

  it('handles error parsing response as JSON', async () => {
    const r = responseMock('Invalid JSON', {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });

    const callback = jest.fn();

    await updateSnackbarProps(r as unknown as Response, callback);

    expect(callback).toHaveBeenCalledWith({
      severity: 'error',
      text: 'Error saving data',
    });
  });

  it('returns without updating snackbar props if response is falsy', async () => {
    const r = null;
    const callback = jest.fn();

    await updateSnackbarProps(r as unknown as Response, callback);

    expect(callback).not.toHaveBeenCalled();
  });
});
