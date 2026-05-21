import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import PathwaySimulator from './PathwaySimulator';

test('renders PathwaySimulator with nodes', () => {
  render(<PathwaySimulator />);
  expect(screen.getByText(/NODE CHECK MATRIX/i)).toBeDefined();
});
