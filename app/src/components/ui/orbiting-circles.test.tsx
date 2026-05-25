import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OrbitingCircles } from './orbiting-circles';
import '@testing-library/jest-dom';

describe('OrbitingCircles', () => {
  it('renders children inside the orbiting wrapper', () => {
    const { getByText } = render(
      <OrbitingCircles>
        <div>Child Element 1</div>
        <div>Child Element 2</div>
      </OrbitingCircles>
    );
    expect(getByText('Child Element 1')).toBeInTheDocument();
    expect(getByText('Child Element 2')).toBeInTheDocument();
  });
});
