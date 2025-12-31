/**
 * Permission feature type definitions
 */

export interface PermissionGroup {
  id: number;
  groupId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
}

export interface PermissionItem {
  id: string;
  name: string;
  checked: boolean;
}

export interface PermissionSection {
  id: string;
  title: string;
  permissions: PermissionItem[];
}

export interface PermissionGroupFormData {
  name: string;
  status: boolean;
  appPermissions: string[];
  webPermissions: string[];
  notificationPermissions: string[];
}

export interface UserInGroup {
  id: number;
  code: string;
  name: string;
  phone: string;
  email: string;
  department: string;
  unit: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
}
