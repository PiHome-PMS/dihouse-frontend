import { Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Bell, Calendar, Home, LogIn, type LucideIcon, MessageSquare, Users } from 'lucide-react';

/**
 * High-fidelity clone of the bdc.s-tech.info dashboard content (Trang chủ)
 */
export function DashboardPage() {
  return (
    <div className="space-y-6 pb-8">
      {/* Section 1: Revenue Chart */}
      <Card className="p-0 overflow-hidden border-none shadow-[0_1px_1px_rgba(0,0,0,0.1)] rounded-[3px]">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white text-[11px] sm:text-sm">
          <h3 className="font-bold text-gray-700 uppercase tracking-tight">Tổng hợp doanh thu</h3>
          <div className="flex items-center gap-4">
            <LegendItem label="Thực thu trong kỳ" color="#3c8dbc" />
            <LegendItem label="Phải thu trong kỳ" color="#d2d6de" />
          </div>
        </div>
        <div className="p-6 bg-white h-[350px] relative">
          <div className="absolute inset-x-6 top-10 bottom-10 flex items-end justify-between gap-1 sm:gap-4">
            {[65, 45, 80, 55, 90, 70, 85, 40, 60, 75, 50, 95].map((val, i) => (
              <div
                key={`revenue-month-${i}`}
                className="flex-1 flex flex-col items-center gap-1 group h-full"
              >
                <div className="w-full flex items-end justify-center gap-1 h-full relative">
                  {/* Background bar (Receivable) */}
                  <div
                    className="w-full sm:w-1/2 bg-[#d2d6de] rounded-t-[1px] transition-all duration-500"
                    style={{ height: `${val}%` }}
                  />
                  {/* Foreground bar (Collected) - using absolute to overlay in narrow views */}
                  <div
                    className="w-[30%] sm:w-1/2 bg-primary rounded-t-[1px] transition-all duration-500 absolute bottom-0"
                    style={{ height: `${val * 0.7}%` }}
                  />
                </div>
                <span className="text-[9px] text-gray-400 font-bold uppercase mt-2">T{i + 1}</span>
              </div>
            ))}
          </div>
          {/* Y-axis labels */}
          <div className="absolute left-2 top-10 bottom-10 flex flex-col justify-between text-[10px] text-gray-400 font-bold">
            <span>15 Tỷ</span>
            <span>10 Tỷ</span>
            <span>5 Tỷ</span>
            <span>0</span>
          </div>
          {/* Grid lines */}
          <div className="absolute inset-x-6 top-10 bottom-10 flex flex-col justify-between pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div
                key={`grid-line-${i}`}
                className="w-full border-t border-gray-100 border-dashed"
              />
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 2: Weight Analytics */}
        <Card className="p-0 overflow-hidden border-none shadow-[0_1px_1px_rgba(0,0,0,0.1)] rounded-[3px]">
          <div className="p-4 border-b border-gray-100 bg-white">
            <h3 className="text-[11px] sm:text-sm font-bold text-gray-700 uppercase tracking-tight">
              Báo cáo tỷ trọng theo dịch vụ
            </h3>
          </div>
          <div className="p-6 bg-white h-[300px] flex items-center justify-center relative">
            <svg viewBox="0 0 100 100" className="w-40 h-40 sm:w-48 sm:h-48 -rotate-90">
              <title>Báo cáo tỷ trọng theo dịch vụ</title>
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f4f4f4" strokeWidth="20" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#3c8dbc"
                strokeWidth="20"
                strokeDasharray="120 251"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#00c0ef"
                strokeWidth="20"
                strokeDasharray="60 251"
                strokeDashoffset="-120"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#f39c12"
                strokeWidth="20"
                strokeDasharray="40 251"
                strokeDashoffset="-180"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#00a65a"
                strokeWidth="20"
                strokeDasharray="31 251"
                strokeDashoffset="-220"
              />
            </svg>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 space-y-1 sm:space-y-1.5">
              <LegendItem label="Phí khác" color="#3c8dbc" />
              <LegendItem label="Dịch vụ" color="#00c0ef" />
              <LegendItem label="Nước" color="#f39c12" />
              <LegendItem label="Bảo hiểm" color="#00a65a" />
              <LegendItem label="Phí PT" color="#f56954" />
              <LegendItem label="Phát sinh" color="#d2d6de" />
            </div>
          </div>
        </Card>

        {/* Section 3: Receivable End of Period */}
        <Card className="p-0 overflow-hidden border-none shadow-[0_1px_1px_rgba(0,0,0,0.1)] rounded-[3px]">
          <div className="p-4 border-b border-gray-100 bg-white">
            <h3 className="text-[11px] sm:text-sm font-bold text-gray-700 uppercase tracking-tight">
              Phải thu cuối kỳ
            </h3>
          </div>
          <div className="p-6 bg-white h-[300px] relative">
            <svg viewBox="0 0 400 200" className="w-full h-48 mt-4">
              <title>Phải thu cuối kỳ</title>
              <defs>
                <linearGradient id="areaGradient" opacity="0.2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3c8dbc" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3c8dbc" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 150 Q50 120 100 130 T200 80 T300 100 T400 50 V200 H0 Z"
                fill="url(#areaGradient)"
              />
              <path
                d="M0 150 Q50 120 100 130 T200 80 T300 100 T400 50"
                fill="transparent"
                stroke="#3c8dbc"
                strokeWidth="3"
              />
              {[0, 100, 200, 300, 400].map((x, i) => (
                <circle
                  key={`receivable-point-${i}`}
                  cx={x}
                  cy={150 - (i % 2 === 0 ? i * 10 : -i * 10)}
                  r="4"
                  fill="#3c8dbc"
                  stroke="white"
                  strokeWidth="2"
                />
              ))}
            </svg>
            <div className="mt-8 grid grid-cols-5 gap-2 px-2">
              {['T1', 'T2', 'T3', 'T4', 'T5'].map((t) => (
                <span key={t} className="text-center text-[10px] text-gray-400 font-bold">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Section 4: Compact Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <CompactStatCard label="Căn hộ" value="69" icon={Home} color="bg-[#00c0ef]" />
        <CompactStatCard label="Cư dân" value="68" icon={Users} color="bg-[#dd4b39]" />
        <CompactStatCard label="Thông báo" value="10" icon={Bell} color="bg-[#f39c12]" />
        <CompactStatCard label="Sự kiện" value="1" icon={Calendar} color="bg-[#00a65a]" />
        <CompactStatCard label="Tài khoản..." value="12" icon={LogIn} color="bg-[#605ca8]" />
        <CompactStatCard label="Bình luận" value="45" icon={MessageSquare} color="bg-[#d2d6de]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section 5: Vehicle Traffic (2/3 width) */}
        <Card className="lg:col-span-2 p-0 overflow-hidden border-none shadow-[0_1px_1px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[11px] font-bold text-gray-700 uppercase tracking-tight">
              Lượng xe ra - vào
            </h3>
            <div className="flex items-center gap-3">
              <LegendItem label="Vào" color="#5bc0de" />
              <LegendItem label="Ra" color="#3c8dbc" />
            </div>
          </div>
          <div className="p-6 h-[250px] relative">
            <div className="absolute inset-x-6 top-6 bottom-10 flex items-end justify-between gap-1 sm:gap-4">
              {[60, 45, 75, 50, 85, 65, 90, 40, 55, 70, 45, 80].map((val, i) => (
                <div
                  key={`vehicle-data-${i}`}
                  className="flex-1 flex flex-col items-center justify-end gap-1 group h-full"
                >
                  <div className="w-full flex items-end justify-center gap-0.5 h-full relative">
                    <div
                      className="w-[40%] bg-[#5bc0de] rounded-t-[1px]"
                      style={{ height: `${val}%` }}
                    />
                    <div
                      className="w-[40%] bg-[#3c8dbc] rounded-t-[1px]"
                      style={{ height: `${val * 0.8}%` }}
                    />
                  </div>
                  <span className="text-[8px] text-gray-400 font-bold mt-2">
                    {`2024${i + 9 > 12 ? `0${i - 3}` : i + 9}`}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute left-2 top-6 bottom-10 flex flex-col justify-between text-[10px] text-gray-400 font-bold">
              <span>150</span>
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-gray-400 font-bold">
              Xe
            </div>
          </div>
        </Card>

        {/* Section 6: Vehicle Donut (1/3 width) */}
        <DonutCard
          title="Phương tiện"
          labels={['Ô tô', 'Xe máy', 'Xe đạp điện', 'Xe đạp']}
          colors={['#605ca8', '#3c8dbc', '#00c0ef', '#d2d6de']}
          values={[20, 65, 10, 5]}
        />
      </div>

      {/* Section 7: Ticket Revenue (Full width) */}
      <Card className="p-0 overflow-hidden border-none shadow-[0_1px_1px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
        <div className="p-3 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-[11px] font-bold text-gray-700 uppercase tracking-tight">
            Doanh thu vé lượt
          </h3>
          <div className="flex items-center gap-3">
            <LegendItem label="VNĐ" color="#3c8dbc" />
          </div>
        </div>
        <div className="p-6 h-[250px] relative">
          <div className="absolute inset-x-6 top-6 bottom-10 flex items-end justify-between gap-2 sm:gap-6">
            {[40, 65, 45, 80, 55, 90, 70, 85, 40, 60, 75, 50].map((val, i) => (
              <div
                key={`ticket-revenue-${i}`}
                className="flex-1 flex flex-col items-center justify-end gap-1 group h-full"
              >
                <div
                  className="w-full sm:w-1/2 bg-[#3c8dbc] rounded-t-[1px] transition-all duration-500"
                  style={{ height: `${val}%` }}
                />
                <span className="text-[9px] text-gray-400 font-bold mt-2">T{i + 1}</span>
              </div>
            ))}
          </div>
          <div className="absolute left-2 top-6 bottom-10 flex flex-col justify-between text-[10px] text-gray-400 font-bold">
            <span>2.5 Triệu</span>
            <span>1.5 Triệu</span>
            <span>500k</span>
            <span>0</span>
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-gray-400 font-bold">
            Doanh thu
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 8: Other Donut Analytics */}
        <DonutCard
          title="Dòng tiền"
          labels={['Chuyển khoản', 'Tiền mặt', 'Ví điện tử', 'VNPay']}
          colors={['#3c8dbc', '#00c0ef', '#f39c12', '#00a65a']}
          values={[60, 25, 10, 5]}
        />
        <DonutCard
          title="Ý kiến - Kiến nghị"
          labels={['Đang xử lý', 'Hoàn thành', 'Hủy', 'Chờ xử lý']}
          colors={['#f39c12', '#00a65a', '#dd4b39', '#3c8dbc']}
          values={[30, 50, 5, 15]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 9: Data Tables */}
        <TableCard title="Thông báo cư dân" headers={['STT', 'Tiêu đề', 'Ngày tạo', 'Người tạo']} />
        <TableCard title="Ý kiến cư dân" headers={['STT', 'Tiêu đề', 'Ngày tạo', 'Phòng']} />
      </div>
    </div>
  );
}

function LegendItem({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <div className="h-2.5 w-2.5 rounded-[1px]" style={{ backgroundColor: color }} />
      <span className="text-[10px] sm:text-xs font-bold text-gray-500 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

function CompactStatCard({
  label,
  value,
  icon: Icon,
  color,
}: { label: string; value: string; icon: LucideIcon; color: string }) {
  return (
    <Card className="flex items-center overflow-hidden border-none shadow-[0_1px_1px_rgba(0,0,0,0.1)] rounded-[3px] bg-white group hover:shadow-md transition-shadow">
      <div
        className={cn(
          'p-4 text-white flex items-center justify-center shrink-0 w-14 sm:w-16 h-14 sm:h-16',
          color
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="p-2 sm:p-3 overflow-hidden">
        <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-tight truncate w-full">
          {label}
        </p>
        <p className="text-base sm:text-lg font-black text-gray-700 leading-none mt-1">{value}</p>
      </div>
    </Card>
  );
}

function DonutCard({
  title,
  labels,
  colors,
  values,
}: { title: string; labels: string[]; colors: string[]; values: number[] }) {
  return (
    <Card className="p-0 overflow-hidden border-none shadow-[0_1px_1px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
      <div className="p-3 border-b border-gray-100">
        <h3 className="text-[11px] font-bold text-gray-700 uppercase tracking-tight">{title}</h3>
      </div>
      <div className="p-4">
        <div className="relative h-28 sm:h-32 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 -rotate-90">
            <title>{title}</title>
            <circle cx="50" cy="50" r="35" fill="transparent" stroke="#f4f4f4" strokeWidth="15" />
            {values.map((v, i) => {
              const offset = values.slice(0, i).reduce((a, b) => a + b, 0) * 2.2;
              return (
                <circle
                  key={`donut-slice-${i}`}
                  cx="50"
                  cy="50"
                  r="35"
                  fill="transparent"
                  stroke={colors[i]}
                  strokeWidth="15"
                  strokeDasharray={`${v * 2.2} 220`}
                  strokeDashoffset={-offset}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white shadow-inner" />
          </div>
        </div>
        <div className="mt-4 space-y-1">
          {labels.map((label, i) => (
            <div key={label} className="flex items-center justify-between text-[10px] font-bold">
              <div className="flex items-center gap-2 overflow-hidden">
                <div
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: colors[i] }}
                />
                <span className="text-gray-500 truncate">{label}</span>
              </div>
              <span className="text-gray-400 shrink-0">{values[i]}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function TableCard({ title, headers }: { title: string; headers: string[] }) {
  return (
    <Card className="p-0 overflow-hidden border-none shadow-[0_1px_1px_rgba(0,0,0,0.1)] rounded-[3px] bg-white">
      <div className="p-3 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-gray-700 uppercase tracking-tight">{title}</h3>
        <button type="button" className="text-[10px] text-primary font-bold hover:underline">
          Xem thêm
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              {headers.map((h, i) => (
                <th
                  key={`table-header-${i}`}
                  className="p-3 text-[10px] font-black text-gray-400 uppercase border-b border-gray-100 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={headers.length}
                className="p-10 text-center text-xs text-gray-400 font-bold italic"
              >
                Không có dữ liệu hiển thị
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
