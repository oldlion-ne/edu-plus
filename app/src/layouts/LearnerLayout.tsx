import { Outlet } from 'react-router';

export function LearnerLayout() {
  return (
    <div className="relative h-[100dvh] w-full bg-background flex flex-col overflow-hidden [touch-action:none]">
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
