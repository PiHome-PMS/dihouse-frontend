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
import { useState } from 'react';

interface ContractModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave?: (data: ContractFormData) => void;
}

interface ContractFormData {
    contractNumber: string;
    contractName: string;
    contractType: string;
    position: string;
    signDate: string;
    expiryDate: string;
    reason: string;
    status: string;
}

export function ContractModal({ open, onOpenChange, onSave }: ContractModalProps) {
    const [formData, setFormData] = useState<ContractFormData>({
        contractNumber: '',
        contractName: '',
        contractType: '',
        position: '',
        signDate: '',
        expiryDate: '',
        reason: '',
        status: 'active',
    });

    const handleSave = () => {
        if (onSave) {
            onSave(formData);
        }
        onOpenChange(false);
    };

    const handleClose = () => {
        setFormData({
            contractNumber: '',
            contractName: '',
            contractType: '',
            position: '',
            signDate: '',
            expiryDate: '',
            reason: '',
            status: 'active',
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="!max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-gray-800">Thêm hợp đồng</DialogTitle>
                </DialogHeader>

                <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="Số hợp đồng" required>
                            <Input
                                value={formData.contractNumber}
                                onChange={(e) => setFormData({ ...formData, contractNumber: e.target.value })}
                                placeholder="Nhập số hợp đồng"
                                className="h-10 rounded-[3px]"
                            />
                        </FormField>
                        <FormField label="Tên hợp đồng" required>
                            <Input
                                value={formData.contractName}
                                onChange={(e) => setFormData({ ...formData, contractName: e.target.value })}
                                placeholder="Nhập tên hợp đồng"
                                className="h-10 rounded-[3px]"
                            />
                        </FormField>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="Loại hợp đồng" required>
                            <select
                                value={formData.contractType}
                                onChange={(e) => setFormData({ ...formData, contractType: e.target.value })}
                                className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
                            >
                                <option value="">Chọn loại hợp đồng</option>
                                <option value="probation">Hợp đồng thử việc</option>
                                <option value="definite">Hợp đồng có thời hạn</option>
                                <option value="indefinite">Hợp đồng không thời hạn</option>
                                <option value="seasonal">Hợp đồng thời vụ</option>
                            </select>
                        </FormField>
                        <FormField label="Chức vụ">
                            <select
                                value={formData.position}
                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
                            >
                                <option value="">Chọn chức vụ</option>
                                <option value="staff">Nhân viên</option>
                                <option value="leader">Trưởng nhóm</option>
                                <option value="manager">Trưởng phòng</option>
                                <option value="director">Giám đốc</option>
                            </select>
                        </FormField>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="Ngày ký" required>
                            <Input
                                type="date"
                                value={formData.signDate}
                                onChange={(e) => setFormData({ ...formData, signDate: e.target.value })}
                                className="h-10 rounded-[3px]"
                            />
                        </FormField>
                        <FormField label="Ngày hết hạn">
                            <Input
                                type="date"
                                value={formData.expiryDate}
                                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                className="h-10 rounded-[3px]"
                            />
                        </FormField>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="Trạng thái">
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
                            >
                                <option value="active">Đang hiệu lực</option>
                                <option value="expired">Hết hạn</option>
                                <option value="terminated">Đã chấm dứt</option>
                            </select>
                        </FormField>
                        <FormField label="Lý do">
                            <Input
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                placeholder="Nhập lý do (nếu có)"
                                className="h-10 rounded-[3px]"
                            />
                        </FormField>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        className="h-9 px-4 text-sm font-semibold rounded-[3px]"
                    >
                        Đóng
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="h-9 px-4 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-[3px]"
                    >
                        Lưu
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
