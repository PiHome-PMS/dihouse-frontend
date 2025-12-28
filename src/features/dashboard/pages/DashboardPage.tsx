import { useProjects } from '@/hooks';
import { useMemo } from 'react';
import { StatCard, StatCardSkeleton } from '../components/StatCard';
import type { DashboardStats } from '../types/dashboard.types';

/**
 * Dashboard page - shows project statistics
 */
export function DashboardPage() {
  const { data: projects, isLoading } = useProjects({ page: 1, limit: 100 });

  // Calculate stats from projects with memoization
  const stats: DashboardStats = useMemo(
    () => ({
      total: projects?.length ?? 0,
      inProgress: projects?.filter((p) => p.status === 'active').length ?? 0,
      completed: projects?.filter((p) => p.status === 'completed').length ?? 0,
    }),
    [projects]
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="mt-1 text-muted-foreground">Chào mừng trở lại!</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard label="Tổng dự án" value={stats.total} />
            <StatCard label="Đang thực hiện" value={stats.inProgress} color="text-primary" />
            <StatCard label="Hoàn thành" value={stats.completed} color="text-green-500" />
          </>
        )}
      </div>
    </div>
  );
}
