import { Button, Card } from '@/components/ui';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ContractModal } from './ContractModal';

interface Contract {
    id: number;
    contractNumber: string;
    contractName: string;
    contractType: string;
    position: string;
    status: string;
    signDate: string;
    expiryDate: string;
    reason: string;
}

export function ContractsTab() {
    const [modalOpen, setModalOpen] = useState(false);
    const [contracts, setContracts] = useState<Contract[]>([]);

    const handleAddContract = (data: any) => {
        setContracts([
            ...contracts,
            {
                id: Date.now(),
                ...data,
            },
        ]);
    };

    const handleDeleteContract = (id: number) => {
        setContracts(contracts.filter((c) => c.id !== id));
    };

    const getContractTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            probation: 'Thử việc',
            definite: 'Có thời hạn',
            indefinite: 'Không thời hạn',
            seasonal: 'Thời vụ',
        };
        return labels[type] || type;
    };

    const getPositionLabel = (position: string) => {
        const labels: Record<string, string> = {
            staff: 'Nhân viên',
            leader: 'Trưởng nhóm',
            manager: 'Trưởng phòng',
            director: 'Giám đốc',
        };
        return labels[position] || position;
    };

    const getStatusLabel = (status: string) => {
        const labels: Record<string, { text: string; color: string }> = {
            active: { text: 'Đang hiệu lực', color: 'bg-green-100 text-green-700' },
            expired: { text: 'Hết hạn', color: 'bg-yellow-100 text-yellow-700' },
            terminated: { text: 'Đã chấm dứt', color: 'bg-red-100 text-red-700' },
        };
        return labels[status] || { text: status, color: 'bg-gray-100 text-gray-700' };
    };

    return (
        <>
            <Card className="p-4 border-none shadow-sm rounded-[3px]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-700">Danh sách hợp đồng</h3>
                    <Button
                        onClick={() => setModalOpen(true)}
                        className="h-9 gap-2 px-4 text-sm font-semibold bg-primary text-white rounded-[3px]"
                    >
                        <Plus className="h-4 w-4" />
                        Thêm hợp đồng
                    </Button>
                </div>
                <table className="w-full text-xs">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-left font-semibold text-gray-500">STT</th>
                            <th className="p-3 text-left font-semibold text-gray-500">Số hợp đồng</th>
                            <th className="p-3 text-left font-semibold text-gray-500">Tên hợp đồng</th>
                            <th className="p-3 text-left font-semibold text-gray-500">Loại hợp đồng</th>
                            <th className="p-3 text-left font-semibold text-gray-500">Chức vụ</th>
                            <th className="p-3 text-center font-semibold text-gray-500">Trạng thái</th>
                            <th className="p-3 text-left font-semibold text-gray-500">Ngày ký</th>
                            <th className="p-3 text-left font-semibold text-gray-500">Ngày hết hạn</th>
                            <th className="p-3 text-left font-semibold text-gray-500">Lý do</th>
                            <th className="p-3 text-center font-semibold text-gray-500">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.length === 0 ? (
                            <tr>
                                <td colSpan={10} className="p-8 text-center text-gray-400">
                                    Chưa có hợp đồng nào
                                </td>
                            </tr>
                        ) : (
                            contracts.map((contract, index) => {
                                const statusInfo = getStatusLabel(contract.status);
                                return (
                                    <tr key={contract.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3 font-medium text-blue-600">{contract.contractNumber}</td>
                                        <td className="p-3">{contract.contractName}</td>
                                        <td className="p-3">{getContractTypeLabel(contract.contractType)}</td>
                                        <td className="p-3">{getPositionLabel(contract.position)}</td>
                                        <td className="p-3 text-center">
                                            <span className={`px-2 py-1 rounded text-xs ${statusInfo.color}`}>
                                                {statusInfo.text}
                                            </span>
                                        </td>
                                        <td className="p-3">{contract.signDate}</td>
                                        <td className="p-3">{contract.expiryDate || '-'}</td>
                                        <td className="p-3">{contract.reason || '-'}</td>
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
                                                    onClick={() => handleDeleteContract(contract.id)}
                                                    className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </Card>

            <ContractModal open={modalOpen} onOpenChange={setModalOpen} onSave={handleAddContract} />
        </>
    );
}
