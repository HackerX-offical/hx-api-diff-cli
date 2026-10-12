import { readFileSync } from 'node:fs';
import YAML from 'yaml';

export interface OpRef {
  path: string;
  method: string;
  operationId?: string;
  security?: unknown;
}

export interface ApiSurface {
  title: string;
  version: string;
  ops: OpRef[];
  schemes: string[];
}

export function loadSpec(path: string): ApiSurface {
  const raw = readFileSync(path, 'utf8');
  const doc = path.endsWith('.json') ? JSON.parse(raw) : YAML.parse(raw);
  const ops: OpRef[] = [];
  const paths = doc.paths ?? {};
  for (const [p, methods] of Object.entries(paths as Record<string, Record<string, unknown>>)) {
    for (const [m, op] of Object.entries(methods)) {
      if (!['get', 'post', 'put', 'patch', 'delete', 'options', 'head'].includes(m)) continue;
      const operation = op as Record<string, unknown>;
      ops.push({
        path: p,
        method: m.toUpperCase(),
        operationId: operation.operationId as string | undefined,
        security: operation.security,
      });
    }
  }
  return {
    title: doc.info?.title ?? 'unknown',
    version: doc.info?.version ?? '?',
    ops,
    schemes: Object.keys(doc.components?.securitySchemes ?? {}),
  };
}

export type ChangeKind = 'breaking' | 'additive' | 'security';

export interface ApiChange {
  kind: ChangeKind;
  message: string;
  path?: string;
  method?: string;
}

export function diffSurfaces(oldS: ApiSurface, newS: ApiSurface): ApiChange[] {
  const changes: ApiChange[] = [];
  const key = (o: OpRef) => `${o.method} ${o.path}`;
  const oldMap = new Map(oldS.ops.map((o) => [key(o), o]));
  const newMap = new Map(newS.ops.map((o) => [key(o), o]));

  for (const [k, o] of oldMap) {
    if (!newMap.has(k)) {
      changes.push({ kind: 'breaking', message: 'Endpoint removed', path: o.path, method: o.method });
    }
  }
  for (const [k, o] of newMap) {
    if (!oldMap.has(k)) {
      changes.push({ kind: 'additive', message: 'New endpoint exposed', path: o.path, method: o.method });
    }
  }

  const oldSchemes = new Set(oldS.schemes);
  for (const s of newS.schemes) {
    if (!oldSchemes.has(s)) {
      changes.push({ kind: 'security', message: `New security scheme: ${s}` });
    }
  }

  return changes;
}
