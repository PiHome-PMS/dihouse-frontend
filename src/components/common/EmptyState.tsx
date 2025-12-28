import { cn } from '@/lib/utils';
import { FileX2, Inbox, Search } from 'lucide-react';
import type { ReactNode } from 'react';

type EmptyStateVariant = 'default' | 'search' | 'error';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  variant?: EmptyStateVariant;
  action?: ReactNode;
  className?: string;
}

const defaultProps: Record<
  EmptyStateVariant,
  { icon: ReactNode; title: string; description: string }
> = {
  default: {
    icon: <Inbox className="h-12 w-12" />,
    title: 'Không có dữ liệu',
    description: 'Chưa có dữ liệu nào được thêm vào.',
  },
  search: {
    icon: <Search className="h-12 w-12" />,
    title: 'Không tìm thấy kết quả',
    description: 'Thử thay đổi từ khóa tìm kiếm.',
  },
  error: {
    icon: <FileX2 className="h-12 w-12" />,
    title: 'Đã xảy ra lỗi',
    description: 'Không thể tải dữ liệu. Vui lòng thử lại.',
  },
};

/**
 * Empty state component for when there's no data to display
 * @example
 * <EmptyState variant="search" action={<Button>Tạo mới</Button>} />
 */
export function EmptyState({
  title,
  description,
  icon,
  variant = 'default',
  action,
  className,
}: EmptyStateProps) {
  const defaults = defaultProps[variant];

  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <div className="text-muted-foreground">{icon ?? defaults.icon}</div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title ?? defaults.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description ?? defaults.description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
