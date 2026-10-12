import { surfaceFromDocument, parseSpecDocument } from './load-spec.js';

describe('parseSpecDocument', () => {
  it('parses JSON', () => {
    const doc = parseSpecDocument('{"openapi":"3.0.0"}', 'json');
    expect(doc.openapi).toBe('3.0.0');
  });
});

describe('surfaceFromDocument', () => {
  it('builds surface from minimal doc', () => {
    const s = surfaceFromDocument({
      info: { title: 'T', version: '2' },
      paths: { '/health': { get: {} } },
    });
    expect(s.title).toBe('T');
    expect(s.ops).toHaveLength(1);
  });
});
