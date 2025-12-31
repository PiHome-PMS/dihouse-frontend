import { Input } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Search input with icon
 */
export function SearchInput({
  value,
  onChange,
  placeholder = 'Tìm kiếm...',
  className,
}: SearchInputProps) {
  return (
    <div className={cn('relative', className)}>
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="pl-9 h-9 text-sm border-gray-200 focus:ring-primary/20 rounded-[3px]"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    </div>
  );
}
