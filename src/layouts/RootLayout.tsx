import { Toaster } from '@/components/ui';
import { Outlet } from 'react-router';

/**
 * Root layout - wraps entire app
 * Provides toast notifications (ErrorBoundary handled in App.tsx)
 */
export default function RootLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
      <Toaster richColors position="top-right" />
    </div>
  );
}
