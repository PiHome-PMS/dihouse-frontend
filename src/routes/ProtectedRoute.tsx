import { ROUTES } from '@/config/constants';
import { useAuth, usePermissions } from '@/hooks';
import type { Permission } from '@/types';
import { Navigate, Outlet, useLocation } from 'react-router';

interface ProtectedRouteProps {
  permission?: Permission;
}

/**
 * Protected route wrapper - redirects if not authenticated
 */
export function ProtectedRoute({ permission }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const { hasPermission } = usePermissions();
  const location = useLocation();

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-gray-500">Đang kiểm tra...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Check permission if specified
  if (permission && !hasPermission(permission)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
}
