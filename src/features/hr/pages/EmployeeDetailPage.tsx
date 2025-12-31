import { FormField, PageHeader } from '@/components/common';
import { Button, Card, Input } from '@/components/ui';
import { useState } from 'react';
import { useNavigate } from 'react-router';

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

  // Form data
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
  });

  const handleBack = () => {
    navigate('/hr/employees');
  };

  const renderGeneralTab = () => (
    <div className="space-y-6">
      {/* Personal Info Section */}
      <Card className="p-4 border-none shadow-sm rounded-[3px]">
        <h3 className="text-sm font-bold text-gray-700 border-b pb-2 mb-4">Thông tin cá nhân</h3>
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Mã nhân viên" required>
            <Input
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Mã nhân viên cũ">
            <Input
              value={formData.oldCode}
              onChange={(e) => setFormData({ ...formData, oldCode: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Họ và tên" required>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Ngày sinh" required>
            <Input
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Giới tính" required>
            <div className="flex items-center gap-4 h-10">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                />
                <span className="text-sm">Nam</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                />
                <span className="text-sm">Nữ</span>
              </label>
            </div>
          </FormField>
          <FormField label="Tình trạng hôn nhân">
            <select
              value={formData.maritalStatus}
              onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
              className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
            >
              <option value="">Chọn</option>
              <option value="single">Độc thân</option>
              <option value="married">Đã kết hôn</option>
            </select>
          </FormField>
          <FormField label="Số CMND/CCCD">
            <Input
              value={formData.idNumber}
              onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Ngày cấp">
            <Input
              type="date"
              value={formData.idIssueDate}
              onChange={(e) => setFormData({ ...formData, idIssueDate: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Nơi cấp">
            <Input
              value={formData.idIssuePlace}
              onChange={(e) => setFormData({ ...formData, idIssuePlace: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
        </div>
      </Card>

      {/* Contact Info Section */}
      <Card className="p-4 border-none shadow-sm rounded-[3px]">
        <h3 className="text-sm font-bold text-gray-700 border-b pb-2 mb-4">Thông tin liên lạc</h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Địa chỉ hiện tại">
            <Input
              value={formData.currentAddress}
              onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Địa chỉ thường trú">
            <Input
              value={formData.permanentAddress}
              onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Số điện thoại" required>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Email cá nhân">
            <Input
              type="email"
              value={formData.personalEmail}
              onChange={(e) => setFormData({ ...formData, personalEmail: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
        </div>
      </Card>

      {/* Work Info Section */}
      <Card className="p-4 border-none shadow-sm rounded-[3px]">
        <h3 className="text-sm font-bold text-gray-700 border-b pb-2 mb-4">
          Thông tin tiếp nhận nhân sự
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Mã chấm công">
            <Input
              value={formData.timekeepingCode}
              onChange={(e) => setFormData({ ...formData, timekeepingCode: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Ngày vào làm" required>
            <Input
              type="date"
              value={formData.entryDate}
              onChange={(e) => setFormData({ ...formData, entryDate: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Ca làm việc">
            <select className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white">
              <option value="">Chọn ca làm việc</option>
              <option value="ca1">Ca sáng</option>
              <option value="ca2">Ca chiều</option>
            </select>
          </FormField>
          <FormField label="Phòng ban" required>
            <select
              value={formData.departmentId}
              onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
              className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
            >
              <option value="">Chọn phòng ban</option>
              <option value="1">Phòng IT</option>
              <option value="2">Phòng Nhân sự</option>
            </select>
          </FormField>
          <FormField label="Bộ phận">
            <select
              value={formData.sectionId}
              onChange={(e) => setFormData({ ...formData, sectionId: e.target.value })}
              className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
            >
              <option value="">Chọn bộ phận</option>
              <option value="1">Backend</option>
              <option value="2">Frontend</option>
            </select>
          </FormField>
          <FormField label="Chức vụ" required>
            <select
              value={formData.positionId}
              onChange={(e) => setFormData({ ...formData, positionId: e.target.value })}
              className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
            >
              <option value="">Chọn chức vụ</option>
              <option value="1">Nhân viên</option>
              <option value="2">Trưởng phòng</option>
            </select>
          </FormField>
        </div>
      </Card>

      {/* Insurance Section */}
      <Card className="p-4 border-none shadow-sm rounded-[3px]">
        <h3 className="text-sm font-bold text-gray-700 border-b pb-2 mb-4">
          Bảo hiểm xã hội & Y tế
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Số BHXH">
            <Input
              value={formData.socialInsuranceNo}
              onChange={(e) => setFormData({ ...formData, socialInsuranceNo: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Số thẻ BHYT">
            <Input
              value={formData.healthInsuranceNo}
              onChange={(e) => setFormData({ ...formData, healthInsuranceNo: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Ngày hết hạn BHYT">
            <Input
              type="date"
              value={formData.healthInsuranceExpiry}
              onChange={(e) => setFormData({ ...formData, healthInsuranceExpiry: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Nơi đăng ký KCBBD">
            <Input
              value={formData.medicalPlace}
              onChange={(e) => setFormData({ ...formData, medicalPlace: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
        </div>
      </Card>

      {/* Tax & Bank Section */}
      <Card className="p-4 border-none shadow-sm rounded-[3px]">
        <h3 className="text-sm font-bold text-gray-700 border-b pb-2 mb-4">Thuế & Tài khoản</h3>
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Mã số thuế">
            <Input
              value={formData.taxId}
              onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Ngân hàng">
            <select
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
            >
              <option value="">Chọn ngân hàng</option>
              <option value="vcb">Vietcombank</option>
              <option value="bidv">BIDV</option>
              <option value="tcb">Techcombank</option>
            </select>
          </FormField>
          <FormField label="Số tài khoản">
            <Input
              value={formData.bankAccountNo}
              onChange={(e) => setFormData({ ...formData, bankAccountNo: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
        </div>
      </Card>
    </div>
  );

  const renderContractsTab = () => (
    <Card className="p-4 border-none shadow-sm rounded-[3px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-gray-700">Danh sách hợp đồng</h3>
        <Button className="h-9 gap-2 px-4 text-sm font-semibold bg-primary text-white rounded-[3px]">
          Thêm hợp đồng
        </Button>
      </div>
      <table className="w-full text-xs">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left font-semibold text-gray-500">STT</th>
            <th className="p-3 text-left font-semibold text-gray-500">Số hợp đồng</th>
            <th className="p-3 text-left font-semibold text-gray-500">Tên hợp đồng</th>
            <th className="p-3 text-left font-semibold text-gray-500">Loại</th>
            <th className="p-3 text-left font-semibold text-gray-500">Ngày ký</th>
            <th className="p-3 text-left font-semibold text-gray-500">Ngày hết hạn</th>
            <th className="p-3 text-center font-semibold text-gray-500">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={7} className="p-8 text-center text-gray-400">
              Chưa có hợp đồng nào
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );

  const renderScheduleTab = () => (
    <Card className="p-4 border-none shadow-sm rounded-[3px]">
      <h3 className="text-sm font-bold text-gray-700 mb-4">Lịch làm việc tháng 12/2025</h3>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
          <div key={day} className="p-2 bg-gray-100 font-semibold text-gray-600">
            {day}
          </div>
        ))}
        {Array.from({ length: 31 }, (_, i) => (
          <div key={i} className="p-3 border border-gray-100 min-h-[60px] text-gray-600">
            {i + 1}
          </div>
        ))}
      </div>
    </Card>
  );

  const renderAssetsTab = () => (
    <Card className="p-4 border-none shadow-sm rounded-[3px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-gray-700">Tài sản cấp phát</h3>
        <Button className="h-9 gap-2 px-4 text-sm font-semibold bg-primary text-white rounded-[3px]">
          Thêm tài sản
        </Button>
      </div>
      <table className="w-full text-xs">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left font-semibold text-gray-500">Mã tài sản</th>
            <th className="p-3 text-left font-semibold text-gray-500">Tên tài sản</th>
            <th className="p-3 text-left font-semibold text-gray-500">Loại</th>
            <th className="p-3 text-center font-semibold text-gray-500">Số lượng</th>
            <th className="p-3 text-left font-semibold text-gray-500">Đơn vị</th>
            <th className="p-3 text-left font-semibold text-gray-500">Ngày cấp</th>
            <th className="p-3 text-center font-semibold text-gray-500">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={7} className="p-8 text-center text-gray-400">
              Chưa có tài sản nào
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );

  const renderOtherTab = () => (
    <Card className="p-4 border-none shadow-sm rounded-[3px]">
      <h3 className="text-sm font-bold text-gray-700 border-b pb-2 mb-4">Thông tin khác</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Trình độ học vấn">
          <select className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white">
            <option value="">Chọn</option>
            <option value="highschool">Trung học</option>
            <option value="college">Cao đẳng</option>
            <option value="bachelor">Đại học</option>
            <option value="master">Thạc sĩ</option>
          </select>
        </FormField>
        <FormField label="Chuyên ngành">
          <Input className="h-10 rounded-[3px]" placeholder="Nhập chuyên ngành" />
        </FormField>
        <FormField label="Ngoại ngữ">
          <Input className="h-10 rounded-[3px]" placeholder="Nhập ngoại ngữ" />
        </FormField>
        <FormField label="Tin học">
          <Input className="h-10 rounded-[3px]" placeholder="Nhập kỹ năng tin học" />
        </FormField>
        <FormField label="Email nội bộ">
          <Input type="email" className="h-10 rounded-[3px]" placeholder="Nhập email nội bộ" />
        </FormField>
        <FormField label="Tệp đính kèm">
          <Input type="file" className="h-10 rounded-[3px]" />
        </FormField>
      </div>
    </Card>
  );

  const renderPermissionsTab = () => (
    <Card className="p-4 border-none shadow-sm rounded-[3px]">
      <h3 className="text-sm font-bold text-gray-700 border-b pb-2 mb-4">Phân quyền</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Nhóm quyền">
          <select className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white">
            <option value="">Chọn nhóm quyền</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="staff">Staff</option>
          </select>
        </FormField>
        <FormField label="Dự án phụ trách">
          <select className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white">
            <option value="">Chọn dự án</option>
            <option value="1">Dự án A</option>
            <option value="2">Dự án B</option>
          </select>
        </FormField>
      </div>
    </Card>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralTab();
      case 'contracts':
        return renderContractsTab();
      case 'schedule':
        return renderScheduleTab();
      case 'assets':
        return renderAssetsTab();
      case 'other':
        return renderOtherTab();
      case 'permissions':
        return renderPermissionsTab();
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
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
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
