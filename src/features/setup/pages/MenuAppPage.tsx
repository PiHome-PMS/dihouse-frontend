import {
  DataTable,
  type DataTableColumn,
  FilterSelect,
  PageHeader,
  Pagination,
  StatusToggle,
} from '@/components/common';
import { Button, Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { UnlockAllModal } from '../components';

// Types
interface MenuAppItem {
  id: number;
  loaiApp: string;
  duAn: string;
  loaiMenu: string;
  danhMuc: string;
  trangThai: boolean;
}

interface YKienItem {
  id: number;
  duAn: string;
  loaiYKien: string;
  trangThai: boolean;
}

// Mock data for Menu App tab
const MENU_APP_DATA: MenuAppItem[] = [
  {
    id: 1,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: '',
    danhMuc: 'Ý kiến cư dân',
    trangThai: false,
  },
  {
    id: 2,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: 'Yêu cầu cư dân',
    danhMuc: 'Cấp lại thẻ xe (có thông tin chi tiết)',
    trangThai: false,
  },
  {
    id: 3,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: 'Yêu cầu cư dân',
    danhMuc: 'Chuyển đổi',
    trangThai: false,
  },
  {
    id: 4,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: 'Yêu cầu cư dân',
    danhMuc: 'Sửa chữa',
    trangThai: false,
  },
  {
    id: 5,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: 'Yêu cầu cư dân',
    danhMuc: 'Tiện ích',
    trangThai: false,
  },
  {
    id: 6,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: 'Yêu cầu cư dân',
    danhMuc: 'Cấp lại thẻ xe (không có thông tin chi tiết)',
    trangThai: false,
  },
  {
    id: 7,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: 'Yêu cầu cư dân',
    danhMuc: 'Thêm nhân khẩu',
    trangThai: false,
  },
  {
    id: 8,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: 'Yêu cầu cư dân',
    danhMuc: 'Thay đổi thông tin cá nhân',
    trangThai: false,
  },
  {
    id: 9,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: 'Yêu cầu cư dân',
    danhMuc: 'Đăng ký thẻ',
    trangThai: false,
  },
  {
    id: 10,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: 'Yêu cầu cư dân',
    danhMuc: 'Yêu cầu hủy thẻ',
    trangThai: false,
  },
  {
    id: 11,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: 'Yêu cầu cư dân',
    danhMuc: 'Yêu cầu sửa chữa',
    trangThai: false,
  },
  {
    id: 12,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: 'Yêu cầu cư dân',
    danhMuc: 'Yêu cầu bảo trì, bảo dưỡng',
    trangThai: false,
  },
  {
    id: 13,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: 'Yêu cầu cư dân',
    danhMuc: 'Gia hạn phương tiện',
    trangThai: false,
  },
  {
    id: 14,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: 'Yêu cầu cư dân',
    danhMuc: 'Hủy phương tiện',
    trangThai: false,
  },
  {
    id: 15,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: 'Yêu cầu cư dân',
    danhMuc: 'Thêm phương tiện',
    trangThai: false,
  },
  {
    id: 16,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: 'Tiện ích',
    danhMuc: 'giờ nước nóng',
    trangThai: false,
  },
  {
    id: 17,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: 'Tiện ích',
    danhMuc: 'Tin nội bộ',
    trangThai: false,
  },
  {
    id: 18,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: 'Tiện ích',
    danhMuc: 'Phương tiện',
    trangThai: false,
  },
  {
    id: 19,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: 'Tiện ích',
    danhMuc: 'Thang máy',
    trangThai: false,
  },
  {
    id: 20,
    loaiApp: 'BDC_CUDAN_APP',
    duAn: 'BUIDING CARE - BDC',
    loaiMenu: 'Tiện ích',
    danhMuc: 'Sửa chữa',
    trangThai: false,
  },
];

// Mock data for Y Kien tab
const Y_KIEN_DATA: YKienItem[] = [
  { id: 1, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Vệ sinh', trangThai: false },
  { id: 2, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Nước sinh hoạt', trangThai: false },
  { id: 3, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Bãi đỗ xe', trangThai: false },
  { id: 4, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Thang máy', trangThai: false },
  { id: 5, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Vật nuôi', trangThai: false },
  { id: 6, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Điện khu công cộng', trangThai: false },
  { id: 7, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Thu gom rác', trangThai: false },
  { id: 8, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Hỗ trợ kỹ thuật', trangThai: false },
  { id: 9, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Phí và thanh toán', trangThai: false },
  { id: 10, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Diệt côn trùng', trangThai: false },
  { id: 11, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Cảnh quan cây xanh', trangThai: false },
  { id: 12, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Xử lý chất thải', trangThai: true },
  { id: 13, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Bảo vệ', trangThai: false },
  { id: 14, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Tiếng ồn', trangThai: false },
  { id: 15, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Cháy nổ', trangThai: false },
  { id: 16, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Vệ sinh', trangThai: false },
  { id: 17, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Bảo vệ', trangThai: false },
  { id: 18, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Tiếng ồn', trangThai: false },
  { id: 19, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Tiện ích', trangThai: false },
  { id: 20, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Dịch vụ khách hàng', trangThai: false },
  { id: 21, duAn: 'BUIDING CARE - BDC', loaiYKien: 'Khác', trangThai: false },
];

const PROJECT_OPTIONS = [
  { value: 'all', label: 'Tất cả dự án' },
  { value: 'bdc', label: 'BUIDING CARE - BDC' },
  { value: 'mipec', label: 'Mipec Riverside' },
];

type TabId = 'menu-app' | 'y-kien';

const TABS: { id: TabId; label: string }[] = [
  { id: 'menu-app', label: 'Menu App' },
  { id: 'y-kien', label: 'Ý kiến' },
];

export function MenuAppPage() {
  const [activeTab, setActiveTab] = useState<TabId>('menu-app');
  const [selectedProject, setSelectedProject] = useState('bdc');
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);

  // State for toggle data
  const [menuAppData, setMenuAppData] = useState(MENU_APP_DATA);
  const [yKienData, setYKienData] = useState(Y_KIEN_DATA);

  const handleMenuAppToggle = (id: number, newValue: boolean) => {
    setMenuAppData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, trangThai: newValue } : item))
    );
  };

  const handleYKienToggle = (id: number, newValue: boolean) => {
    setYKienData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, trangThai: newValue } : item))
    );
  };

  const handleUnlockAll = () => {
    if (activeTab === 'menu-app') {
      setMenuAppData((prev) => prev.map((item) => ({ ...item, trangThai: true })));
    } else {
      setYKienData((prev) => prev.map((item) => ({ ...item, trangThai: true })));
    }
    setUnlockModalOpen(false);
  };

  // DataTable columns for Menu App tab
  const menuAppColumns: DataTableColumn<MenuAppItem>[] = [
    {
      key: 'loaiApp',
      header: 'Loại App',
      render: (item) => <span className="text-xs text-gray-700">{item.loaiApp}</span>,
    },
    {
      key: 'duAn',
      header: 'Dự án',
      render: (item) => <span className="text-xs text-gray-600">{item.duAn}</span>,
    },
    {
      key: 'loaiMenu',
      header: 'Loại Menu',
      render: (item) => <span className="text-xs text-gray-600">{item.loaiMenu || '-'}</span>,
    },
    {
      key: 'danhMuc',
      header: 'Danh mục',
      render: (item) => <span className="text-xs text-gray-600">{item.danhMuc}</span>,
    },
    {
      key: 'trangThai',
      header: 'Trạng Thái',
      align: 'center',
      render: (item) => (
        <StatusToggle
          checked={item.trangThai}
          onChange={(newValue) => handleMenuAppToggle(item.id, newValue)}
        />
      ),
    },
  ];

  // DataTable columns for Y Kien tab
  const yKienColumns: DataTableColumn<YKienItem>[] = [
    {
      key: 'duAn',
      header: 'Dự án',
      render: (item) => <span className="text-xs text-gray-600">{item.duAn}</span>,
    },
    {
      key: 'loaiYKien',
      header: 'Loại ý kiến',
      render: (item) => <span className="text-xs text-gray-600">{item.loaiYKien}</span>,
    },
    {
      key: 'trangThai',
      header: 'Trạng Thái',
      align: 'center',
      render: (item) => (
        <StatusToggle
          checked={item.trangThai}
          onChange={(newValue) => handleYKienToggle(item.id, newValue)}
        />
      ),
    },
  ];

  const totalRecords = activeTab === 'menu-app' ? menuAppData.length : yKienData.length;

  return (
    <div className="p-4 space-y-4">
      <PageHeader title="Menu app cư dân" breadcrumb={['Thiết lập', 'Menu app cư dân']} />

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-6 py-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === tab.id
                ? 'border-primary text-primary bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Card className="p-4 border-none shadow-sm rounded-[3px]">
        {/* Title based on tab */}
        <h3 className="text-base font-semibold text-gray-800 mb-4">
          {activeTab === 'menu-app' ? 'Menu App' : 'Danh mục ý kiến'}
        </h3>

        {/* Filter and Action */}
        <div className="flex items-end justify-between mb-4">
          <div className="flex items-end gap-4">
            <div className="w-64">
              <span className="block text-xs text-gray-600 mb-1">Chọn dự án</span>
              <FilterSelect
                value={selectedProject}
                onChange={setSelectedProject}
                options={PROJECT_OPTIONS}
                placeholder="Chọn dự án"
              />
            </div>
          </div>

          <Button
            onClick={() => setUnlockModalOpen(true)}
            className="h-9 gap-2 px-4 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-[3px]"
          >
            <Check className="h-4 w-4" />
            Mở khóa all
          </Button>
        </div>

        {/* DataTable for Menu App Tab */}
        {activeTab === 'menu-app' && (
          <DataTable
            data={menuAppData}
            columns={menuAppColumns}
            keyExtractor={(item) => item.id}
            showIndex
          />
        )}

        {/* DataTable for Y Kien Tab */}
        {activeTab === 'y-kien' && (
          <DataTable
            data={yKienData}
            columns={yKienColumns}
            keyExtractor={(item) => item.id}
            showIndex
          />
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalRecords / pageSize)}
          totalRecords={totalRecords}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </Card>

      {/* Unlock All Modal */}
      <UnlockAllModal
        open={unlockModalOpen}
        onOpenChange={setUnlockModalOpen}
        onConfirm={handleUnlockAll}
        itemType={activeTab}
      />
    </div>
  );
}
