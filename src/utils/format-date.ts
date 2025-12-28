/**
 * Date formatting utilities (DD/MM/YYYY - Vietnamese format)
 */

/**
 * Format date to Vietnamese display format
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Format date with time
 */
export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  const dateStr = formatDate(d);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${dateStr} ${hours}:${minutes}`;
}

/**
 * Format date to API format (ISO)
 */
export function formatDateApi(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Parse Vietnamese date string to Date
 */
export function parseVietnameseDate(dateStr: string): Date | null {
  const parts = dateStr.split('/');
  if (parts.length !== 3) return null;

  const day = Number.parseInt(parts[0], 10);
  const month = Number.parseInt(parts[1], 10) - 1;
  const year = Number.parseInt(parts[2], 10);

  const date = new Date(year, month, day);
  return Number.isNaN(date.getTime()) ? null : date;
}
