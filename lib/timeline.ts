/** Build-time-fixed "now" boundary so the rail's right edge is stable across renders. */
export const NOW_ISO = "2026-08";

export function monthIndexOf(month: string): number {
  if (month === "now") return monthIndexOf(NOW_ISO);
  const [y, m] = month.split("-").map(Number) as [number, number];
  return y * 12 + (m - 1);
}

export function yearOfIndex(index: number): number {
  return Math.floor(index / 12);
}

export type TimelineExtent = { min: number; max: number };

export function getExtent(ranges: Array<{ start: string; end: string }>): TimelineExtent {
  const starts = ranges.map((r) => monthIndexOf(r.start));
  const max = monthIndexOf(NOW_ISO);
  const min = Math.min(...starts, max - 12);
  return { min, max };
}
