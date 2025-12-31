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
import { X } from 'lucide-react';
import { useState } from 'react';
import type { TimekeepingDevice } from '../types/hr.types';

interface DeviceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  device?: TimekeepingDevice;
  onSave?: (data: Partial<TimekeepingDevice>) => void;
}

export function DeviceModal({ open, onOpenChange, device, onSave }: DeviceModalProps) {
  const [formData, setFormData] = useState({
    name: device?.name || '',
    code: device?.code || '',
    ip: '',
    port: '',
    type: device?.type || '',
    deviceType: '',
    departmentId: '',
    brand: '',
  });

  const timekeepingTypes = [
    { value: 'fingerprint', label: 'Vân tay' },
    { value: 'face', label: 'Khuôn mặt' },
    { value: 'card', label: 'Thẻ từ' },
  ];

  const departmentOptions = [
    { value: '1', label: 'Phòng IT' },
    { value: '2', label: 'Phòng Nhân sự' },
    { value: '3', label: 'Phòng Bảo vệ' },
  ];

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[900px] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-4 pb-0 border-b border-gray-100">
          <DialogTitle className="text-lg font-bold text-gray-800">
            {device ? 'Chi tiết thiết bị chấm công' : 'Thêm mới thiết bị chấm công'}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Tên thiết bị" required>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nhập tên thiết bị (*)"
                className="h-10 rounded-[3px]"
              />
            </FormField>

            <FormField label="Mã thiết bị" required>
              <Input
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="Nhập mã thiết bị (*)"
                className="h-10 rounded-[3px]"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="IP thiết bị" required>
              <Input
                value={formData.ip}
                onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
                placeholder="Nhập ip thiết bị (*)"
                className="h-10 rounded-[3px]"
              />
            </FormField>

            <FormField label="Cổng thiết bị" required>
              <Input
                value={formData.port}
                onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                placeholder="Nhập cổng thiết bị (*)"
                className="h-10 rounded-[3px]"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Kiểu chấm công" required>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
              >
                <option value="">Chọn kiểu chấm công (*)</option>
                {timekeepingTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Kiểu thiết bị">
              <Input
                value={formData.deviceType}
                onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                placeholder="Nhập kiểu thiết bị"
                className="h-10 rounded-[3px]"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Phòng ban">
              <select
                value={formData.departmentId}
                onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
              >
                <option value="">Chọn phòng ban</option>
                {departmentOptions.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Tên hãng">
              <Input
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="Nhập tên hãng"
                className="h-10 rounded-[3px]"
              />
            </FormField>
          </div>
        </div>

        <DialogFooter className="gap-2 p-4 pt-0 border-t border-gray-100">
          <Button
            variant="destructive"
            onClick={() => onOpenChange(false)}
            className="h-9 px-6 text-sm font-semibold rounded-[3px]"
          >
            <X className="h-4 w-4 mr-1" />
            Huỷ
          </Button>
          <Button
            onClick={handleSave}
            className="h-9 px-6 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-[3px]"
          >
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
