import type { ApiChange, DiffReport } from '../types.js';
import type { ChangeSummary } from '../analysis/summarize-changes.js';

export function toJsonDiff(report: DiffReport, summary?: ChangeSummary): string {
  const payload = summary ? { ...report, summary } : report;
  return JSON.stringify(payload, null, 2);
}

export function toLegacyJson(
  oldTitle: string,
  newTitle: string,
  changes: ApiChange[],
): string {
  return JSON.stringify({ old: oldTitle, new: newTitle, changes }, null, 2);
}
