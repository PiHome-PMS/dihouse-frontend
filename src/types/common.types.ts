/**
 * Common utility types
 */

// Nullable type
export type Nullable<T> = T | null;

// Optional type
export type Optional<T> = T | undefined;

// Select option for dropdowns
export interface SelectOption<T = string> {
  label: string;
  value: T;
}

// Async status
export type Status = 'idle' | 'loading' | 'success' | 'error';

// Base entity with ID
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
