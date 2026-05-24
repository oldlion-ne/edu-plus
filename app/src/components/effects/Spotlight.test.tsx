import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom';
import { Spotlight, SpotLightItem } from './Spotlight';

test('renders Spotlight container and item', () => {
  render(
    <Spotlight>
      <SpotLightItem>
        <div>Card Content</div>
      </SpotLightItem>
    </Spotlight>
  );

  expect(screen.getByTestId('spotlight-container')).toBeInTheDocument();
  expect(screen.getByTestId('spotlight-item')).toBeInTheDocument();
  expect(screen.getByText('Card Content')).toBeInTheDocument();
});
