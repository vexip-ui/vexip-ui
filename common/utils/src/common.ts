export const isClient = typeof window !== 'undefined'
export const isIOS =
  /* #__PURE__ */ isClient &&
  window?.navigator?.userAgent &&
  /iP(ad|hone|od)/.test(window.navigator.userAgent)

const toString = Object.prototype.toString
const hasOwnProperty = Object.prototype.hasOwnProperty

export function is(value: unknown, type: string) {
  return toString.call(value) === `[object ${type}]`
}

export function has(value: Record<string, any>, key: string | symbol): key is keyof typeof value {
  return hasOwnProperty.call(value, key)
}

export function isDefined<T = unknown>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}

export function isNull(value: unknown): value is null | undefined {
  return value === undefined || value === null
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export function isNaN(value: unknown): value is number {
  return Number.isNaN(value)
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export function isTrue(value: unknown): value is true {
  return value === true
}

export function isFalse(value: unknown): value is false {
  return value === false
}

export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol'
}

export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint'
}

export function isArray<T = any>(value: unknown): value is T[] {
  return Array.isArray(value)
}

export function isObject<T extends Record<any, any> = Record<any, any>>(
  value: unknown
): value is T {
  return is(value, 'Object')
}

export function isPromise<T = any>(value: unknown): value is Promise<T> {
  return (
    !!value &&
    typeof (value as any).then === 'function' &&
    typeof (value as any).catch === 'function'
  )
}

export function isFunction(value: unknown): value is (...any: any[]) => any {
  return typeof value === 'function'
}

export function isSet<T = any>(value: unknown): value is Set<T> {
  return is(value, 'Set')
}

export function isMap<K = any, V = any>(value: unknown): value is Map<K, V> {
  return is(value, 'Map')
}

export function isDate(value: unknown): value is Date {
  return is(value, 'Date')
}

export function isRegExp(value: unknown): value is RegExp {
  return is(value, 'RegExp')
}

export function isEmpty(value: unknown) {
  if (Array.isArray(value) || typeof value === 'string') {
    return value.length === 0
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0
  }

  return false
}

export function isElement<T extends Element = Element>(value: unknown, ssr = false): value is T {
  if (!ssr && !isClient) return false

  return !!(value && 'nodeType' in (value as any))
}

export function isIterable(value: unknown) {
  return isDefined(value) && typeof (value as any)[Symbol.iterator] === 'function'
}

export function noop(...args: any[]): any

export function noop() {}

export function toTrue(...args: any[]): true
export function toTrue() {
  return true
}

export function toFalse(...args: any[]): false
export function toFalse() {
  return false
}

/**
 * 生成一个 range 数组
 *
 * @param size 大小
 * @param start 开始的数值，默认为 1
 * @param step 跨度，默认为 1
 */
export function range(size: number, start = 1, step = 1) {
  const array: number[] = []

  for (let i = 0; i < size; ++i) {
    array.push(start + i * step)
  }

  return array
}

/**
 * 获取变量类型
 *
 * @param value 任意变量
 */
export function getType(value: unknown) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

/**
 * 根据长度生成一串随机的字符串
 *
 * @param length 字符串的长度
 */
export function randomString(length = 16) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  const maxPos = chars.length

  let string = ''

  while (length--) {
    string += chars.charAt(Math.floor(Math.random() * maxPos))
  }

  return string
}
