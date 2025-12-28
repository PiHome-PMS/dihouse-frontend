import { env } from '@/config/env';
import type { ApiResponse } from '@/types';
import axios, { type AxiosRequestConfig } from 'axios';
import {
  requestErrorInterceptor,
  requestInterceptor,
  responseErrorInterceptor,
  responseInterceptor,
} from './interceptors';

/**
 * Base Axios instance with interceptors
 * Uses HttpOnly cookies for auth (credentials included)
 * Note: Response interceptor unwraps response.data
 */
const axiosInstance = axios.create({
  baseURL: env.API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests
});

// Attach interceptors
axiosInstance.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

/**
 * Typed API client wrapper
 * Response interceptor unwraps AxiosResponse, so methods return ApiResponse<T> directly
 */
export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<ApiResponse<T>, ApiResponse<T>>(url, config),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.post<ApiResponse<T>, ApiResponse<T>>(url, data, config),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.put<ApiResponse<T>, ApiResponse<T>>(url, data, config),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.patch<ApiResponse<T>, ApiResponse<T>>(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<ApiResponse<T>, ApiResponse<T>>(url, config),
};
