import { Outlet } from 'react-router';
import { cn } from '../lib/utils';
import { NoiseTexture } from '../components/ui/noise-texture';
import ScrollToTop from '../components/ScrollToTop';

export function AuthLayout() {
  return (
    <div className="relative h-[100dvh] w-full bg-background flex flex-col overflow-hidden [touch-action:none]">
      {/* GLOBAL BACKGROUND MATRIX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NoiseTexture
          className={cn(
            "absolute inset-0 opacity-[0.04] mix-blend-plus-darker dark:opacity-10 dark:mix-blend-overlay"
          )}
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
