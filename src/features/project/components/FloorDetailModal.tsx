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
import type { Floor } from '../types/project.types';

interface FloorDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  floor?: Floor;
  onSave?: (data: Partial<Floor>) => void;
}

/**
 * Floor (Tầng) Detail/Edit Modal
 */
export function FloorDetailModal({ open, onOpenChange, floor, onSave }: FloorDetailModalProps) {
  const [formData, setFormData] = useState({
    name: floor?.name || '',
    buildingId: floor?.buildingId || 0,
  });

  // Mock building options
  const buildingOptions = [
    { id: 1, name: 'Tòa A' },
    { id: 2, name: 'Tòa B' },
    { id: 3, name: 'Tòa C' },
  ];

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
            {floor ? 'Chi tiết tầng' : 'Thêm mới tầng'}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-4">
          <FormField label="Tên tầng" required>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nhập tên tầng"
              className="h-10 rounded-[3px]"
            />
          </FormField>

          <FormField label="Tòa nhà" required>
            <select
              value={formData.buildingId}
              onChange={(e) => setFormData({ ...formData, buildingId: Number(e.target.value) })}
              className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value={0} disabled>
                Chọn tòa nhà
              </option>
              {buildingOptions.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
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
