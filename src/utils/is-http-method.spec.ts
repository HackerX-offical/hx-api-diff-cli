import { isHttpMethod, normalizeMethod } from './is-http-method.js';

describe('isHttpMethod', () => {
  it('accepts standard verbs', () => {
    expect(isHttpMethod('GET')).toBe(true);
    expect(isHttpMethod('patch')).toBe(true);
  });
  it('rejects path keys', () => {
    expect(isHttpMethod('parameters')).toBe(false);
  });
});

describe('normalizeMethod', () => {
  it('uppercases', () => {
    expect(normalizeMethod('get')).toBe('GET');
  });
});
