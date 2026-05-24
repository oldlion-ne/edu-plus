import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import TelemetryStats from './TelemetryStats';

test('renders the custom telemetry stats section', () => {
  render(<TelemetryStats />);
  expect(screen.getByText(/Global learner reach/i)).toBeDefined();
  expect(screen.getByText(/AI mentor support/i)).toBeDefined();
  expect(screen.getByText(/98% Placement Rate/i)).toBeDefined();
  expect(screen.getByText(/Platform milestones/i)).toBeDefined();
});

