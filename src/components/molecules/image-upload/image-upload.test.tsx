import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import ImageUpload from '.';
import React from 'react';

expect.extend(toHaveNoViolations);

describe('ImageUpload', () => {
  const toggleOpen = jest.fn();

  it('passes axe audit', async () => {
    const { container } = render(
      <ImageUpload isOpen={true} toggleOpen={toggleOpen} />,
    );
    await waitFor(async () =>
      expect(await axe(container)).toHaveNoViolations(),
    );
  });

  it('shows an error message if the filename is blank', async () => {
    render(<ImageUpload isOpen={true} toggleOpen={toggleOpen} />);

    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Filename cannot be blank/i)).toBeInTheDocument();
    });

    expect(toggleOpen).not.toHaveBeenCalled();
  });
});
