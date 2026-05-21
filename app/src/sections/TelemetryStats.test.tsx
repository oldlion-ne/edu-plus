import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import TelemetryStats from './TelemetryStats';

test('renders the custom telemetry stats section', () => {
  render(<TelemetryStats />);
  expect(screen.getByText(/SYSTEM_NODES/i)).toBeDefined();
  expect(screen.getByText(/EXPERT_NODES/i)).toBeDefined();
});
