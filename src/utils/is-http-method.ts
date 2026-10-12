const HTTP_METHODS = new Set(['get', 'post', 'put', 'patch', 'delete', 'options', 'head', 'trace']);

export function isHttpMethod(method: string): boolean {
  return HTTP_METHODS.has(method.toLowerCase());
}

export function normalizeMethod(method: string): string {
  return method.toUpperCase();
}
