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
import { ShiftModal } from '../components';
import type { Shift, ShiftTimeConfig } from '../types/hr.types';

interface ShiftWithEmployees extends Shift {
  employees: string[];
}

export function ShiftListPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedShift, setSelectedShift] = useState<Shift | undefined>();
  const [modalOpen, setModalOpen] = useState(false);

  // Mock data with full time config
  const shifts: ShiftWithEmployees[] = [
    {
      id: 1,
      code: 't21',
      name: 'ca trưa',
      employeeCount: 0,
      employees: [],
      status: true,
      timeConfig: [
        { day: 'Thứ 2', startTime: '', endTime: '', totalHours: 0, workPoints: 1 },
        { day: 'Thứ 3', startTime: '', endTime: '', totalHours: 8, workPoints: 1 },
        { day: 'Thứ 4', startTime: '', endTime: '', totalHours: 0, workPoints: 1 },
        { day: 'Thứ 5', startTime: '', endTime: '', totalHours: 8, workPoints: 1 },
        { day: 'Thứ 6', startTime: '', endTime: '', totalHours: 0, workPoints: 1 },
        { day: 'Thứ 7', startTime: '', endTime: '', totalHours: 8, workPoints: 1 },
        { day: 'Chủ nhật', startTime: '', endTime: '', totalHours: 0, workPoints: 1 },
      ],
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 2,
      code: 'CLH0',
      name: 'Ca Linh Hoạt Điểm',
      employeeCount: 0,
      employees: [],
      status: true,
      timeConfig: [
        {
          day: 'Thứ 2',
          startTime: 'undefined',
          endTime: 'undefined',
          totalHours: 12,
          workPoints: 1,
        },
        {
          day: 'Thứ 3',
          startTime: 'undefined',
          endTime: 'undefined',
          totalHours: 12,
          workPoints: 1,
        },
        {
          day: 'Thứ 4',
          startTime: 'undefined',
          endTime: 'undefined',
          totalHours: 12,
          workPoints: 1,
        },
        {
          day: 'Thứ 5',
          startTime: 'undefined',
          endTime: 'undefined',
          totalHours: 12,
          workPoints: 1,
        },
        {
          day: 'Thứ 6',
          startTime: 'undefined',
          endTime: 'undefined',
          totalHours: 12,
          workPoints: 1,
        },
        {
          day: 'Thứ 7',
          startTime: 'undefined',
          endTime: 'undefined',
          totalHours: 12,
          workPoints: 1,
        },
        {
          day: 'Chủ nhật',
          startTime: 'undefined',
          endTime: 'undefined',
          totalHours: 12,
          workPoints: 1,
        },
      ],
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 3,
      code: 'CLH',
      name: 'Ca Linh Hoạt',
      employeeCount: 2,
      employees: ['Nhân sự Demo chấm công', 'Việt Khanh'],
      status: true,
      timeConfig: [
        {
          day: 'Thứ 2',
          startTime: 'undefined',
          endTime: 'undefined',
          totalHours: 12,
          workPoints: 1,
        },
        {
          day: 'Thứ 3',
          startTime: 'undefined',
          endTime: 'undefined',
          totalHours: 12,
          workPoints: 1,
        },
        {
          day: 'Thứ 4',
          startTime: 'undefined',
          endTime: 'undefined',
          totalHours: 12,
          workPoints: 1,
        },
        {
          day: 'Thứ 5',
          startTime: 'undefined',
          endTime: 'undefined',
          totalHours: 12,
          workPoints: 1,
        },
        {
          day: 'Thứ 6',
          startTime: 'undefined',
          endTime: 'undefined',
          totalHours: 12,
          workPoints: 1,
        },
        {
          day: 'Thứ 7',
          startTime: 'undefined',
          endTime: 'undefined',
          totalHours: 12,
          workPoints: 1,
        },
        {
          day: 'Chủ nhật',
          startTime: 'undefined',
          endTime: 'undefined',
          totalHours: 12,
          workPoints: 1,
        },
      ],
      createdAt: '',
      updatedAt: '',
    },
  ];

  // Render nested time config table
  const renderTimeConfig = (timeConfig: ShiftTimeConfig[]) => (
    <table className="w-full text-xs border-collapse">
      <thead>
        <tr className="bg-gray-50">
          <th className="p-2 text-left font-semibold text-gray-500 border-b">Ngày</th>
          <th className="p-2 text-left font-semibold text-gray-500 border-b">Thời gian làm việc</th>
          <th className="p-2 text-left font-semibold text-gray-500 border-b">Thời gian nghỉ</th>
          <th className="p-2 text-center font-semibold text-gray-500 border-b">
            Tổng thời gian (giờ)
          </th>
          <th className="p-2 text-center font-semibold text-gray-500 border-b">Tổng công tính</th>
        </tr>
      </thead>
      <tbody>
        {timeConfig.map((tc, i) => (
          <tr key={i} className="border-b border-gray-100">
            <td className="p-2 text-gray-600">{tc.day}</td>
            <td className="p-2 text-gray-600">
              {tc.startTime && tc.endTime ? `${tc.startTime} - ${tc.endTime}` : '-'}
            </td>
            <td className="p-2 text-gray-600">-</td>
            <td className="p-2 text-center text-blue-500">{tc.totalHours || 0}</td>
            <td className="p-2 text-center text-blue-500">{tc.workPoints}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const columns: DataTableColumn<ShiftWithEmployees>[] = [
    {
      key: 'code',
      header: 'Mã ca',
      render: (s) => <span className="text-xs font-semibold text-blue-500">{s.code}</span>,
    },
    {
      key: 'name',
      header: 'Tên ca',
      render: (s) => <span className="text-xs font-bold text-gray-700">{s.name}</span>,
    },
    {
      key: 'employees',
      header: 'Nhân sự đang áp dụng',
      render: (s) => (
        <div className="flex flex-wrap gap-1">
          {s.employees.length > 0 ? (
            s.employees.map((emp, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md border border-gray-200"
              >
                {emp}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-400">-</span>
          )}
        </div>
      ),
    },
    {
      key: 'timeConfig',
      header: 'Cấu hình thời gian',
      render: (s) => <div className="min-w-[350px]">{renderTimeConfig(s.timeConfig)}</div>,
    },
    {
      key: 'status',
      header: 'Trạng Thái',
      align: 'center',
      render: (s) => <StatusToggle checked={s.status} />,
    },
    {
      key: 'actions',
      header: 'Thao tác',
      align: 'center',
      render: (s) => (
        <ActionButtons
          onView={() => {
            setSelectedShift(s);
            setModalOpen(true);
          }}
          onDelete={() => console.log('delete', s.id)}
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
      <PageHeader
        title="Quản lý ca làm việc"
        breadcrumb={['Quản Lý Nhân Sự', 'Quản lý ca làm việc']}
      />

      <Card className="p-4 border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[250px]">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Tìm kiếm theo tên, mã ca"
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
                setSelectedShift(undefined);
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
        <DataTable columns={columns} data={shifts} keyExtractor={(s) => s.id} minWidth="1200px" />
        <Pagination currentPage={1} totalPages={1} totalRecords={shifts.length} pageSize={20} />
      </Card>

      <ShiftModal open={modalOpen} onOpenChange={setModalOpen} shift={selectedShift} />
    </div>
  );
}
