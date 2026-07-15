import { fireEvent, render, screen, within } from '@testing-library/react';
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

function expectTabState(tab: HTMLElement, selected: boolean) {
  expect(tab).toHaveAttribute('aria-selected', String(selected));
  expect(tab).toHaveAttribute('tabindex', selected ? '0' : '-1');
}

function expectTabRelationships(tabs: HTMLElement[]) {
  for (const tab of tabs) {
    const panel = document.getElementById(tab.getAttribute('aria-controls')!);

    expect(panel).toHaveAttribute('role', 'tabpanel');
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
    if (tab.getAttribute('aria-selected') === 'true') {
      expect(panel).not.toHaveAttribute('hidden');
    } else {
      expect(panel).toHaveAttribute('hidden');
    }
  }
}

function pressTabKey(tab: HTMLElement, key: string) {
  const event = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
  });

  fireEvent(tab, event);
  return event;
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
  it('styles every Programs tab', () => {
    renderPage(<Programs />);
    const tablist = screen.getByRole('tablist', { name: 'Program pathways' });

    for (const tab of within(tablist).getAllByRole('tab')) {
      expect(tab).toHaveClass(...focusClasses);
    }
  });

  it('styles every Guidance tab', () => {
    renderPage(<Guidance />);
    const tablist = screen.getByRole('tablist', { name: 'Guidance audiences' });

    for (const tab of within(tablist).getAllByRole('tab')) {
      expect(tab).toHaveClass(...focusClasses);
    }
  });

  it('styles every Events FAQ button', () => {
    renderPage(<SignatureExperiences />);
    const faqSection = screen
      .getByRole('heading', { name: 'Frequently Asked Questions' })
      .closest('section')!;

    for (const button of within(faqSection).getAllByRole('button')) {
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

describe('core public page accessible selectors', () => {
  it('exposes Programs tabs and their active panel relationship', () => {
    renderPage(<Programs />);
    const tablist = screen.getByRole('tablist', { name: 'Program pathways' });
    const tabs = within(tablist).getAllByRole('tab');
    const firstTab = within(tablist).getByRole('tab', { name: /FuturePath Navigator/ });
    const secondTab = within(tablist).getByRole('tab', { name: /LifeSkills Lab/ });

    expectTabState(firstTab, true);
    expectTabState(secondTab, false);
    expect(firstTab).toHaveAttribute('id', 'program-tab-01');
    expect(firstTab).toHaveAttribute('aria-controls', 'program-panel-01');
    expect(tablist).toHaveAttribute('aria-orientation', 'vertical');
    expect(tabs.filter((tab) => tab.tabIndex === 0)).toHaveLength(1);
    expectTabRelationships(tabs);

    const firstPanel = screen.getByRole('tabpanel', { name: /FuturePath Navigator/ });
    expect(firstPanel).toHaveAttribute('id', 'program-panel-01');
    expect(firstPanel).toHaveAttribute('aria-labelledby', 'program-tab-01');

    fireEvent.click(secondTab);

    expectTabState(firstTab, false);
    expectTabState(secondTab, true);
    expectTabRelationships(tabs);
    const secondPanel = screen.getByRole('tabpanel', { name: /LifeSkills Lab/ });
    expect(secondPanel).toHaveAttribute('id', 'program-panel-02');
    expect(secondPanel).toHaveAttribute('aria-labelledby', 'program-tab-02');
  });

  it('uses vertical keyboard navigation for Programs tabs', () => {
    renderPage(<Programs />);
    const tabs = within(
      screen.getByRole('tablist', { name: 'Program pathways' }),
    ).getAllByRole('tab');

    tabs[0].focus();

    expect(pressTabKey(tabs[0], 'ArrowDown').defaultPrevented).toBe(true);
    expectTabState(tabs[1], true);
    expect(tabs[1]).toHaveFocus();

    expect(pressTabKey(tabs[1], 'ArrowUp').defaultPrevented).toBe(true);
    expectTabState(tabs[0], true);
    expect(tabs[0]).toHaveFocus();

    expect(pressTabKey(tabs[0], 'ArrowUp').defaultPrevented).toBe(true);
    expectTabState(tabs.at(-1)!, true);
    expect(tabs.at(-1)).toHaveFocus();

    expect(pressTabKey(tabs.at(-1)!, 'ArrowDown').defaultPrevented).toBe(true);
    expectTabState(tabs[0], true);
    expect(tabs[0]).toHaveFocus();

    expect(pressTabKey(tabs[0], 'End').defaultPrevented).toBe(true);
    expectTabState(tabs.at(-1)!, true);
    expect(tabs.at(-1)).toHaveFocus();

    expect(pressTabKey(tabs.at(-1)!, 'Home').defaultPrevented).toBe(true);
    expectTabState(tabs[0], true);
    expect(tabs[0]).toHaveFocus();

    expect(pressTabKey(tabs[0], 'ArrowRight').defaultPrevented).toBe(false);
    expectTabState(tabs[0], true);
    expect(tabs[0]).toHaveFocus();

    expect(pressTabKey(tabs[0], 'ArrowLeft').defaultPrevented).toBe(false);
    expectTabState(tabs[0], true);
    expect(tabs[0]).toHaveFocus();

    expect(screen.getByRole('tabpanel', { name: /FuturePath Navigator/ })).toHaveAttribute(
      'aria-labelledby',
      'program-tab-01',
    );
  });

  it('exposes Guidance tabs and their active panel relationship', () => {
    renderPage(<Guidance />);
    const tablist = screen.getByRole('tablist', { name: 'Guidance audiences' });
    const tabs = within(tablist).getAllByRole('tab');
    const firstTab = within(tablist).getByRole('tab', { name: 'For Students' });
    const secondTab = within(tablist).getByRole('tab', { name: 'For Parents' });

    expectTabState(firstTab, true);
    expectTabState(secondTab, false);
    expect(firstTab).toHaveAttribute('id', 'guidance-tab-students');
    expect(firstTab).toHaveAttribute('aria-controls', 'guidance-panel-students');
    expect(tablist).toHaveAttribute('aria-orientation', 'horizontal');
    expect(tabs.filter((tab) => tab.tabIndex === 0)).toHaveLength(1);
    expectTabRelationships(tabs);

    const firstPanel = screen.getByRole('tabpanel', { name: 'For Students' });
    expect(firstPanel).toHaveAttribute('id', 'guidance-panel-students');
    expect(firstPanel).toHaveAttribute('aria-labelledby', 'guidance-tab-students');

    fireEvent.click(secondTab);

    expectTabState(firstTab, false);
    expectTabState(secondTab, true);
    expectTabRelationships(tabs);
    const secondPanel = screen.getByRole('tabpanel', { name: 'For Parents' });
    expect(secondPanel).toHaveAttribute('id', 'guidance-panel-parents');
    expect(secondPanel).toHaveAttribute('aria-labelledby', 'guidance-tab-parents');
  });

  it('uses horizontal keyboard navigation for Guidance tabs', () => {
    renderPage(<Guidance />);
    const tabs = within(
      screen.getByRole('tablist', { name: 'Guidance audiences' }),
    ).getAllByRole('tab');

    tabs[0].focus();

    expect(pressTabKey(tabs[0], 'ArrowRight').defaultPrevented).toBe(true);
    expectTabState(tabs[1], true);
    expect(tabs[1]).toHaveFocus();

    expect(pressTabKey(tabs[1], 'ArrowLeft').defaultPrevented).toBe(true);
    expectTabState(tabs[0], true);
    expect(tabs[0]).toHaveFocus();

    expect(pressTabKey(tabs[0], 'ArrowLeft').defaultPrevented).toBe(true);
    expectTabState(tabs.at(-1)!, true);
    expect(tabs.at(-1)).toHaveFocus();

    expect(pressTabKey(tabs.at(-1)!, 'ArrowRight').defaultPrevented).toBe(true);
    expectTabState(tabs[0], true);
    expect(tabs[0]).toHaveFocus();

    expect(pressTabKey(tabs[0], 'End').defaultPrevented).toBe(true);
    expectTabState(tabs.at(-1)!, true);
    expect(tabs.at(-1)).toHaveFocus();

    expect(pressTabKey(tabs.at(-1)!, 'Home').defaultPrevented).toBe(true);
    expectTabState(tabs[0], true);
    expect(tabs[0]).toHaveFocus();

    expect(pressTabKey(tabs[0], 'ArrowDown').defaultPrevented).toBe(false);
    expectTabState(tabs[0], true);
    expect(tabs[0]).toHaveFocus();

    expect(pressTabKey(tabs[0], 'ArrowUp').defaultPrevented).toBe(false);
    expectTabState(tabs[0], true);
    expect(tabs[0]).toHaveFocus();

    expect(screen.getByRole('tabpanel', { name: 'For Students' })).toHaveAttribute(
      'aria-labelledby',
      'guidance-tab-students',
    );
  });
});
