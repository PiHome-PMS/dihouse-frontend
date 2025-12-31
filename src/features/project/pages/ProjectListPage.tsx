import {
  ActionButtons,
  DataTable,
  type DataTableColumn,
  FilterSelect,
  PageHeader,
  Pagination,
  SearchInput,
  StatusToggle,
} from '@/components/common';
import { Button, Card } from '@/components/ui';
import { Plus, RotateCcw, Search } from 'lucide-react';
import { useState } from 'react';
import { ProjectDetailModal } from '../components';
import type { Project } from '../types/project.types';

/**
 * Project List Page (Danh sách dự án)
 */
export function ProjectListPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const [modalOpen, setModalOpen] = useState(false);

  // Mock data
  const projects: Project[] = [
    {
      id: 1,
      projectId: 'PRJ001',
      name: 'BDC Demo 1',
      code: 'BDC001',
      address: '123 Nguyễn Văn Linh, Q.7, TP.HCM',
      phone: '0283123456',
      email: 'bdc1@demo.com',
      description: 'Dự án thử nghiệm 1',
      manager: 'Nguyễn Văn A',
      area: 5000,
      status: true,
      createdAt: '15/09/2025 11:17:51',
      updatedAt: '03/10/2025 08:56:07',
    },
    {
      id: 2,
      projectId: 'PRJ002',
      name: 'BDC Demo 2',
      code: 'BDC002',
      address: '456 Lê Văn Việt, Q.9, TP.HCM',
      phone: '0283654321',
      email: 'bdc2@demo.com',
      description: 'Dự án thử nghiệm 2',
      manager: 'Trần Thị B',
      area: 8000,
      status: true,
      createdAt: '12/09/2025 09:47:09',
      updatedAt: '12/09/2025 10:14:57',
    },
    {
      id: 3,
      projectId: 'PRJ003',
      name: 'Sunrise City',
      code: 'SRC001',
      address: '789 Nguyễn Hữu Thọ, Q.7, TP.HCM',
      phone: '0283789012',
      email: 'sunrise@demo.com',
      description: 'Khu căn hộ cao cấp',
      manager: 'Lê Văn C',
      area: 12000,
      status: false,
      createdAt: '10/08/2025 14:30:00',
      updatedAt: '15/09/2025 16:45:00',
    },
  ];

  const columns: DataTableColumn<Project>[] = [
    {
      key: 'name',
      header: 'Tên dự án',
      render: (p) => <span className="text-xs font-bold text-gray-700">{p.name}</span>,
    },
    {
      key: 'code',
      header: 'Mã dự án',
      render: (p) => <span className="text-xs font-semibold text-blue-500">{p.code}</span>,
    },
    {
      key: 'address',
      header: 'Địa chỉ',
      render: (p) => (
        <span className="text-xs text-gray-600 line-clamp-2 max-w-[200px]">{p.address}</span>
      ),
    },
    {
      key: 'phone',
      header: 'Số điện thoại',
      render: (p) => <span className="text-xs text-gray-600">{p.phone}</span>,
    },
    {
      key: 'description',
      header: 'Mô tả',
      render: (p) => (
        <span className="text-xs text-gray-600 line-clamp-2 max-w-[150px]">{p.description}</span>
      ),
    },
    {
      key: 'manager',
      header: 'Trưởng ban quản lý',
      render: (p) => <span className="text-xs font-semibold text-gray-700">{p.manager}</span>,
    },
    {
      key: 'status',
      header: 'Trạng Thái',
      align: 'center',
      render: (p) => <StatusToggle checked={p.status} />,
    },
    {
      key: 'actions',
      header: 'Thao tác',
      align: 'center',
      render: (p) => (
        <ActionButtons
          onView={() => {
            setSelectedProject(p);
            setModalOpen(true);
          }}
        />
      ),
    },
  ];

  const statusOptions = [
    { value: 'active', label: 'Hoạt động' },
    { value: 'inactive', label: 'Ngừng hoạt động' },
  ];

  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('');
  };

  return (
    <div className="p-4 space-y-4">
      {/* Page Header */}
      <PageHeader title="Danh sách dự án" breadcrumb={['Quản Lý Dự Án', 'Danh sách dự án']} />

      {/* Filter Bar */}
      <Card className="p-4 border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[250px]">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Tìm kiếm theo tên/SĐT/email"
            />
          </div>

          <FilterSelect
            value={statusFilter}
            onChange={setStatusFilter}
            options={statusOptions}
            placeholder="Trạng thái"
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
                setSelectedProject(undefined);
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

      {/* Data Table */}
      <Card className="overflow-hidden border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <DataTable columns={columns} data={projects} keyExtractor={(p) => p.id} minWidth="1200px" />
        <Pagination currentPage={1} totalPages={1} totalRecords={projects.length} pageSize={20} />
      </Card>

      {/* Detail Modal */}
      <ProjectDetailModal open={modalOpen} onOpenChange={setModalOpen} project={selectedProject} />
    </div>
  );
}
