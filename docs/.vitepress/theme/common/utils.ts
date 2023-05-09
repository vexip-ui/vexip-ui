import { ensureArray } from '@vexip-ui/utils'

// e.g. http: https:
export const EXTERNAL_URL_RE = /^[a-z]+:/i

export function isExternal(path: string) {
  return EXTERNAL_URL_RE.test(path)
}

export function ensureStartingSlash(path: string) {
  return /^\//.test(path) ? path : `/${path}`
}

export function removeExt(path: string, exts: string | string[] = ['md', 'html']) {
  return path.replace(new RegExp(`\\.(${ensureArray(exts).join('|')})`), '')
}
