export function specFormatFromPath(path: string): 'json' | 'yaml' {
  const lower = path.toLowerCase();
  if (lower.endsWith('.json')) return 'json';
  return 'yaml';
}
