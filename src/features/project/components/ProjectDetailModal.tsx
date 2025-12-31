import { FormField } from '@/components/common';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from '@/components/ui';
import { ImageIcon, X } from 'lucide-react';
import { useState } from 'react';
import type { Project, ProjectPaymentInfo } from '../types/project.types';

interface ProjectDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: Project;
  onSave?: (data: Project & ProjectPaymentInfo) => void;
}

/**
 * Project Detail/Edit Modal matching demo site layout
 * Left: Logo picker | Right: 2-column form
 */
export function ProjectDetailModal({
  open,
  onOpenChange,
  project,
  onSave,
}: ProjectDetailModalProps) {
  const [formData, setFormData] = useState({
    name: project?.name || '',
    code: project?.code || '',
    manager: project?.manager || '',
    area: project?.area || 0,
    email: project?.email || '',
    phone: project?.phone || '',
    address: project?.address || '',
    description: project?.description || '',
    accountingLockDate: '',
    accountingDeadline: 'Dừng hoạt động',
    showAccountingMenu: 'Dừng hoạt động',
  });

  const handleSave = () => {
    if (onSave && project) {
      onSave({
        ...project,
        ...formData,
        status: true,
        accountNumber: '',
        bankName: '',
        branch: '',
        accountName: '',
        autoReceive: false,
        autoAccounting: false,
      });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[1200px] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-4 pb-0 border-b border-gray-100">
          <DialogTitle className="text-lg font-bold text-gray-800">
            {project ? 'Chi tiết dự án' : 'Thêm mới dự án'}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4">
          <div className="flex gap-6">
            {/* Left: Logo Section */}
            <div className="w-48 flex-shrink-0">
              <div className="border border-gray-200 rounded-[3px] p-4">
                <div className="text-center mb-3">
                  <span className="text-sm font-semibold text-gray-700">Logo</span>
                </div>
                <div className="w-32 h-32 mx-auto bg-gray-100 rounded-[3px] flex items-center justify-center mb-3">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>
                <div className="flex justify-center gap-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-8 px-3 text-xs rounded-[3px]"
                  >
                    <X className="h-3 w-3 mr-1" />
                  </Button>
                  <Button size="sm" className="h-8 px-4 text-xs rounded-[3px]">
                    Chọn
                  </Button>
                </div>
              </div>
            </div>

            {/* Right: Form Fields */}
            <div className="flex-1 space-y-4">
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Công ty">
                  <select className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white">
                    <option>CÔNG TY CỔ PHẦN CN S-TECH</option>
                  </select>
                </FormField>
                <FormField label="Email dự án" required>
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Nhập email"
                    className="h-10 rounded-[3px]"
                  />
                </FormField>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Tên dự án" required>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nhập tên dự án"
                    className="h-10 rounded-[3px]"
                  />
                </FormField>
                <FormField label="Số điện thoại" required>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Nhập số điện thoại"
                    className="h-10 rounded-[3px]"
                  />
                </FormField>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Mã dự án" required>
                  <Input
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="Nhập mã dự án"
                    className="h-10 rounded-[3px]"
                  />
                </FormField>
                <FormField label="Ngày khóa sổ kế toán" required>
                  <Input
                    value={formData.accountingLockDate}
                    onChange={(e) =>
                      setFormData({ ...formData, accountingLockDate: e.target.value })
                    }
                    placeholder="5"
                    className="h-10 rounded-[3px]"
                  />
                </FormField>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Ban quản lý" required>
                  <select
                    className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  >
                    <option value="">Chọn ban quản lý</option>
                    <option value="BUIDING CARE - BDC">BUIDING CARE - BDC</option>
                  </select>
                </FormField>
                <FormField label="Sửa hạn hạch toán">
                  <select
                    className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
                    value={formData.accountingDeadline}
                    onChange={(e) =>
                      setFormData({ ...formData, accountingDeadline: e.target.value })
                    }
                  >
                    <option value="Dừng hoạt động">Dừng hoạt động</option>
                    <option value="Hoạt động">Hoạt động</option>
                  </select>
                </FormField>
              </div>

              {/* Row 5 */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Diện tích m2" required>
                  <Input
                    type="number"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
                    placeholder="0"
                    className="h-10 rounded-[3px]"
                  />
                </FormField>
                <FormField label="Địa chỉ" required>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Nhập địa chỉ"
                    className="h-10 rounded-[3px]"
                  />
                </FormField>
              </div>

              {/* Row 6 */}
              <FormField label="Hiển thị menu kế toán">
                <select
                  className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
                  value={formData.showAccountingMenu}
                  onChange={(e) => setFormData({ ...formData, showAccountingMenu: e.target.value })}
                >
                  <option value="Dừng hoạt động">Dừng hoạt động</option>
                  <option value="Hoạt động">Hoạt động</option>
                </select>
              </FormField>

              {/* Description */}
              <FormField label="Mô tả">
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Nhập mô tả"
                  className="w-full p-2 border border-gray-200 rounded-[3px] text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </FormField>

              {/* Project Image */}
              <FormField label="Ảnh dự án">
                <div className="border border-gray-200 rounded-[3px] p-4 bg-gray-50">
                  <div className="flex flex-wrap gap-2">
                    {/* Placeholder for uploaded images */}
                    <div className="w-24 h-24 border border-dashed border-gray-300 rounded-[3px] flex items-center justify-center bg-white">
                      <ImageIcon className="h-8 w-8 text-gray-300" />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="h-8 px-4 text-xs rounded-[3px]"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Bỏ chọn
                    </Button>
                    <Button type="button" size="sm" className="h-8 px-4 text-xs rounded-[3px]">
                      <ImageIcon className="h-3 w-3 mr-1" />
                      Chọn
                    </Button>
                  </div>
                </div>
              </FormField>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 p-4 pt-0 border-t border-gray-100">
          <Button
            variant="destructive"
            onClick={() => onOpenChange(false)}
            className="h-9 px-6 text-sm font-semibold rounded-[3px]"
          >
            <X className="h-4 w-4 mr-1" />
            Bỏ chọn
          </Button>
          <Button
            onClick={handleSave}
            className="h-9 px-6 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-[3px]"
          >
            <ImageIcon className="h-4 w-4 mr-1" />
            Chọn
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
