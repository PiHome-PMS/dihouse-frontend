import { Logo } from '@/components/common';
import { Button } from '@/components/ui';
import { navigationConfig } from '@/config';
import { useAuth } from '@/hooks';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';
import { filterNavByPermissions } from '@/utils';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import { useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router';

interface DashboardSidebarProps {
  isOpen: boolean;
  isMobileOpen: boolean;
  onToggle: () => void;
  onMobileClose: () => void;
}

/**
 * Dashboard sidebar with multi-level navigation
 */
export function DashboardSidebar({
  isOpen,
  isMobileOpen,
  onToggle,
  onMobileClose,
}: DashboardSidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  // Filter nav items based on user permissions
  const navItems = useMemo(() => filterNavByPermissions(navigationConfig, user), [user]);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300 flex flex-col',
        isOpen ? 'w-72' : 'w-16',
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4 bg-transparent shrink-0">
        <Logo collapsed={!isOpen} />
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="hidden text-sidebar-foreground lg:flex hover:bg-sidebar-accent"
          aria-label={isOpen ? 'Thu gọn sidebar' : 'Mở rộng sidebar'}
        >
          <ChevronLeft className={cn('h-4 w-4 transition-transform', !isOpen && 'rotate-180')} />
        </Button>
      </div>

      {/* User Profile Card */}
      {isOpen && (
        <div className="p-4 border-b border-sidebar-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shrink-0">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate text-sidebar-foreground">
                Tên: {user?.name?.toUpperCase() || 'TÀI KHOẢN...'}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs text-sidebar-foreground/70">Trực tuyến</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Selector */}
      {isOpen && (
        <div className="p-4 shrink-0">
          <p className="text-[10px] font-bold text-sidebar-foreground/50 uppercase tracking-wider mb-2 px-1">
            Dự án quản lý
          </p>
          <select className="w-full bg-sidebar-accent border border-sidebar-border rounded-md px-3 py-2 text-xs text-sidebar-foreground outline-none appearance-none">
            <option>CÔNG TY CỔ PHẦN CN S...</option>
          </select>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-2 [scrollbar-gutter:stable] custom-scrollbar">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              sidebarOpen={isOpen}
              onMobileClose={onMobileClose}
              currentPath={location.pathname}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

interface SidebarItemProps {
  item: NavItem;
  sidebarOpen: boolean;
  onMobileClose: () => void;
  currentPath: string;
}

function SidebarItem({ item, sidebarOpen, onMobileClose, currentPath }: SidebarItemProps) {
  const hasChildren = item.children && item.children.length > 0;
  const isChildActive = useMemo(() => {
    return hasChildren && item.children?.some((child) => child.path === currentPath);
  }, [hasChildren, item.children, currentPath]);

  const [isExpanded, setIsExpanded] = useState(isChildActive);
  const active = currentPath === item.path || isChildActive;

  const toggleExpand = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <li>
      {item.path && !hasChildren ? (
        <NavLink
          to={item.path}
          onClick={onMobileClose}
          className={({ isActive }) =>
            cn(
              'flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-300',
              isActive
                ? 'bg-primary text-white'
                : 'text-sidebar-foreground/90 hover:bg-sidebar-accent hover:text-white'
            )
          }
        >
          <div className="flex items-center gap-3">
            {item.icon && (
              <item.icon className="h-5 w-5 shrink-0 transition-transform duration-300" />
            )}
            {sidebarOpen && <span>{item.label}</span>}
          </div>
        </NavLink>
      ) : (
        <div className="relative">
          <button
            type="button"
            onClick={toggleExpand}
            className={cn(
              'flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-300 ease-in-out',
              active && !isExpanded
                ? 'bg-primary/20 text-white'
                : 'text-sidebar-foreground/90 hover:bg-sidebar-accent hover:text-white'
            )}
          >
            <div className="flex items-center gap-3">
              {item.icon && (
                <item.icon className="h-5 w-5 shrink-0 transition-transform duration-300 active:scale-90" />
              )}
              {sidebarOpen && <span className="transition-opacity duration-300">{item.label}</span>}
            </div>
            {sidebarOpen && hasChildren && (
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-300 ease-in-out',
                  isExpanded && 'rotate-180'
                )}
              />
            )}
          </button>

          {/* Smooth height transition using grid trick */}
          <div
            className={cn(
              'grid overflow-hidden transition-all duration-300 ease-in-out',
              sidebarOpen && hasChildren && isExpanded
                ? 'grid-rows-[1fr] mt-1 opacity-100'
                : 'grid-rows-[0fr] opacity-0'
            )}
          >
            <ul className="min-h-0 space-y-1 ml-9 border-l border-sidebar-border pl-2">
              {item.children?.map((child) => (
                <li key={child.id}>
                  <NavLink
                    to={child.path || '#'}
                    onClick={onMobileClose}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-md px-3 py-2 text-xs font-medium transition-all duration-200',
                        isActive
                          ? 'text-white bg-white/10'
                          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white'
                      )
                    }
                  >
                    {child.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {!sidebarOpen && !item.path && (
            <div className="px-3 py-2">
              <div className="h-px bg-sidebar-border" />
            </div>
          )}
        </div>
      )}
    </li>
  );
}
