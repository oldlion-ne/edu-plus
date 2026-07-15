import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

import { editorialIllustrations } from '@/lib/editorialIllustrations';

import About from './About';
import Contact from './Contact';
import Guidance from './Guidance';
import Programs from './Programs';
import SignatureExperiences from './SignatureExperiences';

vi.mock('@/lib/supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({ insert: vi.fn() })),
  },
}));

const focusClasses = [
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-foreground',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-background',
];

function renderPage(page: React.ReactNode) {
  return render(<MemoryRouter>{page}</MemoryRouter>);
}

describe('core public page editorial artwork', () => {
  it.each([
    ['About', <About />, editorialIllustrations.about],
    ['Programs', <Programs />, editorialIllustrations.programs],
    ['Events', <SignatureExperiences />, editorialIllustrations.events],
    ['Guidance', <Guidance />, editorialIllustrations.guidance],
    ['Contact', <Contact />, editorialIllustrations.contact],
  ] as const)('renders the %s PageHero registry illustration', (_name, page, illustration) => {
    renderPage(page);

    expect(screen.getByRole('img', { name: illustration.alt })).toHaveAttribute(
      'src',
      illustration.src,
    );
  });

  it('removes the duplicate Contact office media', () => {
    const { container } = renderPage(<Contact />);

    expect(container.querySelector('img[src="/images/contact-visual.png"]')).toBeNull();
    expect(screen.queryByRole('img', { name: 'EduPlus Contact' })).not.toBeInTheDocument();
  });

  it('uses one centered Guidance pricing column without duplicate media', () => {
    const { container } = renderPage(<Guidance />);
    const pricingSection = screen
      .getByRole('heading', { name: 'Transform your learning & career journey' })
      .closest('section');
    const pricingWrapper = pricingSection?.firstElementChild;

    expect(container.querySelector('img[src="/images/guidance-mentorship.png"]')).toBeNull();
    expect(screen.queryByRole('img', { name: 'EduPlus Mentorship' })).not.toBeInTheDocument();
    expect(pricingWrapper).toHaveClass('mx-auto', 'max-w-xl');
    expect(pricingWrapper).not.toHaveClass('grid', 'md:grid-cols-2');
  });
});

describe('core public page visible keyboard focus', () => {
  it('styles every Programs selector button', () => {
    renderPage(<Programs />);

    for (const button of screen.getAllByRole('button')) {
      expect(button).toHaveClass(...focusClasses);
    }
  });

  it('styles every Guidance tab button', () => {
    renderPage(<Guidance />);

    for (const button of screen.getAllByRole('button')) {
      expect(button).toHaveClass(...focusClasses);
    }
  });

  it('styles every Events FAQ button', () => {
    renderPage(<SignatureExperiences />);

    for (const button of screen.getAllByRole('button')) {
      expect(button).toHaveClass(...focusClasses);
    }
  });

  it('styles the Contact telephone and email links', () => {
    renderPage(<Contact />);

    expect(screen.getByRole('link', { name: '+91 (985) 645 6703' })).toHaveClass(
      ...focusClasses,
    );
    expect(screen.getByRole('link', { name: 'hello@eduplus.skills' })).toHaveClass(
      ...focusClasses,
    );
  });
});
