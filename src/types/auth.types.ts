/**
 * Authentication types
 */

// User entity
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  avatar?: string;
  createdAt: string;
}

// User roles
export type UserRole = 'admin' | 'manager' | 'user';

// Permission strings (static literals as validated)
export type Permission =
  | 'users:read'
  | 'users:write'
  | 'users:delete'
  | 'projects:read'
  | 'projects:write'
  | 'projects:delete'
  | 'admin:all';

// Auth tokens
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Login response
export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}
