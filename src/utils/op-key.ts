import type { OpRef } from '../types.js';

export function opKey(op: OpRef): string {
  return `${op.method} ${op.path}`;
}

export function opsToMap(ops: OpRef[]): Map<string, OpRef> {
  return new Map(ops.map((o) => [opKey(o), o]));
}
