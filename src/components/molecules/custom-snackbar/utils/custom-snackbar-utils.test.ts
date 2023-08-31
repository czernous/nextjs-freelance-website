import { updateSnackbarProps } from '.'; // Update the import path

describe('updateSnackbarProps', () => {
  it('should update snackbar props with success severity', async () => {
    // Arrange
    const responseMock = {
      ok: false,
      json: jest.fn().mockResolvedValue({
        message: {
          severity: 'success',
          text: 'Success',
        },
      }),
    };

    const callbackMock = jest.fn();

    // Act
    await updateSnackbarProps(
      responseMock as unknown as Response,
      callbackMock,
    );

    // Assert
    expect(callbackMock).toHaveBeenCalledWith({
      severity: 'success',
      text: 'Success',
    });
  });

  it('should update snackbar props with error severity', async () => {
    // Arrange
    const responseMock = {
      ok: false,
      json: jest.fn().mockResolvedValue({
        message: {
          severity: 'error',
          text: 'Error', // No message in the empty object
        },
      }), // Mocked JSON response
    };

    const callbackMock = jest.fn();

    // Act
    await updateSnackbarProps(
      responseMock as unknown as Response,
      callbackMock,
    );

    // Assert
    expect(callbackMock).toHaveBeenCalledWith({
      severity: 'error',
      text: 'Error',
    });
  });
});
