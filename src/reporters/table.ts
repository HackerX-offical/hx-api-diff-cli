import chalk from 'chalk';
import type { ApiChange } from '../types.js';

function colorForKind(kind: ApiChange['kind']) {
  if (kind === 'breaking') return chalk.red;
  if (kind === 'security') return chalk.yellow;
  return chalk.green;
}

export function formatChangeLine(c: ApiChange): string {
  const color = colorForKind(c.kind);
  return color(`[${c.kind}] ${c.method ?? ''} ${c.path ?? ''} — ${c.message}`);
}

export function formatDiffHeader(
  oldTitle: string,
  oldVersion: string,
  newTitle: string,
  newVersion: string,
): string {
  return chalk.bold(`${oldTitle}@${oldVersion} → ${newTitle}@${newVersion}\n`);
}
