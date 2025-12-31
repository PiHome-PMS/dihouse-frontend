import {
    Button,
    Card,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Input,
} from '@/components/ui';
import { X } from 'lucide-react';
import { useState } from 'react';

interface Shift {
    id: string;
    code: string;
    name: string;
    workTime: string;
    breakTime: string;
    totalHours: number;
    workPoints: number;
    color: string;
}

interface DaySchedule {
    day: number;
    shifts: Shift[];
}

// Mock shift data
const SHIFT_DEFINITIONS: Record<string, Shift> = {
    CLH: {
        id: 'clh',
        code: 'CLH',
        name: 'Ca làm hành chính',
        workTime: '-',
        breakTime: '-',
        totalHours: 12,
        workPoints: 1,
        color: 'bg-orange-400',
    },
    CHC: {
        id: 'chc',
        code: 'CHC',
        name: 'Ca hành chính',
        workTime: '08:30:00 - 17:30:00',
        breakTime: '12:30:00 - 13:30:00',
        totalHours: 8,
        workPoints: 1,
        color: 'bg-blue-400',
    },
    CS: {
        id: 'cs',
        code: 'CS',
        name: 'Ca sáng',
        workTime: '06:00:00 - 14:00:00',
        breakTime: '10:00:00 - 10:30:00',
        totalHours: 8,
        workPoints: 1,
        color: 'bg-green-400',
    },
    CC: {
        id: 'cc',
        code: 'CC',
        name: 'Ca chiều',
        workTime: '14:00:00 - 22:00:00',
        breakTime: '18:00:00 - 18:30:00',
        totalHours: 8,
        workPoints: 1,
        color: 'bg-purple-400',
    },
};

// Generate mock schedule for a month
function generateMonthSchedule(): DaySchedule[] {
    const schedule: DaySchedule[] = [];
    for (let day = 1; day <= 31; day++) {
        const isWeekend = day % 7 === 0 || day % 7 === 1;
        if (isWeekend) {
            schedule.push({ day, shifts: [] });
        } else {
            // Random shifts assignment
            const shiftKeys = Object.keys(SHIFT_DEFINITIONS);
            const numShifts = Math.random() > 0.5 ? 2 : 1;
            const dayShifts: Shift[] = [];

            if (numShifts === 2) {
                dayShifts.push(SHIFT_DEFINITIONS.CLH);
                dayShifts.push(SHIFT_DEFINITIONS.CHC);
            } else {
                const randomKey = shiftKeys[Math.floor(Math.random() * shiftKeys.length)];
                dayShifts.push(SHIFT_DEFINITIONS[randomKey]);
            }

            schedule.push({ day, shifts: dayShifts });
        }
    }
    return schedule;
}

export function ScheduleTab() {
    const [scheduleMonth, setScheduleMonth] = useState('2025-12');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState<DaySchedule | null>(null);

    const schedule = generateMonthSchedule();

    const handleDayClick = (daySchedule: DaySchedule) => {
        if (daySchedule.shifts.length > 0) {
            setSelectedDay(daySchedule);
            setModalOpen(true);
        }
    };

    const formatDate = (day: number) => {
        const [year, month] = scheduleMonth.split('-');
        return `${day.toString().padStart(2, '0')}/${month}/${year}`;
    };

    return (
        <>
            <Card className="p-4 border-none shadow-sm rounded-[3px]">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-gray-700">Lịch làm việc</h3>
                    <div className="flex items-center gap-2">
                        <Input
                            type="month"
                            value={scheduleMonth}
                            onChange={(e) => setScheduleMonth(e.target.value)}
                            className="h-9 w-44 rounded-[3px]"
                        />
                    </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                    {Object.values(SHIFT_DEFINITIONS).map((shift) => (
                        <div key={shift.id} className="flex items-center gap-2">
                            <div className={`w-4 h-4 ${shift.color} rounded`} />
                            <span className="text-xs text-gray-600">{shift.code}</span>
                        </div>
                    ))}
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-300 rounded" />
                        <span className="text-xs text-gray-600">Nghỉ</span>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
                        <div key={day} className="p-2 bg-gray-100 font-semibold text-gray-600">
                            {day}
                        </div>
                    ))}
                    {schedule.map((daySchedule) => {
                        const isWeekend = daySchedule.day % 7 === 0 || daySchedule.day % 7 === 1;
                        const hasShifts = daySchedule.shifts.length > 0;

                        return (
                            <div
                                key={daySchedule.day}
                                onClick={() => handleDayClick(daySchedule)}
                                className={`p-2 border border-gray-100 min-h-[70px] text-gray-600 ${isWeekend ? 'bg-gray-50' : hasShifts ? 'cursor-pointer hover:bg-gray-50' : ''
                                    }`}
                            >
                                <span className="font-medium block mb-1">{daySchedule.day}</span>
                                <div className="flex flex-wrap gap-0.5 justify-center">
                                    {daySchedule.shifts.map((shift, idx) => (
                                        <span
                                            key={`${shift.id}-${idx}`}
                                            className={`${shift.color} text-white text-[10px] px-1 py-0.5 rounded`}
                                        >
                                            {shift.code}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* Shift Detail Modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="!max-w-[600px]">
                    <DialogHeader className="flex flex-row items-center justify-between">
                        <DialogTitle className="text-lg font-bold text-gray-800">
                            Lịch làm việc ngày {selectedDay ? formatDate(selectedDay.day) : ''}
                        </DialogTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setModalOpen(false)}
                            className="h-8 w-8 p-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </DialogHeader>

                    <div className="p-4 space-y-4">
                        {selectedDay?.shifts.map((shift, index) => (
                            <div key={`${shift.id}-${index}`} className="border rounded-lg p-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">Mã ca:</span>
                                        <span className="text-gray-600">{shift.code}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">Thời gian làm việc:</span>
                                        <span className="text-gray-600">{shift.workTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">Thời gian nghỉ giữa giờ:</span>
                                        <span className="text-gray-600">{shift.breakTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">Tổng thời gian làm việc:</span>
                                        <span className="text-blue-600">{shift.totalHours} (giờ)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">Tổng công tính:</span>
                                        <span className="text-blue-600">{shift.workPoints}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
