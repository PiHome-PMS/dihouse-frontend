import { cn } from '@/lib/utils';
import { ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

interface Option {
  id: string;
  name: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Reusable multi-select dropdown with tags
 */
export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Chọn...',
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (optionId: string) => {
    onChange(
      value.includes(optionId) ? value.filter((id) => id !== optionId) : [...value, optionId]
    );
  };

  const removeOption = (optionId: string) => {
    onChange(value.filter((id) => id !== optionId));
  };

  return (
    <div className={cn('relative', className)}>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: Dropdown toggle with visual interaction */}
      <div
        className="min-h-10 px-3 py-2 border border-gray-200 rounded-[3px] cursor-pointer flex flex-wrap gap-2 items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value.length === 0 ? (
          <span className="text-sm text-gray-400">{placeholder}</span>
        ) : (
          value.map((optionId) => {
            const option = options.find((o) => o.id === optionId);
            return (
              <span
                key={optionId}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded"
              >
                {option?.name}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(optionId);
                  }}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })
        )}
        <ChevronDown
          className={cn(
            'h-4 w-4 text-gray-400 ml-auto transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-[3px] shadow-lg max-h-48 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={value.includes(option.id)}
                onChange={() => toggleOption(option.id)}
                className="h-4 w-4 text-primary rounded"
              />
              <span className="text-sm text-gray-600">{option.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
