import {
  ActionButtons,
  DataTable,
  type DataTableColumn,
  DateTimeCell,
  FilterSelect,
  PageHeader,
  Pagination,
  SearchInput,
  StatusToggle,
} from '@/components/common';
import { Button, Card } from '@/components/ui';
import { ROUTES } from '@/config';
import { Plus, RotateCcw, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { PermissionGroup } from '../types/permission.types';

/**
 * Nhóm quyền (Permission Groups List)
 * Displays list of permission groups with filters
 */
export function PermissionGroupListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Mock data
  const permissionGroups: PermissionGroup[] = [
    {
      id: 1,
      groupId: 'GR001',
      name: 'Admin',
      createdAt: '15/09/2025 11:17:51',
      updatedAt: '03/10/2025 08:56:07',
      status: true,
    },
    {
      id: 2,
      groupId: 'GR002',
      name: 'Quản lý',
      createdAt: '12/09/2025 09:47:09',
      updatedAt: '12/09/2025 10:14:57',
      status: true,
    },
    {
      id: 3,
      groupId: 'GR003',
      name: 'Nhân viên',
      createdAt: '12/09/2025 09:44:28',
      updatedAt: '15/09/2025 13:57:02',
      status: true,
    },
    {
      id: 4,
      groupId: 'GR004',
      name: 'Bảo vệ',
      createdAt: '10/09/2025 08:30:00',
      updatedAt: '10/09/2025 08:30:00',
      status: false,
    },
    {
      id: 5,
      groupId: 'GR005',
      name: 'Lễ tân',
      createdAt: '08/09/2025 14:20:00',
      updatedAt: '08/09/2025 14:20:00',
      status: true,
    },
  ];

  const columns: DataTableColumn<PermissionGroup>[] = [
    {
      key: 'groupId',
      header: 'ID nhóm quyền',
      render: (group) => (
        <span className="text-xs font-semibold text-blue-500">{group.groupId}</span>
      ),
    },
    {
      key: 'name',
      header: 'Tên nhóm quyền',
      render: (group) => <span className="text-xs font-bold text-gray-700">{group.name}</span>,
    },
    {
      key: 'createdAt',
      header: 'Thời gian khởi tạo',
      render: (group) => <DateTimeCell datetime={group.createdAt} />,
    },
    {
      key: 'updatedAt',
      header: 'Thời gian cập nhật',
      render: (group) => <DateTimeCell datetime={group.updatedAt} />,
    },
    {
      key: 'status',
      header: 'Trạng Thái',
      align: 'center',
      render: (group) => <StatusToggle checked={group.status} />,
    },
    {
      key: 'actions',
      header: 'Thao tác',
      align: 'center',
      render: (group) => (
        <ActionButtons
          onView={() => navigate(ROUTES.PERMISSION.GROUP_DETAIL(group.id))}
          onDelete={() => console.log('delete', group.id)}
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
      <PageHeader title="Nhóm quyền" breadcrumb={['Quản Lý Quyền', 'Nhóm quyền']} />

      {/* Filter Bar */}
      <Card className="p-4 border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[250px]">
            <SearchInput value={search} onChange={setSearch} placeholder="Tìm kiếm theo tên" />
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
              onClick={() => navigate(ROUTES.PERMISSION.GROUP_INSERT)}
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
        <DataTable
          columns={columns}
          data={permissionGroups}
          keyExtractor={(group) => group.id}
          minWidth="900px"
        />

        {/* Pagination */}
        <Pagination
          currentPage={1}
          totalPages={1}
          totalRecords={permissionGroups.length}
          pageSize={20}
        />
      </Card>
    </div>
  );
}
