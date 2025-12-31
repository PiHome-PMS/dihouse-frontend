import { FormField } from '@/components/common';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from '@/components/ui';
import { useState } from 'react';
import type { Position } from '../types/hr.types';

interface PositionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position?: Position;
  onSave?: (data: Partial<Position>) => void;
}

export function PositionModal({ open, onOpenChange, position, onSave }: PositionModalProps) {
  const [formData, setFormData] = useState({
    name: position?.name || '',
    description: position?.description || '',
  });

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-800">
            {position ? 'Chi tiết chức vụ' : 'Thêm mới chức vụ'}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-4">
          <FormField label="Tên chức vụ" required>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nhập tên chức vụ"
              className="h-10 rounded-[3px]"
            />
          </FormField>

          <FormField label="Mô tả">
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Nhập mô tả"
              className="w-full p-2 border border-gray-200 rounded-[3px] text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </FormField>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-9 px-4 text-sm font-semibold rounded-[3px]"
          >
            Đóng
          </Button>
          <Button
            onClick={handleSave}
            className="h-9 px-4 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-[3px]"
          >
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
