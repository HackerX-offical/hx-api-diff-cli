import { exitCodeForChanges, summarizeChanges } from './summarize-changes.js';

describe('summarizeChanges', () => {
  it('counts kinds', () => {
    const s = summarizeChanges([
      { kind: 'breaking', message: 'x' },
      { kind: 'additive', message: 'y' },
    ]);
    expect(s.breaking).toBe(1);
    expect(s.additive).toBe(1);
    expect(s.hasBreaking).toBe(true);
  });
});

describe('exitCodeForChanges', () => {
  it('returns 2 when breaking', () => {
    expect(exitCodeForChanges([{ kind: 'breaking', message: 'm' }])).toBe(2);
    expect(exitCodeForChanges([{ kind: 'additive', message: 'm' }])).toBe(0);
  });
});
