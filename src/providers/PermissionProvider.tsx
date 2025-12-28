import { useAuth } from '@/hooks';
import type { Permission } from '@/types';
import { type ReactNode, createContext, useCallback, useMemo } from 'react';

interface PermissionContextValue {
  permissions: Permission[];
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
}

export const PermissionContext = createContext<PermissionContextValue | null>(null);

interface PermissionProviderProps {
  children: ReactNode;
}

/**
 * Permission provider - RBAC checks
 */
export function PermissionProvider({ children }: PermissionProviderProps) {
  const { user } = useAuth();
  const permissions = user?.permissions ?? [];

  const hasPermission = useCallback(
    (permission: Permission) => {
      // Return false if user not loaded - prevents false positives during loading
      if (!user) return false;
      // Admin has all permissions
      if (permissions.includes('admin:all')) return true;
      return permissions.includes(permission);
    },
    [user, permissions]
  );

  const hasAnyPermission = useCallback(
    (perms: Permission[]) => perms.some(hasPermission),
    [hasPermission]
  );

  const hasAllPermissions = useCallback(
    (perms: Permission[]) => perms.every(hasPermission),
    [hasPermission]
  );

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      permissions,
      hasPermission,
      hasAnyPermission,
      hasAllPermissions,
    }),
    [permissions, hasPermission, hasAnyPermission, hasAllPermissions]
  );

  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
}
