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
    <div className={cn('text-lg font-bold tracking-tight text-white uppercase', className)}>
      {collapsed ? 'BC' : 'Building Care'}
    </div>
  );
}
