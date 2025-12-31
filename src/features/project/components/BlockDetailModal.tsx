import { FormField, StatusToggle } from '@/components/common';
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
import type { Block } from '../types/project.types';

interface BlockDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  block?: Block;
  onSave?: (data: Partial<Block>) => void;
}

/**
 * Block (Phân khu) Detail/Edit Modal
 */
export function BlockDetailModal({ open, onOpenChange, block, onSave }: BlockDetailModalProps) {
  const [formData, setFormData] = useState({
    name: block?.name || '',
    code: block?.code || '',
    projectId: block?.projectId || 0,
    status: block?.status ?? true,
  });

  // Mock project options
  const projectOptions = [
    { id: 1, name: 'BDC Demo 1' },
    { id: 2, name: 'BDC Demo 2' },
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
            {block ? 'Chi tiết phân khu' : 'Thêm mới phân khu'}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-4">
          <FormField label="Dự án" required>
            <select
              value={formData.projectId}
              onChange={(e) => setFormData({ ...formData, projectId: Number(e.target.value) })}
              className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value={0} disabled>
                Chọn dự án
              </option>
              {projectOptions.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Tên phân khu" required>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nhập tên phân khu"
              className="h-10 rounded-[3px]"
            />
          </FormField>

          <FormField label="Mã phân khu" required>
            <Input
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="Nhập mã phân khu"
              className="h-10 rounded-[3px]"
            />
          </FormField>

          <FormField label="Trạng thái">
            <div className="flex items-center gap-3">
              <StatusToggle
                size="md"
                checked={formData.status}
                onChange={(v) => setFormData({ ...formData, status: v })}
              />
              <span className="text-sm text-gray-600">
                {formData.status ? 'Hoạt động' : 'Ngừng hoạt động'}
              </span>
            </div>
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
