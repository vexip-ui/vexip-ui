import { getType, noop } from './common'

export interface DeepCloneOptions {
  /**
   * 一个自定义的克隆对象方法，用于处理方法内置以外的对象克隆，如 Class 的实例
   *
   * @param type 对象的类型，注意格式为大驼峰
   * @param obj 原始对象
   *
   * @returns 克隆后对象
   */
  cloneObject?: (type: string, obj: unknown) => any
}

/**
 * 深度拷贝对象或数组
 *
 * @param obj 需要拷贝的对象或数组
 *
 * @returns 克隆后的对象
 */
export function deepClone<T>(obj: T, options: DeepCloneOptions = {}): T {
  if (obj == null || typeof obj !== 'object') {
    return obj
  }

  const { cloneObject = noop } = options
  const temp = Object.create(null) as any

  // 循环数组栈
  const loopList: Array<{
    parent: any,
    prop: any,
    data: any
  }> = [
    {
      parent: temp,
      prop: 'root',
      data: obj
    }
  ]

  const referenceMap = new WeakMap<any, any>()
  const setProps: Array<{ parent: any, prop: any }> = []
  const mapProps: Array<{ parent: any, prop: any }> = []

  while (loopList.length) {
    // 先入后出，深度优先
    const { parent, prop, data } = loopList.pop()!

    if (!parent) continue

    const type = getType(data)

    if (type === 'Date') {
      parent[prop] = new Date(data as Date)
      continue
    }

    if (type !== 'Array') {
      const result = cloneObject(type, data)

      if (result != null) {
        parent[prop] = result
        continue
      }
    }

    // 初始化克隆对象
    const cloned: any = (parent[prop] =
      type === 'Array' || type === 'Set' || type === 'Map' ? [] : {})

    if (type === 'Set' || type === 'Map') {
      let i = 0

      if (type === 'Set') {
        for (const item of data) {
          if (referenceMap.has(item)) {
            cloned[i] = referenceMap.get(item)!
          } else if (item !== null && typeof item === 'object') {
            loopList.push({
              parent: cloned,
              prop: i,
              data: item
            })
          } else {
            cloned[i] = item
          }

          ++i
        }

        setProps.push({ parent, prop })
      } else {
        for (const entry of data) {
          const clonedEntry = []
          i = 0

          for (const item of entry) {
            if (referenceMap.has(item)) {
              clonedEntry[i] = referenceMap.get(item)!
            } else if (item !== null && typeof item === 'object') {
              loopList.push({
                parent: clonedEntry,
                prop: i,
                data: item
              })
            } else {
              clonedEntry[i] = item
            }

            ++i
          }

          cloned.push(clonedEntry)
        }

        mapProps.push({ parent, prop })
      }
    } else {
      for (const key of Object.keys(data)) {
        const item = data[key]

        // 处理循环引用
        if (referenceMap.has(item)) {
          cloned[key] = referenceMap.get(item)!
        } else if (item !== null && typeof item === 'object') {
          loopList.push({
            parent: cloned,
            prop: key,
            data: item
          })
        } else {
          cloned[key] = item
        }
      }
    }

    referenceMap.set(data, cloned)
  }

  for (const { parent, prop } of setProps) {
    parent[prop] = new Set(parent[prop])
  }

  for (const { parent, prop } of mapProps) {
    parent[prop] = new Map(parent[prop])
  }

  return temp.root
}
