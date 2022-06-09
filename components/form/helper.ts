import { isNull } from '@vexip-ui/utils'

/**
 * 根据路径读取对象中的值 (实现 ?. 的逻辑)
 * @param obj - 需要被读取的对象
 * @param path - 读取的路径
 * @param strict - 是否开启严格模式 (非法路径报错)
 */
export function getValueByPath<T = unknown>(
  obj: Record<string, any>,
  path: string | string[],
  strict = false
): T | null {
  if (!obj || !path) return null

  if (typeof path === 'string') {
    if (path in obj) return obj[path]

    path = path.split('.')
  }

  if (Array.isArray(path) && path.length) {
    const lastKey = path.pop()

    if (!lastKey) return null

    for (let i = 0, len = path.length; i < len; ++i) {
      const key = String(path[i])

      if (!key) break

      obj = obj[key]

      if (isNull(obj)) {
        if (strict) {
          throw new Error('[Vexip warn] Get value by an invalid path')
        }

        return obj
      }
    }

    return obj[lastKey]
  }

  return null
}

/**
 * 根据路径设置对象中的值
 * @param obj - 需要被设置的对象
 * @param path - 设置的路径
 * @param value - 需要设置的值
 * @param strict - 是否开启严格模式 (非法路径报错)
 */
export function setValueByPath(
  obj: Record<string, any>,
  path: string | string[],
  value: unknown,
  strict = false
): boolean {
  if (!obj || !path) return false

  if (typeof path === 'string') {
    if (path in obj) {
      obj[path] = value

      return true
    }

    path = path.split('.')
  }

  if (Array.isArray(path) && path.length) {
    const lastKey = path.pop()

    if (!lastKey) return false

    for (let i = 0, len = path.length; i < len; ++i) {
      const key = String(path[i])

      if (!key) {
        return false
      }

      if (typeof obj[key] !== 'object') {
        if (strict) {
          throw new Error('[Vexip warn] Set value by an invalid path')
        }

        obj[key] = {}
      }

      obj = obj[key]
    }

    obj[lastKey] = value

    return true
  }

  return false
}
