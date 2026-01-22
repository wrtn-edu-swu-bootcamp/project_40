import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Sidebar } from '@/components/organisms/Sidebar';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="flex min-h-screen bg-[var(--color-ivory)]">
      <Sidebar />
      <div className="w-[1px] bg-[var(--color-border)]" />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
