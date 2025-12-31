import {
  DataTable,
  type DataTableColumn,
  FilterSelect,
  PageHeader,
  Pagination,
} from '@/components/common';
import { Button, Card, Input } from '@/components/ui';
import { Calendar, Download, History, RotateCcw, Search } from 'lucide-react';
import { useState } from 'react';

interface AttendanceLog {
  id: number;
  fullName: string;
  employeeCode: string;
  department: string;
  date: string;
  time: string;
  device: string;
}

export function AttendanceHistoryPage() {
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState('');

  // Mock data matching BDC
  const records: AttendanceLog[] = [
    {
      id: 1,
      fullName: 'Huyền Thương',
      employeeCode: 'HPU02',
      department: '',
      date: '25/10/2025',
      time: '08:57:56',
      device: '',
    },
    {
      id: 2,
      fullName: 'Nhân sự Demo chấm công',
      employeeCode: '',
      department: 'Nhân sự Demo chấm công',
      date: '25/08/2025',
      time: '11:53:25',
      device: '',
    },
    {
      id: 3,
      fullName: 'Nhân sự Demo chấm công',
      employeeCode: '',
      department: 'Nhân sự Demo chấm công',
      date: '25/08/2025',
      time: '11:51:22',
      device: '',
    },
    {
      id: 4,
      fullName: 'Nhân sự Demo chấm công',
      employeeCode: '',
      department: 'Nhân sự Demo chấm công',
      date: '23/08/2025',
      time: '11:30:35',
      device: 'Thiết bị chấm vân tay',
    },
    {
      id: 5,
      fullName: 'Nhân sự Demo chấm công',
      employeeCode: '',
      department: 'Nhân sự Demo chấm công',
      date: '23/08/2025',
      time: '22:27:40',
      device: 'Thiết bị chấm vân tay',
    },
    {
      id: 6,
      fullName: 'Nhân sự Demo chấm công',
      employeeCode: '',
      department: 'Nhân sự Demo chấm công',
      date: '23/08/2025',
      time: '12:35:13',
      device: 'Thiết bị chấm vân tay',
    },
    {
      id: 7,
      fullName: 'Nhân sự Demo chấm công',
      employeeCode: '',
      department: 'Nhân sự Demo chấm công',
      date: '23/08/2025',
      time: '08:44:37',
      device: 'Thiết bị chấm vân tay',
    },
    {
      id: 8,
      fullName: 'Nhân sự Demo chấm công',
      employeeCode: '',
      department: 'Nhân sự Demo chấm công',
      date: '22/08/2025',
      time: '17:25:36',
      device: 'Thiết bị chấm vân tay',
    },
    {
      id: 9,
      fullName: 'Nhân sự Demo chấm công',
      employeeCode: '',
      department: 'Nhân sự Demo chấm công',
      date: '22/08/2025',
      time: '08:53:34',
      device: 'Thiết bị chấm vân tay',
    },
    {
      id: 10,
      fullName: 'Nhân sự Demo chấm công',
      employeeCode: '',
      department: 'Nhân sự Demo chấm công',
      date: '21/08/2025',
      time: '17:30:42',
      device: '',
    },
    {
      id: 11,
      fullName: 'Khách hàng Test VP',
      employeeCode: '',
      department: 'Khách hàng Test VP',
      date: '21/08/2025',
      time: '08:30:23',
      device: '',
    },
    {
      id: 12,
      fullName: 'Đoàn Đắc Hậu',
      employeeCode: 'HPU08',
      department: '',
      date: '21/08/2025',
      time: '08:35:31',
      device: '',
    },
    {
      id: 13,
      fullName: 'Nhân sự Demo chấm công',
      employeeCode: '',
      department: 'Nhân sự Demo chấm công',
      date: '21/08/2025',
      time: '08:30:48',
      device: '',
    },
    {
      id: 14,
      fullName: 'Khách hàng Admin Test',
      employeeCode: '',
      department: 'Khách hàng Admin Test',
      date: '21/08/2025',
      time: '08:28:32',
      device: '',
    },
    {
      id: 15,
      fullName: 'Triều Thực',
      employeeCode: 'TTT1',
      department: '',
      date: '21/08/2025',
      time: '08:26:31',
      device: '',
    },
  ];

  const columns: DataTableColumn<AttendanceLog>[] = [
    {
      key: 'fullName',
      header: 'Họ và Tên',
      render: (r) => <span className="text-xs font-medium text-gray-700">{r.fullName}</span>,
    },
    {
      key: 'employeeCode',
      header: 'Mã NV',
      render: (r) => <span className="text-xs text-blue-500 font-medium">{r.employeeCode}</span>,
    },
    {
      key: 'department',
      header: 'Phòng ban',
      render: (r) => <span className="text-xs text-gray-600">{r.department}</span>,
    },
    {
      key: 'date',
      header: 'Ngày',
      render: (r) => <span className="text-xs text-gray-600">{r.date}</span>,
    },
    {
      key: 'time',
      header: 'Giờ',
      render: (r) => <span className="text-xs text-gray-600">{r.time}</span>,
    },
    {
      key: 'device',
      header: 'Thiết bị chấm công',
      render: (r) => <span className="text-xs text-gray-600">{r.device}</span>,
    },
  ];

  const departmentOptions = [
    { value: 'nhansu', label: 'Nhân sự Demo chấm công' },
    { value: 'khachhang', label: 'Khách hàng Test VP' },
    { value: 'admin', label: 'Khách hàng Admin Test' },
  ];

  const divisionOptions = [
    { value: 'bp1', label: 'Bộ phận 1' },
    { value: 'bp2', label: 'Bộ phận 2' },
  ];

  const employeeOptions = [
    { value: 'all', label: 'Tất cả nhân viên' },
    { value: 'hpu02', label: 'Huyền Thương' },
    { value: 'ttt1', label: 'Triều Thực' },
  ];

  const statusOptions = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'in', label: 'Chấm vào' },
    { value: 'out', label: 'Chấm ra' },
  ];

  const handleResetFilters = () => {
    setDepartmentFilter('');
    setDivisionFilter('');
    setEmployeeFilter('');
    setStatusFilter('');
    setDateRange('');
  };

  return (
    <div className="p-4 space-y-4">
      <PageHeader title="Lịch sử chấm công" breadcrumb={['Quản Lý Nhân Sự', 'Lịch sử chấm công']} />

      <Card className="p-4 border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white space-y-4">
        {/* Row 1: 4 dropdown filters */}
        <div className="grid grid-cols-4 gap-4">
          <FilterSelect
            value={departmentFilter}
            onChange={setDepartmentFilter}
            options={departmentOptions}
            placeholder="Phòng ban"
          />
          <FilterSelect
            value={divisionFilter}
            onChange={setDivisionFilter}
            options={divisionOptions}
            placeholder="Bộ phận"
          />
          <FilterSelect
            value={employeeFilter}
            onChange={setEmployeeFilter}
            options={employeeOptions}
            placeholder="Nhân viên"
          />
          <FilterSelect
            value={statusFilter}
            onChange={setStatusFilter}
            options={statusOptions}
            placeholder="Trạng thái"
          />
        </div>

        {/* Row 2: Date range and action buttons */}
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Input
              type="text"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              placeholder="Chọn khoảng thời gian"
              className="h-10 rounded-[3px] pr-10"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="h-9 gap-2 px-4 text-sm font-medium border-gray-200 text-gray-600 hover:bg-gray-50 rounded-[3px]"
            >
              <RotateCcw className="h-4 w-4" />
              Làm mới bộ lọc
            </Button>
            <Button className="h-9 gap-2 px-4 text-sm font-medium bg-primary hover:bg-primary/90 text-white rounded-[3px]">
              <Search className="h-4 w-4" />
              Tìm kiếm
            </Button>
          </div>
        </div>

        {/* Row 3: Export buttons */}
        <div className="flex items-center gap-2">
          <Button className="h-9 gap-2 px-4 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-[3px]">
            <Download className="h-4 w-4" />
            Export lịch sử chấm công
          </Button>
          <Button className="h-9 gap-2 px-4 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-[3px]">
            <History className="h-4 w-4" />
            Lịch sử export lịch sử chấm công
          </Button>
        </div>
      </Card>

      <Card className="overflow-hidden border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <DataTable columns={columns} data={records} keyExtractor={(r) => r.id} minWidth="900px" />
        <Pagination currentPage={1} totalPages={5} totalRecords={records.length} pageSize={20} />
      </Card>
    </div>
  );
}
