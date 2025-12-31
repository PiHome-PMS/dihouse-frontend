import { Eye, RefreshCw, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  onView?: () => void;
  onDelete?: () => void;
  onSync?: () => void;
  showSync?: boolean;
}

/**
 * Reusable action buttons (View, Delete, Sync)
 */
export function ActionButtons({ onView, onDelete, onSync, showSync = false }: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-1">
      {onView && (
        <button
          type="button"
          onClick={onView}
          className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-full transition-colors border border-blue-200"
        >
          <Eye className="h-4 w-4" />
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors border border-red-200"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
      {showSync && onSync && (
        <button
          type="button"
          onClick={onSync}
          className="p-1.5 text-green-500 hover:bg-green-50 rounded-full transition-colors border border-green-200"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
