interface AnyObject {
  [prop: string]: any
}

interface AnyFunction {
  (...any: any[]): any
}

export function isNull(any: unknown): any is null | undefined {
  return any === undefined || any === null
}

export function isDefined(any: unknown): boolean {
  return any !== undefined && any !== null
}

export function isPromise(any: unknown): any is Promise<any> {
  return (
    !!any &&
    typeof (any as any).then === 'function' &&
    typeof (any as any).catch === 'function'
  )
}

export function isMethod(any: unknown): any is (...args: any[]) => any {
  return typeof any === 'function'
}

export function toNumber(value: number | string): number {
  const number = parseFloat(value as string)

  return Number.isNaN(number) ? 0 : number
}

/* eslint-disable @typescript-eslint/no-empty-function */
export function noop(): void {}

/**
 * 生成一个 range 数组
 * @param {Number} size 大小
 * @param {Number} start 开始的数值
 * @param {Number} step 跨度
 */
export function range(size: number, start = 1, step = 1): number[] {
  const array = []

  for (let i = 0; i < size; i++) {
    array.push(start + i * step)
  }

  return array
}

/**
 * 获取变量类型
 * @param {any} any 任意变量
 * @returns {String} 小写的类型名字
 */
export function getType(any: unknown): string {
  return Object.prototype.toString
    .call(any)
    .slice(8, -1)
    .toLowerCase()
}

export function broadcast(
  context: Vue,
  componentName: string,
  eventName: string,
  ...params: any[]
): void {
  context.$children.forEach(child => {
    const name = child.$options.name

    if (name === componentName) {
      child.$emit(eventName, ...params)
    } else {
      broadcast(child, componentName, eventName, ...params)
    }
  })
}

export function dispatch(
  context: Vue,
  componentName: string,
  eventName: string,
  ...params: any[]
): void {
  let parent = context.$parent || context.$root
  let name = parent.$options.name

  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent

    if (parent) {
      name = parent.$options.name
    }
  }
  if (parent) {
    parent.$emit(eventName, ...params)
  }
}

export function findComponentUpward(context: Vue, componentName: string): Vue {
  let componentNames

  if (typeof componentName === 'string') {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }

  let parent = context.$parent
  let name = parent.$options.name

  while (parent && (!name || !componentNames.includes(name))) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }

  return parent
}

export function findComponentDownward(
  context: Vue,
  componentName: string
): Vue | null {
  const childrens = context.$children
  let children = null

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name

      if (name === componentName) {
        children = child

        break
      } else {
        children = findComponentDownward(child, componentName)

        if (children) {
          break
        }
      }
    }
  }

  return children
}

export function findComponentsDownward(
  context: Vue,
  componentName: string
): Vue[] {
  return context.$children.reduce((components: Vue[], child: Vue) => {
    if (child.$options.name === componentName) {
      components.push(child)
    }

    const foundChilds = findComponentsDownward(child, componentName)

    return components.concat(foundChilds)
  }, [])
}

/**
 * 将数字格式化为三位阶
 * @param {Number} number 需要格式化的数字
 */
export function formatNumber(number: number): string {
  if (getType(number) !== 'number') {
    return '0'
  }

  let [integer, decimal] = String(number).split('.')

  const formatRegExp = /(\d+)(\d{3})/

  while (formatRegExp.test(integer)) {
    integer = integer.replace(formatRegExp, '$1,$2')
  }

  decimal = decimal ? `.${decimal}` : ''

  return `${integer}${decimal}`
}

interface CloneNode {
  parent: AnyObject,
  key: undefined | string | number,
  data: AnyObject
}

/**
 * 深度拷贝对象或数组 (避免一层死循环)
 * @param {Object|Array} obj 需要拷贝的对象或数组
 * @returns {Object|Array} 克隆后的对象或数组
 */
export function deepClone(obj: AnyObject | any[]): AnyObject | any[] {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  const _root = Array.isArray(obj) ? [] : {}

  // 循环数组栈
  const loopList: CloneNode[] = [
    {
      parent: _root,
      key: undefined,
      data: obj
    }
  ]

  while (loopList.length) {
    // 先入后出，深度优先
    const node = loopList.pop() ?? {}
    const { parent, key, data } = node as CloneNode
    const type = getType(data)

    if (!parent) continue

    // 初始化克隆对象_root
    let res = parent

    if (typeof key !== 'undefined') {
      res = parent[key] = type === 'array' ? [] : {}
    }

    for (const i in data) {
      const _data = data[i]
      const _type = getType(_data)

      if (
        type === 'array' ||
        (type === 'object' && Object.prototype.hasOwnProperty.call(data, i))
      ) {
        // 避免一层死循环
        if (_data === data) {
          res[i] = res
        } else if (_type === 'object' || _type === 'array') {
          loopList.push({
            parent: res,
            key: i,
            data: _data
          })
        } else {
          res[i] = _data
        }
      }
    }
  }

  return _root
}

