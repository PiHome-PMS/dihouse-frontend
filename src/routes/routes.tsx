import { lazy } from 'react';
import type { RouteObject } from 'react-router';

// Lazy load from features
const SettingsPage = lazy(() =>
  import('@/features/settings').then((m) => ({ default: m.SettingsPage }))
);
const DashboardPage = lazy(() =>
  import('@/features/dashboard').then((m) => ({ default: m.DashboardPage }))
);
const DepartmentListPage = lazy(() =>
  import('@/features/company/pages/DepartmentListPage').then((m) => ({
    default: m.DepartmentListPage,
  }))
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
