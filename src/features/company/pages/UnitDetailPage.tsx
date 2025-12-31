import {
  ActionButtons,
  ConfirmModal,
  DataTable,
  type DataTableColumn,
  DateTimeCell,
  DetailPageHeader,
  FormActions,
  ResetPasswordModal,
  StatusToggle,
} from '@/components/common';
import { Card } from '@/components/ui';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { TabContainer, UnitForm } from '../components';

interface StaffItem {
  id: number;
  code: string;
  name: string;
  phone: string;
  email: string;
  department: string;
  unit: string;
  created: string;
  updated: string;
  status: boolean;
}

/**
 * Unit Detail/Edit Page
 * Displays detailed information about a unit with tabbed interface
 */
export function UnitDetailPage() {
  const { id: _id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'detail' | 'staff'>('detail');
  const [formData, setFormData] = useState({
    name: 'Lễ Tân',
    code: 'LT - BDC',
    department: '1',
    head: '1',
    projects: ['1'],
    email: 'vinhvqhe182301@fpt.edu.vn',
    phone: '',
    manageWarehouse: false,
    notes: '',
    status: true,
  });

  // Modal states
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; staff: StaffItem | null }>({
    isOpen: false,
    staff: null,
  });
  const [resetPasswordModal, setResetPasswordModal] = useState<{
    isOpen: boolean;
    staff: StaffItem | null;
  }>({
    isOpen: false,
    staff: null,
  });

  const handleFormChange = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeleteStaff = (staff: StaffItem) => {
    // TODO: Call delete API
    console.log('Deleting staff:', staff.id);
  };

  const handleResetPassword = (staff: StaffItem, newPassword: string) => {
    // TODO: Call reset password API
    console.log('Reset password for staff:', staff.id, 'New password:', newPassword);
  };

  // Mock staff data
  const staffList: StaffItem[] = [
    {
      id: 1,
      code: 'HP05',
      name: 'Phạm Hồng Thái',
      phone: '',
      email: '',
      department: 'Kho & Logistics',
      unit: 'Bộ phận 2',
      created: '20/06/2024 09:36:41',
      updated: '30/12/2025 15:06:20',
      status: false,
    },
    {
      id: 2,
      code: 'NV001',
      name: 'Nguyễn Văn A',
      phone: '0912345678',
      email: 'nva@email.com',
      department: 'Lễ Tân',
      unit: 'LT - BDC',
      created: '15/06/2024 10:00:00',
      updated: '25/12/2025 14:30:00',
      status: true,
    },
    {
      id: 3,
      code: 'NV002',
      name: 'Trần Thị B',
      phone: '0987654321',
      email: 'ttb@email.com',
      department: 'Bảo vệ',
      unit: 'BV - BDC',
      created: '10/06/2024 08:15:00',
      updated: '20/12/2025 09:00:00',
      status: true,
    },
    {
      id: 4,
      code: 'NV003',
      name: 'Lê Văn C',
      phone: '0909123456',
      email: '',
      department: 'ADMIN',
      unit: 'ADMIN - BDC',
      created: '05/06/2024 11:45:00',
      updated: '15/12/2025 16:20:00',
      status: false,
    },
  ];

  const staffColumns: DataTableColumn<StaffItem>[] = [
    {
      key: 'code',
      header: 'Mã nhân viên',
      render: (staff) => <span className="text-xs font-semibold text-blue-500">{staff.code}</span>,
    },
    {
      key: 'name',
      header: 'Tên nhân viên',
      render: (staff) => <span className="text-xs font-bold text-gray-700">{staff.name}</span>,
    },
    {
      key: 'phone',
      header: 'SĐT',
      render: (staff) => (
        <span className="text-xs font-semibold text-gray-600">{staff.phone || '-'}</span>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      render: (staff) => (
        <span className="text-xs font-semibold text-gray-600">{staff.email || '-'}</span>
      ),
    },
    {
      key: 'department',
      header: 'Phòng ban',
      render: (staff) => (
        <span className="text-xs font-semibold text-gray-600">{staff.department}</span>
      ),
    },
    {
      key: 'unit',
      header: 'Bộ phận',
      render: (staff) => <span className="text-xs font-semibold text-gray-600">{staff.unit}</span>,
    },
    {
      key: 'created',
      header: 'Thời gian tạo',
      render: (staff) => <DateTimeCell datetime={staff.created} />,
    },
    {
      key: 'updated',
      header: 'Thời gian cập nhật',
      render: (staff) => <DateTimeCell datetime={staff.updated} />,
    },
    {
      key: 'status',
      header: 'Trạng Thái',
      align: 'center',
      render: (staff) => <StatusToggle checked={staff.status} />,
    },
    {
      key: 'actions',
      header: 'Thao tác',
      align: 'center',
      render: (staff) => (
        <ActionButtons
          onView={() => {
            // TODO: Navigate to staff detail page when implemented
            alert(`Xem chi tiết nhân viên: ${staff.name}`);
          }}
          onDelete={() => setDeleteModal({ isOpen: true, staff })}
          onSync={() => setResetPasswordModal({ isOpen: true, staff })}
          showSync
        />
      ),
    },
  ];

  const tabs = [
    { id: 'detail', label: 'Chi tiết' },
    { id: 'staff', label: 'Danh sách nhân sự' },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Page Header */}
      <DetailPageHeader title="Chi tiết bộ phận" onBack={() => navigate(-1)} />

      {/* Tabs */}
      <Card className="overflow-hidden border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <TabContainer
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId as 'detail' | 'staff')}
        >
          {activeTab === 'detail' && (
            <div className="p-6 space-y-6">
              {/* Form Fields */}
              <UnitForm data={formData} onChange={handleFormChange} />

              {/* Action Buttons */}
              <FormActions onCancel={() => navigate(-1)} submitText="Lưu thay đổi" />
            </div>
          )}

          {activeTab === 'staff' && (
            <div className="p-6">
              <DataTable
                columns={staffColumns}
                data={staffList}
                keyExtractor={(staff) => staff.id}
                minWidth="1200px"
              />

              {/* Pagination */}
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-xs font-bold text-gray-500">
                  Tổng số: {staffList.length} bản ghi
                </span>
                <select className="h-8 px-2 border border-gray-200 rounded-[3px] text-xs font-bold text-gray-600 outline-none">
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>

              {/* Footer Buttons */}
              <FormActions
                onCancel={() => navigate(-1)}
                cancelText="Trở về"
                cancelVariant="destructive"
                submitText="Cập nhật"
              />
            </div>
          )}
        </TabContainer>
      </Card>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, staff: null })}
        onConfirm={() => {
          if (deleteModal.staff) {
            handleDeleteStaff(deleteModal.staff);
          }
        }}
        title="Xóa nhân viên"
        message={`Bạn có chắc chắn muốn xóa nhân viên "${deleteModal.staff?.name}"? Thao tác này không thể hoàn tác.`}
        confirmText="Xóa"
        type="danger"
      />

      {/* Reset Password Modal */}
      <ResetPasswordModal
        isOpen={resetPasswordModal.isOpen}
        onClose={() => setResetPasswordModal({ isOpen: false, staff: null })}
        onConfirm={(newPassword) => {
          if (resetPasswordModal.staff) {
            handleResetPassword(resetPasswordModal.staff, newPassword);
          }
        }}
        userName={resetPasswordModal.staff?.name || ''}
      />
    </div>
  );
}
