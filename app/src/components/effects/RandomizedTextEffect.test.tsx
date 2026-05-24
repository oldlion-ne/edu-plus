import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom';
import RandomizedTextEffect from './RandomizedTextEffect';

test('renders RandomizedTextEffect component', () => {
  render(<RandomizedTextEffect text="test text" />);
  const element = screen.getByTestId('random-text-span');
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent(/test text/i);
});
