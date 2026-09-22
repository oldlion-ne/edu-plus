import { useMemo, useRef } from 'react';
import { Outlet } from 'react-router';
import { cn } from '../lib/utils';
import { NoiseTexture } from '../components/ui/noise-texture';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import AIChatAgent from '../components/AIChatAgent';
import { ScrollContext } from '../lib/ScrollContext';
import ScrollToTop from '../components/ScrollToTop';

export function PublicLayout() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Memoized so context consumers (Navigation) only re-render on actual state
  // changes, not every time PublicLayout re-renders. scrollContainerRef is stable.
  const scrollContextValue = useMemo(() => ({ scrollContainerRef }), []);

  return (
    <ScrollContext.Provider value={scrollContextValue}>
      <div className="relative h-[100dvh] w-full bg-background flex flex-col overflow-hidden [touch-action:none]">
        {/* GLOBAL BACKGROUND MATRIX */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <NoiseTexture
            className={cn(
              "absolute inset-0 opacity-[0.04] mix-blend-plus-darker dark:opacity-10 dark:mix-blend-overlay"
            )}
          />
        </div>
        
        <AIChatAgent />
        
        <div 
          ref={scrollContainerRef}
          id="main-scroll-container"
          className="flex-1 overflow-y-scroll overflow-x-hidden min-h-0 [touch-action:pan-y_manipulation] relative [scrollbar-gutter:stable]"
        >
          <div className="flex flex-col min-h-full">
            <Navigation />
            <main className="flex-1 flex flex-col">
              <ScrollToTop />
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </ScrollContext.Provider>
  );
}
