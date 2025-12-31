import {
  ActionButtons,
  DataTable,
  type DataTableColumn,
  DetailPageHeader,
  FormActions,
} from '@/components/common';
import { Card } from '@/components/ui';
import { TabContainer } from '@/features/company/components';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PermissionAccordion, PermissionGroupForm } from '../components';
import { defaultPermissionSections } from '../data/permissionData';
import type { UserInGroup } from '../types/permission.types';

/**
 * Permission Group Detail/Edit Page
 * Displays detailed information with tabs (Detail + User List)
 */
export function PermissionGroupDetailPage() {
  const { id: _id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'detail' | 'users'>('detail');
  const [formData, setFormData] = useState({
    name: 'Admin',
    status: true,
  });
  // Structure: { sectionId: { permissionId: ['view', 'update', ...] } }
  const [selectedPermissions, setSelectedPermissions] = useState<
    Record<string, Record<string, string[]>>
  >({
    app: {
      app_nhan_vien: ['view'],
      app_phong_ban: ['view'],
      app_cham_cong: ['view'],
    },
    web: {
      web_nhom_quyen: ['view', 'detail', 'insert', 'update'],
      web_phong_ban: ['view', 'detail'],
      web_bo_phan: ['view', 'detail'],
    },
    notification: {
      noti_dat_cho: ['thong_bao'],
      noti_y_kien: ['thong_bao'],
    },
  });

  // Mock users in this group
  const users: UserInGroup[] = [
    {
      id: 1,
      code: 'NV001',
      name: 'Nguyễn Văn A',
      phone: '0912345678',
      email: 'nva@email.com',
      department: 'Admin',
      unit: 'ADMIN - BDC',
      createdAt: '15/06/2024 10:00:00',
      updatedAt: '25/12/2025 14:30:00',
      status: true,
    },
    {
      id: 2,
      code: 'NV002',
      name: 'Trần Thị B',
      phone: '0987654321',
      email: 'ttb@email.com',
      department: 'Quản lý',
      unit: 'QL - BDC',
      createdAt: '10/06/2024 08:15:00',
      updatedAt: '20/12/2025 09:00:00',
      status: true,
    },
  ];

  const handleFormChange = <K extends 'name' | 'status'>(
    field: K,
    value: K extends 'name' ? string : boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePermissionChange = (sectionId: string, permissionId: string, actions: string[]) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [permissionId]: actions,
      },
    }));
  };

  const userColumns: DataTableColumn<UserInGroup>[] = [
    {
      key: 'id',
      header: 'Id',
      render: (user) => <span className="text-xs font-semibold text-gray-700">{user.id}</span>,
    },
    {
      key: 'name',
      header: 'Họ tên',
      render: (user) => <span className="text-xs font-bold text-gray-700">{user.name}</span>,
    },
    {
      key: 'code',
      header: 'Mã nhân viên',
      render: (user) => <span className="text-xs font-semibold text-blue-500">{user.code}</span>,
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'center',
      render: (user) => (
        <ActionButtons onDelete={() => console.log('remove user from group', user.id)} />
      ),
    },
  ];

  const tabs = [
    { id: 'detail', label: 'Thông tin chi tiết' },
    { id: 'users', label: 'Danh sách người dùng' },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Page Header */}
      <DetailPageHeader title="Chi tiết nhóm quyền" onBack={() => navigate(-1)} />

      {/* Tabs */}
      <Card className="overflow-hidden border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <TabContainer
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId as 'detail' | 'users')}
        >
          {activeTab === 'detail' && (
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <PermissionGroupForm data={formData} onChange={handleFormChange} />

              {/* Permissions */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-700 uppercase">Phân quyền</h3>
                <PermissionAccordion
                  sections={defaultPermissionSections}
                  selectedPermissions={selectedPermissions}
                  onChange={handlePermissionChange}
                />
              </div>

              {/* Action Buttons */}
              <FormActions onCancel={() => navigate(-1)} submitText="Cập nhật" />
            </div>
          )}

          {activeTab === 'users' && (
            <div className="p-6 space-y-4">
              {/* User Select Dropdown */}
              <div className="space-y-2">
                <span className="text-sm font-semibold text-gray-700">Chọn nhân viên</span>
                <select
                  className="w-full p-2 border border-gray-200 rounded-[3px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) {
                      console.log('Add user to group:', e.target.value);
                      e.target.value = '';
                    }
                  }}
                >
                  <option value="" disabled>
                    Tìm và chọn nhân viên để thêm vào nhóm...
                  </option>
                  <option value="3">Lê Văn C - NV003</option>
                  <option value="4">Phạm Thị D - NV004</option>
                  <option value="5">Hoàng Văn E - NV005</option>
                </select>
              </div>

              {/* User List Table */}
              <DataTable
                columns={userColumns}
                data={users}
                keyExtractor={(user) => user.id}
                minWidth="600px"
              />

              {/* Action Buttons */}
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
    </div>
  );
}
