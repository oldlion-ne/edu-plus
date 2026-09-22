import { Outlet } from 'react-router';
import { FlickeringGrid } from '../components/ui/flickering-grid';
import ScrollToTop from '../components/ScrollToTop';

export function AuthLayout() {
  return (
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
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
        <div className="flex flex-col min-h-full">
          <main className="flex-1 flex flex-col">
            <ScrollToTop />
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
