import { type Project, projectApi } from '@/api';
import { useQuery } from '@tanstack/react-query';

/**
 * Query keys factory for projects
 * Pattern: https://tkdodo.eu/blog/effective-react-query-keys
 */
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (params: { page?: number; limit?: number }) => [...projectKeys.lists(), params] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
};

/**
 * Hook to fetch paginated projects list
 * @example
 * const { data, isLoading } = useProjects({ page: 1, limit: 10 });
 */
export function useProjects(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: projectKeys.list(params ?? {}),
    queryFn: async () => {
      const response = await projectApi.getProjects(params);
      return response.data;
    },
  });
}

/**
 * Hook to fetch single project by ID
 * @example
 * const { data: project } = useProject('project-123');
 */
export function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: async () => {
      const response = await projectApi.getProject(id);
      return response.data;
    },
    enabled: !!id, // Only fetch when ID is provided
  });
}

// Re-export Project type for convenience
export type { Project };
