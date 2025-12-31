import {
  ActionButtons,
  DataTable,
  type DataTableColumn,
  PageHeader,
  Pagination,
  SearchInput,
  StatusToggle,
} from '@/components/common';
import { Button, Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Plus, RefreshCw, RotateCcw, Search } from 'lucide-react';
import { useState } from 'react';
import { DeviceModal } from '../components';
import type { TimekeepingDevice } from '../types/hr.types';

export function DeviceListPage() {
  const [search, setSearch] = useState('');
  const [selectedDevice, setSelectedDevice] = useState<TimekeepingDevice | undefined>();
  const [modalOpen, setModalOpen] = useState(false);

  // Mock data
  const devices: TimekeepingDevice[] = [
    {
      id: 1,
      name: 'Máy chấm công tầng 1',
      code: 'MCC001',
      type: 'Vân tay',
      isActive: true,
      status: 'connected',
      syncStatus: 'synced',
      createdAt: '15/09/2025 11:17:51',
      updatedAt: '03/10/2025 08:56:07',
    },
    {
      id: 2,
      name: 'Máy chấm công tầng 2',
      code: 'MCC002',
      type: 'Khuôn mặt',
      isActive: true,
      status: 'disconnected',
      syncStatus: 'pending',
      createdAt: '12/09/2025 09:47:09',
      updatedAt: '12/09/2025 10:14:57',
    },
    {
      id: 3,
      name: 'Máy chấm công cổng',
      code: 'MCC003',
      type: 'Thẻ từ',
      isActive: false,
      status: 'error',
      syncStatus: 'failed',
      createdAt: '10/08/2025 14:30:00',
      updatedAt: '15/09/2025 16:45:00',
    },
  ];

  const getStatusBadge = (status: TimekeepingDevice['status']) => {
    const styles = {
      connected: 'bg-green-100 text-green-700',
      disconnected: 'bg-orange-100 text-orange-700',
      error: 'bg-red-100 text-red-700',
    };
    const labels = {
      connected: 'Hoàn tất',
      disconnected: 'Ngắt kết nối',
      error: 'Không thể kết nối',
    };
    return (
      <span className={cn('px-2 py-1 rounded-md text-xs font-medium', styles[status])}>
        {labels[status]}
      </span>
    );
  };

  const getSyncBadge = (syncStatus: TimekeepingDevice['syncStatus']) => {
    const styles = {
      synced: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      failed: 'bg-red-100 text-red-700',
    };
    const labels = { synced: 'Đã đồng bộ', pending: 'Đang chờ', failed: 'Thất bại' };
    return (
      <span className={cn('px-2 py-1 rounded-md text-xs font-medium', styles[syncStatus])}>
        {labels[syncStatus]}
      </span>
    );
  };

  const columns: DataTableColumn<TimekeepingDevice>[] = [
    {
      key: 'name',
      header: 'Tên thiết bị',
      render: (d) => <span className="text-xs font-bold text-gray-700">{d.name}</span>,
    },
    {
      key: 'code',
      header: 'Mã thiết bị',
      render: (d) => <span className="text-xs font-semibold text-blue-500">{d.code}</span>,
    },
    {
      key: 'type',
      header: 'Kiểu chấm công',
      render: (d) => <span className="text-xs text-gray-600">{d.type}</span>,
    },
    {
      key: 'isActive',
      header: 'Trạng thái hoạt động',
      align: 'center',
      render: (d) => <StatusToggle checked={d.isActive} />,
    },
    {
      key: 'status',
      header: 'Trạng thái',
      align: 'center',
      render: (d) => getStatusBadge(d.status),
    },
    {
      key: 'syncStatus',
      header: 'Trạng thái đồng bộ',
      align: 'center',
      render: (d) => getSyncBadge(d.syncStatus),
    },
    {
      key: 'actions',
      header: 'Thao tác',
      align: 'center',
      render: (d) => (
        <div className="flex items-center justify-center gap-1">
          <ActionButtons
            onView={() => {
              setSelectedDevice(d);
              setModalOpen(true);
            }}
            onDelete={() => console.log('delete', d.id)}
          />
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => console.log('sync', d.id)}
          >
            <RefreshCw className="h-4 w-4 text-blue-500" />
          </Button>
        </div>
      ),
    },
  ];

  const handleResetFilters = () => {
    setSearch('');
  };

  return (
    <div className="p-4 space-y-4">
      <PageHeader
        title="Quản lý thiết bị chấm công"
        breadcrumb={['Quản Lý Nhân Sự', 'Quản lý thiết bị chấm công']}
      />

      <Card className="p-4 border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[250px]">
            <SearchInput value={search} onChange={setSearch} placeholder="Tìm kiếm theo tên, mã" />
          </div>

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
                setSelectedDevice(undefined);
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
        <DataTable columns={columns} data={devices} keyExtractor={(d) => d.id} minWidth="1100px" />
        <Pagination currentPage={1} totalPages={1} totalRecords={devices.length} pageSize={20} />
      </Card>

      <DeviceModal open={modalOpen} onOpenChange={setModalOpen} device={selectedDevice} />
    </div>
  );
}
