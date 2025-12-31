interface CategoryRadioGroupProps {
  value: 'company' | 'project';
  onChange?: (value: 'company' | 'project') => void;
  name?: string;
}

/**
 * Radio group for company category (Công ty/Dự án)
 */
export function CategoryRadioGroup({
  value,
  onChange,
  name = 'category',
}: CategoryRadioGroupProps) {
  return (
    <div className="space-y-2">
      <span className="text-sm font-bold text-gray-700">
        Đơn vị quản lý <span className="text-red-500">*</span>
      </span>
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value="company"
            checked={value === 'company'}
            onChange={() => onChange?.('company')}
            className="h-4 w-4 text-primary"
          />
          <span className="text-sm text-gray-600">Công ty</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value="project"
            checked={value === 'project'}
            onChange={() => onChange?.('project')}
            className="h-4 w-4 text-primary"
          />
          <span className="text-sm text-gray-600">Dự án</span>
        </label>
      </div>
    </div>
  );
}
