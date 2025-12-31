/**
 * Company feature types
 */

export interface Department {
  id: number;
  category: 'company' | 'project';
  name: string;
  code: string;
  address?: string;
  hotline?: string;
  email?: string;
  head?: string;
  confirmer?: string;
  project?: string;
  signature?: string | null;
  notes?: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Unit {
  id: number;
  name: string;
  code: string;
  department: string;
  departmentId: number;
  head?: string;
  projects: string[];
  email?: string;
  phone?: string;
  manageWarehouse: boolean;
  notes?: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentFormData {
  category: 'company' | 'project';
  name: string;
  code: string;
  address?: string;
  email?: string;
  phone?: string;
  confirmer?: string;
  head?: string;
  project?: string;
  notes?: string;
}

export interface UnitFormData {
  name: string;
  code: string;
  departmentId: number;
  head?: string;
  projects: string[];
  email?: string;
  phone?: string;
  manageWarehouse: boolean;
  notes?: string;
  status: boolean;
}

export interface Staff {
  id: number;
  code: string;
  name: string;
  phone?: string;
  email?: string;
  department: string;
  unit: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}
