import { opKey, opsToMap } from './op-key.js';

describe('opKey', () => {
  it('combines method and path', () => {
    expect(opKey({ path: '/x', method: 'GET' })).toBe('GET /x');
  });
});

describe('opsToMap', () => {
  it('indexes by key', () => {
    const m = opsToMap([{ path: '/a', method: 'POST' }]);
    expect(m.get('POST /a')?.path).toBe('/a');
  });
});
