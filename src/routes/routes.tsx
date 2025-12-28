import { lazy } from 'react';
import type { RouteObject } from 'react-router';

// Lazy load pages
const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
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
            children: [{ path: '/dashboard', element: <Dashboard /> }],
          },
        ],
      },

      // 404 fallback
      { path: '*', element: <NotFound /> },
    ],
  },
];
