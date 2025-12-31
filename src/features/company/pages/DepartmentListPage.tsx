import { Button, Card, Input } from '@/components/ui';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  Home,
  Plus,
  RotateCcw,
  Search,
  Trash2,
} from 'lucide-react';

/**
 * Danh sách phòng ban (Department List)
 * High-fidelity clone of BDC Department List page
 */
export function DepartmentListPage() {
  const departments = [
    {
      id: 1,
      parent: 'Ban quản lý S-TECH',
      name: 'Bộ phận 2',
      code: 'BP2',
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
      head: 'Trưởng nhóm FLC',
      created: '21/11/2025 15:49:30',
      updated: '21/11/2025 15:51:37',
      status: true,
      hotline: '01234567898',
      email: 'abc123@hotmail.com',
    },
    {
      id: 3,
      parent: 'Ban quản lý S-TECH',
      name: 'Bộ phận thu nợ',
      code: 'BPTN',
      head: 'Triệu Nhật Dương',
      created: '19/11/2025 10:15:49',
      updated: '19/11/2025 10:23:41',
      status: true,
      hotline: '0660111111',
      email: 'hot-mail@gmail.com',
    },
    {
      id: 4,
      parent: 'Ban quản lý S-TECH',
      name: 'Lao Công',
      code: 'LC',
      head: 'Quản Lý Test',
      created: '05/11/2025 09:22:02',
      updated: '05/11/2025 09:22:02',
      status: true,
    },
    {
      id: 5,
      parent: 'Ban quản lý S-TECH',
      name: 'Soát vé',
      code: 'SV',
      head: 'Quản Lý Test',
      created: '19/09/2025 09:02:07',
      updated: '05/11/2025 09:21:29',
      status: true,
    },
    {
      id: 6,
      parent: 'Ban quản lý S-TECH',
      name: 'Security',
      code: 'Bv',
      head: 'Quản Lý Test',
      created: '19/09/2025 08:59:57',
      updated: '19/09/2025 08:59:57',
      status: true,
    },
    {
      id: 7,
      parent: 'Ban quản lý S-TECH',
      name: 'Tạp vụ',
      code: 'Tv',
      head: 'Quản Lý Test',
      created: '19/09/2025 08:59:17',
      updated: '19/09/2025 08:59:17',
      status: true,
    },
    {
      id: 8,
      parent: 'Ban quản lý S-TECH',
      name: 'Bộ Phận VNG',
      code: 'Dịch Vụ 123',
      head: 'Quản Lý Test',
      created: '23/09/2024 09:01:24',
      updated: '23/09/2024 09:01:24',
      status: true,
    },
    {
      id: 9,
      parent: 'Ban quản lý S-TECH',
      name: 'Kế toán',
      code: 'KT',
      head: 'Nguyễn Trang Anh',
      created: '18/06/2024 10:59:25',
      updated: '13/09/2024 14:32:18',
      status: true,
    },
    {
      id: 10,
      parent: 'Ban quản lý S-TECH',
      name: 'Kỹ thuật',
      code: 'KTV',
      head: 'Triệu Nhật Dương',
      created: '18/06/2024 09:56:59',
      updated: '02/07/2024 09:46:08',
      status: true,
    },
    {
      id: 11,
      parent: 'Ban quản lý S-TECH',
      name: 'Quản lý',
      code: 'QL',
      head: 'Nguyễn Tuấn Phát',
      created: '18/06/2024 09:56:31',
      updated: '18/06/2024 17:12:59',
      status: true,
    },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-700 uppercase">Danh sách bộ phận</h1>
        <div className="flex items-center gap-1 text-xs text-blue-500">
          <Home className="h-3 w-3" />
          <span>/ Thông tin dự án / Danh sách bộ phận</span>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="p-4 border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Input
                placeholder="Tìm kiếm theo tên, mã bộ phận"
                className="pl-9 h-9 text-sm border-gray-200 focus:ring-primary/20 rounded-[3px]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="w-48">
            <select className="w-full h-9 px-3 border border-gray-200 rounded-[3px] text-sm text-gray-600 outline-none focus:border-primary/50 transition-colors">
              <option value="">Trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Ngừng hoạt động</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-9 gap-2 px-4 text-sm font-semibold border-gray-200 text-gray-600 hover:bg-gray-50 rounded-[3px]"
            >
              <RotateCcw className="h-4 w-4" />
              Làm mới bộ lọc
            </Button>
            <Button className="h-9 gap-2 px-4 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-[3px]">
              <Search className="h-4 w-4" />
              Tìm kiếm
            </Button>
            <Button className="h-9 gap-2 px-4 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-[3px]">
              <Plus className="h-4 w-4" />
              Thêm mới
            </Button>
          </div>
        </div>
      </Card>

      {/* Data Table */}
      <Card className="overflow-hidden border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="p-3 text-[11px] font-black text-gray-400 uppercase border-b border-gray-100 w-12 text-center">
                  STT
                </th>
                <th className="p-3 text-[11px] font-black text-gray-400 uppercase border-b border-gray-100">
                  Tên phòng ban / dự án
                </th>
                <th className="p-3 text-[11px] font-black text-gray-400 uppercase border-b border-gray-100">
                  Tên bộ phận
                </th>
                <th className="p-3 text-[11px] font-black text-gray-400 uppercase border-b border-gray-100">
                  Mã bộ phận
                </th>
                <th className="p-3 text-[11px] font-black text-gray-400 uppercase border-b border-gray-100">
                  Hotline
                </th>
                <th className="p-3 text-[11px] font-black text-gray-400 uppercase border-b border-gray-100">
                  Email liên hệ
                </th>
                <th className="p-3 text-[11px] font-black text-gray-400 uppercase border-b border-gray-100">
                  Trưởng bộ phận
                </th>
                <th className="p-3 text-[11px] font-black text-gray-400 uppercase border-b border-gray-100">
                  Thời gian tạo
                </th>
                <th className="p-3 text-[11px] font-black text-gray-400 uppercase border-b border-gray-100">
                  Thời gian cập nhật
                </th>
                <th className="p-3 text-[11px] font-black text-gray-400 uppercase border-b border-gray-100 text-center">
                  Trạng Thái
                </th>
                <th className="p-3 text-[11px] font-black text-gray-400 uppercase border-b border-gray-100 text-center">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.id} className="hover:bg-gray-50/50 group border-b border-gray-50">
                  <td className="p-3 text-xs font-semibold text-gray-600 text-center">{dept.id}</td>
                  <td className="p-3 text-xs font-semibold text-blue-500">{dept.parent}</td>
                  <td className="p-3 text-xs font-bold text-gray-700">{dept.name}</td>
                  <td className="p-3 text-xs font-semibold text-gray-600">{dept.code}</td>
                  <td className="p-3 text-xs font-semibold text-gray-600">{dept.hotline || ''}</td>
                  <td className="p-3 text-xs font-semibold text-gray-600">{dept.email || ''}</td>
                  <td className="p-3 text-xs font-bold text-gray-700">{dept.head}</td>
                  <td className="p-3 text-xs font-semibold text-gray-500 leading-tight">
                    {dept.created.split(' ')[0]}
                    <br />
                    <span className="text-[11px]">{dept.created.split(' ')[1]}</span>
                  </td>
                  <td className="p-3 text-xs font-semibold text-gray-500 leading-tight">
                    {dept.updated.split(' ')[0]}
                    <br />
                    <span className="text-[11px]">{dept.updated.split(' ')[1]}</span>
                  </td>
                  <td className="p-3 text-center">
                    <div
                      className={cn(
                        'inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
                        dept.status ? 'bg-primary' : 'bg-gray-200'
                      )}
                    >
                      <div
                        className={cn(
                          'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform',
                          dept.status ? 'translate-x-4' : 'translate-x-0'
                        )}
                      />
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-full transition-colors border border-blue-200"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors border border-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="p-4 bg-gray-50/30 flex items-center justify-between border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400">
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1 mx-2">
              <Button
                size="sm"
                className="h-8 w-8 p-0 bg-blue-100 text-blue-600 font-bold hover:bg-blue-200"
              >
                1
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400">
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-gray-500">Tổng số: 11 bản ghi</span>
            <div className="flex items-center gap-2">
              <select className="h-8 px-2 border border-gray-200 rounded-[3px] text-xs font-bold text-gray-600 outline-none">
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
