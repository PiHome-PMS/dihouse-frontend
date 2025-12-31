/**
 * Application constants
 */

// Route paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  COMPANY: {
    DEPARTMENTS: '/company/departments',
    DEPARTMENT_DETAIL: (id: number | string) => `/company/department/detail/${id}`,
    DEPARTMENT_INSERT: '/company/department/insert',
    UNITS: '/company/units',
    UNIT_DETAIL: (id: number | string) => `/company/unit/detail/${id}`,
    UNIT_INSERT: '/company/unit/insert',
    USAGE_DATA: '/company/usage-data',
  },
  PERMISSION: {
    GROUPS: '/permission/groups',
    GROUP_DETAIL: (id: number | string) => `/permission/group/detail/${id}`,
    GROUP_INSERT: '/permission/group/insert',
  },
  PROJECT: {
    LIST: '/company/project',
    BLOCK_LIST: '/company/block',
    BUILDING_LIST: '/company/building',
  },
  HR: {
    TIMEKEEPING_CONFIG: '/hr/timekeeping-config',
    DEVICE_LIST: '/hr/devices',
    POSITION_LIST: '/hr/positions',
    SHIFT_LIST: '/hr/shifts',
    EMPLOYEE_LIST: '/hr/employees',
    EMPLOYEE_DETAIL: (id: number | string) => `/hr/employee/detail/${id}`,
    ATTENDANCE_HISTORY: '/hr/attendance-history',
    ATTENDANCE_MANAGEMENT: '/hr/attendance-management',
    MONTHLY_EVALUATION: '/hr/monthly-evaluation',
  },
  SETUP: {
    MENU_APP: '/setup/menu-app',
  },
} as const;

// Storage keys (for future use with cookies)
export const STORAGE_KEYS = {
  THEME: 'theme',
  LOCALE: 'locale',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
  },
  PROJECTS: {
    LIST: '/projects',
    DETAIL: (id: string) => `/projects/${id}`,
  },
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMIT_OPTIONS: [10, 20, 50, 100],
} as const;

// Date format (Vietnamese)
export const DATE_FORMAT = {
  DISPLAY: 'DD/MM/YYYY',
  DISPLAY_TIME: 'DD/MM/YYYY HH:mm',
  API: 'YYYY-MM-DD',
} as const;
