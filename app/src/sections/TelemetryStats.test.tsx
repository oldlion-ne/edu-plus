import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom';
import TelemetryStats from './TelemetryStats';

test('renders the custom telemetry stats section', () => {
  render(<TelemetryStats />);
  expect(screen.getByText(/Global learner reach/i)).toBeInTheDocument();
  expect(screen.getByText(/AI mentor support/i)).toBeInTheDocument();
  expect(screen.getByText(/98% Placement Rate/i)).toBeInTheDocument();
  expect(screen.getByText(/Platform milestones/i)).toBeInTheDocument();
});

