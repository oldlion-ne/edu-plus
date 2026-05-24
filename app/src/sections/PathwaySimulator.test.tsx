import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { expect, test } from 'vitest';
import PathwaySimulator from './PathwaySimulator';

test('renders PathwaySimulator with nodes', () => {
  render(
    <MemoryRouter>
      <PathwaySimulator />
    </MemoryRouter>
  );
  expect(screen.getByText(/Interactive Workspace/i)).toBeDefined();
  expect(screen.getByText(/Connect your favourite/i)).toBeDefined();
  expect(screen.getByText(/OpenAI/i)).toBeDefined();
});
