import {
  ActionButtons,
  ConfirmModal,
  DataTable,
  type DataTableColumn,
  DateTimeCell,
  DetailPageHeader,
  FormActions,
  StatusToggle,
} from '@/components/common';
import { Card } from '@/components/ui';
import { ROUTES } from '@/config';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CategoryRadioGroup, DepartmentForm, SignatureUpload, TabContainer } from '../components';

interface UnitItem {
  id: number;
  parent: string;
  name: string;
  code: string;
  hotline: string;
  email: string;
  head: string;
  created: string;
  updated: string;
  status: boolean;
}

/**
 * Department Detail/Edit Page
 * Displays detailed information about a department with tabbed interface
 */
export function DepartmentDetailPage() {
  const { id: _id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'detail' | 'units'>('detail');
  const [category, setCategory] = useState<'company' | 'project'>('company');
  const [signature, setSignature] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: 'Ban quản lý S-TECH',
    code: 'BQLS',
    confirmer: 'Nguyễn Văn A',
    head: '1',
    address: '123 Nguyễn Văn Linh, Q7',
    email: 'contact@stech.vn',
    phone: '0912345678',
    project: '1',
    notes: '',
  });

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; unit: UnitItem | null }>({
    isOpen: false,
    unit: null,
  });

  const handleFormChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeleteUnit = (unit: UnitItem) => {
    // TODO: Call delete API
    console.log('Deleting unit:', unit.id);
  };

  // Mock units data
  const units: UnitItem[] = [
    {
      id: 1,
      parent: 'BUIDING CARE - BDC',
      name: 'Kho',
      code: 'KHO',
      hotline: '',
      email: '',
      head: 'Nhân sự test',
      created: '15/09/2025 11:17:51',
      updated: '03/10/2025 08:56:07',
      status: true,
    },
    {
      id: 2,
      parent: 'BUIDING CARE - BDC',
      name: 'Lễ Tân',
      code: 'LT - BDC',
      hotline: '',
      email: 'vinhvqhe182301@fpt.edu.vn',
      head: '',
      created: '12/09/2025 09:47:09',
      updated: '12/09/2025 10:14:57',
      status: true,
    },
    {
      id: 3,
      parent: 'BUIDING CARE - BDC',
      name: 'Bảo vệ',
      code: 'BV - BDC',
      hotline: '',
      email: '',
      head: 'Vũ Quang Vinh',
      created: '12/09/2025 09:44:28',
      updated: '15/09/2025 13:57:02',
      status: false,
    },
    {
      id: 4,
      parent: 'BUIDING CARE - BDC',
      name: 'ADMIN - BDC',
      code: 'ADMIN - BDC',
      hotline: '0969785355',
      email: 'vunoname248712@gmail.com',
      head: 'Vũ Quang Vinh',
      created: '12/09/2025 09:26:00',
      updated: '12/09/2025 10:14:00',
      status: false,
    },
  ];

  const unitColumns: DataTableColumn<UnitItem>[] = [
    {
      key: 'parent',
      header: 'Tên phòng ban / dự án',
      render: (unit) => <span className="text-xs font-semibold text-blue-500">{unit.parent}</span>,
    },
    {
      key: 'name',
      header: 'Tên bộ phận',
      render: (unit) => <span className="text-xs font-bold text-gray-700">{unit.name}</span>,
    },
    {
      key: 'code',
      header: 'Mã bộ phận',
      render: (unit) => <span className="text-xs font-semibold text-gray-600">{unit.code}</span>,
    },
    {
      key: 'hotline',
      header: 'Hotline',
      render: (unit) => (
        <span className="text-xs font-semibold text-gray-600">{unit.hotline || '-'}</span>
      ),
    },
    {
      key: 'email',
      header: 'Email liên hệ',
      render: (unit) => (
        <span className="text-xs font-semibold text-gray-600">{unit.email || '-'}</span>
      ),
    },
    {
      key: 'head',
      header: 'Trưởng bộ phận',
      render: (unit) => <span className="text-xs font-bold text-gray-700">{unit.head || '-'}</span>,
    },
    {
      key: 'created',
      header: 'Thời gian tạo',
      render: (unit) => <DateTimeCell datetime={unit.created} />,
    },
    {
      key: 'updated',
      header: 'Thời gian cập nhật',
      render: (unit) => <DateTimeCell datetime={unit.updated} />,
    },
    {
      key: 'status',
      header: 'Trạng Thái',
      align: 'center',
      render: (unit) => <StatusToggle checked={unit.status} />,
    },
    {
      key: 'actions',
      header: 'Thao tác',
      align: 'center',
      render: (unit) => (
        <ActionButtons
          onView={() => navigate(ROUTES.COMPANY.UNIT_DETAIL(unit.id))}
          onDelete={() => setDeleteModal({ isOpen: true, unit })}
        />
      ),
    },
  ];

  const tabs = [
    { id: 'detail', label: 'Chi tiết' },
    { id: 'units', label: 'Danh sách bộ phận' },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Page Header */}
      <DetailPageHeader title="Chi tiết phòng ban" onBack={() => navigate(-1)} />

      {/* Tabs */}
      <Card className="overflow-hidden border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <TabContainer
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId as 'detail' | 'units')}
        >
          {activeTab === 'detail' && (
            <div className="p-6 space-y-6">
              {/* Signature Upload */}
              <SignatureUpload value={signature} onChange={setSignature} />

              {/* Category Radio */}
              <CategoryRadioGroup value={category} onChange={setCategory} />

              {/* Form Fields */}
              <DepartmentForm data={formData} onChange={handleFormChange} />

              {/* Action Buttons */}
              <FormActions onCancel={() => navigate(-1)} submitText="Lưu thay đổi" />
            </div>
          )}

          {activeTab === 'units' && (
            <div className="p-6">
              <DataTable
                columns={unitColumns}
                data={units}
                keyExtractor={(unit) => unit.id}
                minWidth="1200px"
              />
            </div>
          )}
        </TabContainer>
      </Card>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, unit: null })}
        onConfirm={() => {
          if (deleteModal.unit) {
            handleDeleteUnit(deleteModal.unit);
          }
        }}
        title="Xóa bộ phận"
        message={`Bạn có chắc chắn muốn xóa bộ phận "${deleteModal.unit?.name}"? Thao tác này không thể hoàn tác.`}
        confirmText="Xóa"
        type="danger"
      />
    </div>
  );
}
