import { isDefined, isFunction, isObject, toTrue } from './common'
import { deepClone } from './deep-clone'

export function ensureArray<T>(value: T | T[]) {
  return Array.isArray(value) ? value : [value]
}

export function callIfFunc<T>(value: T | (() => T)) {
  return isFunction(value) ? value() : value
}

export function normalizePath(path: string) {
  return path.replace(/[\\/]+/g, '/')
}

/**
 * 根据数组元素中某个或多个属性的值转换为映射
 *
 * @param list 需要被转换的数组
 * @param prop 需要被转换的属性或提供一个读取方法
 * @param accessor 映射的值的读取方法，默认返回元素本身
 */
export function transformListToMap<T = any, K = T>(
  list: T[],
  prop: keyof T | ((item: T) => any),
  accessor?: (item: T) => K,
  isMap?: false
): Record<string, K>
export function transformListToMap<T = any, K = T>(
  list: T[],
  prop: keyof T | ((item: T) => any),
  accessor?: (item: T) => K,
  isMap?: true
): Map<string, K>
export function transformListToMap<T = any, K = T>(
  list: T[],
  prop: keyof T | ((item: T) => any),
  accessor: (item: T) => K = v => v as any,
  isMap = false
) {
  const map = (isMap ? new Map<string, any>() : {}) as any

  if (!isDefined(prop)) return map

  const set = isMap
    ? (key: any, value: K) => map.set(key, value)
    : (key: any, value: K) => (map[key] = value)
  const propAccessor = isFunction(prop) ? prop : (item: T) => item[prop]

  list.forEach(item => {
    const key = propAccessor(item)

    if (isDefined(key)) {
      set(key, accessor(item))
    }
  })

  return map
}

/**
 * 移除数组中的某个元素
 *
 * @param array 需要被移除元素的数组
 * @param item 需要被移除的元素, 或一个查找方法，如果元素为函数时则需要做一层简单包装
 * @param isFn 标记数组的元素是否为函数
 */
export function removeArrayItem<T = any>(
  array: T[],
  item: T | ((item: T) => boolean),
  isFn = false
): T | null {
  let index = -1

  if (isFn || typeof item !== 'function') {
    index = array.findIndex(current => current === item)
  } else {
    index = array.findIndex(item as (item: T) => boolean)
  }

  if (~index) {
    return array.splice(index, 1)[0]
  }

  return null
}

/**
 * 按照一定顺序的属性对数据进行分组
 *
 * @param list 需要分数的数据
 * @param props 需要按顺序分组的属性
 */
export function groupByProps<T = any>(
  list: T[],
  props: Array<string | ((item: T) => any)> | string | ((item: T) => any) = []
): Record<string, T[]> {
  if (typeof props === 'string' || typeof props === 'function') {
    props = [props]
  }

  const propCount = props.length
  const zipData: Record<string, any> = {}

  for (const item of list) {
    let data

    for (let i = 0; i < propCount; ++i) {
      const isLast = i === propCount - 1
      const prop = props[i]
      const value = typeof prop === 'function' ? prop(item) : item[prop as keyof T]

      if (!data) {
        if (!zipData[value]) {
          zipData[value] = isLast ? [] : {}
        }

        data = zipData[value]
      } else {
        if (!data[value]) {
          data[value] = isLast ? [] : {}
        }

        data = data[value]
      }
    }

    data.push(item)
  }

  return zipData
}

export interface TreeOptions<T = string> {
  keyField?: T,
  childField?: T,
  parentField?: T,
  rootId?: any
}

/**
 * Transform the given flatted list to tree
 *
 * @param list the flatted list
 * @param options the config for transforming
 */
export function transformTree<T = any>(list: T[], options: TreeOptions<keyof T> = {}) {
  const {
    keyField = 'id' as keyof T,
    childField = 'children' as keyof T,
    parentField = 'parent' as keyof T,
    rootId = null
  } = options

  const hasRootId = isDefined(rootId) && rootId !== ''
  const tree: T[] = []
  const record = new Map<T[keyof T], T[]>()

  for (let i = 0, len = list.length; i < len; ++i) {
    const item = list[i]
    const id = item[keyField]

    if (hasRootId ? id === rootId : !id) {
      continue
    }

    if (record.has(id)) {
      (item as any)[childField] = record.get(id)!
    } else {
      (item as any)[childField] = []
      record.set(id, (item as any)[childField])
    }

    if (item[parentField] && (!hasRootId || item[parentField] !== rootId)) {
      const parentId = item[parentField]

      if (!record.has(parentId)) {
        record.set(parentId, [])
      }

      record.get(parentId)!.push(item)
    } else {
      tree.push(item)
    }
  }

  return tree
}

/**
 * Transform the given tree to flatted list
 *
 * @param tree the tree
 * @param options the config for transforming
 */
