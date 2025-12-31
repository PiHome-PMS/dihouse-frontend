import { Home } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  breadcrumb: string[];
}

/**
 * Reusable page header with title and breadcrumb
 */
export function PageHeader({ title, breadcrumb }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-700 uppercase">{title}</h1>
      <div className="flex items-center gap-1 text-xs text-blue-500">
        <Home className="h-3 w-3" />
        <span>/ {breadcrumb.join(' / ')}</span>
      </div>
    </div>
  );
}
