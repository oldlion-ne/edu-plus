import { Outlet } from 'react-router';
import { GlyphMatrix } from '../components/effects/GlyphMatrix';
import ScrollToTop from '../components/ScrollToTop';

export function AuthLayout() {
  return (
    <div className="relative h-[100dvh] w-full bg-background flex flex-col overflow-hidden [touch-action:none]">
      {/* GLOBAL BACKGROUND MATRIX */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-100">
        <GlyphMatrix 
          cellSize={18} 
          mutationRate={0.04} 
          interval={90} 
          fadeBottom={0.6} 
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
