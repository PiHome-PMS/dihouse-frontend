import type { LucideIcon } from 'lucide-react';

/**
 * Navigation item for sidebar menu
 * Supports nested children and RBAC permissions
 */
export interface NavItem {
  id: string;
  label: string;
  path?: string;
  icon?: LucideIcon;
  children?: NavItem[];
  /** Required permissions for RBAC filtering */
  permissions?: string[];
}

/**
 * Navigation section for grouping menu items
 */
export interface NavSection {
  id: string;
  label: string;
  items: NavItem[];
}
