export function formatVND(value: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactVND(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) {
    const trieu = value / 1_000_000;
    return `${new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 1 }).format(trieu)} triệu`;
  }
  if (abs >= 1_000) {
    const nghin = value / 1_000;
    return `${new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 0 }).format(nghin)}k`;
  }
  return `${value}`;
}
