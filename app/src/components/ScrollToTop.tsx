import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router';
import { useScrollContainer } from '../lib/ScrollContext';

export function scrollElementToTop(
  element: HTMLElement | null,
  behavior: ScrollBehavior = 'auto',
) {
  if (element && typeof element.scrollTo === 'function') {
    element.scrollTo({ top: 0, behavior });
  }
}

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);
  const timeoutRef = useRef<any>(null);
  const scrollContext = useScrollContainer();

  // Scroll to top on navigation/page change
  useEffect(() => {
    scrollElementToTop(scrollContext?.scrollContainerRef.current ?? null);
  }, [pathname, scrollContext?.scrollContainerRef]);

  // Handle auto-fadeout on idle state (inactive for 2.5 seconds)
  useEffect(() => {
    const container = scrollContext?.scrollContainerRef.current;
    if (!container) return;

    const resetIdleTimer = () => {
      // Only show the button if scrolled past 300px
      if (container.scrollTop > 300) {
        setShowButton(true);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Hide after 2.5s of no interaction
        timeoutRef.current = setTimeout(() => {
          setShowButton(false);
        }, 2500);
      } else {
        setShowButton(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
    };

    container.addEventListener('scroll', resetIdleTimer, { passive: true });
    // Keep window listeners for user interactions other than scroll
    window.addEventListener('mousemove', resetIdleTimer, { passive: true });
    window.addEventListener('touchstart', resetIdleTimer, { passive: true });
    window.addEventListener('click', resetIdleTimer, { passive: true });
    window.addEventListener('keydown', resetIdleTimer, { passive: true });

    return () => {
      container.removeEventListener('scroll', resetIdleTimer);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('touchstart', resetIdleTimer);
      window.removeEventListener('click', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [scrollContext?.scrollContainerRef]);

  const scrollToTop = () => {
    scrollElementToTop(scrollContext?.scrollContainerRef.current ?? null, 'smooth');
  };

  return (
    <button onClick={scrollToTop} aria-label="Go to top" className={`fixed bottom-8 left-8 z-50 p-3 bg-background/85 border border-border text-foreground rounded-none shadow-lg transition-all duration-300 hover:border-primary hover:text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${showButton ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}`}>
      <svg
        className="w-5 h-5 transform transition-transform duration-300 hover:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}
