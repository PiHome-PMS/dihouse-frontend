import { Skeleton } from '@/components/ui';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: LucideIcon;
  color?: string;
  bgColor?: string;
}

/**
 * Stats card component for displaying metrics with icon support
 */
export function StatCard({ label, value, icon: Icon, color, bgColor }: StatCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className={`mt-1 text-3xl font-bold ${color ?? 'text-foreground'}`}>{value}</p>
      </div>
      {Icon && (
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg ${bgColor ?? 'bg-primary/10'}`}
        >
          <Icon className={`h-6 w-6 ${color ?? 'text-primary'}`} />
        </div>
      )}
    </div>
  );
}

/**
 * Skeleton loader for stat cards
 */
export function StatCardSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-xl border bg-card p-6 shadow-sm">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-16" />
      </div>
      <Skeleton className="h-12 w-12 rounded-lg" />
    </div>
  );
}
