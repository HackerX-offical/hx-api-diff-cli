import { readFileSync } from 'node:fs';
import YAML from 'yaml';
import type { ApiSurface } from '../types.js';
import { extractOperations, extractSecuritySchemes } from '../core/extract-operations.js';
import { specFormatFromPath } from '../utils/spec-format.js';

export function parseSpecDocument(raw: string, format: 'json' | 'yaml'): Record<string, unknown> {
  if (format === 'json') return JSON.parse(raw) as Record<string, unknown>;
  return YAML.parse(raw) as Record<string, unknown>;
}

export function surfaceFromDocument(doc: Record<string, unknown>): ApiSurface {
  const info = doc.info as Record<string, unknown> | undefined;
  const paths = doc.paths as Record<string, unknown> | undefined;
  return {
    title: String(info?.title ?? 'unknown'),
    version: String(info?.version ?? '?'),
    ops: extractOperations(paths),
    schemes: extractSecuritySchemes(doc),
  };
}

export function loadSpec(path: string): ApiSurface {
  const raw = readFileSync(path, 'utf8');
  const format = specFormatFromPath(path);
  const doc = parseSpecDocument(raw, format);
  return surfaceFromDocument(doc);
}
