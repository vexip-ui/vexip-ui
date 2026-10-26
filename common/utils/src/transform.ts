import { isDefined, isFunction, isIterable, isObject, toTrue } from './common'
import { deepClone } from './deep-clone'
import { raf } from './performance'

/**
 * 如果一个值不为数组，则将其转换为数组
 *
 * @param value 指定的值
 *
 * @returns 原始数组或转换后的数组
 */
export function ensureArray<T>(value: T | T[]) {
  return Array.isArray(value) ? value : [value]
}

/**
 * 如果一个值为函数，则执行它并返回结果，否则返回其本身
 *
 * @param value 指定的值
 * @param args 若为函数时，传入的参数
 *
 * @returns 原始值或函数执行结果
 */
export function callIfFunc<T, P extends any[] = any[]>(value: T | ((...args: P) => T), ...args: P) {
  return isFunction(value) ? value(...args) : value
}

/**
 * 将路径中的 `\` 替换为 `/`
 *
 * @param path 指定的路径
 *
 * @returns 替换后的路径
 */
export function normalizePath(path: string) {
  return path.replace(/[\\/]+/g, '/')
}

/**
 * 获取字符串的最后一个字符
 *
 * @param value 指定的字符串
 *
 * @returns 最后一个字符
 */
export function getLast(value: string): string | undefined
/**
 * 获取数组的最后一个元素
 *
 * @param value 指定的数组
 *
 * @returns 最后一个元素
 */
export function getLast<T>(value: T[]): T | undefined
export function getLast(value: string | any[]) {
  return value[value.length - 1]
}

type RecordKey = string | number | symbol

const defaultAccessor = (v: unknown) => v

export function listToMap<T = any, K extends keyof T = keyof T>(
  list: T[],
  prop: K,
  useMap?: false,
): Record<T[K] extends RecordKey ? T[K] : RecordKey, T>
export function listToMap<T = any, O = T, K extends keyof T = keyof T>(
  list: T[],
  prop: K,
  accessor?: (item: T) => O,
  useMap?: false,
): Record<T[K] extends RecordKey ? T[K] : RecordKey, O>
export function listToMap<T = any, K = RecordKey>(
  list: T[],
  prop: (item: T) => K,
  useMap?: false,
): Record<K extends RecordKey ? K : RecordKey, T>
export function listToMap<T = any, O = T, K = RecordKey>(
  list: T[],
  prop: (item: T) => K,
  accessor?: (item: T) => O,
  useMap?: false,
): Record<K extends RecordKey ? K : RecordKey, O>
export function listToMap<T = any, K extends keyof T = keyof T>(
  list: T[],
  prop: K,
  useMap?: true,
): Map<T[K], T>
export function listToMap<T = any, O = T, K extends keyof T = keyof T>(
  list: T[],
  prop: K,
  accessor?: (item: T) => O,
  useMap?: true,
): Map<T[K], O>
export function listToMap<T = any, K = any>(
  list: T[],
  prop: (item: T) => K,
  useMap?: true,
): Map<K, T>
export function listToMap<T = any, O = T, K = any>(
  list: T[],
  prop: (item: T) => K,
  accessor?: (item: T) => O,
  useMap?: true,
): Map<K, O>
/**
 * 根据数组元素中某个或多个属性的值转换为映射对象
 *
 * @param list 需要被转换的数组
 * @param prop 需要被转换的属性或提供一个读取方法
 * @param accessor 映射的值的读取方法，默认返回元素本身
 * @param useMap 是否使用 Map 对象储存结果
 *
 * @returns 转换后的映射对象
 */
export function listToMap<T = any, O = T>(
  list: T[],
  prop: keyof T | ((item: T) => any),
  accessor?: boolean | ((item: T) => O),
  useMap?: boolean,
) {
  let normalizeAccessor: (item: T) => O

  if (typeof accessor !== 'function' && useMap === undefined) {
    useMap = !!accessor
    normalizeAccessor = defaultAccessor as any
  } else {
    normalizeAccessor = typeof accessor === 'function' ? accessor : (defaultAccessor as any)
  }

  const map = (useMap ? new Map<string, any>() : {}) as any

  if (!isDefined(prop)) return map

  const set = useMap
    ? (key: any, value: O) => map.set(key, value)
    : (key: any, value: O) => (map[key] = value)
  const propAccessor = isFunction(prop) ? prop : (item: T) => item[prop]

  list.forEach(item => {
    if (!isDefined(item)) return

    const key = propAccessor(item)

    if (isDefined(key)) {
      set(key, normalizeAccessor(item))
    }
  })

  return map
}

export {
  /** @deprecated please use listToMap to replace it */
  listToMap as transformListToMap,
}

/**
 * 移除数组中的某个元素
 *
 * @param array 需要被移除元素的数组
 * @param item 需要被移除的元素, 或一个查找方法，如果元素为函数时则需要做一层简单包装
 * @param isFn 标记数组的元素是否为函数
 *
 * @returns 被移除的元素
 */
