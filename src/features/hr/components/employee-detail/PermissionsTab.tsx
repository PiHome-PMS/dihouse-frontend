import { FormField } from '@/components/common';
import { Card } from '@/components/ui';
import { X } from 'lucide-react';
import { useState } from 'react';

const ROLE_OPTIONS = [
  { id: 'cskh', label: 'Chăm sóc khách hàng' },
  { id: 'nsql', label: 'NS Quan ly' },
  { id: 'qlns', label: 'Quản lý nhân sự' },
  { id: 'base_mipec', label: 'Quyền nhóm Base - Mipec' },
  { id: 'root_stech', label: 'Quyền root công ty Công ty S-TECH DEMO' },
  { id: 'admin', label: 'Nhóm Admin' },
  { id: 'ketoan', label: 'Kế toán' },
];

const PROJECT_OPTIONS = [
  { id: 'prj_a', label: 'Dự án A' },
  { id: 'prj_b', label: 'Dự án B' },
  { id: 'prj_c', label: 'Dự án C' },
  { id: 'mipec', label: 'Mipec Riverside' },
  { id: 'stech', label: 'S-TECH Building' },
  { id: 'central', label: 'Central Park' },
];

interface MultiSelectProps {
  label: string;
  options: { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  placeholder: string;
}

function MultiSelectDropdown({
  label,
  options,
  selected,
  onToggle,
  onRemove,
  placeholder,
}: MultiSelectProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FormField label={label}>
      <div className="relative">
        {/* Selected tags */}
        <button
          type="button"
          className="min-h-[42px] w-full border border-gray-200 rounded-[3px] p-2 flex flex-wrap gap-2 cursor-pointer bg-white text-left"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected.map((id) => {
            const opt = options.find((o) => o.id === id);
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {opt?.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(id);
                  }}
                  className="hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })}
          {selected.length === 0 && <span className="text-gray-400 text-sm">{placeholder}</span>}
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-[3px] shadow-lg">
            {/* Search input */}
            <div className="p-2 border-b">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="w-full h-9 px-3 pr-8 border border-blue-400 rounded text-sm focus:outline-none focus:border-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Options list */}
            <div className="max-h-[200px] overflow-y-auto">
              {filteredOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer ${
                    selected.includes(opt.id) ? 'bg-blue-50' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(opt.id)}
                    onChange={() => onToggle(opt.id)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Click outside to close */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
            role="presentation"
          />
        )}
      </div>
    </FormField>
  );
}

export function PermissionsTab() {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['admin', 'nsql']);
  const [selectedProjects, setSelectedProjects] = useState<string[]>(['prj_a']);

  const toggleRole = (id: string) => {
    if (selectedRoles.includes(id)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== id));
    } else {
      setSelectedRoles([...selectedRoles, id]);
    }
  };

  const toggleProject = (id: string) => {
    if (selectedProjects.includes(id)) {
      setSelectedProjects(selectedProjects.filter((p) => p !== id));
    } else {
      setSelectedProjects([...selectedProjects, id]);
    }
  };

  return (
    <Card className="p-4 border-none shadow-sm rounded-[3px]">
      <h3 className="text-sm font-bold text-gray-700 border-b pb-2 mb-4">Phân quyền</h3>

      <div className="grid grid-cols-2 gap-6">
        <MultiSelectDropdown
          label="Nhóm quyền"
          options={ROLE_OPTIONS}
          selected={selectedRoles}
          onToggle={toggleRole}
          onRemove={(id) => setSelectedRoles(selectedRoles.filter((r) => r !== id))}
          placeholder="Chọn nhóm quyền..."
        />

        <MultiSelectDropdown
          label="Dự án phụ trách"
          options={PROJECT_OPTIONS}
          selected={selectedProjects}
          onToggle={toggleProject}
          onRemove={(id) => setSelectedProjects(selectedProjects.filter((p) => p !== id))}
          placeholder="Chọn dự án..."
        />
      </div>
    </Card>
  );
}
