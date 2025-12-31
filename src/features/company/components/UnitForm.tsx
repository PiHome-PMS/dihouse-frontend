import { FilterSelect, FormField, MultiSelect, StatusToggle } from '@/components/common';
import { Input } from '@/components/ui';

interface UnitFormData {
  name: string;
  code: string;
  department: string;
  head: string;
  projects: string[];
  email: string;
  phone: string;
  manageWarehouse: boolean;
  notes: string;
  status: boolean;
}

interface UnitFormProps {
  data?: Partial<UnitFormData>;
  onChange?: <K extends keyof UnitFormData>(field: K, value: UnitFormData[K]) => void;
  departmentOptions?: { value: string; label: string }[];
  headOptions?: { value: string; label: string }[];
  projectOptions?: { id: string; name: string }[];
  showStatus?: boolean;
}

const defaultDepartmentOptions = [
  { value: '1', label: 'BUIDING CARE - BDC' },
  { value: '2', label: 'Ban quản lý S-TECH' },
];

const defaultHeadOptions = [
  { value: '1', label: 'Vũ Quang Vinh' },
  { value: '2', label: 'Phạm Hồng Thái' },
  { value: '3', label: 'Nguyễn Văn A' },
];

const defaultProjectOptions = [
  { id: '1', name: 'BUIDING CARE - BDC' },
  { id: '2', name: 'S-TECH Tower' },
  { id: '3', name: 'Sunrise City' },
  { id: '4', name: 'Vinhomes Central Park' },
];

/**
 * Shared form fields for Unit Insert/Detail pages
 */
export function UnitForm({
  data = {},
  onChange,
  departmentOptions = defaultDepartmentOptions,
  headOptions = defaultHeadOptions,
  projectOptions = defaultProjectOptions,
  showStatus = false,
}: UnitFormProps) {
  const handleChange =
    (field: keyof UnitFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      onChange?.(field, e.target.value as UnitFormData[typeof field]);
    };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField label="Tên bộ phận" required>
        <Input
          value={data.name || ''}
          onChange={handleChange('name')}
          placeholder="Nhập tên bộ phận"
          className="h-10 rounded-[3px]"
        />
      </FormField>

      <FormField label="Mã bộ phận" required>
        <Input
          value={data.code || ''}
          onChange={handleChange('code')}
          placeholder="Nhập mã bộ phận"
          className="h-10 rounded-[3px]"
        />
      </FormField>

      <FormField label="Phòng ban" required>
        <FilterSelect
          value={data.department || ''}
          onChange={(value) => onChange?.('department', value)}
          options={departmentOptions}
          placeholder="Chọn phòng ban"
          className="w-full h-10"
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

      <FormField label="Dự án">
        <MultiSelect
          options={projectOptions}
          value={data.projects || []}
          onChange={(value) => onChange?.('projects', value)}
          placeholder="Chọn dự án..."
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

      <FormField label="Quản lý kho">
        <div className="flex items-center">
          <StatusToggle
            size="md"
            checked={data.manageWarehouse || false}
            onChange={(value) => onChange?.('manageWarehouse', value)}
          />
        </div>
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

      {showStatus && (
        <FormField label="Trạng thái">
          <div className="flex items-center gap-3">
            <StatusToggle
              size="md"
              checked={data.status ?? true}
              onChange={(value) => onChange?.('status', value)}
            />
            <span className="text-sm text-gray-600">
              {data.status ? 'Hoạt động' : 'Ngừng hoạt động'}
            </span>
          </div>
        </FormField>
      )}
    </div>
  );
}
