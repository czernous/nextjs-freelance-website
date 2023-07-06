import { act } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import Admin from './index.page';
import { render } from '../../utils/testing';
import React from 'react';

expect.extend(toHaveNoViolations);

describe('Admin index', () => {
  const template = <Admin />;

  it('has no axe violations', async () => {
    await act(async () => {
      const { container } = render(template);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
