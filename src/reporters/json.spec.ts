import { toJsonDiff } from './json.js';

describe('toJsonDiff', () => {
  it('serializes report', () => {
    const json = toJsonDiff(
      {
        oldTitle: 'a',
        newTitle: 'b',
        oldVersion: '1',
        newVersion: '2',
        changes: [],
      },
      { breaking: 0, additive: 0, security: 0, total: 0, hasBreaking: false },
    );
    expect(JSON.parse(json).summary.total).toBe(0);
  });
});
