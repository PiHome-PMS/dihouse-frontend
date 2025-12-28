import { DashboardHeader, DashboardSidebar, MobileMenuOverlay } from '@/components/layout';
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-background">
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-background focus:text-foreground focus:underline"
      >
        Bỏ qua đến nội dung chính
      </a>

      {/* Mobile menu button */}
      <div className="fixed left-4 top-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

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
      <DashboardHeader sidebarOpen={sidebarOpen} userName={user?.name} onLogout={logout} />

      {/* Main content */}
      <main
        id="main-content"
        className={cn('pt-16 transition-all duration-300', sidebarOpen ? 'lg:ml-64' : 'lg:ml-16')}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
