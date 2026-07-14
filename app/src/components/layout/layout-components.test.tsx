import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { EditorialHero } from './EditorialHero';
import { WorkspaceHeader } from './WorkspaceHeader';

describe('composition components', () => {
  test('renders an informative illustration with consistent layout', () => {
    render(
      <EditorialHero
        eyebrow="Programs"
        title="Shape your next chapter"
        description="Choose a pathway."
        image="/images/CurriculumVisual.webp"
        imageAlt="East Asian learners collaborating"
      />,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Shape your next chapter');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'East Asian learners collaborating');
    expect(screen.getByTestId('editorial-hero')).toBeInTheDocument();
  });

  test('provides a consistent workspace heading contract', () => {
    render(<WorkspaceHeader eyebrow="Operations" title="Overview" description="Current activity." />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Overview');
  });
});
