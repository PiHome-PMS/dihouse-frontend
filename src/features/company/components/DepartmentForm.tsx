import { FilterSelect, FormField } from '@/components/common';
import { Input } from '@/components/ui';

interface DepartmentFormData {
  name: string;
  code: string;
  confirmer: string;
  head: string;
  address: string;
  email: string;
  phone: string;
  project: string;
  notes: string;
}

interface DepartmentFormProps {
  data?: Partial<DepartmentFormData>;
  onChange?: (field: keyof DepartmentFormData, value: string) => void;
  headOptions?: { value: string; label: string }[];
  projectOptions?: { value: string; label: string }[];
}

const defaultHeadOptions = [
  { value: '1', label: 'Phạm Hồng Thái' },
  { value: '2', label: 'Nguyễn Văn A' },
  { value: '3', label: 'Trần Thị B' },
];

const defaultProjectOptions = [
  { value: '1', label: 'S-TECH Tower' },
  { value: '2', label: 'Sunrise City' },
  { value: '3', label: 'Vinhomes Central Park' },
];

/**
 * Shared form fields for Department Insert/Detail pages
 */
export function DepartmentForm({
  data = {},
  onChange,
  headOptions = defaultHeadOptions,
  projectOptions = defaultProjectOptions,
}: DepartmentFormProps) {
  const handleChange =
    (field: keyof DepartmentFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      onChange?.(field, e.target.value);
    };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField label="Tên phòng ban, dự án" required>
        <Input
          value={data.name || ''}
          onChange={handleChange('name')}
          placeholder="Nhập tên phòng ban, dự án"
          className="h-10 rounded-[3px]"
        />
      </FormField>

      <FormField label="Mã phòng ban" required>
        <Input
          value={data.code || ''}
          onChange={handleChange('code')}
          placeholder="Nhập mã phòng ban"
          className="h-10 rounded-[3px]"
        />
      </FormField>

      <FormField label="Người xác nhận">
        <Input
          value={data.confirmer || ''}
          onChange={handleChange('confirmer')}
          placeholder="Nhập người xác nhận"
          className="h-10 rounded-[3px]"
        />
      </FormField>

      <FormField label="Trưởng bộ phận">
        <FilterSelect
          value={data.head || ''}
          onChange={(value) => onChange?.('head', value)}
          options={headOptions}
          placeholder="Chọn trưởng bộ phận"
          className="w-full h-10"
        />
      </FormField>

      <FormField label="Địa chỉ" required colSpan={2}>
        <Input
          value={data.address || ''}
          onChange={handleChange('address')}
          placeholder="Nhập địa chỉ"
          className="h-10 rounded-[3px]"
        />
      </FormField>

      <FormField label="Email">
        <Input
          type="email"
          value={data.email || ''}
          onChange={handleChange('email')}
          placeholder="Nhập email"
          className="h-10 rounded-[3px]"
        />
      </FormField>

      <FormField label="Số điện thoại">
        <Input
          value={data.phone || ''}
          onChange={handleChange('phone')}
          placeholder="Nhập số điện thoại"
          className="h-10 rounded-[3px]"
        />
      </FormField>

      <FormField label="Dự án">
        <FilterSelect
          value={data.project || ''}
          onChange={(value) => onChange?.('project', value)}
          options={projectOptions}
          placeholder="Chọn dự án"
          className="w-full h-10"
        />
      </FormField>

      <FormField label="Ghi chú" colSpan={2}>
        <textarea
          value={data.notes || ''}
          onChange={handleChange('notes')}
          placeholder="Nhập ghi chú..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-200 rounded-[3px] text-sm text-gray-600 outline-none focus:border-primary/50 transition-colors resize-none"
        />
      </FormField>
    </div>
  );
}
