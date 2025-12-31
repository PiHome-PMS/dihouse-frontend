import { DashboardHeader, DashboardSidebar, MobileMenuOverlay } from '@/components/layout';
import { useAuth } from '@/hooks';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Outlet } from 'react-router';

/**
 * Dashboard layout with collapsible sidebar
 * Components: DashboardSidebar, DashboardHeader, MobileMenuOverlay
 */
export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleToggle = () => {
    if (window.innerWidth < 1024) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f9] text-gray-900">
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-background focus:text-foreground focus:underline"
      >
        Bỏ qua đến nội dung chính
      </a>

      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        isMobileOpen={mobileMenuOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* Mobile overlay */}
      <MobileMenuOverlay isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Header */}
      <DashboardHeader
        sidebarOpen={sidebarOpen}
        userName={user?.name}
        onLogout={logout}
        onToggleSidebar={handleToggle}
      />

      {/* Main content */}
      <main
        id="main-content"
        className={cn('pt-16 transition-all duration-300', sidebarOpen ? 'lg:ml-72' : 'lg:ml-16')}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
