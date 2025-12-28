/**
 * API response types
 */

// Standard API response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// API error structure
export interface ApiError {
  message: string;
  code: string;
  status: number;
}
