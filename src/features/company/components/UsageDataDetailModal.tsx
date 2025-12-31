import { DataTable, type DataTableColumn } from '@/components/common';
import { X } from 'lucide-react';

interface ProjectUsage {
  id: number;
  period: string;
  apartment: string;
  document: string;
  electricity: string;
  publicData: string;
  voucher: string;
  warehouse: string;
  user: string;
  task: string;
  vehicle: string;
}

interface UsageDataDetailModalProps {
  companyId: number;
  companyName: string;
  onClose: () => void;
}

/**
 * Modal showing detailed usage data by project/month
 */
export function UsageDataDetailModal({
  companyId: _companyId,
  companyName,
  onClose,
}: UsageDataDetailModalProps) {
  // Mock data - in production this would come from API based on companyId
  const projectData: ProjectUsage[] = [
    {
      id: 1,
      period: '12/2025',
      apartment: '15 KB',
      document: '45 MB',
      electricity: '12 MB',
      publicData: '8 MB',
      voucher: '5 MB',
      warehouse: '3 MB',
      user: '2 MB',
      task: '10 MB',
      vehicle: '1 MB',
    },
    {
      id: 2,
      period: '11/2025',
      apartment: '12 KB',
      document: '38 MB',
      electricity: '10 MB',
      publicData: '6 MB',
      voucher: '4 MB',
      warehouse: '2 MB',
      user: '2 MB',
      task: '8 MB',
      vehicle: '1 MB',
    },
    {
      id: 3,
      period: '10/2025',
      apartment: '10 KB',
      document: '32 MB',
      electricity: '9 MB',
      publicData: '5 MB',
      voucher: '3 MB',
      warehouse: '2 MB',
      user: '1 MB',
      task: '7 MB',
      vehicle: '0.5 MB',
    },
    {
      id: 4,
      period: '09/2025',
      apartment: '8 KB',
      document: '28 MB',
      electricity: '8 MB',
      publicData: '4 MB',
      voucher: '2 MB',
      warehouse: '1 MB',
      user: '1 MB',
      task: '5 MB',
      vehicle: '0.5 MB',
    },
  ];

  const columns: DataTableColumn<ProjectUsage>[] = [
    {
      key: 'period',
      header: 'Thời gian',
      render: (item) => <span className="text-xs font-semibold text-gray-700">{item.period}</span>,
    },
    {
      key: 'apartment',
      header: 'Căn hộ',
      render: (item) => (
        <span className="text-xs font-semibold text-gray-600">{item.apartment}</span>
      ),
    },
    {
      key: 'document',
      header: 'Tài liệu',
      render: (item) => (
        <span className="text-xs font-semibold text-gray-600">{item.document}</span>
      ),
    },
    {
      key: 'electricity',
      header: 'Điện',
      render: (item) => (
        <span className="text-xs font-semibold text-gray-600">{item.electricity}</span>
      ),
    },
    {
      key: 'publicData',
      header: 'Public',
      render: (item) => (
        <span className="text-xs font-semibold text-gray-600">{item.publicData}</span>
      ),
    },
    {
      key: 'voucher',
      header: 'Phiếu',
      render: (item) => <span className="text-xs font-semibold text-gray-600">{item.voucher}</span>,
    },
    {
      key: 'warehouse',
      header: 'Kho',
      render: (item) => (
        <span className="text-xs font-semibold text-gray-600">{item.warehouse}</span>
      ),
    },
    {
      key: 'user',
      header: 'User',
      render: (item) => <span className="text-xs font-semibold text-gray-600">{item.user}</span>,
    },
    {
      key: 'task',
      header: 'Task',
      render: (item) => <span className="text-xs font-semibold text-gray-600">{item.task}</span>,
    },
    {
      key: 'vehicle',
      header: 'Vehicle',
      render: (item) => <span className="text-xs font-semibold text-gray-600">{item.vehicle}</span>,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: Modal backdrop click to close */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-[3px] shadow-xl w-[90vw] max-w-[1200px] max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-700">Dữ liệu dự án</h2>
            <p className="text-sm text-blue-500 font-semibold mt-1">{companyName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-auto max-h-[calc(80vh-80px)]">
          <DataTable
            columns={columns}
            data={projectData}
            keyExtractor={(item) => item.id}
            minWidth="1000px"
          />
        </div>
      </div>
    </div>
  );
}
