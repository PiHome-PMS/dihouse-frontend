import { FormField } from '@/components/common';
import { Button, Card, Input } from '@/components/ui';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface OtherTabProps {
    formData: any;
    setFormData: (data: any) => void;
}

interface Dependent {
    id: number;
    name: string;
    relationship: string;
    birthDate: string;
    idNumber: string;
    taxCode: string;
    issueDate: string;
    issuePlace: string;
    documentNumber: string;
    fromDate: string;
    toDate: string;
    nationality: string;
    address: string;
}

export function OtherTab({ formData, setFormData }: OtherTabProps) {
    const [dependents, setDependents] = useState<Dependent[]>([]);

    const addDependent = () => {
        setDependents([
            ...dependents,
            {
                id: Date.now(),
                name: '',
                relationship: '',
                birthDate: '',
                idNumber: '',
                taxCode: '',
                issueDate: '',
                issuePlace: '',
                documentNumber: '',
                fromDate: '',
                toDate: '',
                nationality: '',
                address: '',
            },
        ]);
    };

    const removeDependent = (id: number) => {
        setDependents(dependents.filter((d) => d.id !== id));
    };

    return (
        <div className="space-y-6">
            {/* Education Section - Trình độ */}
            <Card className="p-4 border-none shadow-sm rounded-[3px]">
                <h3 className="text-sm font-bold text-gray-700 border-b pb-2 mb-4">Trình độ</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <FormField label="Trình độ">
                        <Input
                            value={formData.education}
                            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                            className="h-10 rounded-[3px]"
                            placeholder="Nhập trình độ"
                        />
                    </FormField>
                    <FormField label="Chuyên ngành">
                        <Input
                            value={formData.major}
                            onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                            className="h-10 rounded-[3px]"
                            placeholder="Nhập chuyên ngành"
                        />
                    </FormField>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <FormField label="Email cá nhân">
                        <Input
                            type="email"
                            value={formData.personalEmail}
                            onChange={(e) => setFormData({ ...formData, personalEmail: e.target.value })}
                            className="h-10 rounded-[3px]"
                            placeholder="Nhập email cá nhân"
                        />
                    </FormField>
                    <FormField label="Email nội bộ">
                        <Input
                            type="email"
                            value={formData.internalEmail}
                            onChange={(e) => setFormData({ ...formData, internalEmail: e.target.value })}
                            className="h-10 rounded-[3px]"
                            placeholder="Nhập email nội bộ"
                        />
                    </FormField>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <FormField label="Ngoại ngữ">
                        <Input
                            value={formData.foreignLanguage}
                            onChange={(e) => setFormData({ ...formData, foreignLanguage: e.target.value })}
                            className="h-10 rounded-[3px]"
                            placeholder="Nhập ngoại ngữ"
                        />
                    </FormField>
                    <FormField label="Tin học">
                        <Input
                            value={formData.computerSkill}
                            onChange={(e) => setFormData({ ...formData, computerSkill: e.target.value })}
                            className="h-10 rounded-[3px]"
                            placeholder="Nhập tin học"
                        />
                    </FormField>
                </div>
                <FormField label="File đính kèm">
                    <div className="flex items-center gap-2">
                        <div className="flex-1 border border-gray-200 rounded-[3px] min-h-[60px] p-2 bg-gray-50" />
                        <div className="flex gap-2">
                            <Button variant="outline" className="h-9 px-4 text-sm text-red-500 border-red-500">
                                × Bỏ chọn
                            </Button>
                            <Button className="h-9 px-4 text-sm bg-primary text-white">+ Chọn file</Button>
                        </div>
                    </div>
                </FormField>
            </Card>

            {/* Health Section - Tình trạng sức khỏe */}
            <Card className="p-4 border-none shadow-sm rounded-[3px]">
                <h3 className="text-sm font-bold text-gray-700 border-b pb-2 mb-4">Tình trạng sức khỏe</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <FormField label="Tình trạng sức khỏe">
                        <Input
                            value={formData.healthStatus}
                            onChange={(e) => setFormData({ ...formData, healthStatus: e.target.value })}
                            className="h-10 rounded-[3px]"
                            placeholder="Nhập tình trạng sức khỏe"
                        />
                    </FormField>
                    <FormField label="Bệnh lý">
                        <Input
                            value={formData.diseases}
                            onChange={(e) => setFormData({ ...formData, diseases: e.target.value })}
                            className="h-10 rounded-[3px]"
                            placeholder="Nhập bệnh lý"
                        />
                    </FormField>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <FormField label="Chiều cao">
                        <Input
                            value={formData.height}
                            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                            className="h-10 rounded-[3px]"
                            placeholder="Nhập chiều cao"
                        />
                    </FormField>
                    <FormField label="Cân nặng">
                        <Input
                            value={formData.weight}
                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                            className="h-10 rounded-[3px]"
                            placeholder="Nhập cân nặng"
                        />
                    </FormField>
                </div>
                <FormField label="File đính kèm">
                    <div className="flex items-center gap-2">
                        <div className="flex-1 border border-gray-200 rounded-[3px] min-h-[60px] p-2 bg-gray-50" />
                        <div className="flex gap-2">
                            <Button variant="outline" className="h-9 px-4 text-sm text-red-500 border-red-500">
                                × Bỏ chọn
                            </Button>
                            <Button className="h-9 px-4 text-sm bg-primary text-white">+ Chọn file</Button>
                        </div>
                    </div>
                </FormField>
            </Card>

            {/* Dependents Section - Thông tin người phụ thuộc */}
            <Card className="p-4 border-none shadow-sm rounded-[3px]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-700">Thông tin người phụ thuộc</h3>
                </div>

                {dependents.map((dep, index) => (
                    <div key={dep.id} className="border rounded-lg p-4 mb-4 relative">
                        {/* Row 1 */}
                        <div className="grid grid-cols-4 gap-4 mb-4">
                            <FormField label="Họ tên NPT (*)" required>
                                <Input
                                    value={dep.name}
                                    onChange={(e) => {
                                        const updated = [...dependents];
                                        updated[index].name = e.target.value;
                                        setDependents(updated);
                                    }}
                                    className="h-10 rounded-[3px]"
                                    placeholder="Nhập họ tên npt (*)"
                                />
                            </FormField>
                            <FormField label="Ngày sinh">
                                <Input
                                    type="date"
                                    value={dep.birthDate}
                                    onChange={(e) => {
                                        const updated = [...dependents];
                                        updated[index].birthDate = e.target.value;
                                        setDependents(updated);
                                    }}
                                    className="h-10 rounded-[3px]"
                                />
                            </FormField>
                            <FormField label="MST NPT">
                                <Input
                                    value={dep.taxCode || ''}
                                    onChange={(e) => {
                                        const updated = [...dependents];
                                        (updated[index] as any).taxCode = e.target.value;
                                        setDependents(updated);
                                    }}
                                    className="h-10 rounded-[3px]"
                                    placeholder="Nhập mst npt"
                                />
                            </FormField>
                            <FormField label="Số CCCD NPT">
                                <Input
                                    value={dep.idNumber}
                                    onChange={(e) => {
                                        const updated = [...dependents];
                                        updated[index].idNumber = e.target.value;
                                        setDependents(updated);
                                    }}
                                    className="h-10 rounded-[3px]"
                                    placeholder="Nhập số cccd npt"
                                />
                            </FormField>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-4 gap-4 mb-4">
                            <FormField label="Ngày Cấp">
                                <Input
                                    type="date"
                                    value={(dep as any).issueDate || ''}
                                    onChange={(e) => {
                                        const updated = [...dependents];
                                        (updated[index] as any).issueDate = e.target.value;
                                        setDependents(updated);
                                    }}
                                    className="h-10 rounded-[3px]"
                                />
                            </FormField>
                            <FormField label="Nơi cấp">
                                <Input
                                    value={(dep as any).issuePlace || ''}
                                    onChange={(e) => {
                                        const updated = [...dependents];
                                        (updated[index] as any).issuePlace = e.target.value;
                                        setDependents(updated);
                                    }}
                                    className="h-10 rounded-[3px]"
                                    placeholder="Nhập nơi cấp"
                                />
                            </FormField>
                            <FormField label="Quan hệ">
                                <Input
                                    value={dep.relationship}
                                    onChange={(e) => {
                                        const updated = [...dependents];
                                        updated[index].relationship = e.target.value;
                                        setDependents(updated);
                                    }}
                                    className="h-10 rounded-[3px]"
                                    placeholder="Nhập quan hệ"
                                />
                            </FormField>
                            <FormField label="Số">
                                <Input
                                    value={(dep as any).documentNumber || ''}
                                    onChange={(e) => {
                                        const updated = [...dependents];
                                        (updated[index] as any).documentNumber = e.target.value;
                                        setDependents(updated);
                                    }}
                                    className="h-10 rounded-[3px]"
                                    placeholder="Nhập số"
                                />
                            </FormField>
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-4 gap-4">
                            <FormField label="Từ tháng">
                                <Input
                                    type="date"
                                    value={(dep as any).fromDate || ''}
                                    onChange={(e) => {
                                        const updated = [...dependents];
                                        (updated[index] as any).fromDate = e.target.value;
                                        setDependents(updated);
                                    }}
                                    className="h-10 rounded-[3px]"
                                />
                            </FormField>
                            <FormField label="Đến tháng">
                                <Input
                                    type="date"
                                    value={(dep as any).toDate || ''}
                                    onChange={(e) => {
                                        const updated = [...dependents];
                                        (updated[index] as any).toDate = e.target.value;
                                        setDependents(updated);
                                    }}
                                    className="h-10 rounded-[3px]"
                                />
                            </FormField>
                            <FormField label="Quốc tịch">
                                <Input
                                    value={(dep as any).nationality || ''}
                                    onChange={(e) => {
                                        const updated = [...dependents];
                                        (updated[index] as any).nationality = e.target.value;
                                        setDependents(updated);
                                    }}
                                    className="h-10 rounded-[3px]"
                                    placeholder="Nhập quốc tịch"
                                />
                            </FormField>
                            <FormField label="Địa chỉ">
                                <Input
                                    value={(dep as any).address || ''}
                                    onChange={(e) => {
                                        const updated = [...dependents];
                                        (updated[index] as any).address = e.target.value;
                                        setDependents(updated);
                                    }}
                                    className="h-10 rounded-[3px]"
                                    placeholder="Nhập địa chỉ"
                                />
                            </FormField>
                        </div>

                        {/* Delete button row */}
                        <div className="mt-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeDependent(dep.id)}
                                className="h-8 w-8 p-0 bg-red-500 hover:bg-red-600 text-white rounded"
                            >
                                ×
                            </Button>
                        </div>
                    </div>
                ))}

                <Button
                    onClick={addDependent}
                    className="h-9 gap-2 px-4 text-sm font-semibold bg-primary text-white rounded-[3px]"
                >
                    <Plus className="h-4 w-4" />
                    Thêm NPT
                </Button>
            </Card>
        </div>
    );
}