export function flatTree<T = any>(
  tree: T[],
  options: TreeOptions<keyof T> & {
    depthFirst?: boolean,
    injectId?: boolean,
    filter?: (item: T) => boolean
  } = {}
) {
  const {
    keyField = 'id' as keyof T,
    childField = 'children' as keyof T,
    parentField = 'parent' as keyof T,
    rootId = null,
    depthFirst = false,
    injectId = true,
    filter = toTrue
  } = options

  const hasRootId = isDefined(rootId) && rootId !== ''
  const list: T[] = []
  const loop = [...tree]

  let idCount = 1

  while (loop.length) {
    const item = loop.shift()!

    const childrenValue = item[childField]
    const children: T[] = Array.isArray(childrenValue) && childrenValue.length ? childrenValue : []

    if (injectId && !item[keyField]) {
      item[keyField] = idCount++ as any
    }

    const id = item[keyField]

    if (
      injectId &&
      parentField &&
      (hasRootId ? item[parentField] === rootId : !item[parentField])
    ) {
      (item as any)[parentField] = rootId
    }

    for (let i = 0, len = children.length; i < len; ++i) {
      const child = children[i]

      if (injectId && parentField) {
        child[parentField] = id
      }

      !depthFirst && loop.push(child)
    }

    if (depthFirst) {
      loop.unshift(...children)
    }

    if (filter(item)) list.push(item)
  }

  return list
}

/**
 * Walk the given tree value and call the callback for each node
 *
 * @param tree the tree to walk
 * @param cb the callback function
 * @param options the config for walk
 */
export function walkTree<T = any>(
  tree: T[],
  cb: (item: T) => void,
  options: {
    depthFirst?: boolean,
    childField?: keyof T
  } = {}
) {
  const { childField = 'children' as keyof T, depthFirst = false } = options
  const loop = [...tree]

  while (loop.length) {
    const item = loop.shift()!
    const children = item[childField] as T[]

    cb(item)

    if (children?.length) {
      if (depthFirst) {
        loop.unshift(...children)
      } else {
        loop.push(...children)
      }
    }
  }
}

export interface SortOptions<T = string> {
  key: T,
  method?: (prev: any, next: any) => number,
  accessor?: (...args: any[]) => any,
  type?: 'asc' | 'desc',
  params?: any[] // 传入读取器的额外参数
}

const defaultSortMethod = (prev: any, next: any) => {
  if (Number.isNaN(Number(prev) - Number(next))) {
    return String(prev).localeCompare(next)
  }

  return prev - next
}

/**
 * 根据依赖的属性逐层排序
 *
 * @param list 需要排序的数组
 * @param props 排序依赖的属性 key-属性名 method-排序方法 accessor-数据获取方法 type-升降序
 */
export function sortByProps<T = any>(
  list: T[],
  props: keyof T | SortOptions<keyof T> | (keyof T | SortOptions<keyof T>)[]
) {
  if (
    !list.sort ||
    (isObject<SortOptions>(props) && !props.key) ||
    !(props as string | SortOptions[]).length
  ) {
    return list
  }

  const sortedList = Array.from(list)

  if (!Array.isArray(props)) {
    props = [props]
  }

  const formattedProps = props
    .map(
      value =>
        (typeof value === 'string'
          ? {
              key: value,
              method: defaultSortMethod,
              type: 'asc'
            }
          : value) as SortOptions<keyof T>
    )
    .map(value => {
      if (typeof value.accessor !== 'function') {
        value.accessor = (data: T) => data[value.key]
      }

      if (typeof value.method !== 'function') {
        value.method = defaultSortMethod
      }

      value.params = Array.isArray(value.params) ? value.params : []

      return value as Required<SortOptions>
    })

  sortedList.sort((prev, next) => {
    let lastResult = 0

    for (const prop of formattedProps) {
      const { method, type, accessor, params } = prop
      const desc = type === 'desc'
      const result = method(accessor(prev, ...params), accessor(next, ...params))

      lastResult = desc ? -result : result
      // 若不为0则无需进行下一层排序
      if (lastResult) break
    }

    return lastResult
  })

  return sortedList
}

/**
 * 将两个对象进行深度的动态合并
 *
 * @param sourceObj 用于接收合并的源对象
 * @param targetObj 被合并的对象，当属性名相同但值类型不同的情况，此对象的权重更高
 * @param isNewObj 标记合并至一个全新的对象（深度的）
 */
export function mergeObjects<T extends Record<string, any>, U extends Record<string, any>>(
  sourceObj: T,
  targetObj: U,
  isNewObj = true
) {
  sourceObj = isNewObj ? deepClone(sourceObj) : sourceObj

  const loop: Array<{
    source: Record<string, any>,
    target: Record<string, any>
  }> = [
    {
      source: sourceObj,
      target: targetObj
    }
  ]

  while (loop.length) {
    const { source, target } = loop.pop()!

    Object.keys(target).forEach(key => {
      if (isObject(target[key])) {
        if (!isObject(source[key])) {
          source[key] = {}
        }

        loop.push({
          source: source[key],
          target: target[key]
        })
      } else if (Array.isArray(target[key])) {
        if (!Array.isArray(source[key])) {
          source[key] = []
        }

        loop.push({
          source: source[key],
          target: target[key]
        })
      } else {
        source[key] = target[key]
      }
    })
  }

  return sourceObj as T & U
}

export function runQueueFrame(queue: Array<() => void>) {
  queue = Array.from(queue)

  let cancelled = false

  const run = () => {
    if (cancelled) return

    queue.shift()?.()
    queue.length && requestAnimationFrame(run)
  }

  run()

  return () => (cancelled = true)
}
