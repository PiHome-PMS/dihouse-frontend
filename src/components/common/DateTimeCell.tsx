/**
 * Formats a datetime string for display in table cells
 * Shows date on first line and time on second line
 */
export function DateTimeCell({ datetime }: { datetime: string }) {
  const [date, time] = datetime.split(' ');
  return (
    <div className="text-xs font-semibold text-gray-500 leading-tight">
      {date}
      <br />
      <span className="text-[11px]">{time}</span>
    </div>
  );
}
