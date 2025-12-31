import {
  ActionButtons,
  DataTable,
  type DataTableColumn,
  FilterSelect,
  PageHeader,
  Pagination,
  SearchInput,
} from '@/components/common';
import { Button, Card } from '@/components/ui';
import { Plus, RotateCcw, Search } from 'lucide-react';
import { useState } from 'react';
import { TimekeepingConfigModal } from '../components';
import type { TimekeepingConfig } from '../types/hr.types';

export function TimekeepingConfigPage() {
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('');
  const [selectedConfig, setSelectedConfig] = useState<TimekeepingConfig | undefined>();
  const [modalOpen, setModalOpen] = useState(false);

  // Mock data
  const configs: TimekeepingConfig[] = [
    {
      id: 1,
      name: 'Cấu hình mặc định',
      deviceName: 'Máy chấm công tầng 1',
      departmentName: 'Phòng IT',
      employeeName: 'Tất cả',
      createdAt: '15/09/2025',
      updatedAt: '03/10/2025',
    },
    {
      id: 2,
      name: 'Cấu hình ca đêm',
      deviceName: 'Máy chấm công cổng',
      departmentName: 'Phòng Bảo vệ',
      employeeName: 'Nguyễn Văn A',
      createdAt: '12/09/2025',
      updatedAt: '12/09/2025',
    },
  ];

  const columns: DataTableColumn<TimekeepingConfig>[] = [
    {
      key: 'name',
      header: 'Tên cấu hình',
      render: (c) => <span className="text-xs font-bold text-gray-700">{c.name}</span>,
    },
    {
      key: 'deviceName',
      header: 'Thiết bị chấm công',
      render: (c) => <span className="text-xs text-gray-600">{c.deviceName}</span>,
    },
    {
      key: 'departmentName',
      header: 'Phòng ban',
      render: (c) => <span className="text-xs text-gray-600">{c.departmentName}</span>,
    },
    {
      key: 'employeeName',
      header: 'Nhân viên',
      render: (c) => <span className="text-xs text-gray-600">{c.employeeName}</span>,
    },
    {
      key: 'actions',
      header: 'Thao tác',
      align: 'center',
      render: (c) => (
        <ActionButtons
          onView={() => {
            setSelectedConfig(c);
            setModalOpen(true);
          }}
          onDelete={() => console.log('delete', c.id)}
        />
      ),
    },
  ];

  const departmentOptions = [
    { value: 'it', label: 'Phòng IT' },
    { value: 'security', label: 'Phòng Bảo vệ' },
    { value: 'hr', label: 'Phòng Nhân sự' },
  ];

  const employeeOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: 'nva', label: 'Nguyễn Văn A' },
    { value: 'ttb', label: 'Trần Thị B' },
  ];

  const handleResetFilters = () => {
    setSearch('');
    setDepartmentFilter('');
    setEmployeeFilter('');
  };

  return (
    <div className="p-4 space-y-4">
      <PageHeader
        title="Cấu hình chấm công"
        breadcrumb={['Quản Lý Nhân Sự', 'Cấu hình chấm công']}
      />

      <Card className="p-4 border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[250px]">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Tìm kiếm theo tên cấu hình"
            />
          </div>

          <FilterSelect
            value={departmentFilter}
            onChange={setDepartmentFilter}
            options={departmentOptions}
            placeholder="Phòng ban"
            className="w-40"
          />

          <FilterSelect
            value={employeeFilter}
            onChange={setEmployeeFilter}
            options={employeeOptions}
            placeholder="Nhân viên"
            className="w-40"
          />

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="h-9 gap-2 px-4 text-sm font-semibold border-gray-200 text-gray-600 hover:bg-gray-50 rounded-[3px]"
            >
              <RotateCcw className="h-4 w-4" />
              Làm mới bộ lọc
            </Button>
            <Button className="h-9 gap-2 px-4 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-[3px]">
              <Search className="h-4 w-4" />
              Tìm kiếm
            </Button>
          </div>

          <div className="ml-auto">
            <Button
              onClick={() => {
                setSelectedConfig(undefined);
                setModalOpen(true);
              }}
              className="h-9 gap-2 px-4 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-[3px]"
            >
              <Plus className="h-4 w-4" />
              Thêm mới
            </Button>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <DataTable columns={columns} data={configs} keyExtractor={(c) => c.id} minWidth="800px" />
        <Pagination currentPage={1} totalPages={1} totalRecords={configs.length} pageSize={20} />
      </Card>

      <TimekeepingConfigModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        config={selectedConfig}
      />
    </div>
  );
}
