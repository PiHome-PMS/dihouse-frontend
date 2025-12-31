import { FormField } from '@/components/common';
import {
    Button,
    Card,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Input,
} from '@/components/ui';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Asset {
    id: number;
    assetCode: string;
    assetName: string;
    group: string;
    quantity: number;
    unit: string;
    department: string;
    startDate: string;
    note: string;
}

interface AssetFormData {
    assetCode: string;
    assetName: string;
    group: string;
    quantity: string;
    unit: string;
    department: string;
    startDate: string;
    note: string;
}

export function AssetsTab() {
    const [modalOpen, setModalOpen] = useState(false);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [formData, setFormData] = useState<AssetFormData>({
        assetCode: '',
        assetName: '',
        group: '',
        quantity: '1',
        unit: '',
        department: '',
        startDate: '',
        note: '',
    });

    const handleOpenModal = () => {
        setFormData({
            assetCode: '',
            assetName: '',
            group: '',
            quantity: '1',
            unit: '',
            department: '',
            startDate: '',
            note: '',
        });
        setModalOpen(true);
    };

    const handleSave = () => {
        setAssets([
            ...assets,
            {
                id: Date.now(),
                ...formData,
                quantity: parseInt(formData.quantity) || 1,
            },
        ]);
        setModalOpen(false);
    };

    const handleDelete = (id: number) => {
        setAssets(assets.filter((a) => a.id !== id));
    };

    return (
        <>
            <Card className="p-4 border-none shadow-sm rounded-[3px]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-700">Tài sản cấp phát</h3>
                    <Button
                        onClick={handleOpenModal}
                        className="h-9 gap-2 px-4 text-sm font-semibold bg-primary text-white rounded-[3px]"
                    >
                        <Plus className="h-4 w-4" />
                        Thêm tài sản
                    </Button>
                </div>
                <table className="w-full text-xs">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-left font-semibold text-gray-500">STT</th>
                            <th className="p-3 text-left font-semibold text-gray-500">Mã tài sản</th>
                            <th className="p-3 text-left font-semibold text-gray-500">Tên tài sản</th>
                            <th className="p-3 text-left font-semibold text-gray-500">Nhóm</th>
                            <th className="p-3 text-center font-semibold text-gray-500">Số lượng</th>
                            <th className="p-3 text-left font-semibold text-gray-500">Đơn vị</th>
                            <th className="p-3 text-left font-semibold text-gray-500">Phòng ban sử dụng</th>
                            <th className="p-3 text-left font-semibold text-gray-500">Thời gian bắt đầu</th>
                            <th className="p-3 text-left font-semibold text-gray-500">Ghi chú</th>
                            <th className="p-3 text-center font-semibold text-gray-500">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.length === 0 ? (
                            <tr>
                                <td colSpan={10} className="p-8 text-center text-gray-400">
                                    Chưa có tài sản nào
                                </td>
                            </tr>
                        ) : (
                            assets.map((asset, index) => (
                                <tr key={asset.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3 font-medium text-blue-600">{asset.assetCode}</td>
                                    <td className="p-3">{asset.assetName}</td>
                                    <td className="p-3">{asset.group}</td>
                                    <td className="p-3 text-center">{asset.quantity}</td>
                                    <td className="p-3">{asset.unit}</td>
                                    <td className="p-3">{asset.department}</td>
                                    <td className="p-3">{asset.startDate}</td>
                                    <td className="p-3">{asset.note || '-'}</td>
                                    <td className="p-3">
                                        <div className="flex items-center justify-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 w-7 p-0 text-blue-500 hover:text-blue-700"
                                            >
                                                <Edit2 className="h-3.5 w-3.5" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(asset.id)}
                                                className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </Card>

            {/* Add Asset Modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="!max-w-[700px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-gray-800">Thêm tài sản</DialogTitle>
                    </DialogHeader>

                    <div className="p-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="Mã tài sản" required>
                                <Input
                                    value={formData.assetCode}
                                    onChange={(e) => setFormData({ ...formData, assetCode: e.target.value })}
                                    placeholder="Nhập mã tài sản"
                                    className="h-10 rounded-[3px]"
                                />
                            </FormField>
                            <FormField label="Tên tài sản" required>
                                <Input
                                    value={formData.assetName}
                                    onChange={(e) => setFormData({ ...formData, assetName: e.target.value })}
                                    placeholder="Nhập tên tài sản"
                                    className="h-10 rounded-[3px]"
                                />
                            </FormField>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="Nhóm tài sản">
                                <select
                                    value={formData.group}
                                    onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                                    className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
                                >
                                    <option value="">Chọn nhóm</option>
                                    <option value="Thiết bị IT">Thiết bị IT</option>
                                    <option value="Văn phòng phẩm">Văn phòng phẩm</option>
                                    <option value="Nội thất">Nội thất</option>
                                    <option value="Phương tiện">Phương tiện</option>
                                </select>
                            </FormField>
                            <FormField label="Phòng ban sử dụng">
                                <select
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    className="w-full h-10 px-3 border border-gray-200 rounded-[3px] text-sm bg-white"
                                >
                                    <option value="">Chọn phòng ban</option>
                                    <option value="Phòng IT">Phòng IT</option>
                                    <option value="Phòng Nhân sự">Phòng Nhân sự</option>
                                    <option value="Phòng Kế toán">Phòng Kế toán</option>
                                </select>
                            </FormField>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <FormField label="Số lượng">
                                <Input
                                    type="number"
                                    min="1"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                    className="h-10 rounded-[3px]"
                                />
                            </FormField>
                            <FormField label="Đơn vị">
                                <Input
                                    value={formData.unit}
                                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                    placeholder="Cái, chiếc..."
                                    className="h-10 rounded-[3px]"
                                />
                            </FormField>
                            <FormField label="Thời gian bắt đầu">
                                <Input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="h-10 rounded-[3px]"
                                />
                            </FormField>
                        </div>

                        <FormField label="Ghi chú">
                            <Input
                                value={formData.note}
                                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                placeholder="Nhập ghi chú (nếu có)"
                                className="h-10 rounded-[3px]"
                            />
                        </FormField>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setModalOpen(false)}
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
        </>
    );
}
