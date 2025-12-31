import {
  DataTable,
  type DataTableColumn,
  FilterSelect,
  PageHeader,
  Pagination,
} from '@/components/common';
import { Button, Card, Input } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Calendar, Download, FileSpreadsheet, RotateCcw, Search } from 'lucide-react';
import { useState } from 'react';

interface TimekeepingRecord {
  id: number;
  employeeCode: string;
  fullName: string;
  department: string;
  dayOfWeek: string;
  date: string;
  shift: string;
  checkIn: string;
  checkOut: string;
  actualTime: string;
}

interface ShiftCalendarRecord {
  id: number;
  employeeCode: string;
  fullName: string;
  department: string;
  position: string;
  total: number;
  actual: number;
  days: Record<string, string>; // date -> shift value
}

type TabType = 'machine' | 'shift';

// Generate dates for the month
const generateMonthDates = (year: number, month: number) => {
  const dates: { date: string; dayName: string; dayNum: string }[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    const dayOfWeek = d.getDay();
    dates.push({
      date: `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}`,
      dayName: dayNames[dayOfWeek],
      dayNum: day.toString().padStart(2, '0'),
    });
  }
  return dates;
};

export function AttendanceManagementPage() {
  const [activeTab, setActiveTab] = useState<TabType>('machine');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('');
  const [shiftFilter, setShiftFilter] = useState('');
  const [dateRange, setDateRange] = useState('01/12/2025 - 30/12/2025');

  // Generate December 2025 dates
  const monthDates = generateMonthDates(2025, 11); // December

  // Mock data for machine tab
  const machineRecords: TimekeepingRecord[] = [
    {
      id: 1,
      employeeCode: 'HPU02',
      fullName: 'Huyền Thương',
      department: '',
      dayOfWeek: 'Thứ 6',
      date: '25/10/2025',
      shift: 'Ca hành chính',
      checkIn: '08:57:56',
      checkOut: '17:30:00',
      actualTime: '8h 32m',
    },
    {
      id: 2,
      employeeCode: '',
      fullName: 'Nhân sự Demo chấm công',
      department: 'Nhân sự Demo chấm công',
      dayOfWeek: 'Thứ 2',
      date: '25/08/2025',
      shift: 'Ca hành chính',
      checkIn: '08:30:00',
      checkOut: '17:30:00',
      actualTime: '9h 00m',
    },
    {
      id: 3,
      employeeCode: '',
      fullName: 'Nhân sự Demo chấm công',
      department: 'Nhân sự Demo chấm công',
      dayOfWeek: 'Thứ 7',
      date: '23/08/2025',
      shift: 'Ca hành chính',
      checkIn: '08:44:37',
      checkOut: '17:25:36',
      actualTime: '8h 41m',
    },
  ];

  // Mock data for shift calendar tab
  const shiftCalendarRecords: ShiftCalendarRecord[] = [
    {
      id: 1,
      employeeCode: 'MANAGER',
      fullName: 'Quản Lý Test',
      department: 'Ban quản lý S-TECH',
      position: '',
      total: 25.0,
      actual: 0.0,
      days: {},
    },
    {
      id: 2,
      employeeCode: 'TTT1',
      fullName: 'Triều Thực',
      department: 'Ban QLTN Văn phòng Hapulico Complex',
      position: '',
      total: 25.0,
      actual: 0.0,
      days: {},
    },
    {
      id: 3,
      employeeCode: 'HPK1',
      fullName: 'Triều Nhật Dương',
      department: 'Ban quản lý S-TECH',
      position: '',
      total: 25.0,
      actual: 0.0,
      days: {},
    },
    {
      id: 4,
      employeeCode: 'HCN501',
      fullName: 'Trần Thanh Hương',
      department: 'Châu Phạm',
      position: '',
      total: 25.0,
      actual: 0.0,
      days: {},
    },
    {
      id: 5,
      employeeCode: 'HCN502',
      fullName: 'Trần Thị Mai',
      department: 'Châu Phạm',
      position: '',
      total: 25.0,
      actual: 0.0,
      days: {},
    },
  ];

  // Columns for "Bảng công máy" tab
  const machineColumns: DataTableColumn<TimekeepingRecord>[] = [
    {
      key: 'employeeCode',
      header: 'Mã NV',
      render: (r) => <span className="text-xs font-medium text-blue-500">{r.employeeCode}</span>,
    },
    {
      key: 'fullName',
      header: 'Họ và Tên',
      render: (r) => <span className="text-xs font-medium text-gray-700">{r.fullName}</span>,
    },
    {
      key: 'department',
      header: 'Phòng ban',
      render: (r) => <span className="text-xs text-gray-600">{r.department}</span>,
    },
    {
      key: 'dayOfWeek',
      header: 'Thứ',
      render: (r) => <span className="text-xs text-gray-600">{r.dayOfWeek}</span>,
    },
    {
      key: 'date',
      header: 'Ngày',
      render: (r) => <span className="text-xs text-gray-600">{r.date}</span>,
    },
    {
      key: 'shift',
      header: 'Ca làm việc',
      render: (r) => <span className="text-xs text-gray-600">{r.shift}</span>,
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
      key: 'actualTime',
      header: 'Thời gian thực tế',
      render: (r) => <span className="text-xs text-gray-600">{r.actualTime}</span>,
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

  const shiftOptions = [
    { value: 'all', label: 'Tất cả ca' },
    { value: 'hc', label: 'Ca hành chính' },
    { value: 'sang', label: 'Ca sáng' },
    { value: 'chieu', label: 'Ca chiều' },
  ];

  const handleResetFilters = () => {
    setDepartmentFilter('');
    setDivisionFilter('');
    setEmployeeFilter('');
    setShiftFilter('');
    setDateRange('');
  };

  const tabs = [
    { id: 'machine' as TabType, label: 'Bảng công máy' },
    { id: 'shift' as TabType, label: 'Bảng công làm việc theo ca' },
  ];

  return (
    <div className="p-4 space-y-4">
      <PageHeader title="Quản lý chấm công" breadcrumb={['Quản Lý Nhân Sự', 'Quản lý chấm công']} />

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-6 py-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'machine' && (
        <>
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
                value={shiftFilter}
                onChange={setShiftFilter}
                options={shiftOptions}
                placeholder="Ca làm việc"
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
                Export chấm công
              </Button>
            </div>
          </Card>

          <Card className="overflow-hidden border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
            <DataTable
              columns={machineColumns}
              data={machineRecords}
              keyExtractor={(r) => r.id}
              minWidth="1100px"
            />
            <Pagination
              currentPage={1}
              totalPages={5}
              totalRecords={machineRecords.length}
              pageSize={20}
            />
          </Card>
        </>
      )}

      {activeTab === 'shift' && (
        <>
          {/* Bảng công tổng hợp */}
          <Card className="p-4 border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white space-y-4">
            <h3 className="text-sm font-bold text-gray-700">Bảng công tổng hợp</h3>

            {/* Filters row */}
            <div className="grid grid-cols-4 gap-4">
              <FilterSelect
                value={shiftFilter}
                onChange={setShiftFilter}
                options={shiftOptions}
                placeholder="Ca làm việc"
              />
              <FilterSelect
                value={departmentFilter}
                onChange={setDepartmentFilter}
                options={departmentOptions}
                placeholder="Phòng ban"
              />
              <FilterSelect
                value={employeeFilter}
                onChange={setEmployeeFilter}
                options={employeeOptions}
                placeholder="Nhân viên"
              />
              <div className="relative">
                <Input
                  type="text"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  placeholder="01/12/2025 - 30/12/2025"
                  className="h-10 rounded-[3px] pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 justify-end">
              <Button
                variant="outline"
                onClick={handleResetFilters}
                className="h-9 gap-2 px-4 text-sm font-medium border-gray-200 text-gray-600 hover:bg-gray-50 rounded-[3px]"
              >
                Làm mới bộ lọc
              </Button>
              <Button className="h-9 gap-2 px-4 text-sm font-medium bg-primary hover:bg-primary/90 text-white rounded-[3px]">
                <Search className="h-4 w-4" />
                Tìm kiếm
              </Button>
            </div>
          </Card>

          {/* CA Title and Export */}
          <Card className="p-4 border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">CA</h2>
            </div>

            {/* Export buttons */}
            <div className="flex items-center gap-2 mb-4">
              <Button className="h-9 gap-2 px-4 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-[3px]">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button className="h-9 gap-2 px-4 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-[3px]">
                <FileSpreadsheet className="h-4 w-4" />
                Xuất chi tiết
              </Button>
            </div>

            {/* Calendar Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" style={{ minWidth: '2500px' }}>
                <thead>
                  {/* Day names row */}
                  <tr className="bg-gray-100">
                    <th className="p-2 text-[10px] font-bold text-gray-500 border border-gray-200 w-10">
                      #
                    </th>
                    <th className="p-2 text-[10px] font-bold text-gray-500 border border-gray-200 w-20">
                      Mã NV
                    </th>
                    <th className="p-2 text-[10px] font-bold text-gray-500 border border-gray-200 w-40">
                      Họ và tên
                    </th>
                    <th className="p-2 text-[10px] font-bold text-gray-500 border border-gray-200 w-48">
                      Phòng ban
                    </th>
                    <th className="p-2 text-[10px] font-bold text-gray-500 border border-gray-200 w-24">
                      Vị trí
                    </th>
                    <th className="p-2 text-[10px] font-bold text-gray-500 border border-gray-200 w-16 text-center">
                      Tổng
                    </th>
                    <th className="p-2 text-[10px] font-bold text-gray-500 border border-gray-200 w-16 text-center">
                      Thực tế
                    </th>
                    {monthDates.map((d) => (
                      <th
                        key={d.date}
                        className="p-1 text-[9px] font-medium text-gray-500 border border-gray-200 w-12 text-center"
                      >
                        <div>{d.dayName.replace('Thứ ', 'T')}</div>
                        <div className="font-bold text-gray-700">{d.dayNum}/12</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shiftCalendarRecords.map((record, index) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="p-2 text-xs text-gray-600 border border-gray-200 text-center">
                        {index + 1}
                      </td>
                      <td className="p-2 text-xs font-medium text-blue-500 border border-gray-200">
                        {record.employeeCode}
                      </td>
                      <td className="p-2 text-xs text-gray-700 border border-gray-200">
                        {record.fullName}
                      </td>
                      <td className="p-2 text-xs text-gray-600 border border-gray-200">
                        {record.department}
                      </td>
                      <td className="p-2 text-xs text-gray-600 border border-gray-200">
                        {record.position}
                      </td>
                      <td className="p-2 text-xs text-gray-600 border border-gray-200 text-center">
                        {record.total.toFixed(2)}
                      </td>
                      <td className="p-2 text-xs text-gray-600 border border-gray-200 text-center">
                        {record.actual.toFixed(2)}
                      </td>
                      {monthDates.map((d) => (
                        <td
                          key={d.date}
                          className="p-1 text-[10px] text-gray-500 border border-gray-200 text-center"
                        >
                          {record.days[d.date] || ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t">
              <span className="text-xs text-gray-500">
                Tổng số: {shiftCalendarRecords.length} bản ghi
              </span>
              <select className="h-8 px-2 text-xs border rounded">
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
