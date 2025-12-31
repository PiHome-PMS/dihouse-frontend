import {
  DataTable,
  type DataTableColumn,
  FilterSelect,
  PageHeader,
  Pagination,
  SearchInput,
} from '@/components/common';
import { Button, Card, Input } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Download, RotateCcw, Search } from 'lucide-react';
import { useState } from 'react';
import type { AttendanceRecord } from '../types/hr.types';

export function AttendanceManagementPage() {
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  // Mock data - monthly summary
  const records: (AttendanceRecord & { workDays: number; lateDays: number })[] = [
    {
      id: 1,
      employeeCode: 'NV001',
      employeeName: 'Nguyễn Văn A',
      date: '12/2025',
      checkIn: '',
      checkOut: '',
      totalHours: 180,
      status: 'present',
      workDays: 22,
      lateDays: 1,
    },
    {
      id: 2,
      employeeCode: 'NV002',
      employeeName: 'Trần Thị B',
      date: '12/2025',
      checkIn: '',
      checkOut: '',
      totalHours: 168,
      status: 'late',
      workDays: 21,
      lateDays: 3,
    },
  ];

  const columns: DataTableColumn<(typeof records)[0]>[] = [
    {
      key: 'employeeCode',
      header: 'Mã NV',
      render: (r) => <span className="text-xs font-semibold text-blue-500">{r.employeeCode}</span>,
    },
    {
      key: 'employeeName',
      header: 'Tên nhân viên',
      render: (r) => <span className="text-xs font-bold text-gray-700">{r.employeeName}</span>,
    },
    {
      key: 'workDays',
      header: 'Ngày công',
      render: (r) => <span className="text-xs text-gray-600">{r.workDays} ngày</span>,
    },
    {
      key: 'lateDays',
      header: 'Đi muộn',
      render: (r) => (
        <span className={cn('text-xs', r.lateDays > 0 ? 'text-orange-500' : 'text-gray-600')}>
          {r.lateDays} lần
        </span>
      ),
    },
    {
      key: 'totalHours',
      header: 'Tổng giờ',
      render: (r) => <span className="text-xs text-gray-600">{r.totalHours}h</span>,
    },
    {
      key: 'actions',
      header: 'Thao tác',
      align: 'center',
      render: (r) => (
        <Button variant="ghost" size="sm" onClick={() => console.log('view detail', r.id)}>
          Chi tiết
        </Button>
      ),
    },
  ];

  const departmentOptions = [
    { value: 'it', label: 'Phòng IT' },
    { value: 'hr', label: 'Phòng Nhân sự' },
    { value: 'accounting', label: 'Phòng Kế toán' },
  ];

  const handleResetFilters = () => {
    setSearch('');
    setMonth('');
    setDepartmentFilter('');
  };

  return (
    <div className="p-4 space-y-4">
      <PageHeader title="Quản lý chấm công" breadcrumb={['Quản Lý Nhân Sự', 'Quản lý chấm công']} />

      <Card className="p-4 border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <SearchInput value={search} onChange={setSearch} placeholder="Tìm kiếm theo tên, mã" />
          </div>

          <Input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="h-9 w-40 rounded-[3px]"
          />

          <FilterSelect
            value={departmentFilter}
            onChange={setDepartmentFilter}
            options={departmentOptions}
            placeholder="Phòng ban"
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
              variant="outline"
              className="h-9 gap-2 px-4 text-sm font-semibold border-gray-200 text-gray-600 hover:bg-gray-50 rounded-[3px]"
            >
              <Download className="h-4 w-4" />
              Xuất báo cáo
            </Button>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <DataTable columns={columns} data={records} keyExtractor={(r) => r.id} minWidth="800px" />
        <Pagination currentPage={1} totalPages={1} totalRecords={records.length} pageSize={20} />
      </Card>
    </div>
  );
}
