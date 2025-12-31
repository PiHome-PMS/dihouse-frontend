import {
  DataTable,
  type DataTableColumn,
  PageHeader,
  Pagination,
} from '@/components/common';
import { Button, Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';
import type { MonthlyEvaluation } from '../types/hr.types';

export function MonthlyEvaluationPage() {
  // Mock data - empty to match BDC screenshot
  const evaluations: MonthlyEvaluation[] = [];

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

  // Columns matching BDC exactly: STT, Mã nhân viên, Nhân viên, Nhân viên, Điểm (Tự đánh giá), Xếp hạng (Tự đánh giá), Người duyệt, Điểm, Xếp hạng
  const columns: DataTableColumn<MonthlyEvaluation>[] = [
    {
      key: 'employeeCode',
      header: 'Mã nhân viên',
      render: (e) => <span className="text-xs font-semibold text-blue-500">{e.employeeCode}</span>,
    },
    {
      key: 'employeeName',
      header: 'Nhân viên',
      render: (e) => <span className="text-xs font-medium text-gray-700">{e.employeeName}</span>,
    },
    {
      key: 'employeeName2',
      header: 'Nhân viên',
      render: (e) => <span className="text-xs text-gray-600">{e.employeeName}</span>,
    },
    {
      key: 'selfScore',
      header: 'Điểm (Tự đánh giá)',
      render: (e: any) => <span className="text-xs font-semibold text-gray-700">{e.selfScore || '-'}</span>,
    },
    {
      key: 'selfRating',
      header: 'Xếp hạng (Tự đánh giá)',
      align: 'center',
      render: (e: any) => e.selfRating ? getRatingBadge(e.selfRating) : <span className="text-xs text-gray-400">-</span>,
    },
    {
      key: 'approverName',
      header: 'Người duyệt',
      render: (e: any) => <span className="text-xs text-gray-600">{e.approverName || '-'}</span>,
    },
    {
      key: 'score',
      header: 'Điểm',
      render: (e) => <span className="text-xs font-semibold text-gray-700">{e.score}</span>,
    },
    {
      key: 'rating',
      header: 'Xếp hạng',
      align: 'center',
      render: (e) => getRatingBadge(e.rating),
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <PageHeader
        title="Đánh giá nhân sự tháng"
        breadcrumb={['Quản Lý Nhân Sự', 'Đánh giá nhân sự tháng']}
      />

      <Card className="p-4 border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        {/* Export button */}
        <div className="mb-4">
          <Button className="h-9 gap-2 px-4 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-[3px]">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={evaluations}
          keyExtractor={(e) => e.id}
          minWidth="1000px"
          emptyMessage="Không tìm thấy đánh giá"
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
