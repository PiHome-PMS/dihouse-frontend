import { FormField, StatusToggle } from '@/components/common';
import { Input } from '@/components/ui';

interface PermissionGroupFormProps {
  data: {
    name: string;
    status: boolean;
  };
  onChange: <K extends 'name' | 'status'>(
    field: K,
    value: K extends 'name' ? string : boolean
  ) => void;
}

/**
 * Form fields for Permission Group (name + status)
 */
export function PermissionGroupForm({ data, onChange }: PermissionGroupFormProps) {
  return (
    <div className="space-y-6">
      <FormField label="Tên nhóm quyền" required>
        <Input
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Nhập tên nhóm quyền"
          className="h-10 rounded-[3px]"
        />
      </FormField>

      <FormField label="Trạng thái">
        <div className="flex items-center gap-3">
          <StatusToggle
            size="md"
            checked={data.status}
            onChange={(value) => onChange('status', value)}
          />
          <span className="text-sm text-gray-600">
            {data.status ? 'Hoạt động' : 'Ngừng hoạt động'}
          </span>
        </div>
      </FormField>
    </div>
  );
}
