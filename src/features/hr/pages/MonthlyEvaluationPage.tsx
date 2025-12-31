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
import type { MonthlyEvaluation } from '../types/hr.types';

export function MonthlyEvaluationPage() {
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  // Mock data
  const evaluations: MonthlyEvaluation[] = [
    {
      id: 1,
      employeeCode: 'NV001',
      employeeName: 'Nguyễn Văn A',
      departmentName: 'Phòng IT',
      month: '12',
      year: 2025,
      workDays: 22,
      absentDays: 0,
      lateDays: 1,
      score: 95,
      rating: 'A',
    },
    {
      id: 2,
      employeeCode: 'NV002',
      employeeName: 'Trần Thị B',
      departmentName: 'Phòng Nhân sự',
      month: '12',
      year: 2025,
      workDays: 21,
      absentDays: 1,
      lateDays: 2,
      score: 82,
      rating: 'B',
    },
    {
      id: 3,
      employeeCode: 'NV003',
      employeeName: 'Lê Văn C',
      departmentName: 'Phòng Kế toán',
      month: '12',
      year: 2025,
      workDays: 18,
      absentDays: 4,
      lateDays: 5,
      score: 65,
      rating: 'C',
    },
  ];

  const getRatingBadge = (rating: MonthlyEvaluation['rating']) => {
    const styles = {
      A: 'bg-green-100 text-green-700',
      B: 'bg-blue-100 text-blue-700',
      C: 'bg-yellow-100 text-yellow-700',
      D: 'bg-red-100 text-red-700',
    };
    return (
      <span className={cn('px-3 py-1 rounded-md text-xs font-bold', styles[rating])}>{rating}</span>
    );
  };

  const columns: DataTableColumn<MonthlyEvaluation>[] = [
    {
      key: 'employeeCode',
      header: 'Mã NV',
      render: (e) => <span className="text-xs font-semibold text-blue-500">{e.employeeCode}</span>,
    },
    {
      key: 'employeeName',
      header: 'Tên nhân viên',
      render: (e) => <span className="text-xs font-bold text-gray-700">{e.employeeName}</span>,
    },
    {
      key: 'departmentName',
      header: 'Phòng ban',
      render: (e) => <span className="text-xs text-gray-600">{e.departmentName}</span>,
    },
    {
      key: 'workDays',
      header: 'Ngày công',
      render: (e) => <span className="text-xs text-gray-600">{e.workDays}</span>,
    },
    {
      key: 'absentDays',
      header: 'Vắng mặt',
      render: (e) => (
        <span className={cn('text-xs', e.absentDays > 0 ? 'text-red-500' : 'text-gray-600')}>
          {e.absentDays}
        </span>
      ),
    },
    {
      key: 'lateDays',
      header: 'Đi muộn',
      render: (e) => (
        <span className={cn('text-xs', e.lateDays > 0 ? 'text-orange-500' : 'text-gray-600')}>
          {e.lateDays}
        </span>
      ),
    },
    {
      key: 'score',
      header: 'Điểm',
      render: (e) => <span className="text-xs font-semibold text-gray-700">{e.score}</span>,
    },
    {
      key: 'rating',
      header: 'Xếp loại',
      align: 'center',
      render: (e) => getRatingBadge(e.rating),
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
      <PageHeader
        title="Đánh giá nhân sự tháng"
        breadcrumb={['Quản Lý Nhân Sự', 'Đánh giá nhân sự tháng']}
      />

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
        <DataTable
          columns={columns}
          data={evaluations}
          keyExtractor={(e) => e.id}
          minWidth="1000px"
        />
        <Pagination
          currentPage={1}
          totalPages={1}
          totalRecords={evaluations.length}
          pageSize={20}
        />
      </Card>
    </div>
  );
}
