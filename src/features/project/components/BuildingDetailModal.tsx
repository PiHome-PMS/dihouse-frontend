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
import type { Building } from '../types/project.types';

interface BuildingDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  building?: Building;
  onSave?: (data: Partial<Building>) => void;
}

/**
 * Building (Tòa nhà) Detail/Edit Modal
 */
export function BuildingDetailModal({
  open,
  onOpenChange,
  building,
  onSave,
}: BuildingDetailModalProps) {
  const [formData, setFormData] = useState({
    name: building?.name || '',
    code: building?.code || '',
    blockId: building?.blockId || 0,
  });

  // Mock block options
  const blockOptions = [
    { id: 1, name: 'Phân khu A' },
    { id: 2, name: 'Phân khu B' },
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
            {building ? 'Chi tiết tòa nhà' : 'Thêm mới tòa nhà'}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-4">
          <FormField label="Tên tòa nhà" required>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nhập tên tòa nhà"
              className="h-10 rounded-[3px]"
            />
          </FormField>

          <FormField label="Mã tòa nhà" required>
            <Input
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="Nhập mã tòa nhà"
              className="h-10 rounded-[3px]"
            />
          </FormField>

          <FormField label="Phân khu" required>
            <select
              value={formData.blockId}
              onChange={(e) => setFormData({ ...formData, blockId: Number(e.target.value) })}
              className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value={0} disabled>
                Chọn phân khu
              </option>
              {blockOptions.map((b) => (
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
