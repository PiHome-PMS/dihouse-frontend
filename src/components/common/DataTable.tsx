import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

// Column definition type
export interface DataTableColumn<T> {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (item: T, index: number) => ReactNode;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  minWidth?: string;
  className?: string;
  emptyMessage?: string;
  showIndex?: boolean;
  indexHeader?: string;
}

/**
 * Reusable data table component with flexible column configuration
 */
export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  minWidth = '1200px',
  className,
  emptyMessage = 'Không có dữ liệu',
  showIndex = true,
  indexHeader = 'STT',
}: DataTableProps<T>) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full text-left border-collapse" style={{ minWidth }}>
        <thead>
          <tr className="bg-gray-50/50">
            {showIndex && (
              <th className="p-3 text-[11px] font-black text-gray-400 uppercase border-b border-gray-100 w-12 text-center">
                {indexHeader}
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'p-3 text-[11px] font-black text-gray-400 uppercase border-b border-gray-100',
                  col.align === 'center' && 'text-center',
                  col.align === 'right' && 'text-right'
                )}
                style={{ width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (showIndex ? 1 : 0)}
                className="p-8 text-center text-sm text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={keyExtractor(item)}
                className="hover:bg-gray-50/50 group border-b border-gray-50"
              >
                {showIndex && (
                  <td className="p-3 text-xs font-semibold text-gray-600 text-center">
                    {index + 1}
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      'p-3',
                      col.align === 'center' && 'text-center',
                      col.align === 'right' && 'text-right'
                    )}
                  >
                    {col.render
                      ? col.render(item, index)
                      : ((item as Record<string, unknown>)[col.key] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
