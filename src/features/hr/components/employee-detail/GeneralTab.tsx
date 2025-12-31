import { FormField } from '@/components/common';
import { Button, Card, Input } from '@/components/ui';
import { Camera } from 'lucide-react';
import { useState } from 'react';

interface EmployeeFormData {
  [key: string]: string | boolean | number | undefined;
}

interface GeneralTabProps {
  formData: EmployeeFormData;
  setFormData: (data: EmployeeFormData) => void;
}

// Helper to safely get string value for input
const str = (val: string | boolean | number | undefined): string => {
  return val === undefined || val === true || val === false ? '' : String(val);
};

export function GeneralTab({ formData, setFormData }: GeneralTabProps) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Personal Info Section */}
      <Card className="p-4 border-none shadow-sm rounded-[3px]">
        <h3 className="text-sm font-bold text-gray-700 border-b pb-2 mb-4">Thông tin cá nhân</h3>

        {/* First group: Avatar + 2 columns of fields */}
        <div className="flex gap-6 mb-4">
          {/* Avatar on the left */}
          <div className="flex-shrink-0">
            <FormField label="Ảnh đại diện">
              <div className="flex flex-col items-center gap-2">
                <div className="w-32 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <label className="cursor-pointer">
                  <span className="text-xs text-primary hover:underline">Chọn ảnh</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
            </FormField>
          </div>

          {/* Fields next to avatar - 2 columns, 3 rows */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {/* Row 1 */}
            <FormField label="Mã nhân viên" required>
              <Input
                value={str(formData.code)}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="h-10 rounded-[3px]"
              />
            </FormField>
            <FormField label="Tên nhân viên" required>
              <Input
                value={str(formData.name)}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-10 rounded-[3px]"
              />
            </FormField>

            {/* Row 2 */}
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
            <FormField label="Dân tộc">
              <Input
                value={str(formData.ethnicity)}
                onChange={(e) => setFormData({ ...formData, ethnicity: e.target.value })}
                className="h-10 rounded-[3px]"
                placeholder="Nhập dân tộc"
              />
            </FormField>
          </div>
        </div>

        {/* ID Card Row: CMND, Nơi cấp, Ngày cấp */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <FormField label="CMND / Hộ chiếu">
            <Input
              value={str(formData.idNumber)}
              onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Nơi cấp">
            <Input
              value={str(formData.idIssuePlace)}
              onChange={(e) => setFormData({ ...formData, idIssuePlace: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Ngày cấp">
            <Input
              type="date"
              value={str(formData.idIssueDate)}
              onChange={(e) => setFormData({ ...formData, idIssueDate: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
        </div>

        {/* Second group: 3 columns without avatar */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <FormField label="Mã cũ">
            <Input
              value={str(formData.oldCode)}
              onChange={(e) => setFormData({ ...formData, oldCode: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Ngày sinh" required>
            <Input
              type="date"
              value={str(formData.birthDate)}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Tình trạng hôn nhân">
            <select
              value={str(formData.maritalStatus)}
              onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
              className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
            >
              <option value="">Chọn</option>
              <option value="single">Độc thân</option>
              <option value="married">Đã kết hôn</option>
            </select>
          </FormField>
        </div>

        {/* Third group: 3 columns */}
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Tôn giáo">
            <Input
              value={str(formData.religion)}
              onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
              className="h-10 rounded-[3px]"
              placeholder="Nhập tôn giáo"
            />
          </FormField>
          <FormField label="Trạng thái">
            <div className="flex items-center h-10">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.status)}
                  onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                <span className="ml-3 text-sm text-gray-600">
                  {formData.status ? 'Đang làm việc' : 'Nghỉ việc'}
                </span>
              </label>
            </div>
          </FormField>
        </div>
      </Card>

      {/* Contact Info Section */}
      <Card className="p-4 border-none shadow-sm rounded-[3px]">
        <h3 className="text-sm font-bold text-gray-700 border-b pb-2 mb-4">Thông tin liên lạc</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <FormField label="Địa chỉ hiện tại">
            <Input
              value={str(formData.currentAddress)}
              onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Nguyên quán">
            <Input
              value={str(formData.origin)}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              className="h-10 rounded-[3px]"
              placeholder="Nhập nguyên quán"
            />
          </FormField>
          <FormField label="Số điện thoại" required>
            <Input
              value={str(formData.phone)}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormField label="Địa chỉ thường trú">
            <Input
              value={str(formData.permanentAddress)}
              onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Nơi sinh">
            <Input
              value={str(formData.birthPlace)}
              onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
              className="h-10 rounded-[3px]"
              placeholder="Nhập nơi sinh"
            />
          </FormField>
          <FormField label="Email cá nhân">
            <Input
              type="email"
              value={str(formData.personalEmail)}
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
        <div className="grid grid-cols-3 gap-4 mb-4">
          <FormField label="Mã chấm công">
            <Input
              value={str(formData.timekeepingCode)}
              onChange={(e) => setFormData({ ...formData, timekeepingCode: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Ngày vào làm" required>
            <Input
              type="date"
              value={str(formData.entryDate)}
              onChange={(e) => setFormData({ ...formData, entryDate: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Ca làm việc">
            <div className="flex flex-wrap items-center gap-4 h-10">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" value="ca_sang" className="rounded" />
                <span className="text-sm">Ca sáng</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" value="ca_chieu" className="rounded" />
                <span className="text-sm">Ca chiều</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" value="ca_dem" className="rounded" />
                <span className="text-sm">Ca đêm</span>
              </label>
            </div>
          </FormField>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <FormField label="Ngày quyết định">
            <Input
              type="date"
              value={str(formData.decisionDate)}
              onChange={(e) => setFormData({ ...formData, decisionDate: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Số quyết định">
            <Input
              value={str(formData.decisionNumber)}
              onChange={(e) => setFormData({ ...formData, decisionNumber: e.target.value })}
              className="h-10 rounded-[3px]"
              placeholder="Nhập số quyết định"
            />
          </FormField>
          <FormField label="Cấp bậc">
            <select
              value={str(formData.level)}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
            >
              <option value="">Chọn cấp bậc</option>
              <option value="fresher">Fresher</option>
              <option value="junior">Junior</option>
              <option value="middle">Middle</option>
              <option value="senior">Senior</option>
            </select>
          </FormField>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormField label="Phòng ban" required>
            <select
              value={str(formData.departmentId)}
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
              value={str(formData.sectionId)}
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
              value={str(formData.positionId)}
              onChange={(e) => setFormData({ ...formData, positionId: e.target.value })}
              className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
            >
              <option value="">Chọn chức vụ</option>
              <option value="1">Nhân viên</option>
              <option value="2">Trưởng phòng</option>
            </select>
          </FormField>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <FormField label="Ngân hàng">
            <Input value="BIDV" disabled className="h-10 rounded-[3px] bg-gray-100" />
          </FormField>
          <FormField label="Số tài khoản">
            <Input
              value={str(formData.bankAccountNo)}
              onChange={(e) => setFormData({ ...formData, bankAccountNo: e.target.value })}
              className="h-10 rounded-[3px]"
              placeholder="Nhập số tài khoản"
            />
          </FormField>
        </div>
      </Card>

      {/* Insurance Section */}
      <Card className="p-4 border-none shadow-sm rounded-[3px]">
        <h3 className="text-sm font-bold text-gray-700 border-b pb-2 mb-4">
          Bảo hiểm xã hội & Y tế
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <FormField label="Số BHXH">
            <Input
              value={str(formData.socialInsuranceNo)}
              onChange={(e) => setFormData({ ...formData, socialInsuranceNo: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Số thẻ BHYT">
            <Input
              value={str(formData.healthInsuranceNo)}
              onChange={(e) => setFormData({ ...formData, healthInsuranceNo: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
          <FormField label="Ngày hết hạn BHYT">
            <Input
              type="date"
              value={str(formData.healthInsuranceExpiry)}
              onChange={(e) => setFormData({ ...formData, healthInsuranceExpiry: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Nơi đăng ký KCBBD">
            <Input
              value={str(formData.medicalPlace)}
              onChange={(e) => setFormData({ ...formData, medicalPlace: e.target.value })}
              className="h-10 rounded-[3px]"
            />
          </FormField>
        </div>
      </Card>

      {/* Degree Section - Bằng cấp */}
      <Card className="p-4 border-none shadow-sm rounded-[3px]">
        <h3 className="text-sm font-bold text-gray-700 border-b pb-2 mb-4">Bằng cấp</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormField label="Loại">
            <Input className="h-10 rounded-[3px]" placeholder="Nhập loại" />
          </FormField>
          <FormField label="Chuyên ngành">
            <Input className="h-10 rounded-[3px]" placeholder="Nhập chuyên ngành" />
          </FormField>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormField label="Trường Đào tạo">
            <Input className="h-10 rounded-[3px]" placeholder="Nhập trường đào tạo" />
          </FormField>
          <FormField label="Loại hình đào tạo">
            <Input className="h-10 rounded-[3px]" placeholder="Nhập loại hình đào tạo" />
          </FormField>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Ngày cấp">
            <Input type="date" className="h-10 rounded-[3px]" />
          </FormField>
          <FormField label="Tình trạng lưu trữ">
            <Input className="h-10 rounded-[3px]" placeholder="Nhập tình trạng lưu trữ" />
          </FormField>
        </div>
      </Card>

      {/* Certificate Section - Chứng chỉ */}
      <Card className="p-4 border-none shadow-sm rounded-[3px]">
        <h3 className="text-sm font-bold text-gray-700 border-b pb-2 mb-4">Chứng chỉ</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormField label="Ngày cấp">
            <Input type="date" className="h-10 rounded-[3px]" />
          </FormField>
          <FormField label="Tình trạng lưu trữ">
            <Input className="h-10 rounded-[3px]" placeholder="Nhập tình trạng lưu trữ" />
          </FormField>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Thời hạn">
            <Input type="date" className="h-10 rounded-[3px]" />
          </FormField>
        </div>
      </Card>

      {/* Emergency Contact Section - Liên hệ trong trường hợp khẩn cấp */}
      <Card className="p-4 border-none shadow-sm rounded-[3px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-gray-700">Liên hệ trong trường hợp khẩn cấp</h3>
          <Button className="h-9 gap-2 px-4 text-sm font-semibold bg-primary text-white rounded-[3px]">
            Thêm dòng
          </Button>
        </div>
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left font-semibold text-gray-500">Họ và Tên</th>
              <th className="p-3 text-left font-semibold text-gray-500">Ngày sinh</th>
              <th className="p-3 text-left font-semibold text-gray-500">Số điện thoại</th>
              <th className="p-3 text-left font-semibold text-gray-500">Số CMND/CCCD</th>
              <th className="p-3 text-left font-semibold text-gray-500">Quan hệ</th>
              <th className="p-3 text-left font-semibold text-gray-500">Địa chỉ</th>
              <th className="p-3 text-center font-semibold text-gray-500">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} className="p-8 text-center text-gray-400">
                Không có dữ liệu
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
