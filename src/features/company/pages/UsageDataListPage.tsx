import {
  ActionButtons,
  DataTable,
  type DataTableColumn,
  PageHeader,
  Pagination,
} from '@/components/common';
import { Card } from '@/components/ui';
import { useState } from 'react';
import { UsageDataDetailModal } from '../components/UsageDataDetailModal';

interface CompanyUsage {
  id: number;
  companyName: string;
  totalUsage: string;
}

/**
 * Dữ liệu sử dụng (Usage Data List)
 * Shows company usage data summary with detail modal
 */
export function UsageDataListPage() {
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);

  // Mock data
  const usageData: CompanyUsage[] = [
    {
      id: 1,
      companyName: 'CÔNG TY CỔ PHẦN CN S-TECH',
      totalUsage: '299 MB',
    },
    {
      id: 2,
      companyName: 'BUILDING CARE - BDC',
      totalUsage: '156 MB',
    },
    {
      id: 3,
      companyName: 'Ban quản lý S-TECH Tower',
      totalUsage: '87 MB',
    },
  ];

  const columns: DataTableColumn<CompanyUsage>[] = [
    {
      key: 'companyName',
      header: 'Công ty',
      render: (item) => <span className="text-xs font-bold text-gray-700">{item.companyName}</span>,
    },
    {
      key: 'totalUsage',
      header: 'Tổng dữ liệu sử dụng',
      render: (item) => (
        <span className="text-xs font-semibold text-blue-600">{item.totalUsage}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Thao tác',
      align: 'center',
      render: (item) => <ActionButtons onView={() => setSelectedCompanyId(item.id)} />,
    },
  ];

  const selectedCompany = usageData.find((c) => c.id === selectedCompanyId);

  return (
    <div className="p-4 space-y-4">
      {/* Page Header */}
      <PageHeader title="Dữ liệu sử dụng" breadcrumb={['Quản Lý Công Ty', 'Dữ liệu sử dụng']} />

      {/* Data Table */}
      <Card className="overflow-hidden border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <DataTable
          columns={columns}
          data={usageData}
          keyExtractor={(item) => item.id}
          minWidth="600px"
        />

        {/* Pagination */}
        <Pagination currentPage={1} totalPages={1} totalRecords={usageData.length} pageSize={20} />
      </Card>

      {/* Detail Modal */}
      {selectedCompany && (
        <UsageDataDetailModal
          companyId={selectedCompany.id}
          companyName={selectedCompany.companyName}
          onClose={() => setSelectedCompanyId(null)}
        />
      )}
    </div>
  );
}
