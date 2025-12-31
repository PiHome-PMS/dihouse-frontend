import { lazy } from 'react';
import type { RouteObject } from 'react-router';

// Lazy load from features
const SettingsPage = lazy(() =>
  import('@/features/settings').then((m) => ({ default: m.SettingsPage }))
);
const DashboardPage = lazy(() =>
  import('@/features/dashboard').then((m) => ({ default: m.DashboardPage }))
);

// Company feature - using barrel exports
const DepartmentListPage = lazy(() =>
  import('@/features/company').then((m) => ({ default: m.DepartmentListPage }))
);
const DepartmentDetailPage = lazy(() =>
  import('@/features/company').then((m) => ({ default: m.DepartmentDetailPage }))
);
const DepartmentInsertPage = lazy(() =>
  import('@/features/company').then((m) => ({ default: m.DepartmentInsertPage }))
);
const UnitListPage = lazy(() =>
  import('@/features/company').then((m) => ({ default: m.UnitListPage }))
);
const UnitDetailPage = lazy(() =>
  import('@/features/company').then((m) => ({ default: m.UnitDetailPage }))
);
const UnitInsertPage = lazy(() =>
  import('@/features/company').then((m) => ({ default: m.UnitInsertPage }))
);
const UsageDataListPage = lazy(() =>
  import('@/features/company').then((m) => ({ default: m.UsageDataListPage }))
);

// Lazy load pages (non-feature)
const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const NotFound = lazy(() => import('@/pages/NotFound'));

import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
// Layouts - not lazy (always needed)
import RootLayout from '@/layouts/RootLayout';
import { ProtectedRoute } from './ProtectedRoute';

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      // Public routes
      { path: '/', element: <Home /> },

      // Auth routes
      {
        element: <AuthLayout />,
        children: [{ path: '/login', element: <Login /> }],
      },

      // Protected routes (dashboard) - wrapped with ProtectedRoute
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: '/dashboard', element: <DashboardPage /> },
              { path: '/company/departments', element: <DepartmentListPage /> },
              { path: '/company/department/detail/:id', element: <DepartmentDetailPage /> },
              { path: '/company/department/insert', element: <DepartmentInsertPage /> },
              { path: '/company/units', element: <UnitListPage /> },
              { path: '/company/unit/detail/:id', element: <UnitDetailPage /> },
              { path: '/company/unit/insert', element: <UnitInsertPage /> },
              { path: '/company/usage-data', element: <UsageDataListPage /> },
              { path: '/settings', element: <SettingsPage /> },
            ],
          },
        ],
      },

      // 404 fallback
      { path: '*', element: <NotFound /> },
    ],
  },
];
