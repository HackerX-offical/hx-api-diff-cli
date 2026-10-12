import type { ApiChange, ApiSurface } from '../types.js';
import { opKey, opsToMap } from '../utils/op-key.js';

export function diffRemovedEndpoints(oldS: ApiSurface, newS: ApiSurface): ApiChange[] {
  const changes: ApiChange[] = [];
  const newMap = opsToMap(newS.ops);
  for (const o of oldS.ops) {
    if (!newMap.has(opKey(o))) {
      changes.push({
        kind: 'breaking',
        message: 'Endpoint removed',
        path: o.path,
        method: o.method,
      });
    }
  }
  return changes;
}

export function diffAddedEndpoints(oldS: ApiSurface, newS: ApiSurface): ApiChange[] {
  const changes: ApiChange[] = [];
  const oldMap = opsToMap(oldS.ops);
  for (const o of newS.ops) {
    if (!oldMap.has(opKey(o))) {
      changes.push({
        kind: 'additive',
        message: 'New endpoint exposed',
        path: o.path,
        method: o.method,
      });
    }
  }
  return changes;
}

export function diffSecuritySchemes(oldS: ApiSurface, newS: ApiSurface): ApiChange[] {
  const changes: ApiChange[] = [];
  const oldSchemes = new Set(oldS.schemes);
  for (const s of newS.schemes) {
    if (!oldSchemes.has(s)) {
      changes.push({ kind: 'security', message: `New security scheme: ${s}` });
    }
  }
  return changes;
}

export function diffSurfaces(oldS: ApiSurface, newS: ApiSurface): ApiChange[] {
  return [
    ...diffRemovedEndpoints(oldS, newS),
    ...diffAddedEndpoints(oldS, newS),
    ...diffSecuritySchemes(oldS, newS),
  ];
}
