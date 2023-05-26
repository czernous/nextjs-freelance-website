import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomFormFields from '.';
import { render } from '../../../utils/testing';

describe('CustomFormFields', () => {
  const mockMeta = {
    metaDescription: 'Meta description',
    metaKeywords: 'Meta keywords',
    openGraph: {
      title: 'OG title',
      description: 'OG description',
      imageUrl: 'OG image URL',
    },
  };

  it('renders the component correctly', () => {
    const { getByDisplayValue } = render(<CustomFormFields meta={mockMeta} />);

    expect(
      (getByDisplayValue(mockMeta.metaDescription) as HTMLInputElement).value,
    ).toBe('Meta description');
    expect(
      (getByDisplayValue(mockMeta.metaKeywords) as HTMLInputElement).value,
    ).toBe('Meta keywords');
    expect(
      (getByDisplayValue(mockMeta.openGraph.title) as HTMLInputElement).value,
    ).toBe('OG title');
    expect(
      (getByDisplayValue(mockMeta.openGraph.description) as HTMLInputElement)
        .value,
    ).toBe('OG description');
    expect(
      (getByDisplayValue(mockMeta.openGraph.imageUrl) as HTMLInputElement)
        .value,
    ).toBe('OG image URL');
  });

  it('updates the meta description value', () => {
    const { getByDisplayValue } = render(<CustomFormFields meta={mockMeta} />);

    const metaDescriptionInput = getByDisplayValue(
      mockMeta.metaDescription,
    ) as HTMLInputElement;
    fireEvent.change(metaDescriptionInput, {
      target: { value: 'New meta description' },
    });

    expect(metaDescriptionInput.value).toBe('New meta description');
  });
});
