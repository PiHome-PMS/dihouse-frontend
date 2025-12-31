import type { NavItem } from '@/types';
import {
  BarChart3,
  ClipboardCheck,
  Grid2X2,
  Home,
  LayoutGrid,
  Megaphone,
  Network,
  Receipt,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import { ROUTES } from './constants';

export const navigationConfig: NavItem[] = [
  {
    id: 'dashboard-group',
    label: 'Trang chủ',
    icon: Home,
    children: [{ id: 'dashboard', label: 'Trang chủ', path: ROUTES.DASHBOARD }],
  },
  {
    id: 'company',
    label: 'Quản Lý Công Ty',
    icon: Network,
    children: [
      { id: 'departments', label: 'Danh sách phòng ban', path: ROUTES.COMPANY.DEPARTMENTS },
      { id: 'units', label: 'Danh sách bộ phận', path: ROUTES.COMPANY.UNITS },
      { id: 'usage-data', label: 'Dữ liệu sử dụng', path: ROUTES.COMPANY.USAGE_DATA },
    ],
  },
  {
    id: 'permissions',
    label: 'Quản Lý Quyền',
    icon: ShieldCheck,
    children: [{ id: 'permission-groups', label: 'Nhóm quyền', path: ROUTES.PERMISSION.GROUPS }],
  },
  {
    id: 'projects',
    label: 'Quản lý dự án',
    icon: LayoutGrid,
    children: [
      { id: 'project-list', label: 'Danh sách dự án', path: ROUTES.PROJECT.LIST },
      { id: 'subdivisions', label: 'Danh sách phân khu', path: ROUTES.PROJECT.BLOCK_LIST },
      { id: 'buildings', label: 'Danh sách tòa nhà', path: ROUTES.PROJECT.BUILDING_LIST },
    ],
  },
  {
    id: 'hr',
    label: 'Quản lý nhân sự',
    icon: Grid2X2,
    children: [
      { id: 'attendance-config', label: 'Cấu hình chấm công', path: ROUTES.HR.TIMEKEEPING_CONFIG },
      {
        id: 'attendance-devices',
        label: 'Quản lý thiết bị chấm công',
        path: ROUTES.HR.DEVICE_LIST,
      },
      { id: 'positions', label: 'Quản lý chức vụ', path: ROUTES.HR.POSITION_LIST },
      { id: 'shifts', label: 'Quản lý ca làm việc', path: ROUTES.HR.SHIFT_LIST },
      { id: 'personnel-list', label: 'Danh sách nhân sự', path: ROUTES.HR.EMPLOYEE_LIST },
      { id: 'attendance-history', label: 'Lịch sử chấm công', path: ROUTES.HR.ATTENDANCE_HISTORY },
      {
        id: 'attendance-management',
        label: 'Quản lý chấm công',
        path: ROUTES.HR.ATTENDANCE_MANAGEMENT,
      },
      { id: 'hr-evaluation', label: 'Đánh giá nhân sự tháng', path: ROUTES.HR.MONTHLY_EVALUATION },
    ],
  },
  {
    id: 'setup',
    label: 'Thiết lập',
    icon: Settings,
    children: [{ id: 'resident-app-menu', label: 'Menu app cư dân', path: ROUTES.SETUP.MENU_APP }],
  },
  {
    id: 'settings',
    label: 'Cài đặt',
    icon: Settings,
    children: [{ id: 'activity-history', label: 'Lịch sử thao tác', path: ROUTES.DASHBOARD }],
  },
  {
    id: 'approvals',
    label: 'Quản lý phê duyệt',
    icon: ClipboardCheck,
    children: [
      { id: 'request-types', label: 'Danh sách loại đơn', path: ROUTES.DASHBOARD },
      { id: 'approval-permissions', label: 'Danh sách quyền phê duyệt', path: ROUTES.DASHBOARD },
    ],
  },
  {
    id: 'ads',
    label: 'Quảng cáo',
    icon: Megaphone,
    children: [
      { id: 'ad-locations', label: 'Vị trí quảng cáo', path: ROUTES.DASHBOARD },
      { id: 'ad-list', label: 'Danh sách quảng cáo', path: ROUTES.DASHBOARD },
    ],
  },
  {
    id: 'reports',
    label: 'Báo cáo',
    icon: BarChart3,
    children: [
      { id: 'apartment-report', label: 'Báo cáo căn hộ sử dụng', path: ROUTES.DASHBOARD },
      { id: 'data-stats', label: 'Thống kê dữ liệu', path: ROUTES.DASHBOARD },
    ],
  },
  {
    id: 'accounting',
    label: 'Doanh thu - chi phí',
    icon: Receipt,
    children: [
      { id: 'accounting-dashboard', label: 'Báo cáo doanh thu - chi phí', path: ROUTES.DASHBOARD },
      { id: 'vendors', label: 'Nhà cung cấp/khách hàng', path: ROUTES.DASHBOARD },
      { id: 'vendor-contracts', label: 'Hợp đồng nhà cung cấp', path: ROUTES.DASHBOARD },
      { id: 'accounts', label: 'Danh mục tài khoản kế toán', path: ROUTES.DASHBOARD },
      { id: 'budgets', label: 'Quản lý mã ngân sách', path: ROUTES.DASHBOARD },
      { id: 'categories', label: 'Quản lý khoản mục', path: ROUTES.DASHBOARD },
      { id: 'approval-config', label: 'Cấu hình duyệt chi', path: ROUTES.DASHBOARD },
      { id: 'debt-accrued', label: 'Công nợ phát sinh', path: ROUTES.DASHBOARD },
      { id: 'payment-requests', label: 'Quản lý phiếu đề nghị chi', path: ROUTES.DASHBOARD },
      { id: 'vouchers', label: 'Quản lý phiếu thu/chi', path: ROUTES.DASHBOARD },
      { id: 'cash-book', label: 'Sổ quỹ', path: ROUTES.DASHBOARD },
      { id: 'debt-sync', label: 'Tổng hợp công nợ', path: ROUTES.DASHBOARD },
      { id: 'revenue-cost-sync', label: 'Tổng hợp doanh thu - chi phí', path: ROUTES.DASHBOARD },
      { id: 'trial-balance', label: 'Bảng cân đối tài khoản', path: ROUTES.DASHBOARD },
    ],
  },
];
