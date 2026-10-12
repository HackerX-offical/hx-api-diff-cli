import type { OpRef } from '../types.js';
import { isHttpMethod, normalizeMethod } from '../utils/is-http-method.js';

export function extractOperations(paths: Record<string, unknown> | undefined): OpRef[] {
  const ops: OpRef[] = [];
  if (!paths) return ops;

  for (const [p, methods] of Object.entries(paths)) {
    if (!methods || typeof methods !== 'object') continue;
    for (const [m, op] of Object.entries(methods as Record<string, unknown>)) {
      if (!isHttpMethod(m)) continue;
      const operation = op as Record<string, unknown>;
      ops.push({
        path: p,
        method: normalizeMethod(m),
        operationId: operation.operationId as string | undefined,
        security: operation.security,
      });
    }
  }
  return ops;
}

export function extractSecuritySchemes(doc: Record<string, unknown>): string[] {
  const components = doc.components as Record<string, unknown> | undefined;
  const schemes = components?.securitySchemes as Record<string, unknown> | undefined;
  return Object.keys(schemes ?? {});
}
