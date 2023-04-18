export const EXTERNAL_URL_RE = /^[a-z]+:/i

export function isExternal(path: string) {
  return EXTERNAL_URL_RE.test(path)
}

export function ensureStartingSlash(path: string) {
  return /^\//.test(path) ? path : `/${path}`
}
