/** 当前环境是否为客户端 */
export const isClient = typeof window !== 'undefined'
/** 当前环境是否为 IOS */
export const isIOS =
  /* #__PURE__ */ isClient &&
  window?.navigator?.userAgent &&
  /iP(ad|hone|od)/.test(window.navigator.userAgent)

const toString = Object.prototype.toString
const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * 判断一个值是否为指定的类型
 *
 * @param value 需判断的值
 * @param type 指定的类型，注意大小写
 *
 * @returns 类型是否匹配
 */
export function is(value: unknown, type: string) {
  return toString.call(value) === `[object ${type}]`
}

/**
 * 判断一个对象是否包含指定的键值
 *
 * @param value 需判断的对象
 * @param key 指定的键值
 *
 * @returns 是否包含键值
 */
export function has(value: Record<string, any>, key: string | symbol): key is keyof typeof value {
  return hasOwnProperty.call(value, key)
}

/**
 * 判断一个值是否已定义
 *
 * @param value 需判断的值
 *
 * @returns 是否已定义
 */
export function isDefined<T = unknown>(
  value: T | undefined | null,
): value is Exclude<T, undefined | null> {
  return value !== undefined && value !== null
}

/**
 * 判断一个值是否未被定义
 *
 * @param value 需判断的值
 *
 * @returns 是否未定义
 */
export function isNull(value: unknown): value is null | undefined {
  return value === undefined || value === null
}

/**
 * 判断一个值是否为数字
 *
 * @param value 需判断的值
 *
 * @returns 是否为数字
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

/**
 * 判断一个值是否为 `NaN`
 *
 * @param value 需判断的值
 *
 * @returns 是否为 `NaN`
 */
export function isNaN(value: unknown): value is number {
  return Number.isNaN(value)
}

/**
 * 判断一个值是否为字符串
 *
 * @param value 需判断的值
 *
 * @returns 是否为字符串
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * 判断一个值是否为布尔值
 *
 * @param value 需判断的值
 *
 * @returns 是否为布尔值
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

/**
 * 判断一个值是否为 `true`
 *
 * @param value 需判断的值
 *
 * @returns 是否为 `true`
 */
export function isTrue(value: unknown): value is true {
  return value === true
}

/**
 * 判断一个值是否为 `false`
 *
 * @param value 需判断的值
 *
 * @returns 是否为 `false`
 */
export function isFalse(value: unknown): value is false {
  return value === false
}

/**
 * 判断一个值是否为 `Symbol`
 *
 * @param value 需判断的值
 *
 * @returns 是否为 `Symbol`
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol'
}

/**
 * 判断一个值是否为 `BigInt`
 *
 * @param value 需判断的值
 *
 * @returns 是否为 `BigInt`
 */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint'
}

/**
 * 判断一个值是否为数组
 *
 * @param value 需判断的值
 *
 * @returns 是否为数组
 */
export function isArray<T = any>(value: unknown): value is T[] {
  return Array.isArray(value)
}

/**
 * 判断一个值是否为对象
 *
 * 注意，`null` 与原生的特殊对象不被包含
 *
 * @param value 需判断的值
 *
 * @returns 是否为对象
 */
export function isObject<T extends Record<any, any> = Record<any, any>>(
  value: unknown,
): value is T {
  return is(value, 'Object')
}

/**
 * 判断一个值是否为 `Promise`
 *
 * 如果一个对象包含 `then` 和 `catch` 方法，则被认为是一个 `Promise`
 *
 * @param value 需判断的值
 *
 * @returns 是否为 `Promise`
 */
export function isPromise<T = any>(value: unknown): value is Promise<T> {
  return (
    !!value &&
    typeof (value as any).then === 'function' &&
    typeof (value as any).catch === 'function'
  )
}

/**
 * 判断一个值是否为函数
 *
 * @param value 需判断的值
 *
 * @returns 是否为函数
 */
export function isFunction(value: unknown): value is (...any: any[]) => any {
  return typeof value === 'function'
}

/**
 * 判断一个值是否为 `Set`
 *
 * @param value 需判断的值
 *
 * @returns 是否为 `Set`
 */
