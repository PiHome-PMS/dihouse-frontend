import { Skeleton } from '@/components/ui';
import { useProjects } from '@/hooks';
import { useMemo } from 'react';

/**
 * Stats card component
 */
function StatCard({
  label,
  value,
  color,
}: { label: string; value: number | string; color?: string }) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`mt-2 text-3xl font-bold ${color ?? 'text-foreground'}`}>{value}</p>
    </div>
  );
}

/**
 * Skeleton loader for stat cards
 */
function StatCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="mt-3 h-8 w-16" />
    </div>
  );
}

/**
 * Dashboard page - shows loading skeleton while fetching data
 */
export default function Dashboard() {
  const { data: projects, isLoading } = useProjects({ page: 1, limit: 100 });

  // Calculate stats from projects with memoization
  const stats = useMemo(
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
