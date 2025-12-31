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
import { ROUTES } from '@/config/constants';
import { Download, FileUp, History, Plus, RefreshCw, RotateCcw, Search, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { EmployeeModal } from '../components';
import type { Employee } from '../types/hr.types';

export function EmployeeListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>();
  const [modalOpen, setModalOpen] = useState(false);

  // Mock data
  const employees: Employee[] = [
    {
      id: 1,
      code: 'NV001',
      timekeepingCode: 'CC001',
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      email: 'nva@company.com',
      sectionName: 'Backend',
      departmentName: 'Phòng IT',
      positionName: 'Nhân viên',
      hasProfile: true,
      status: true,
      createdAt: '15/09/2025',
      updatedAt: '03/10/2025',
    },
    {
      id: 2,
      code: 'NV002',
      timekeepingCode: 'CC002',
      name: 'Trần Thị B',
      phone: '0907654321',
      email: 'ttb@company.com',
      sectionName: 'Tuyển dụng',
      departmentName: 'Phòng Nhân sự',
      positionName: 'Trưởng phòng',
      hasProfile: true,
      status: true,
      createdAt: '12/09/2025',
      updatedAt: '12/09/2025',
    },
    {
      id: 3,
      code: 'NV003',
      timekeepingCode: 'CC003',
      name: 'Lê Văn C',
      phone: '0909876543',
      email: 'lvc@company.com',
      sectionName: 'Kế toán tổng hợp',
      departmentName: 'Phòng Kế toán',
      positionName: 'Nhân viên',
      hasProfile: false,
      status: false,
      createdAt: '10/08/2025',
      updatedAt: '15/09/2025',
    },
  ];


  const columns: DataTableColumn<Employee>[] = [
    {
      key: 'code',
      header: 'Mã NV',
      render: (e) => <span className="text-xs font-semibold text-blue-500">{e.code}</span>,
    },
    {
      key: 'timekeepingCode',
      header: 'Mã chấm công',
      render: (e) => <span className="text-xs text-gray-600">{e.timekeepingCode}</span>,
    },
    {
      key: 'name',
      header: 'Tên nhân viên',
      render: (e) => <span className="text-xs font-bold text-gray-700">{e.name}</span>,
    },
    {
      key: 'phone',
      header: 'SĐT',
      render: (e) => <span className="text-xs text-gray-600">{e.phone}</span>,
    },
    {
      key: 'email',
      header: 'Email',
      render: (e) => <span className="text-xs text-gray-600">{e.email}</span>,
    },
    {
      key: 'sectionName',
      header: 'Bộ phận',
      render: (e) => <span className="text-xs text-gray-600">{e.sectionName}</span>,
    },
    {
      key: 'departmentName',
      header: 'Phòng ban',
      render: (e) => <span className="text-xs text-gray-600">{e.departmentName}</span>,
    },
    {
      key: 'positionName',
      header: 'Chức vụ',
      render: (e) => <span className="text-xs text-gray-600">{e.positionName}</span>,
    },
    {
      key: 'hasProfile',
      header: 'Hồ sơ',
      align: 'center',
      render: (e) => (
        <span className={e.hasProfile ? 'text-green-500' : 'text-gray-400'}>
          <User className="h-4 w-4" />
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Trạng thái',
      align: 'center',
      render: (e) => <StatusToggle checked={e.status} />,
    },
    {
      key: 'actions',
      header: 'Thao tác',
      align: 'center',
      render: (e) => (
        <div className="flex items-center justify-center gap-1">
          <ActionButtons
            onView={() => {
              navigate(ROUTES.HR.EMPLOYEE_DETAIL(e.id));
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => console.log('sync', e.id)}
          >
            <RefreshCw className="h-4 w-4 text-blue-500" />
          </Button>
        </div>
      ),
    },
  ];

  const departmentOptions = [
    { value: 'it', label: 'Phòng IT' },
    { value: 'hr', label: 'Phòng Nhân sự' },
    { value: 'accounting', label: 'Phòng Kế toán' },
  ];

  const sectionOptions = [
    { value: 'backend', label: 'Backend' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'tuyendung', label: 'Tuyển dụng' },
    { value: 'ketoan', label: 'Kế toán tổng hợp' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Đang làm việc' },
    { value: 'inactive', label: 'Nghỉ việc' },
  ];

  const handleResetFilters = () => {
    setSearch('');
    setDepartmentFilter('');
    setSectionFilter('');
    setStatusFilter('');
  };

  return (
    <div className="p-4 space-y-4">
      <PageHeader title="Danh sách nhân sự" breadcrumb={['Quản Lý Nhân Sự', 'Danh sách nhân sự']} />

      <Card className="p-4 border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[250px]">
            <SearchInput value={search} onChange={setSearch} placeholder="Tìm kiếm theo tên, mã" />
          </div>

          <FilterSelect
            value={departmentFilter}
            onChange={setDepartmentFilter}
            options={departmentOptions}
            placeholder="Phòng ban"
            className="w-40"
          />

          <FilterSelect
            value={sectionFilter}
            onChange={setSectionFilter}
            options={sectionOptions}
            placeholder="Bộ phận"
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
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              className="h-9 gap-2 px-4 text-sm font-semibold border-gray-200 text-gray-600 hover:bg-gray-50 rounded-[3px]"
            >
              <FileUp className="h-4 w-4" />
              Import
            </Button>
            <Button
              variant="outline"
              className="h-9 gap-2 px-4 text-sm font-semibold border-gray-200 text-gray-600 hover:bg-gray-50 rounded-[3px]"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button
              variant="outline"
              className="h-9 gap-2 px-4 text-sm font-semibold border-gray-200 text-gray-600 hover:bg-gray-50 rounded-[3px]"
            >
              <History className="h-4 w-4" />
              Lịch sử Import/Export
            </Button>
            <Button
              onClick={() => {
                setSelectedEmployee(undefined);
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
        <DataTable
          columns={columns}
          data={employees}
          keyExtractor={(e) => e.id}
          minWidth="1400px"
        />
        <Pagination currentPage={1} totalPages={1} totalRecords={employees.length} pageSize={20} />
      </Card>

      <EmployeeModal open={modalOpen} onOpenChange={setModalOpen} employee={selectedEmployee} />
    </div>
  );
}
