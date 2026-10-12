import { extractOperations, extractSecuritySchemes } from './extract-operations.js';

describe('extractOperations', () => {
  it('skips non-http keys', () => {
    const ops = extractOperations({
      '/users': { get: { operationId: 'list' }, parameters: [] },
    });
    expect(ops).toHaveLength(1);
    expect(ops[0].method).toBe('GET');
  });
});

describe('extractSecuritySchemes', () => {
  it('lists scheme names', () => {
    expect(
      extractSecuritySchemes({ components: { securitySchemes: { bearer: {}, apiKey: {} } } }),
    ).toEqual(['bearer', 'apiKey']);
  });
});
