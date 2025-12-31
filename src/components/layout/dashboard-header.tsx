import { ThemeToggle } from '@/components/common';
import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { Bell, LogOut, Menu } from 'lucide-react';
import { useMemo } from 'react';

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  userName?: string;
  onLogout: () => void;
  onToggleSidebar: () => void;
}

/**
 * Dashboard header with user menu and blue gradient background
 */
export function DashboardHeader({
  sidebarOpen,
  userName,
  onLogout,
  onToggleSidebar,
}: DashboardHeaderProps) {
  const initials = useMemo(() => {
    return (
      userName
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase() || 'U'
    );
  }, [userName]);

  return (
    <header
      className={cn(
        'fixed right-0 top-0 z-30 flex h-16 items-center justify-between transition-all duration-300 px-4',
        sidebarOpen ? 'left-72' : 'left-16',
        'max-lg:left-0 bg-primary text-white shadow-sm'
      )}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="text-white hover:bg-black/10 rounded-none w-16 h-16"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
          BUILDING CARE
        </span>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-black/10 relative h-16 w-12 rounded-none"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-4 right-3 h-2 w-2 bg-red-500 rounded-full border border-white" />
        </Button>

        <ThemeToggle className="text-white hover:bg-black/10 h-16 w-12 rounded-none" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="gap-2 text-white hover:bg-black/10 h-16 rounded-none px-4"
            >
              <Avatar className="h-8 w-8 border border-white/20">
                <AvatarFallback className="bg-white/20 text-white">{initials}</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-semibold sm:inline">
                {userName?.toUpperCase() || 'USER'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-[-4px]">
            <DropdownMenuLabel className="font-bold">Tài khoản</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onLogout}
              className="text-red-500 font-semibold focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