/**
 * 将一个实数扩大一定的倍数并保留一定的小数
 * @param {Number} number 要处理的实数
 * @param {Number} multiple 要扩大的倍数
 * @param {Number} decimal 要保留的小数
 */
export function multipleFixed(
  number: number,
  multiple: number,
  decimal: number
): number {
  const fixed = 10 ** decimal

  return Math.round(number * multiple * fixed) / fixed
}

/**
 * 按照一定顺序的属性对数据进行分组
 * @param {Array} list 需要分数的数据
 * @param {String|Array}} props 需要按顺序分组的属性
 */
export function groupByProps(
  list: any[],
  props: string[] | string = []
): AnyObject {
  if (typeof props === 'string') {
    props = [props]
  }

  const propCount = props.length
  const zipData: AnyObject = {}

  for (const item of list) {
    let data

    for (let i = 0; i < propCount; i++) {
      const isLast = i === propCount - 1
      const prop = props[i]
      const value = item[prop]

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

interface TreeOptions {
  keyField?: string,
  childField?: string,
  parentField?: string
}

/**
 * 转换扁平结构为树形结构
 * @param {Array} list 需要转换的扁平数据
 * @param {Object} options 转化配置项
 */
export function transformTree(list: any[], options: TreeOptions = {}): any[] {
  const {
    keyField = 'id',
    childField = 'children',
    parentField = 'parent'
  } = options

  const tree = []
  const record: AnyObject = {}

  for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i]
    const id = item[keyField]

    if (!id) {
      continue
    }

    if (record[id]) {
      item[childField] = record[id]
    } else {
      item[childField] = record[id] = []
    }

    if (item[parentField]) {
      const parentId = item[parentField]

      if (!record[parentId]) {
        record[parentId] = []
      }

      record[parentId].push(item)
    } else {
      tree.push(item)
    }
  }

  return tree
}

/**
 * 转换树形结构为扁平结构
 * @param {Array} tree 需要转换的树形数据
 * @param {Object} options 转化配置项
 */
export function flatTree(tree: any[], options: TreeOptions = {}): any[] {
  const {
    keyField = 'id',
    childField = 'children',
    parentField = 'parent'
  } = options

  const list = []
  const loop = [...tree]

  let idCount = 1

  while (loop.length) {
    const item = loop.shift()

    let id
    let children = []

    if (item[childField] && item[childField].length) {
      children = item[childField]
    }

    if (item[keyField]) {
      id = item[keyField]
    } else {
      id = idCount++
    }

    if (!item[parentField]) {
      item[parentField] = 0
    }

    for (let i = 0, len = children.length; i < len; i++) {
      const child = children[i]

      child[parentField] = id
      loop.push(child)
    }

    list.push(item)
  }

  return list
}

interface SortPropOptions {
  key: string,
  method?: AnyFunction,
  accessor?: AnyFunction,
  type?: string,
  params?: any[]
}

interface FormattedSortPropOptions extends SortPropOptions {
  method: AnyFunction,
  accessor: AnyFunction
}

/**
 * 根据依赖的属性逐层排序
 * @param {Array} obj 需要排序的数组
 * @param {Array|String} props 排序依赖的属性 key-属性名 method-排序方法 accessor-数据获取方法 type-升降序
 */
export function sortByProps(
  obj: any[],
  props: string | Array<string | SortPropOptions>
): any[] {
  if (!obj.sort || !props.length) {
    return obj
  }

  const sortObj = [...obj]
  const defaultSortMethod = (prev: any, next: any) => {
    if (Number.isNaN(Number(prev) - Number(next))) {
      return String(prev).localeCompare(next)
    }

    return prev - next
  }

  if (getType(props) !== 'array') {
    props = [props as string | SortPropOptions]
  }

  props = (props as Array<string | SortPropOptions>)
    .map(
      (value: string | SortPropOptions): SortPropOptions =>
        typeof value === 'string'
          ? {
            key: value,
            method: defaultSortMethod,
            type: 'asc'
          }
          : value
    )
    .map((value: SortPropOptions) => {
      if (typeof value.accessor !== 'function') {
        value.accessor = (data: AnyObject) => data[value.key]
      }

      if (typeof value.method !== 'function') {
        value.method = defaultSortMethod
      }

      return value as FormattedSortPropOptions
    })

  sortObj.sort((prev, next) => {
    const results = []

    for (const prop of props as FormattedSortPropOptions[]) {
      const { method, type, accessor } = prop

      const params = prop.params ?? [] // 传入读取器的额外参数
      const desc = type === 'desc'
      const result = method(
        accessor(prev, ...params),
        accessor(next, ...params)
      )

      results.push(desc ? -result : result)
      // 若不为0则无需进行下一层排序
      if (result) break
    }

    return results.pop() ?? 0
  })

  return sortObj
}

/**
 * 将一个函数或方法进行节流
 * @param {Function} method 需要节流的方法, 需自行绑定 this
 * @param {Number} delay 节流后的触发间隔, 默认 16 ms (1 帧/秒)
 */
export function throttle(method: AnyFunction, delay = 16): AnyFunction {
  if (typeof method !== 'function') {
    return method
  }

  let start = Date.now()
  let timer: number

  return function (...args: any[]): void {
    const current = Date.now()
    const remaining = start + delay - current

    clearTimeout(timer)

    if (remaining <= 0) {
      method(...args)
      start = Date.now()
    } else {
      timer = window.setTimeout(() => {
        method(...args)
      }, delay)
    }
  }
}

/**
 * 将一个函数或方法进行防抖
 * @param {Function} method 需要防抖的方法, 需自定绑定 this
 * @param {Number} delay 防抖的限制时间, 默认 300 ms
 */
export function debounce(method: AnyFunction, delay = 100): AnyFunction {
  if (typeof method !== 'function') {
    return method
  }

  let timer: number

  return function (...args: any[]): void {
    clearTimeout(timer)

    timer = window.setTimeout(() => {
      method(...args)
    }, delay)
  }
}

/**
 * 移除数组中的某个元素
 * @param {Array} array 需要被移除元素的数组
 * @param {Any} item 需要被移除的元素, 或一个查找方法
 */
export function removeArrayItem(array: any[], item: unknown): boolean {
  let index = -1

  if (typeof item !== 'function') {
    index = array.findIndex((current: any) => current === item)
  } else {
    index = array.findIndex(item as AnyFunction)
  }

  if (~index) {
    array.splice(index, 1)

    return true
  }

  return false
}

/**
 * 根据路径读取对象中的值 (实现 ?. 的逻辑)
 * @param {Object|Array} obj 需要被读取的对象
 * @param {Array|String} path 读取的路径
 * @param {Boolean} strict 是否开启严格模式 (非法路径报错)
 */
export function getValueByPath(
  obj: AnyObject,
  path: string | string[],
  strict = false
): unknown {
  if (!obj || !path) return obj

  if (typeof path === 'string') {
    if (path in obj) return obj[path]

    path = path.split('.')
  }

  if (Array.isArray(path) && path.length) {
    const lastKey = path.pop()

    if (!lastKey) return obj

    for (let i = 0, len = path.length; i < len; i++) {
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

  return obj
}

/**
 * 根据路径设置对象中的值
 * @param {Object|Array} obj 需要被设置的对象
 * @param {Array|String} path 设置的路径
 * @param {Any} value 需要设置的值
 * @param {Boolean} strict 是否开启严格模式 (非法路径报错)
 */
export function setValueByPath(
  obj: AnyObject,
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

    for (let i = 0, len = path.length; i < len; i++) {
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

/**
 * 根据长度生成一串随机的字符串
 * @param {Number} length 字符串的长度
 */
export function getRandomString(length = 16): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  const maxPos = chars.length

  let string = ''

  while (length--) {
    string += chars.charAt(Math.floor(Math.random() * maxPos))
  }

  return string
}

interface ScrollElement {
  scrollTo(x: number, y: number): void,
  [prop: string]: any
}

export function animateScrollTo(
  el: ScrollElement,
  from: number,
  to: number,
  duration: number,
  callback: unknown
): void {
  const distance = to - from
  const step = Math.ceil((distance / duration) * 16)

  let current = from

  const scroll = () => {
    current = current + step

    if ((to - current) / distance <= 0) {
      current = to
    }

    el.scrollTo(0, current)

    if (current === to) {
      typeof callback === 'function' && callback()
    } else {
      requestAnimationFrame(scroll)
    }
  }

  scroll()
}

export function toCamelCase(value: string): string {
  return value.charAt(0).toLowerCase() + value.slice(1)
}