export function removeArrayItem<T = any>(
  array: T[],
  item: T | ((item: T) => boolean),
  isFn = false,
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
 *
 * @returns 分组后的对象
 */
export function groupByProps<T = any>(
  list: T[],
  props: Array<string | ((item: T) => any)> | string | ((item: T) => any) = [],
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
  /** 若指定，`parent` 值等于 `rootId` 的节点被认为是顶级节点 */
  rootId?: any,
}

/**
 * 将一个展平的列表转换为树
 *
 * @param list 要转换的列表
 * @param options 转换的配置项
 *
 * @returns 转换后的树
 */
export function transformTree<T = any>(list: T[], options: TreeOptions<keyof T> = {}) {
  const {
    keyField = 'id' as keyof T,
    childField = 'children' as keyof T,
    parentField = 'parent' as keyof T,
    rootId = null,
  } = options

  const hasRootId = isDefined(rootId) && rootId !== ''
  const tree: T[] = []
  const record = new Map<T[keyof T], T[]>()

  for (let i = 0, len = list.length; i < len; ++i) {
    const item = list[i]
    const id = item[keyField]

    if (hasRootId ? id === rootId : !isDefined(id)) {
      continue
    }

    if (record.has(id)) {
      ;(item as any)[childField] = record.get(id)!
    } else {
      ;(item as any)[childField] = []
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

export { transformTree as buildTree }

/**
 * 将一个树展平成列表
 *
 * @param tree 要展平的树
 * @param options 转换的配置项
 *
 * @returns 展平后的列表
 */
export function flatTree<T = any>(
  tree: T[],
  options: TreeOptions<keyof T> & {
    /** 是否为深度优先遍历 */
    depthFirst?: boolean,
    /**
     * 是否为无 ID 的节点插入 ID 值
     *
     * @default true
     */
    injectId?: boolean,
    /** 构建节点的 ID 的方法 */
    buildId?: (index: number) => any,
    /** 过滤节点的方法 */
    filter?: (item: T) => boolean,
    /** 过滤的结果是否会影响其子级 */
    cascaded?: boolean,
    /** 是否强制为节点插入 ID 值 */
    forceInject?: boolean,
  } = {},
) {
  const {
    keyField = 'id' as keyof T,
    childField = 'children' as keyof T,
    parentField = 'parent' as keyof T,
    rootId = null,
    depthFirst = false,
    injectId = true,
    buildId = i => i,
    filter = toTrue,
    cascaded = false,
    forceInject = false,
  } = options

  let idCount = 1

  const hasRootId = isDefined(rootId) && rootId !== ''
  const list: T[] = []
  const loop = [...tree]

  while (loop.length) {
    const item = loop.shift()!

    const childrenValue = item[childField]
    const children: T[] = Array.isArray(childrenValue) && childrenValue.length ? childrenValue : []

    if (injectId && (forceInject || !item[keyField])) {
      item[keyField] = buildId(idCount++)
    }

    const id = item[keyField]

    if (
      injectId &&
      parentField &&
      (hasRootId ? item[parentField] === rootId : !item[parentField])
    ) {
      ;(item as any)[parentField] = rootId
    }

    const filterResult = filter(item)

    if (filterResult) list.push(item)

    if (filterResult || !cascaded) {
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
    }
  }

  return list
}

/**
 * 遍历树并为每个节点执行回调方法
 *
 * @param tree 要遍历的树
 * @param cb 回调函数
 * @param options 遍历的配置项
 */
export function walkTree<T = any>(
  tree: T[],
  cb: (item: T, depth: number, parent: T | null) => void,
  options: {
    /** 是否为深度优先遍历 */
    depthFirst?: boolean,
    childField?: keyof T,
  } = {},
) {
  const { childField = 'children' as keyof T, depthFirst = false } = options
  const loop = [...tree.map(item => ({ item, depth: 0, parent: null as T | null }))]

  while (loop.length) {
    const { item, depth, parent } = loop.shift()!
    const children = item[childField] as T[]

    cb(item, depth, parent)

    if (isIterable(children)) {
      loop[depthFirst ? 'unshift' : 'push'](
        ...Array.from(children).map(child => ({ item: child, depth: depth + 1, parent: item })),
      )
    }
  }
}

/**
 * 遍历树并为每个节点执行回调方法，并用其返回值构建一颗新的树
 *
 * @param tree 要遍历的树
 * @param cb 回调函数
 * @param options 遍历的配置项
 *
 * @returns 构建后新的树
 */
export function mapTree<T = any, R = any>(
  tree: T[],
  cb: (item: T, depth: number, parent: T | null) => R,
  options: {
    /** 是否为深度优先遍历 */
    depthFirst?: boolean,
    childField?: keyof T,
    /** 是否强制重置 `children` 字段 */
    clearChildren?: boolean,
  } = {},
) {
  const { childField = 'children' as keyof T, depthFirst = false, clearChildren = true } = options
  const result: R[] = []
  const loop = [...tree.map(item => ({ item, depth: 0, parent: null as T | null, result }))]

  while (loop.length) {
    const { item, depth, parent, result } = loop.shift()!
    const children = item[childField] as T[]
    const newItem = cb(item, depth, parent) ?? ({} as any)

    if (clearChildren) {
      newItem[childField] = []
    }

    result.push(newItem)

    if (isIterable(children)) {
      const items = Array.from(children)

      if (items.length) {
        newItem[childField] = []
        loop[depthFirst ? 'unshift' : 'push'](
          ...Array.from(children).map(child => ({
            item: child,
            depth: depth + 1,
            parent: item,
            result: newItem[childField],
          })),
        )
      }
    }
  }

  return result
}

/**
 * 遍历树并为每个节点执行过滤方法，并用符合条件的节点构建一棵新的树
 *
 * @param tree 要遍历的树
 * @param cb 过滤的方法
 * @param options 遍历的配置项
 *
 * @returns 过滤后新的树
 */
export function filterTree<T = any>(
  tree: T[],
  cb: (item: T, depth: number, parent: T | null) => boolean,
  options: {
    /** 判断一个节点是否为叶子节点 */
    isLeaf?: (item: T) => boolean,
    /** 是否只对叶子节点进行过滤 */
    leafOnly?: boolean,
    childField?: keyof T,
  } = {},
) {
  const {
    childField = 'children' as keyof T,
    leafOnly = false,
    isLeaf = item => !isIterable(item[childField]),
  } = options

  const filter = (data: T[], depth: number, parent: T | null): T[] => {
    return data
      .map(item => ({ ...item }))
      .filter(item => {
        const children = item[childField] as T[]
        const leaf = isLeaf(item)
        const items = isIterable(children) && Array.from(children)

        if (leafOnly && !leaf) {
          if (items && items.length) {
            const matched = filter(items, depth + 1, item)
            item[childField] = matched as any

            return !!matched.length
          }

          return false
        }

        const result = cb(item, depth, parent)

        if (leaf) return result
        if (!leafOnly && result) return true

        if (items && items.length) {
          const matched = filter(items, depth + 1, item)
          item[childField] = matched as any

          return !!matched.length
        }

        return result
      })
  }

  return filter(tree, 0, null)
}

export interface SortOptions<T = string> {
  /** 属性名 */
  key: T,
  /** 排序方法 */
  method?: (prev: any, next: any) => number,
  /** 读取方法 */
  accessor?: (...args: any[]) => any,
  /** 升降序 */
  type?: 'asc' | 'desc',
  /** 传入读取器的额外参数 */
  params?: any[],
}

const defaultSortMethod = (prev: any, next: any) => {
  if (Number.isNaN(Number(prev) - Number(next))) {
    return String(prev).localeCompare(next)
  }

  return prev - next
}

/**
 * 根据依赖的属性对数组逐层排序
 *
 * @param list 需要排序的数组
 * @param props 排序依赖的属性
 *
 * @returns 排序后的数组
 */
export function sortByProps<T = any>(
  list: T[],
  props: keyof T | SortOptions<keyof T> | (keyof T | SortOptions<keyof T>)[],
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
            type: 'asc',
          }
          : value) as SortOptions<keyof T>,
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
 *
 * @returns 合并后的对象
 */
export function mergeObjects<T extends Record<string, any>, U extends Record<string, any>>(
  sourceObj: T,
  targetObj: U,
  isNewObj = true,
) {
  sourceObj = isNewObj ? deepClone(sourceObj) : sourceObj

  const loop: Array<{
    source: Record<string, any>,
    target: Record<string, any>,
  }> = [
    {
      source: sourceObj,
      target: targetObj,
    },
  ]

  while (loop.length) {
    const { source, target } = loop.pop()!

    Object.keys(target).forEach(key => {
      if (isObject(target[key])) {
        if (!isObject(source[key])) {
          source[key] = Object.create(null)
        }

        loop.push({
          source: source[key],
          target: target[key],
        })
      } else if (Array.isArray(target[key])) {
        if (!Array.isArray(source[key])) {
          source[key] = []
        }

        loop.push({
          source: source[key],
          target: target[key],
        })
      } else {
        source[key] = target[key]
      }
    })
  }

  return sourceObj as T & U
}

/**
 * 将一个任务队列按每帧一次依次指定，返回一个触发取消的方法
 *
 * @param queue 任务队列
 *
 * @returns 终止队列执行的方法
 */
export function runQueueFrame(queue: Array<() => void>) {
  queue = Array.from(queue)

  let cancelled = false

  const run = () => {
    if (cancelled) return

    queue.shift()?.()
    queue.length && raf(run)
  }

  run()

  return () => (cancelled = true)
}
