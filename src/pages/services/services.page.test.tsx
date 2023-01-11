import { render, RenderResult, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import Services from './index.page';
import { act } from 'react-dom/test-utils';
import React from 'react';
import * as servicesPageData from '../../public/data/pages/services.json';
import { IServicesPage } from '../../interfaces';
import { mockNextRouter } from '../../utils';

expect.extend(toHaveNoViolations);

jest.mock('next/config', () => () => ({
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
}));

let data: IServicesPage;
let component: RenderResult;

beforeEach(async () => {
  data = await JSON.parse(JSON.stringify(servicesPageData));
  mockNextRouter();
  component = render(<Services data={data} />);
});

describe('Services', () => {
  it('renders a heading (h1 - title)', () => {
    const heading = screen.getAllByRole('heading');

    expect(heading[0]).toBeInTheDocument();
  });

  it('renders homepage unchanged', () => {
    const { container } = component;
    expect(container).toMatchSnapshot();
  });

  it('has no axe violations', async () => {
    const { container } = component;
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
