import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';
import { Check } from 'lucide-react';

interface UnlockAllModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  itemType: 'menu-app' | 'y-kien';
}

export function UnlockAllModal({ open, onOpenChange, onConfirm, itemType }: UnlockAllModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-800">Xác nhận mở khóa</DialogTitle>
        </DialogHeader>

        <div className="p-4">
          <p className="text-sm text-gray-600">
            Bạn có chắc chắn muốn mở khóa tất cả{' '}
            {itemType === 'menu-app' ? 'menu app' : 'danh mục ý kiến'}?
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-9 px-4 text-sm font-semibold rounded-[3px]"
          >
            Hủy
          </Button>
          <Button
            onClick={onConfirm}
            className="h-9 gap-2 px-4 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-[3px]"
          >
            <Check className="h-4 w-4" />
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
