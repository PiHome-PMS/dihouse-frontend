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
import { TabContainer } from '@/features/company/components';
import { Plus, RotateCcw, Search } from 'lucide-react';
import { useState } from 'react';
import { BuildingDetailModal, FloorDetailModal } from '../components';
import type { Building, Floor } from '../types/project.types';

/**
 * Building List Page (Danh sách tòa nhà) with 2 tabs:
 * - Quản lý tòa nhà (Building Management)
 * - Quản lý tầng (Floor Management)
 */
export function BuildingListPage() {
  const [activeTab, setActiveTab] = useState<'building' | 'floor'>('building');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [buildingFilter, setBuildingFilter] = useState('');

  // Building modal state
  const [selectedBuilding, setSelectedBuilding] = useState<Building | undefined>();
  const [buildingModalOpen, setBuildingModalOpen] = useState(false);

  // Floor modal state
  const [selectedFloor, setSelectedFloor] = useState<Floor | undefined>();
  const [floorModalOpen, setFloorModalOpen] = useState(false);

  // Mock building data
  const buildings: Building[] = [
    {
      id: 1,
      name: 'Tòa A',
      code: 'TA',
      blockId: 1,
      blockName: 'Phân khu A',
      status: true,
      createdAt: '15/09/2025 11:17:51',
      updatedAt: '03/10/2025 08:56:07',
    },
    {
      id: 2,
      name: 'Tòa B',
      code: 'TB',
      blockId: 1,
      blockName: 'Phân khu A',
      status: true,
      createdAt: '12/09/2025 09:47:09',
      updatedAt: '12/09/2025 10:14:57',
    },
    {
      id: 3,
      name: 'Tòa C',
      code: 'TC',
      blockId: 2,
      blockName: 'Phân khu B',
      status: false,
      createdAt: '10/08/2025 14:30:00',
      updatedAt: '15/09/2025 16:45:00',
    },
  ];

  // Mock floor data
  const floors: Floor[] = [
    { id: 1, name: 'Tầng 1', buildingId: 1, buildingName: 'Tòa A', createdAt: '', updatedAt: '' },
    { id: 2, name: 'Tầng 2', buildingId: 1, buildingName: 'Tòa A', createdAt: '', updatedAt: '' },
    { id: 3, name: 'Tầng 3', buildingId: 1, buildingName: 'Tòa A', createdAt: '', updatedAt: '' },
    { id: 4, name: 'Tầng 1', buildingId: 2, buildingName: 'Tòa B', createdAt: '', updatedAt: '' },
    { id: 5, name: 'Tầng 2', buildingId: 2, buildingName: 'Tòa B', createdAt: '', updatedAt: '' },
  ];

  const buildingColumns: DataTableColumn<Building>[] = [
    {
      key: 'name',
      header: 'Tên tòa nhà',
      render: (b) => <span className="text-xs font-bold text-gray-700">{b.name}</span>,
    },
    {
      key: 'code',
      header: 'Mã',
      render: (b) => <span className="text-xs font-semibold text-blue-500">{b.code}</span>,
    },
    {
      key: 'blockName',
      header: 'Phân khu',
      render: (b) => <span className="text-xs text-gray-600">{b.blockName}</span>,
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
            setSelectedBuilding(b);
            setBuildingModalOpen(true);
          }}
          onDelete={() => console.log('delete building', b.id)}
        />
      ),
    },
  ];

  const floorColumns: DataTableColumn<Floor>[] = [
    {
      key: 'name',
      header: 'Tên tầng',
      render: (f) => <span className="text-xs font-bold text-gray-700">{f.name}</span>,
    },
    {
      key: 'buildingName',
      header: 'Tên tòa',
      render: (f) => <span className="text-xs text-gray-600">{f.buildingName}</span>,
    },
    {
      key: 'actions',
      header: 'Thao tác',
      align: 'center',
      render: (f) => (
        <ActionButtons
          onView={() => {
            setSelectedFloor(f);
            setFloorModalOpen(true);
          }}
          onDelete={() => console.log('delete floor', f.id)}
        />
      ),
    },
  ];

  const statusOptions = [
    { value: 'active', label: 'Hoạt động' },
    { value: 'inactive', label: 'Ngừng hoạt động' },
  ];

  const buildingOptions = buildings.map((b) => ({ value: String(b.id), label: b.name }));

  const tabs = [
    { id: 'building', label: 'Quản lý tòa nhà' },
    { id: 'floor', label: 'Quản lý tầng' },
  ];

  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('');
    setBuildingFilter('');
  };

  return (
    <div className="p-4 space-y-4">
      {/* Page Header */}
      <PageHeader title="Danh sách tòa nhà" breadcrumb={['Quản Lý Dự Án', 'Danh sách tòa nhà']} />

      {/* Tabs */}
      <Card className="overflow-hidden border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <TabContainer
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id as 'building' | 'floor')}
        >
          {/* Building Tab */}
          {activeTab === 'building' && (
            <div className="p-4 space-y-4">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[250px]">
                  <SearchInput
                    value={search}
                    onChange={setSearch}
                    placeholder="Tìm kiếm theo tên tòa nhà"
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
                      setSelectedBuilding(undefined);
                      setBuildingModalOpen(true);
                    }}
                    className="h-9 gap-2 px-4 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-[3px]"
                  >
                    <Plus className="h-4 w-4" />
                    Thêm mới
                  </Button>
                </div>
              </div>

              {/* Table */}
              <DataTable
                columns={buildingColumns}
                data={buildings}
                keyExtractor={(b) => b.id}
                minWidth="700px"
              />
              <Pagination
                currentPage={1}
                totalPages={1}
                totalRecords={buildings.length}
                pageSize={20}
              />
            </div>
          )}

          {/* Floor Tab */}
          {activeTab === 'floor' && (
            <div className="p-4 space-y-4">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[250px]">
                  <SearchInput
                    value={search}
                    onChange={setSearch}
                    placeholder="Tìm kiếm theo tên tầng"
                  />
                </div>

                <FilterSelect
                  value={buildingFilter}
                  onChange={setBuildingFilter}
                  options={buildingOptions}
                  placeholder="Chọn tòa nhà"
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
                      setSelectedFloor(undefined);
                      setFloorModalOpen(true);
                    }}
                    className="h-9 gap-2 px-4 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-[3px]"
                  >
                    <Plus className="h-4 w-4" />
                    Thêm mới
                  </Button>
                </div>
              </div>

              {/* Table */}
              <DataTable
                columns={floorColumns}
                data={floors}
                keyExtractor={(f) => f.id}
                minWidth="500px"
              />
              <Pagination
                currentPage={1}
                totalPages={1}
                totalRecords={floors.length}
                pageSize={20}
              />
            </div>
          )}
        </TabContainer>
      </Card>

      {/* Modals */}
      <BuildingDetailModal
        open={buildingModalOpen}
        onOpenChange={setBuildingModalOpen}
        building={selectedBuilding}
      />
      <FloorDetailModal
        open={floorModalOpen}
        onOpenChange={setFloorModalOpen}
        floor={selectedFloor}
      />
    </div>
  );
}
