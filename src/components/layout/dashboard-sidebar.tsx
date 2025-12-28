import { Logo } from '@/components/common';
import { Button } from '@/components/ui';
import { navigationConfig } from '@/config';
import { useAuth } from '@/hooks';
import { cn } from '@/lib/utils';
import { filterNavByPermissions } from '@/utils';
import { ChevronLeft } from 'lucide-react';
import { useMemo } from 'react';
import { NavLink } from 'react-router';

interface DashboardSidebarProps {
  isOpen: boolean;
  isMobileOpen: boolean;
  onToggle: () => void;
  onMobileClose: () => void;
}

/**
 * Dashboard sidebar with navigation
 * Uses centralized navigation config with RBAC filtering
 */
export function DashboardSidebar({
  isOpen,
  isMobileOpen,
  onToggle,
  onMobileClose,
}: DashboardSidebarProps) {
  const { user } = useAuth();

  // Filter nav items based on user permissions
  const navItems = useMemo(() => filterNavByPermissions(navigationConfig, user), [user]);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r bg-sidebar transition-all duration-300',
        isOpen ? 'w-64' : 'w-16',
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Logo collapsed={!isOpen} />
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="hidden lg:flex"
          aria-label={isOpen ? 'Thu gọn sidebar' : 'Mở rộng sidebar'}
        >
          <ChevronLeft className={cn('h-4 w-4 transition-transform', !isOpen && 'rotate-180')} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              {item.path && (
                <NavLink
                  to={item.path}
                  onClick={onMobileClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    )
                  }
                >
                  {item.icon && <item.icon className="h-5 w-5 shrink-0" />}
                  {isOpen && <span>{item.label}</span>}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
