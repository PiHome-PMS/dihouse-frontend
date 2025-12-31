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
import { RotateCcw, Search } from 'lucide-react';
import { useState } from 'react';
import type { AttendanceRecord } from '../types/hr.types';

export function AttendanceHistoryPage() {
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Mock data
  const records: AttendanceRecord[] = [
    {
      id: 1,
      employeeCode: 'NV001',
      employeeName: 'Nguyễn Văn A',
      date: '30/12/2025',
      checkIn: '08:05',
      checkOut: '17:30',
      totalHours: 8.5,
      status: 'present',
    },
    {
      id: 2,
      employeeCode: 'NV002',
      employeeName: 'Trần Thị B',
      date: '30/12/2025',
      checkIn: '08:45',
      checkOut: '17:00',
      totalHours: 7.5,
      status: 'late',
    },
    {
      id: 3,
      employeeCode: 'NV003',
      employeeName: 'Lê Văn C',
      date: '30/12/2025',
      checkIn: '-',
      checkOut: '-',
      totalHours: 0,
      status: 'absent',
    },
  ];

  const getStatusBadge = (status: AttendanceRecord['status']) => {
    const styles = {
      present: 'bg-green-100 text-green-700',
      late: 'bg-yellow-100 text-yellow-700',
      early: 'bg-orange-100 text-orange-700',
      absent: 'bg-red-100 text-red-700',
    };
    const labels = { present: 'Có mặt', late: 'Đi muộn', early: 'Về sớm', absent: 'Vắng mặt' };
    return (
      <span className={cn('px-2 py-1 rounded-md text-xs font-medium', styles[status])}>
        {labels[status]}
      </span>
    );
  };

  const columns: DataTableColumn<AttendanceRecord>[] = [
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
      key: 'date',
      header: 'Ngày',
      render: (r) => <span className="text-xs text-gray-600">{r.date}</span>,
    },
    {
      key: 'checkIn',
      header: 'Giờ vào',
      render: (r) => <span className="text-xs text-gray-600">{r.checkIn}</span>,
    },
    {
      key: 'checkOut',
      header: 'Giờ ra',
      render: (r) => <span className="text-xs text-gray-600">{r.checkOut}</span>,
    },
    {
      key: 'totalHours',
      header: 'Tổng giờ',
      render: (r) => <span className="text-xs text-gray-600">{r.totalHours}h</span>,
    },
    {
      key: 'status',
      header: 'Trạng thái',
      align: 'center',
      render: (r) => getStatusBadge(r.status),
    },
  ];

  const statusOptions = [
    { value: 'present', label: 'Có mặt' },
    { value: 'late', label: 'Đi muộn' },
    { value: 'absent', label: 'Vắng mặt' },
  ];

  const handleResetFilters = () => {
    setSearch('');
    setDateFrom('');
    setDateTo('');
    setStatusFilter('');
  };

  return (
    <div className="p-4 space-y-4">
      <PageHeader title="Lịch sử chấm công" breadcrumb={['Quản Lý Nhân Sự', 'Lịch sử chấm công']} />

      <Card className="p-4 border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <SearchInput value={search} onChange={setSearch} placeholder="Tìm kiếm theo tên, mã" />
          </div>

          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="h-9 w-40 rounded-[3px]"
            />
            <span className="text-gray-500">-</span>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="h-9 w-40 rounded-[3px]"
            />
          </div>

          <FilterSelect
            value={statusFilter}
            onChange={setStatusFilter}
            options={statusOptions}
            placeholder="Trạng thái"
            className="w-36"
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
        </div>
      </Card>

      <Card className="overflow-hidden border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <DataTable columns={columns} data={records} keyExtractor={(r) => r.id} minWidth="900px" />
        <Pagination currentPage={1} totalPages={1} totalRecords={records.length} pageSize={20} />
      </Card>
    </div>
  );
}
