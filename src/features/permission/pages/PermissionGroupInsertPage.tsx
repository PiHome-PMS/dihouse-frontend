import { DetailPageHeader, FormActions } from '@/components/common';
import { Card } from '@/components/ui';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PermissionAccordion, PermissionGroupForm } from '../components';
import { defaultPermissionSections } from '../data/permissionData';

/**
 * Permission Group Insert/Create Page
 * Form for creating a new permission group
 */
export function PermissionGroupInsertPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    status: true,
  });

  // Structure: { sectionId: { permissionId: ['view', 'update', ...] } }
  const [selectedPermissions, setSelectedPermissions] = useState<
    Record<string, Record<string, string[]>>
  >({
    app: {},
    web: {},
    notification: {},
  });

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

  const handleSubmit = () => {
    console.log('Submit:', { ...formData, permissions: selectedPermissions });
  };

  return (
    <div className="p-4 space-y-4">
      {/* Page Header */}
      <DetailPageHeader title="Thêm mới nhóm quyền" onBack={() => navigate(-1)} />

      {/* Form Card */}
      <Card className="overflow-hidden border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
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
          <FormActions
            onCancel={() => navigate(-1)}
            onSubmit={handleSubmit}
            cancelText="Trở về"
            cancelVariant="destructive"
            submitText="Thêm mới"
          />
        </div>
      </Card>
    </div>
  );
}
