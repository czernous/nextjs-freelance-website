/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MockGalleryProvider } from '@src/components/organisms/image-gallery/state/image-gallery.provider';

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return <MockGalleryProvider>{children}</MockGalleryProvider>;
};

const renderWithContext = (
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  options?: any,
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithContext as render };
