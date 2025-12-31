import { DetailPageHeader, FormActions } from '@/components/common';
import { Card } from '@/components/ui';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CategoryRadioGroup, DepartmentForm, SignatureUpload } from '../components';

/**
 * Department Insert/Create Page
 * Form for creating a new department
 */
export function DepartmentInsertPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<'company' | 'project'>('company');
  const [signature, setSignature] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    confirmer: '',
    head: '',
    address: '',
    email: '',
    phone: '',
    project: '',
    notes: '',
  });

  const handleFormChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Submit:', { category, signature, ...formData });
  };

  return (
    <div className="p-4 space-y-4">
      {/* Page Header */}
      <DetailPageHeader title="Thêm mới phòng ban" onBack={() => navigate(-1)} />

      {/* Form Card */}
      <Card className="overflow-hidden border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <div className="p-6 space-y-6">
          {/* Signature Upload */}
          <SignatureUpload value={signature} onChange={setSignature} />

          {/* Category Radio */}
          <CategoryRadioGroup value={category} onChange={setCategory} />

          {/* Form Fields */}
          <DepartmentForm data={formData} onChange={handleFormChange} />

          {/* Action Buttons */}
          <FormActions
            onCancel={() => navigate(-1)}
            onSubmit={handleSubmit}
            submitText="Thêm mới"
          />
        </div>
      </Card>
    </div>
  );
}
