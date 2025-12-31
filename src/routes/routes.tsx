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

// Permission feature - using barrel exports
const PermissionGroupListPage = lazy(() =>
  import('@/features/permission').then((m) => ({ default: m.PermissionGroupListPage }))
);
const PermissionGroupDetailPage = lazy(() =>
  import('@/features/permission').then((m) => ({ default: m.PermissionGroupDetailPage }))
);
const PermissionGroupInsertPage = lazy(() =>
  import('@/features/permission').then((m) => ({ default: m.PermissionGroupInsertPage }))
);

// Project feature - using barrel exports
const ProjectListPage = lazy(() =>
  import('@/features/project').then((m) => ({ default: m.ProjectListPage }))
);
const BlockListPage = lazy(() =>
  import('@/features/project').then((m) => ({ default: m.BlockListPage }))
);
const BuildingListPage = lazy(() =>
  import('@/features/project').then((m) => ({ default: m.BuildingListPage }))
);

// HR feature - using barrel exports
const TimekeepingConfigPage = lazy(() =>
  import('@/features/hr').then((m) => ({ default: m.TimekeepingConfigPage }))
);
const DeviceListPage = lazy(() =>
  import('@/features/hr').then((m) => ({ default: m.DeviceListPage }))
);
const PositionListPage = lazy(() =>
  import('@/features/hr').then((m) => ({ default: m.PositionListPage }))
);
const ShiftListPage = lazy(() =>
  import('@/features/hr').then((m) => ({ default: m.ShiftListPage }))
);
const EmployeeListPage = lazy(() =>
  import('@/features/hr').then((m) => ({ default: m.EmployeeListPage }))
);
const EmployeeDetailPage = lazy(() =>
  import('@/features/hr').then((m) => ({ default: m.EmployeeDetailPage }))
);
const AttendanceHistoryPage = lazy(() =>
  import('@/features/hr').then((m) => ({ default: m.AttendanceHistoryPage }))
);
const AttendanceManagementPage = lazy(() =>
  import('@/features/hr').then((m) => ({ default: m.AttendanceManagementPage }))
);
const MonthlyEvaluationPage = lazy(() =>
  import('@/features/hr').then((m) => ({ default: m.MonthlyEvaluationPage }))
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
              { path: '/permission/groups', element: <PermissionGroupListPage /> },
              { path: '/permission/group/detail/:id', element: <PermissionGroupDetailPage /> },
              { path: '/permission/group/insert', element: <PermissionGroupInsertPage /> },
              { path: '/company/project', element: <ProjectListPage /> },
              { path: '/company/block', element: <BlockListPage /> },
              { path: '/company/building', element: <BuildingListPage /> },
              { path: '/hr/timekeeping-config', element: <TimekeepingConfigPage /> },
              { path: '/hr/devices', element: <DeviceListPage /> },
              { path: '/hr/positions', element: <PositionListPage /> },
              { path: '/hr/shifts', element: <ShiftListPage /> },
              { path: '/hr/employees', element: <EmployeeListPage /> },
              { path: '/hr/employee/detail/:id', element: <EmployeeDetailPage /> },
              { path: '/hr/attendance-history', element: <AttendanceHistoryPage /> },
              { path: '/hr/attendance-management', element: <AttendanceManagementPage /> },
              { path: '/hr/monthly-evaluation', element: <MonthlyEvaluationPage /> },
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
