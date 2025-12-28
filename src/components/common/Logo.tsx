import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  collapsed?: boolean;
}

/**
 * Logo component
 */
export function Logo({ className, collapsed = false }: LogoProps) {
  return (
    <div className={cn('text-xl font-bold text-brand-500', className)}>
      {collapsed ? 'D' : 'DiHouse'}
    </div>
  );
}
