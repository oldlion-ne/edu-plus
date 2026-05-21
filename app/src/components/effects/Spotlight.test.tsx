import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Spotlight, SpotLightItem } from './Spotlight';

test('renders Spotlight container and item', () => {
  render(
    <Spotlight>
      <SpotLightItem>
        <div>Card Content</div>
      </SpotLightItem>
    </Spotlight>
  );

  expect(screen.getByTestId('spotlight-container')).toBeDefined();
  expect(screen.getByTestId('spotlight-item')).toBeDefined();
  expect(screen.getByText('Card Content')).toBeDefined();
});
