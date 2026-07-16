import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom';
import TelemetryStats from './TelemetryStats';

test('renders the custom telemetry stats section', () => {
  render(<TelemetryStats />);
  expect(screen.getByText(/Active Learners/i)).toBeInTheDocument();
  expect(screen.getByText(/Countries Reached/i)).toBeInTheDocument();
  expect(screen.getByText(/Placement Rate/i)).toBeInTheDocument();
  expect(screen.getByText(/Learning Hours/i)).toBeInTheDocument();
});


