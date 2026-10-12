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

export type ChangeKind = 'breaking' | 'additive' | 'security';

export interface ApiChange {
  kind: ChangeKind;
  message: string;
  path?: string;
  method?: string;
}

export interface DiffReport {
  oldTitle: string;
  newTitle: string;
  oldVersion: string;
  newVersion: string;
  changes: ApiChange[];
}
