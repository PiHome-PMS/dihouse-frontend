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
import type { Employee } from '../types/hr.types';

interface EmployeeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee;
  onSave?: (data: Partial<Employee>) => void;
}

export function EmployeeModal({ open, onOpenChange, employee, onSave }: EmployeeModalProps) {
  const [formData, setFormData] = useState({
    code: employee?.code || '',
    timekeepingCode: employee?.timekeepingCode || '',
    name: employee?.name || '',
    phone: employee?.phone || '',
    email: employee?.email || '',
    sectionName: employee?.sectionName || '',
    departmentName: employee?.departmentName || '',
    positionName: employee?.positionName || '',
    status: employee?.status ?? true,
  });

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-800">
            {employee ? 'Chi tiết nhân sự' : 'Thêm mới nhân sự'}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Mã nhân viên" required>
              <Input
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="Nhập mã nhân viên"
                className="h-10 rounded-[3px]"
              />
            </FormField>
            <FormField label="Mã chấm công">
              <Input
                value={formData.timekeepingCode}
                onChange={(e) => setFormData({ ...formData, timekeepingCode: e.target.value })}
                placeholder="Nhập mã chấm công"
                className="h-10 rounded-[3px]"
              />
            </FormField>
          </div>

          <FormField label="Họ và tên" required>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nhập họ và tên"
              className="h-10 rounded-[3px]"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Số điện thoại">
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Nhập số điện thoại"
                className="h-10 rounded-[3px]"
              />
            </FormField>
            <FormField label="Email">
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Nhập email"
                className="h-10 rounded-[3px]"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormField label="Phòng ban">
              <select
                value={formData.departmentName}
                onChange={(e) => setFormData({ ...formData, departmentName: e.target.value })}
                className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
              >
                <option value="">Chọn phòng ban</option>
                <option value="Phòng IT">Phòng IT</option>
                <option value="Phòng Nhân sự">Phòng Nhân sự</option>
                <option value="Phòng Kế toán">Phòng Kế toán</option>
              </select>
            </FormField>
            <FormField label="Bộ phận">
              <select
                value={formData.sectionName}
                onChange={(e) => setFormData({ ...formData, sectionName: e.target.value })}
                className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
              >
                <option value="">Chọn bộ phận</option>
                <option value="Backend">Backend</option>
                <option value="Frontend">Frontend</option>
              </select>
            </FormField>
            <FormField label="Chức vụ">
              <select
                value={formData.positionName}
                onChange={(e) => setFormData({ ...formData, positionName: e.target.value })}
                className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
              >
                <option value="">Chọn chức vụ</option>
                <option value="Nhân viên">Nhân viên</option>
                <option value="Trưởng phòng">Trưởng phòng</option>
                <option value="Giám đốc">Giám đốc</option>
              </select>
            </FormField>
          </div>

          <FormField label="Trạng thái">
            <div className="flex items-center gap-3">
              <StatusToggle
                size="md"
                checked={formData.status}
                onChange={(v) => setFormData({ ...formData, status: v })}
              />
              <span className="text-sm text-gray-600">
                {formData.status ? 'Đang làm việc' : 'Nghỉ việc'}
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
