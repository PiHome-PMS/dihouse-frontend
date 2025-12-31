/**
 * Project Management feature type definitions
 */

export interface Project {
  id: number;
  projectId: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  manager: string;
  area: number;
  logoUrl?: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectPaymentInfo {
  accountNumber: string;
  bankName: string;
  branch: string;
  accountName: string;
  autoReceive: boolean;
  autoAccounting: boolean;
}

export interface Block {
  id: number;
  name: string;
  code: string;
  projectId: number;
  projectName: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Building {
  id: number;
  name: string;
  code: string;
  blockId: number;
  blockName: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Floor {
  id: number;
  name: string;
  buildingId: number;
  buildingName: string;
  createdAt: string;
  updatedAt: string;
}
