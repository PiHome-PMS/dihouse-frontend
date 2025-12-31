import { Button } from '@/components/ui';
import { Save } from 'lucide-react';

interface FormActionsProps {
  onCancel: () => void;
  onSubmit?: () => void;
  submitText?: string;
  cancelText?: string;
  submitIcon?: React.ReactNode;
  cancelVariant?: 'outline' | 'destructive';
}

/**
 * Form action buttons container
 */
export function FormActions({
  onCancel,
  onSubmit,
  submitText = 'Lưu',
  cancelText = 'Hủy',
  submitIcon = <Save className="h-4 w-4" />,
  cancelVariant = 'outline',
}: FormActionsProps) {
  return (
    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
      <Button
        type="button"
        variant={cancelVariant}
        onClick={onCancel}
        className={
          cancelVariant === 'destructive'
            ? 'h-9 px-6 rounded-[3px] border-red-300 text-red-500 hover:bg-red-50'
            : 'h-9 px-6 rounded-[3px]'
        }
      >
        {cancelText}
      </Button>
      <Button
        type={onSubmit ? 'button' : 'submit'}
        onClick={onSubmit}
        className="h-9 gap-2 px-6 bg-primary hover:bg-primary/90 rounded-[3px]"
      >
        {submitIcon}
        {submitText}
      </Button>
    </div>
  );
}
