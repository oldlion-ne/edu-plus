import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import TelemetryStats from './TelemetryStats';

test('renders the custom telemetry stats section', () => {
  render(<TelemetryStats />);
  expect(screen.getByText(/Real time location tracking/i)).toBeDefined();
  expect(screen.getByText(/Email and web support/i)).toBeDefined();
  expect(screen.getByText(/99.99% Uptime/i)).toBeDefined();
  expect(screen.getByText(/Activity feed/i)).toBeDefined();
});

