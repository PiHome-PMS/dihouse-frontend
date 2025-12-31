import { cn } from '@/lib/utils';

interface StatusToggleProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  size?: 'sm' | 'md';
  disabled?: boolean;
}

/**
 * Reusable status toggle switch
 */
export function StatusToggle({
  checked,
  onChange,
  size = 'sm',
  disabled = false,
}: StatusToggleProps) {
  const sizes = {
    sm: { wrapper: 'h-5 w-9', thumb: 'h-4 w-4', translate: 'translate-x-4' },
    md: { wrapper: 'h-6 w-11', thumb: 'h-5 w-5', translate: 'translate-x-5' },
  };

  const s = sizes[size];

  return (
    <button
      type="button"
      onClick={() => !disabled && onChange?.(!checked)}
      disabled={disabled}
      className={cn(
        'inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
        s.wrapper,
        checked ? 'bg-primary' : 'bg-gray-200',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      <div
        className={cn(
          'pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform',
          s.thumb,
          checked ? s.translate : 'translate-x-0'
        )}
      />
    </button>
  );
}
