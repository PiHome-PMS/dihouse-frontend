import { DataTable, type DataTableColumn, FormField } from '@/components/common';
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
import type { TimekeepingConfig } from '../types/hr.types';

interface TimekeepingConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config?: TimekeepingConfig;
  onSave?: (data: Partial<TimekeepingConfig>) => void;
}

interface SelectedEmployee {
  id: number;
  name: string;
  code: string;
}

export function TimekeepingConfigModal({
  open,
  onOpenChange,
  config,
  onSave,
}: TimekeepingConfigModalProps) {
  const [formData, setFormData] = useState({
    name: config?.name || '',
    deviceId: '',
    departmentId: '',
    employeeId: '',
  });

  const [selectedEmployees, _setSelectedEmployees] = useState<SelectedEmployee[]>([]);

  // Mock options
  const deviceOptions = [
    { value: '1', label: 'Máy chấm công tầng 1' },
    { value: '2', label: 'Máy chấm công tầng 2' },
    { value: '3', label: 'Máy chấm công cổng' },
  ];

  const departmentOptions = [
    { value: '1', label: 'Phòng IT' },
    { value: '2', label: 'Phòng Nhân sự' },
    { value: '3', label: 'Phòng Bảo vệ' },
  ];

  const employeeOptions = [
    { value: '1', label: 'Nguyễn Văn A' },
    { value: '2', label: 'Trần Thị B' },
    { value: '3', label: 'Lê Văn C' },
  ];

  const columns: DataTableColumn<SelectedEmployee>[] = [
    {
      key: 'id',
      header: 'ID',
      render: (e) => <span className="text-xs text-gray-600">{e.id}</span>,
    },
    {
      key: 'name',
      header: 'Họ và Tên',
      render: (e) => <span className="text-xs font-semibold text-gray-700">{e.name}</span>,
    },
    {
      key: 'code',
      header: 'Mã nhân viên',
      render: (e) => <span className="text-xs text-gray-600">{e.code}</span>,
    },
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
            {config ? 'Chi tiết cấu hình chấm công' : 'Cấu hình chấm công'}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Tên cấu hình" required>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nhập tên cấu hình (*)"
                className="h-10 rounded-[3px]"
              />
            </FormField>

            <FormField label="Chọn thiết bị chấm công" required>
              <select
                value={formData.deviceId}
                onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
                className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
              >
                <option value="">Chọn chọn thiết bị chấm công (*)</option>
                {deviceOptions.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Chọn phòng ban" required>
              <select
                value={formData.departmentId}
                onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
              >
                <option value="">Chọn chọn phòng ban (*)</option>
                {departmentOptions.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Chọn nhân viên" required>
              <select
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
              >
                <option value="">Chọn chọn nhân viên (*)</option>
                {employeeOptions.map((e) => (
                  <option key={e.value} value={e.value}>
                    {e.label}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          {/* Selected Employees Table */}
          <div className="border border-gray-200 rounded-[3px]">
            <DataTable
              columns={columns}
              data={selectedEmployees}
              keyExtractor={(e) => e.id}
              minWidth="400px"
              emptyMessage="Không tìm thấy dữ liệu"
            />
            <div className="text-center text-xs text-gray-500 py-2 border-t border-gray-100">
              Tổng số: {selectedEmployees.length} bản ghi
            </div>
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
