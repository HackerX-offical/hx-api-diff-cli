import { diffSurfaces, type ApiSurface } from '../src/openapi.js';

const base: ApiSurface = {
  title: 'a',
  version: '1',
  schemes: ['bearer'],
  ops: [{ path: '/users', method: 'GET' }],
};

describe('diffSurfaces', () => {
  it('detects new endpoint', () => {
    const n = { ...base, ops: [...base.ops, { path: '/admin', method: 'POST' }] };
    const c = diffSurfaces(base, n);
    expect(c.some((x) => x.kind === 'additive')).toBe(true);
  });
});
