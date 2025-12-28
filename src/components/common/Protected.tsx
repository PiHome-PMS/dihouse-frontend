import { usePermissions } from '@/hooks';
import type { Permission } from '@/types';
import type { ReactNode } from 'react';

interface ProtectedProps {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Protected component - hides content without permission
 */
export function Protected({ permission, children, fallback = null }: ProtectedProps) {
  const { hasPermission } = usePermissions();
  return hasPermission(permission) ? <>{children}</> : <>{fallback}</>;
}
