import { API_ENDPOINTS } from '@/config/constants';
import { apiClient } from '../api-client';

/**
 * Project entity (example)
 */
export interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'on_hold';
  createdAt: string;
}

/**
 * Project API endpoints (example)
 */
export const projectApi = {
  /**
   * Get paginated projects list
   */
  getProjects: (params?: { page?: number; limit?: number }) =>
    apiClient.get<Project[]>(API_ENDPOINTS.PROJECTS.LIST, { params }),

  /**
   * Get single project by ID
   */
  getProject: (id: string) => apiClient.get<Project>(API_ENDPOINTS.PROJECTS.DETAIL(id)),
};