export function isSet<T = any>(value: unknown): value is Set<T> {
  return is(value, 'Set')
}

/**
 * 判断一个值是否为 `Map`
 *
 * @param value 需判断的值
 *
 * @returns 是否为 `Map`
 */
export function isMap<K = any, V = any>(value: unknown): value is Map<K, V> {
  return is(value, 'Map')
}

/**
 * 判断一个值是否为 `Date`
 *
 * @param value 需判断的值
 *
 * @returns 是否为 `Date`
 */
export function isDate(value: unknown): value is Date {
  return is(value, 'Date')
}

/**
 * 判断一个值是否为正则
 *
 * @param value 需判断的值
 *
 * @returns 是否为正则
 */
export function isRegExp(value: unknown): value is RegExp {
  return is(value, 'RegExp')
}

/**
 * 判断一个值是否为空
 *
 * - 如果这是一个数组或字符串，则 `length` 为 `0` 时为空
 * - 如果这是一个 `Set` 或 `Map`，则 `size` 为 `0` 时为空
 * - 如果这是一个对象，则无任何键值时为空
 * - 如果这是一个数字，则为 `NaN` 时为空
 * - 其余情况下，未定义时为空
 *
 * @param value 需判断的值
 *
 * @returns 是否为空
 */
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

  if (typeof value === 'number') {
    return isNaN(value)
  }

  return isNull(value)
}

/**
 * 判断一个值是否为 `Element`
 *
 * @param value 需判断的值
 * @param ssr 是否考虑服务端渲染
 *
 * @returns 是否为 `Element`
 */
export function isElement<T extends Element = Element>(value: unknown, ssr = false): value is T {
  if (!ssr && !isClient) return false

  return !!(value && 'nodeType' in (value as any))
}

/**
 * 判断一个值能否被迭代
 *
 * @param value 需判断的值
 *
 * @returns 能否被迭代
 */
export function isIterable(value: unknown) {
  return isDefined(value) && typeof (value as any)[Symbol.iterator] === 'function'
}

/**
 * 一个空的占位函数
 */
export function noop(...args: any[]): any
export function noop() {}

/**
 * 一个返回 `true` 的占位函数
 *
 * @returns `true`
 */
export function toTrue(...args: any[]): true
export function toTrue() {
  return true
}

/**
 * 一个返回 `false` 的占位函数
 *
 * @returns `false`
 */
export function toFalse(...args: any[]): false
export function toFalse() {
  return false
}

/**
 * 生成一个值递进的数组
 *
 * @param size 大小
 * @param start 开始的数值，默认为 1
 * @param step 跨度，默认为 1
 *
 * @returns 生成的数组
 */
export function range(size: number, start = 1, step = 1) {
  const array: number[] = []

  for (let i = 0; i < size; ++i) {
    array.push(start + i * step)
  }

  return array
}

/**
 * 获取变量的类型
 *
 * @param value 任意变量
 *
 * @returns 变量的类型
 */
export function getType(value: unknown) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

/**
 * 根据长度生成一串随机的字符串
 *
 * @param length 字符串的长度
 *
 * @returns 生成的字符串
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

/**
 * 根据一系列判断条件，执行第一个为 `true` 的条件所对应的回调函数
 *
 * @param conditions 判断条件及回调函数
 * @param options 额外的选项
 *
 * @returns 是否匹配了任一条件
 */
export async function decide(
  conditions: [boolean | (() => boolean), () => void | Promise<void>][],
  options: {
    /**
     * 当匹配任意一个条件时，会在该条件对应的回调函数执行前执行
     */
    beforeMatchAny?: () => void | Promise<void>,
    /**
     * 当匹配任意一个条件时，会在该条件对应的回调函数执行完后执行
     */
    afterMatchAny?: () => void | Promise<void>,
  } = {},
) {
  if (conditions.length) {
    for (const [condition, callback] of conditions) {
      if (typeof condition === 'function' ? condition() : condition) {
        if (typeof options.beforeMatchAny === 'function') {
          await options.beforeMatchAny()
        }

        await callback()

        if (typeof options.afterMatchAny === 'function') {
          await options.afterMatchAny()
        }

        return true
      }
    }
  }

  return false
}
