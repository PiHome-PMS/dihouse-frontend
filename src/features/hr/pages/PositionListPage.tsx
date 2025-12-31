import {
  ActionButtons,
  DataTable,
  type DataTableColumn,
  DateTimeCell,
  PageHeader,
  Pagination,
} from '@/components/common';
import { Button, Card } from '@/components/ui';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { PositionModal } from '../components';
import type { Position } from '../types/hr.types';

export function PositionListPage() {
  const [selectedPosition, setSelectedPosition] = useState<Position | undefined>();
  const [modalOpen, setModalOpen] = useState(false);

  // Mock data
  const positions: Position[] = [
    {
      id: 1,
      name: 'Nhân viên',
      description: 'Nhân viên thường',
      createdAt: '15/09/2025 11:17:51',
      updatedAt: '03/10/2025 08:56:07',
    },
    {
      id: 2,
      name: 'Trưởng phòng',
      description: 'Quản lý phòng ban',
      createdAt: '12/09/2025 09:47:09',
      updatedAt: '12/09/2025 10:14:57',
    },
    {
      id: 3,
      name: 'Giám đốc',
      description: 'Điều hành công ty',
      createdAt: '10/08/2025 14:30:00',
      updatedAt: '15/09/2025 16:45:00',
    },
  ];

  const columns: DataTableColumn<Position>[] = [
    {
      key: 'id',
      header: 'ID',
      render: (p) => <span className="text-xs font-semibold text-gray-600">{p.id}</span>,
    },
    {
      key: 'name',
      header: 'Chức vụ',
      render: (p) => <span className="text-xs font-bold text-gray-700">{p.name}</span>,
    },
    {
      key: 'description',
      header: 'Mô tả',
      render: (p) => <span className="text-xs text-gray-600">{p.description}</span>,
    },
    {
      key: 'createdAt',
      header: 'Ngày tạo',
      render: (p) => <DateTimeCell datetime={p.createdAt} />,
    },
    {
      key: 'updatedAt',
      header: 'Ngày cập nhật',
      render: (p) => <DateTimeCell datetime={p.updatedAt} />,
    },
    {
      key: 'actions',
      header: 'Thao tác',
      align: 'center',
      render: (p) => (
        <ActionButtons
          onView={() => {
            setSelectedPosition(p);
            setModalOpen(true);
          }}
          onDelete={() => console.log('delete', p.id)}
        />
      ),
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <PageHeader title="Quản lý chức vụ" breadcrumb={['Quản Lý Nhân Sự', 'Quản lý chức vụ']} />

      <Card className="p-4 border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <div className="flex justify-end">
          <Button
            onClick={() => {
              setSelectedPosition(undefined);
              setModalOpen(true);
            }}
            className="h-9 gap-2 px-4 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-[3px]"
          >
            <Plus className="h-4 w-4" />
            Thêm mới
          </Button>
        </div>
      </Card>

      <Card className="overflow-hidden border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <DataTable columns={columns} data={positions} keyExtractor={(p) => p.id} minWidth="800px" />
        <Pagination currentPage={1} totalPages={1} totalRecords={positions.length} pageSize={20} />
      </Card>

      <PositionModal open={modalOpen} onOpenChange={setModalOpen} position={selectedPosition} />
    </div>
  );
}
