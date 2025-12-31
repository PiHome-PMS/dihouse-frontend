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
import type { Shift } from '../types/hr.types';

interface ShiftModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shift?: Shift;
  onSave?: (data: Partial<Shift>) => void;
}

interface DayConfig {
  day: string;
  workPoints: string;
  workHours: string;
}

const ALL_DAYS = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

export function ShiftModal({ open, onOpenChange, shift, onSave }: ShiftModalProps) {
  const [formData, setFormData] = useState({
    name: shift?.name || '',
    code: shift?.code || '',
    startDate: '',
    shiftType: '',
  });

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [dayConfigs, setDayConfigs] = useState<DayConfig[]>([]);

  const shiftTypeOptions = [
    { value: 'fixed', label: 'Ca cố định' },
    { value: 'flexible', label: 'Ca linh hoạt' },
    { value: 'rotating', label: 'Ca luân phiên' },
  ];

  const handleDayToggle = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
      setDayConfigs(dayConfigs.filter((dc) => dc.day !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
      setDayConfigs([...dayConfigs, { day, workPoints: '', workHours: '' }]);
    }
  };

  const handleRemoveDay = (day: string) => {
    setSelectedDays(selectedDays.filter((d) => d !== day));
    setDayConfigs(dayConfigs.filter((dc) => dc.day !== day));
  };

  const handleDayConfigChange = (day: string, field: 'workPoints' | 'workHours', value: string) => {
    setDayConfigs(dayConfigs.map((dc) => (dc.day === day ? { ...dc, [field]: value } : dc)));
  };

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
            {shift ? 'Chi tiết ca làm việc' : 'Thêm mới ca làm việc'}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Tên ca làm việc" required>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nhập tên ca làm việc (*)"
                className="h-10 rounded-[3px]"
              />
            </FormField>

            <FormField label="Thời gian bắt đầu áp dụng" required>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                placeholder="Chọn thời gian bắt đầu áp dụng (*)"
                className="h-10 rounded-[3px]"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Mã ca làm việc" required>
              <Input
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="Nhập mã ca làm việc (*)"
                className="h-10 rounded-[3px]"
              />
            </FormField>

            <FormField label="Loại ca" required>
              <select
                value={formData.shiftType}
                onChange={(e) => setFormData({ ...formData, shiftType: e.target.value })}
                className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
              >
                <option value="">Chọn loại ca (*)</option>
                {shiftTypeOptions.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Ngày làm việc trong tuần" required>
              <div className="relative">
                <div className="min-h-10 p-2 border border-gray-200 rounded-[3px] bg-white flex flex-wrap gap-1 items-center">
                  {selectedDays.length > 0 ? (
                    selectedDays.map((day) => (
                      <span
                        key={day}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md border border-gray-200"
                      >
                        {day}
                        <button
                          type="button"
                          onClick={() => handleRemoveDay(day)}
                          className="hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">Chọn ngày làm việc trong tuần (*)</span>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {ALL_DAYS.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`px-2 py-1 text-xs rounded-md border ${
                        selectedDays.includes(day)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </FormField>

            <FormField label="Tổng số ngày làm việc trong tuần" required>
              <Input
                type="number"
                value={selectedDays.length}
                readOnly
                className="h-10 rounded-[3px] bg-gray-50"
              />
            </FormField>
          </div>

          {/* Day config table */}
          <div className="border border-gray-200 rounded-[3px]">
            <table className="w-full text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left font-semibold text-gray-500">Ngày trong tuần</th>
                  <th className="p-3 text-center font-semibold text-gray-500">Tổng công tính</th>
                  <th className="p-3 text-center font-semibold text-gray-500">Tổng giờ làm việc</th>
                </tr>
              </thead>
              <tbody>
                {dayConfigs.length > 0 ? (
                  dayConfigs.map((dc) => (
                    <tr key={dc.day} className="border-t border-gray-100">
                      <td className="p-3 font-semibold text-gray-700">{dc.day}</td>
                      <td className="p-3">
                        <Input
                          value={dc.workPoints}
                          onChange={(e) =>
                            handleDayConfigChange(dc.day, 'workPoints', e.target.value)
                          }
                          placeholder="Tổng công tính (*)"
                          className="h-9 text-xs"
                        />
                      </td>
                      <td className="p-3">
                        <Input
                          value={dc.workHours}
                          onChange={(e) =>
                            handleDayConfigChange(dc.day, 'workHours', e.target.value)
                          }
                          placeholder=""
                          className="h-9 text-xs"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-3 text-center text-gray-400 italic">
                      Vui lòng chọn ngày làm việc
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <DialogFooter className="gap-2 p-4 pt-0 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-9 px-6 text-sm font-semibold rounded-[3px]"
          >
            Trở về
          </Button>
          <Button
            onClick={handleSave}
            className="h-9 px-6 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-[3px]"
          >
            {shift ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
