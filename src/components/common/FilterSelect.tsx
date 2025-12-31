import { cn } from '@/lib/utils';

interface FilterSelectOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  options: FilterSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Styled select dropdown for filters
 */
export function FilterSelect({
  options,
  value,
  onChange,
  placeholder,
  className,
}: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn(
        'h-9 px-3 border border-gray-200 rounded-[3px] text-sm text-gray-600 outline-none focus:border-primary/50 transition-colors',
        className
      )}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
