import { Outlet } from 'react-router';

export function AdminLayout() {
  return (
    <div className="relative h-[100dvh] w-full bg-background overflow-hidden [touch-action:none]">
      <Outlet />
    </div>
  );
}
