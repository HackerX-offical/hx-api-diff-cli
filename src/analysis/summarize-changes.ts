import type { ApiChange, ChangeKind, DiffReport } from '../types.js';

export interface ChangeSummary {
  breaking: number;
  additive: number;
  security: number;
  total: number;
  hasBreaking: boolean;
}

export function summarizeChanges(changes: ApiChange[]): ChangeSummary {
  const counts: Record<ChangeKind, number> = { breaking: 0, additive: 0, security: 0 };
  for (const c of changes) counts[c.kind]++;
  return {
    breaking: counts.breaking,
    additive: counts.additive,
    security: counts.security,
    total: changes.length,
    hasBreaking: counts.breaking > 0,
  };
}

export function buildDiffReport(
  oldTitle: string,
  oldVersion: string,
  newTitle: string,
  newVersion: string,
  changes: ApiChange[],
): DiffReport {
  return { oldTitle, oldVersion, newTitle, newVersion, changes };
}

export function exitCodeForChanges(changes: ApiChange[]): number {
  return summarizeChanges(changes).hasBreaking ? 2 : 0;
}
