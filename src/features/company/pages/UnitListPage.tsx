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
import { Download, Plus, RotateCcw, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface Unit {
  id: number;
  parent: string;
  name: string;
  code: string;
  hotline: string;
  email: string;
  head: string;
  created: string;
  updated: string;
  status: boolean;
}

/**
 * Danh sách bộ phận (Unit List)
 * High-fidelity clone of BDC Unit List page
 */
export function UnitListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const units: Unit[] = [
    {
      id: 1,
      parent: 'Ban quản lý S-TECH',
      name: 'Bộ phận 2',
      code: 'BP2',
      hotline: '',
      email: '',
      head: 'Phạm Hồng Thái',
      created: '30/12/2025 10:06:20',
      updated: '30/12/2025 10:06:20',
      status: true,
    },
    {
      id: 2,
      parent: 'Ban quản lý S-TECH',
      name: 'Bảo vệ Test 12',
      code: 'BVT12',
      hotline: '01234567898',
      email: 'abc123@hotmail.com',
      head: 'Trưởng nhóm FLC',
      created: '21/11/2025 15:49:30',
      updated: '21/11/2025 15:51:37',
      status: true,
    },
    {
      id: 3,
      parent: 'Ban quản lý S-TECH',
      name: 'Bộ phận thu nợ',
      code: 'BPTN',
      hotline: '0660111111',
      email: 'hot-mail@gmail.com',
      head: 'Triệu Nhật Dương',
      created: '19/11/2025 10:15:49',
      updated: '19/11/2025 10:23:41',
      status: true,
    },
    {
      id: 4,
      parent: 'BUIDING CARE - BDC',
      name: 'Kho',
      code: 'KHO',
      hotline: '',
      email: '',
      head: 'Nhân sự test',
      created: '15/09/2025 11:17:51',
      updated: '03/10/2025 08:56:07',
      status: true,
    },
    {
      id: 5,
      parent: 'BUIDING CARE - BDC',
      name: 'Lễ Tân',
      code: 'LT - BDC',
      hotline: '',
      email: 'vinhvqhe182301@fpt.edu.vn',
      head: '',
      created: '12/09/2025 09:47:09',
      updated: '12/09/2025 10:14:57',
      status: true,
    },
    {
      id: 6,
      parent: 'BUIDING CARE - BDC',
      name: 'Bảo vệ',
      code: 'BV - BDC',
      hotline: '',
      email: '',
      head: 'Vũ Quang Vinh',
      created: '12/09/2025 09:44:28',
      updated: '15/09/2025 13:57:02',
      status: false,
    },
    {
      id: 7,
      parent: 'BUIDING CARE - BDC',
      name: 'ADMIN - BDC',
      code: 'ADMIN - BDC',
      hotline: '0969785355',
      email: 'vunoname248712@gmail.com',
      head: 'Vũ Quang Vinh',
      created: '12/09/2025 09:26:00',
      updated: '12/09/2025 10:14:00',
      status: false,
    },
    {
      id: 8,
      parent: 'Ban quản lý S-TECH',
      name: 'Lao Công',
      code: 'LC',
      hotline: '',
      email: '',
      head: 'Quản Lý Test',
      created: '05/11/2025 09:22:02',
      updated: '05/11/2025 09:22:02',
      status: true,
    },
    {
      id: 9,
      parent: 'Ban quản lý S-TECH',
      name: 'Soát vé',
      code: 'SV',
      hotline: '',
      email: '',
      head: 'Quản Lý Test',
      created: '19/09/2025 09:02:07',
      updated: '05/11/2025 09:21:29',
      status: true,
    },
    {
      id: 10,
      parent: 'Ban quản lý S-TECH',
      name: 'Security',
      code: 'Bv',
      hotline: '',
      email: '',
      head: 'Quản Lý Test',
      created: '19/09/2025 08:59:57',
      updated: '19/09/2025 08:59:57',
      status: true,
    },
  ];

  const columns: DataTableColumn<Unit>[] = [
    {
      key: 'parent',
      header: 'Tên phòng ban / dự án',
      render: (unit) => <span className="text-xs font-semibold text-blue-500">{unit.parent}</span>,
    },
    {
      key: 'name',
      header: 'Tên bộ phận',
      render: (unit) => <span className="text-xs font-bold text-gray-700">{unit.name}</span>,
    },
    {
      key: 'code',
      header: 'Mã bộ phận',
      render: (unit) => <span className="text-xs font-semibold text-gray-600">{unit.code}</span>,
    },
    {
      key: 'hotline',
      header: 'Hotline',
      render: (unit) => (
        <span className="text-xs font-semibold text-gray-600">{unit.hotline || '-'}</span>
      ),
    },
    {
      key: 'email',
      header: 'Email liên hệ',
      render: (unit) => (
        <span className="text-xs font-semibold text-gray-600">{unit.email || '-'}</span>
      ),
    },
    {
      key: 'head',
      header: 'Trưởng bộ phận',
      render: (unit) => <span className="text-xs font-bold text-gray-700">{unit.head || '-'}</span>,
    },
    {
      key: 'created',
      header: 'Thời gian tạo',
      render: (unit) => <DateTimeCell datetime={unit.created} />,
    },
    {
      key: 'updated',
      header: 'Thời gian cập nhật',
      render: (unit) => <DateTimeCell datetime={unit.updated} />,
    },
    {
      key: 'status',
      header: 'Trạng Thái',
      align: 'center',
      render: (unit) => <StatusToggle checked={unit.status} />,
    },
    {
      key: 'actions',
      header: 'Thao tác',
      align: 'center',
      render: (unit) => (
        <ActionButtons
          onView={() => navigate(ROUTES.COMPANY.UNIT_DETAIL(unit.id))}
          onDelete={() => console.log('delete', unit.id)}
        />
      ),
    },
  ];

  const departmentOptions = [
    { value: '1', label: 'Ban quản lý S-TECH' },
    { value: '2', label: 'BUIDING CARE - BDC' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Hoạt động' },
    { value: 'inactive', label: 'Ngừng hoạt động' },
  ];

  const handleResetFilters = () => {
    setSearch('');
    setDepartmentFilter('');
    setStatusFilter('');
  };

  return (
    <div className="p-4 space-y-4">
      {/* Page Header */}
      <PageHeader title="Danh sách bộ phận" breadcrumb={['Quản Lý Công Ty', 'Danh sách bộ phận']} />

      {/* Filter Bar */}
      <Card className="p-4 border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[250px]">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Tìm kiếm theo tên, mã bộ phận"
            />
          </div>

          <FilterSelect
            value={departmentFilter}
            onChange={setDepartmentFilter}
            options={departmentOptions}
            placeholder="Phòng ban"
            className="w-48"
          />

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

          <div className="flex items-center gap-2 ml-auto">
            <Button
              onClick={() => navigate(ROUTES.COMPANY.UNIT_INSERT)}
              className="h-9 gap-2 px-4 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-[3px]"
            >
              <Plus className="h-4 w-4" />
              Thêm mới
            </Button>
            <Button
              variant="outline"
              className="h-9 gap-2 px-4 text-sm font-semibold border-green-500 text-green-600 hover:bg-green-50 rounded-[3px]"
            >
              <Download className="h-4 w-4" />
              Xuất file
            </Button>
          </div>
        </div>
      </Card>

      {/* Data Table */}
      <Card className="overflow-hidden border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <DataTable
          columns={columns}
          data={units}
          keyExtractor={(unit) => unit.id}
          minWidth="1200px"
        />

        {/* Pagination */}
        <Pagination currentPage={1} totalPages={2} totalRecords={31} pageSize={20} />
      </Card>
    </div>
  );
}
