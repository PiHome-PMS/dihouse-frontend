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
import { BlockDetailModal } from '../components';
import type { Block } from '../types/project.types';

/**
 * Block List Page (Danh sách phân khu)
 */
export function BlockListPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<Block | undefined>();
  const [modalOpen, setModalOpen] = useState(false);

  // Mock data
  const blocks: Block[] = [
    {
      id: 1,
      name: 'Phân khu A',
      code: 'PKA',
      projectId: 1,
      projectName: 'BDC Demo 1',
      status: true,
      createdAt: '15/09/2025 11:17:51',
      updatedAt: '03/10/2025 08:56:07',
    },
    {
      id: 2,
      name: 'Phân khu B',
      code: 'PKB',
      projectId: 1,
      projectName: 'BDC Demo 1',
      status: true,
      createdAt: '12/09/2025 09:47:09',
      updatedAt: '12/09/2025 10:14:57',
    },
    {
      id: 3,
      name: 'Phân khu C',
      code: 'PKC',
      projectId: 2,
      projectName: 'BDC Demo 2',
      status: false,
      createdAt: '10/08/2025 14:30:00',
      updatedAt: '15/09/2025 16:45:00',
    },
  ];

  const columns: DataTableColumn<Block>[] = [
    {
      key: 'name',
      header: 'Tên phân khu',
      render: (b) => <span className="text-xs font-bold text-gray-700">{b.name}</span>,
    },
    {
      key: 'code',
      header: 'Mã phân khu',
      render: (b) => <span className="text-xs font-semibold text-blue-500">{b.code}</span>,
    },
    {
      key: 'projectName',
      header: 'Dự án',
      render: (b) => <span className="text-xs text-gray-600">{b.projectName}</span>,
    },
    {
      key: 'status',
      header: 'Trạng Thái',
      align: 'center',
      render: (b) => <StatusToggle checked={b.status} />,
    },
    {
      key: 'actions',
      header: 'Thao tác',
      align: 'center',
      render: (b) => (
        <ActionButtons
          onView={() => {
            setSelectedBlock(b);
            setModalOpen(true);
          }}
          onDelete={() => console.log('delete', b.id)}
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
      {/* Page Header */}
      <PageHeader title="Danh sách phân khu" breadcrumb={['Quản Lý Dự Án', 'Danh sách phân khu']} />

      {/* Filter Bar */}
      <Card className="p-4 border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[250px]">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Tìm kiếm theo tên/mã phân khu"
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
                setSelectedBlock(undefined);
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

      {/* Data Table */}
      <Card className="overflow-hidden border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <DataTable columns={columns} data={blocks} keyExtractor={(b) => b.id} minWidth="800px" />
        <Pagination currentPage={1} totalPages={1} totalRecords={blocks.length} pageSize={20} />
      </Card>

      {/* Detail Modal */}
      <BlockDetailModal open={modalOpen} onOpenChange={setModalOpen} block={selectedBlock} />
    </div>
  );
}
