import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Badge } from './badge';
import { Button } from './button';
import { Card, CardEyebrow } from './card';

describe('premium primitive variants', () => {
  test('exposes raised and semantic button variants', () => {
    render(
      <>
        <Button variant="raised">Continue</Button>
        <Button variant="success">Published</Button>
      </>,
    );

    expect(screen.getByRole('button', { name: 'Continue' })).toHaveClass('surface-raised');
    expect(screen.getByRole('button', { name: 'Published' })).toHaveClass('text-foreground');
  });

  test('exposes material card variants and an eyebrow slot', () => {
    render(
      <Card variant="raised">
        <CardEyebrow>Featured</CardEyebrow>
      </Card>,
    );

    expect(screen.getByText('Featured').closest('[data-slot="card"]')).toHaveAttribute('data-variant', 'raised');
  });

  test('exposes non-pill status badges', () => {
    render(<Badge variant="warning">Review</Badge>);
    expect(screen.getByText('Review')).toHaveAttribute('data-variant', 'warning');
  });
});
