export function getRowCount(granularity: number) {
  return (24 * 60) / granularity;
}

export function rowStartFromIndex(slotIndex: number) {
  return 2 + slotIndex;
}

export function lessonSpanRows(duration: number, granularity: number) {
  return Math.max(1, Math.round(duration / granularity));
}