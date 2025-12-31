import { DetailPageHeader, FormActions } from '@/components/common';
import { Card } from '@/components/ui';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { UnitForm } from '../components';

/**
 * Unit Insert/Create Page
 * Form for creating a new unit
 */
export function UnitInsertPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    department: '',
    head: '',
    projects: [] as string[],
    email: '',
    phone: '',
    manageWarehouse: false,
    notes: '',
    status: true,
  });

  const handleFormChange = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Submit:', formData);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Page Header */}
      <DetailPageHeader title="Thêm mới bộ phận" onBack={() => navigate(-1)} />

      {/* Form Card */}
      <Card className="overflow-hidden border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <div className="p-6 space-y-6">
          {/* Form Fields */}
          <UnitForm data={formData} onChange={handleFormChange} showStatus />

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
