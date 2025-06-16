export function parseJsonArray<T>(value: unknown): T[] {
  if (value === null || value === undefined) return [];
  if (typeof value !== 'string') return [];
  
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
