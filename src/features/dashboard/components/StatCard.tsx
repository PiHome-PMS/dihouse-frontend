import { Skeleton } from '@/components/ui';

interface StatCardProps {
  label: string;
  value: number | string;
  color?: string;
}

/**
 * Stats card component for displaying metrics
 */
export function StatCard({ label, value, color }: StatCardProps) {
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
export function StatCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="mt-3 h-8 w-16" />
    </div>
  );
}
