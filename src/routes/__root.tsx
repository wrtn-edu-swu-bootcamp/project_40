import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Sidebar } from '@/components/organisms/Sidebar';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="flex min-h-screen bg-[var(--color-ivory)]">
      <Sidebar />
      <main className="flex-1 border-l border-[var(--color-dark-charcoal)]">
        <Outlet />
      </main>
    </div>
  );
}
