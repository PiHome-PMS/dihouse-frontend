import type { InternalAxiosRequestConfig } from 'axios';

/**
 * Request interceptor
 * Note: Using HttpOnly cookies - tokens are sent automatically by browser
 */
export function requestInterceptor(config: InternalAxiosRequestConfig) {
  // Ensure credentials are sent with requests (for HttpOnly cookies)
  config.withCredentials = true;

  return config;
}

export function requestErrorInterceptor(error: unknown) {
  return Promise.reject(error);
}
