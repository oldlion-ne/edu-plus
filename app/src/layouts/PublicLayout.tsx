import { useMemo, useRef } from 'react';
import { Outlet } from 'react-router';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import AIChatAgent from '../components/AIChatAgent';
import { ScrollContext } from '../lib/ScrollContext';
import { FlickeringGrid } from '../components/ui/flickering-grid';
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
        <div className="fixed inset-0 z-0 pointer-events-none opacity-100">
          <FlickeringGrid
            className="absolute inset-0 z-0 size-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.5}
            flickerChance={0.1}
            height={800}
            width={800}
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
