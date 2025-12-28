import type { NavItem } from '@/types';
import { LayoutDashboard, Settings } from 'lucide-react';
import { ROUTES } from './constants';

/**
 * Navigation configuration for dashboard sidebar
 * Add new menu items here with optional permissions for RBAC
 */
export const navigationConfig: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: Settings,
  },
];
