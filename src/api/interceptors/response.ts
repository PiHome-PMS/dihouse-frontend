import { ROUTES } from '@/config/constants';
import type { ApiError } from '@/types';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Promise to track ongoing refresh - prevents race condition
let refreshPromise: Promise<void> | null = null;

// Queue of failed requests to retry after refresh
type FailedRequest = {
  resolve: (config: InternalAxiosRequestConfig) => void;
  reject: (error: unknown) => void;
  config: InternalAxiosRequestConfig;
};
let failedQueue: FailedRequest[] = [];

/**
 * Process queued requests after refresh completes
 */
function processQueue(success: boolean) {
  for (const request of failedQueue) {
    if (success) {
      request.resolve(request.config);
    } else {
      request.reject(new Error('Session expired'));
    }
  }
  failedQueue = [];
}

/**
 * Response interceptor - unwrap data
 */
export function responseInterceptor(response: AxiosResponse) {
  return response.data;
}

/**
 * Response error interceptor
 * Handles 401 with request queuing to prevent logout storms
 */
export function responseErrorInterceptor(error: AxiosError<{ message?: string }>) {
  const status = error.response?.status;
  const originalRequest = error.config;

  // Handle 401 - Unauthorized (queue concurrent requests)
  if (status === 401 && originalRequest) {
    if (!refreshPromise) {
      // First 401 - start refresh process
      refreshPromise = new Promise<void>((_resolve, reject) => {
        // TODO: Implement actual refresh token call here
        // For now, redirect to login after brief delay
        setTimeout(() => {
          processQueue(false);
          window.location.href = ROUTES.LOGIN;
          reject(new Error('Session expired'));
        }, 100);
      }).finally(() => {
        refreshPromise = null;
      });
    }

    // Queue this request to retry after refresh
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject, config: originalRequest });
    });
  }

  // Normalize error
  const apiError: ApiError = {
    message: error.response?.data?.message || error.message || 'Đã xảy ra lỗi',
    code: error.code || 'UNKNOWN',
    status: status || 500,
  };

  return Promise.reject(apiError);
}
