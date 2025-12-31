import { PageHeader } from '@/components/common';
import { Button, Card } from '@/components/ui';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  AssetsTab,
  ContractsTab,
  GeneralTab,
  OtherTab,
  PermissionsTab,
  ScheduleTab,
} from '../components/employee-detail';

type TabId = 'general' | 'contracts' | 'schedule' | 'assets' | 'other' | 'permissions';

const TABS: { id: TabId; label: string }[] = [
  { id: 'general', label: 'Thông tin chung' },
  { id: 'contracts', label: 'Hợp đồng' },
  { id: 'schedule', label: 'Lịch làm việc' },
  { id: 'assets', label: 'Tài sản cấp phát' },
  { id: 'other', label: 'Khác' },
  { id: 'permissions', label: 'Phân quyền' },
];

export function EmployeeDetailPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('general');

  // Form data - shared across tabs
  const [formData, setFormData] = useState({
    // Personal info
    code: 'NV001',
    oldCode: '',
    name: 'Nguyễn Văn A',
    birthDate: '1990-01-15',
    gender: 'male',
    maritalStatus: '',
    ethnicity: '',
    religion: '',
    idNumber: '012345678901',
    idIssueDate: '',
    idIssuePlace: '',
    status: true,
    // Contact info
    currentAddress: '',
    permanentAddress: '',
    origin: '',
    birthPlace: '',
    phone: '0901234567',
    personalEmail: 'nva@gmail.com',
    // Work info
    timekeepingCode: 'CC001',
    entryDate: '2020-01-01',
    shifts: [],
    decisionDate: '',
    decisionNumber: '',
    level: '',
    departmentId: '',
    sectionId: '',
    positionId: '',
    // Insurance
    socialInsuranceNo: '',
    healthInsuranceNo: '',
    healthInsuranceExpiry: '',
    medicalPlace: '',
    // Tax
    taxId: '',
    taxAuthorization: '',
    // Bank
    bankName: '',
    bankAccountNo: '',
    // Health
    healthStatus: '',
    height: '',
    weight: '',
    diseases: '',
    // Education
    education: '',
    major: '',
    foreignLanguage: '',
    computerSkill: '',
    internalEmail: '',
  });

  const handleBack = () => {
    navigate('/hr/employees');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralTab formData={formData} setFormData={setFormData} />;
      case 'contracts':
        return <ContractsTab />;
      case 'schedule':
        return <ScheduleTab />;
      case 'assets':
        return <AssetsTab />;
      case 'other':
        return <OtherTab formData={formData} setFormData={setFormData} />;
      case 'permissions':
        return <PermissionsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <PageHeader
        title="Chi tiết nhân sự"
        breadcrumb={['Quản Lý Nhân Sự', 'Danh sách nhân sự', 'Chi tiết']}
      />

      {/* Tabs */}
      <Card className="p-0 border-none shadow-sm rounded-[3px] overflow-hidden">
        <div className="flex border-b border-gray-200 bg-white">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Action buttons */}
      <Card className="p-4 border-none shadow-sm rounded-[3px]">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={handleBack}
            className="h-9 px-6 text-sm font-semibold rounded-[3px]"
          >
            Trở về
          </Button>
          <Button className="h-9 px-6 text-sm font-semibold bg-primary text-white rounded-[3px]">
            Lưu thay đổi
          </Button>
        </div>
      </Card>
    </div>
  );
}
