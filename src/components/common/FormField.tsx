import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  colSpan?: 1 | 2;
}

/**
 * Form field wrapper with label and required indicator
 */
export function FormField({
  label,
  required = false,
  children,
  className,
  colSpan = 1,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', colSpan === 2 && 'md:col-span-2', className)}>
      <span className="text-sm font-bold text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
    </div>
  );
}
