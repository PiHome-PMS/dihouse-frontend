/**
 * HR Management feature type definitions
 */

export interface Position {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Shift {
  id: number;
  code: string;
  name: string;
  employeeCount: number;
  status: boolean;
  timeConfig: ShiftTimeConfig[];
  createdAt: string;
  updatedAt: string;
}

export interface ShiftTimeConfig {
  day: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  workPoints: number;
}

export interface Employee {
  id: number;
  code: string;
  timekeepingCode: string;
  name: string;
  phone: string;
  email: string;
  sectionName: string;
  departmentName: string;
  positionName: string;
  hasProfile: boolean;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TimekeepingDevice {
  id: number;
  name: string;
  code: string;
  type: string;
  isActive: boolean;
  status: 'connected' | 'disconnected' | 'error';
  syncStatus: 'synced' | 'pending' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface TimekeepingConfig {
  id: number;
  name: string;
  deviceName: string;
  departmentName: string;
  employeeName: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceRecord {
  id: number;
  employeeCode: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  totalHours: number;
  status: 'present' | 'absent' | 'late' | 'early';
}

export interface MonthlyEvaluation {
  id: number;
  employeeCode: string;
  employeeName: string;
  departmentName: string;
  month: string;
  year: number;
  workDays: number;
  absentDays: number;
  lateDays: number;
  selfScore?: number;
  selfRating?: 'A' | 'B' | 'C' | 'D';
  approverName?: string;
  score: number;
  rating: 'A' | 'B' | 'C' | 'D';
}
