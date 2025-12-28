import { API_ENDPOINTS } from '@/config/constants';
import type { LoginCredentials, LoginResponse, User } from '@/types';
import { apiClient } from '../api-client';

/**
 * Authentication API endpoints
 * apiClient methods return ApiResponse<T> directly (response interceptor unwraps)
 */
export const authApi = {
  /**
   * Login with email/password
   * Sets HttpOnly cookie on success
   */
  login: (credentials: LoginCredentials) =>
    apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials),

  /**
   * Logout - clears HttpOnly cookie
   */
  logout: () => apiClient.post<null>(API_ENDPOINTS.AUTH.LOGOUT),

  /**
   * Get current user from cookie session
   */
  getMe: () => apiClient.get<User>(API_ENDPOINTS.AUTH.ME),

  /**
   * Refresh token - handled by HttpOnly cookie
   */
  refreshToken: () => apiClient.post<null>(API_ENDPOINTS.AUTH.REFRESH),
};
