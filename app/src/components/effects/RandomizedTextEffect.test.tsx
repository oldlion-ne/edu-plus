import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import RandomizedTextEffect from './RandomizedTextEffect';

test('renders RandomizedTextEffect component', () => {
  render(<RandomizedTextEffect text="test" />);
  expect(screen.getByTestId('random-text-span')).toBeInTheDocument();
});
