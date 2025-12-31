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
import { cn } from '@/lib/utils';
import { Plus, RotateCcw, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface Department {
  id: number;
  category: string;
  name: string;
  code: string;
  address: string;
  hotline: string;
  email: string;
  head: string;
  created: string;
  updated: string;
  status: boolean;
}

/**
 * Danh sách phòng ban (Department List)
 * High-fidelity clone of BDC Department List page
 */
export function DepartmentListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const departments: Department[] = [
    {
      id: 1,
      category: 'Phòng ban',
      name: 'Ban quản lý S-TECH',
      code: 'BQLS',
      address: '123 Nguyễn Văn Linh, Q7',
      hotline: '0912345678',
      email: 'contact@stech.vn',
      head: 'Phạm Hồng Thái',
      created: '30/12/2025 10:06:20',
      updated: '30/12/2025 10:06:20',
      status: true,
    },
    {
      id: 2,
      category: 'Phòng ban',
      name: 'Bảo vệ Test 12',
      code: 'BVT12',
      address: '456 Lê Văn Việt, Q9',
      hotline: '01234567898',
      email: 'abc123@hotmail.com',
      head: 'Trưởng nhóm FLC',
      created: '21/11/2025 15:49:30',
      updated: '21/11/2025 15:51:37',
      status: true,
    },
    {
      id: 3,
      category: 'Dự án',
      name: 'Bộ phận thu nợ',
      code: 'BPTN',
      address: '789 Điện Biên Phủ, Q3',
      hotline: '0660111111',
      email: 'hot-mail@gmail.com',
      head: 'Triệu Nhật Dương',
      created: '19/11/2025 10:15:49',
      updated: '19/11/2025 10:23:41',
      status: true,
    },
    {
      id: 4,
      category: 'Phòng ban',
      name: 'Lao Công',
      code: 'LC',
      address: '',
      hotline: '',
      email: '',
      head: 'Quản Lý Test',
      created: '05/11/2025 09:22:02',
      updated: '05/11/2025 09:22:02',
      status: true,
    },
    {
      id: 5,
      category: 'Dự án',
      name: 'Soát vé',
      code: 'SV',
      address: '',
      hotline: '',
      email: '',
      head: 'Quản Lý Test',
      created: '19/09/2025 09:02:07',
      updated: '05/11/2025 09:21:29',
      status: true,
    },
    {
      id: 6,
      category: 'Phòng ban',
      name: 'Security',
      code: 'Bv',
      address: '',
      hotline: '',
      email: '',
      head: 'Quản Lý Test',
      created: '19/09/2025 08:59:57',
      updated: '19/09/2025 08:59:57',
      status: true,
    },
    {
      id: 7,
      category: 'Phòng ban',
      name: 'Tạp vụ',
      code: 'Tv',
      address: '',
      hotline: '',
      email: '',
      head: 'Quản Lý Test',
      created: '19/09/2025 08:59:17',
      updated: '19/09/2025 08:59:17',
      status: true,
    },
    {
      id: 8,
      category: 'Dự án',
      name: 'Bộ Phận VNG',
      code: 'DV123',
      address: '',
      hotline: '',
      email: '',
      head: 'Quản Lý Test',
      created: '23/09/2024 09:01:24',
      updated: '23/09/2024 09:01:24',
      status: true,
    },
    {
      id: 9,
      category: 'Phòng ban',
      name: 'Kế toán',
      code: 'KT',
      address: '',
      hotline: '',
      email: '',
      head: 'Nguyễn Trang Anh',
      created: '18/06/2024 10:59:25',
      updated: '13/09/2024 14:32:18',
      status: true,
    },
    {
      id: 10,
      category: 'Phòng ban',
      name: 'Kỹ thuật',
      code: 'KTV',
      address: '',
      hotline: '',
      email: '',
      head: 'Triệu Nhật Dương',
      created: '18/06/2024 09:56:59',
      updated: '02/07/2024 09:46:08',
      status: true,
    },
    {
      id: 11,
      category: 'Dự án',
      name: 'Quản lý',
      code: 'QL',
      address: '',
      hotline: '',
      email: '',
      head: 'Nguyễn Tuấn Phát',
      created: '18/06/2024 09:56:31',
      updated: '18/06/2024 17:12:59',
      status: true,
    },
  ];

  const columns: DataTableColumn<Department>[] = [
    {
      key: 'category',
      header: 'Phân loại',
      render: (dept) => (
        <span
          className={cn(
            'px-2 py-0.5 rounded text-[10px] font-bold',
            dept.category === 'Phòng ban'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-green-100 text-green-600'
          )}
        >
          {dept.category}
        </span>
      ),
    },
    {
      key: 'name',
      header: 'Tên phòng ban',
      render: (dept) => <span className="text-xs font-bold text-gray-700">{dept.name}</span>,
    },
    {
      key: 'code',
      header: 'Mã phòng ban',
      render: (dept) => <span className="text-xs font-semibold text-gray-600">{dept.code}</span>,
    },
    {
      key: 'address',
      header: 'Địa chỉ',
      render: (dept) => (
        <span className="text-xs font-semibold text-gray-600">{dept.address || '-'}</span>
      ),
    },
    {
      key: 'hotline',
      header: 'Hotline',
      render: (dept) => (
        <span className="text-xs font-semibold text-gray-600">{dept.hotline || '-'}</span>
      ),
    },
    {
      key: 'email',
      header: 'Email liên hệ',
      render: (dept) => (
        <span className="text-xs font-semibold text-gray-600">{dept.email || '-'}</span>
      ),
    },
    {
      key: 'head',
      header: 'Trưởng bộ phận dự án',
      render: (dept) => <span className="text-xs font-bold text-gray-700">{dept.head}</span>,
    },
    {
      key: 'created',
      header: 'Thời gian tạo',
      render: (dept) => <DateTimeCell datetime={dept.created} />,
    },
    {
      key: 'updated',
      header: 'Thời gian cập nhật',
      render: (dept) => <DateTimeCell datetime={dept.updated} />,
    },
    {
      key: 'status',
      header: 'Trạng Thái',
      align: 'center',
      render: (dept) => <StatusToggle checked={dept.status} />,
    },
    {
      key: 'actions',
      header: 'Thao tác',
      align: 'center',
      render: (dept) => (
        <ActionButtons
          onView={() => navigate(ROUTES.COMPANY.DEPARTMENT_DETAIL(dept.id))}
          onDelete={() => console.log('delete', dept.id)}
        />
      ),
    },
  ];

  const categoryOptions = [
    { value: 'department', label: 'Phòng ban' },
    { value: 'project', label: 'Dự án' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Hoạt động' },
    { value: 'inactive', label: 'Ngừng hoạt động' },
  ];

  const handleResetFilters = () => {
    setSearch('');
    setCategoryFilter('');
    setStatusFilter('');
  };

  return (
    <div className="p-4 space-y-4">
      {/* Page Header */}
      <PageHeader
        title="Danh sách phòng ban"
        breadcrumb={['Thông tin dự án', 'Danh sách phòng ban']}
      />

      {/* Filter Bar */}
      <Card className="p-4 border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[250px]">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Tìm kiếm theo tên, mã phòng ban"
            />
          </div>

          <FilterSelect
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={categoryOptions}
            placeholder="Phân loại"
            className="w-40"
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
            <Button
              onClick={() => navigate(ROUTES.COMPANY.DEPARTMENT_INSERT)}
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
          data={departments}
          keyExtractor={(dept) => dept.id}
          minWidth="1400px"
        />

        {/* Pagination */}
        <Pagination
          currentPage={1}
          totalPages={1}
          totalRecords={departments.length}
          pageSize={20}
        />
      </Card>
    </div>
  );
}
