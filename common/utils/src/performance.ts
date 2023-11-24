import { isClient } from './common'

const raf = isClient
  ? requestAnimationFrame
  : (cb: FrameRequestCallback) => {
      setTimeout(cb, 16)
    }

/**
 * 将一个函数或方法进行节流
 *
 * @param method 需要节流的方法，需自行绑定 this
 * @param delay 节流后的触发间隔，默认 16 ms (1 帧/秒)
 */
export function throttle<T extends (...args: any[]) => any>(method: T, delay = 16) {
  if (typeof method !== 'function') {
    return method
  }

  let start = Date.now() - delay
  let timer: ReturnType<typeof setTimeout>

  return function (...args: Parameters<T>) {
    const current = Date.now()
    const remaining = start + delay - current

    clearTimeout(timer)

    if (remaining <= 0) {
      method(...args)
      start = current
    } else {
      timer = setTimeout(() => {
        method(...args)
      }, delay)
    }
  }
}

/**
 * 将一个函数或方法进行防抖
 *
 * @param method 需要防抖的方法，需自行绑定 this
 * @param delay 防抖的限制时间，默认 100ms
 */
export function debounce<T extends (...args: any[]) => any>(method: T, delay = 100) {
  if (typeof method !== 'function') {
    return method
  }

  let timer: ReturnType<typeof setTimeout>

  return function (...args: Parameters<T>) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      method(...args)
    }, delay)
  }
}

/**
 * 针对每个微任务，将一个函数或方法进行防抖
 *
 * @param method 需要防抖的方法，需自行绑定 this
 */
export function debounceMinor<T extends (...args: any[]) => any>(method: T) {
  if (typeof method !== 'function') {
    return method
  }

  let called = false
  let lastArgs: Parameters<T>
  let promise: Promise<Awaited<ReturnType<T>>>

  return function (...args: Parameters<T>) {
    lastArgs = args

    if (!called) {
      called = true
      promise = Promise.resolve().then(() => {
        called = false
        promise = undefined!

        return method(...lastArgs)
      })
    }

    return promise
  }
}

/**
 * 针对每一帧，将一个函数或方法进行防抖
 *
 * @param method 需要防抖的方法，需自行绑定 this
 */
export function debounceFrame<T extends (...args: any[]) => any>(method: T) {
  if (typeof method !== 'function') {
    return method
  }

  let called = false
  let lastArgs: Parameters<T>
  let promise: Promise<Awaited<ReturnType<T>>>

  return function (...args: Parameters<T>) {
    lastArgs = args

    if (!called) {
      called = true
      promise = new Promise(resolve =>
        raf(() => {
          called = false
          promise = undefined!

          resolve(method(...lastArgs))
        })
      )
    }

    return promise
  }
}

const tickCallbacks = new Set<(...args: any[]) => any>()
const tickArgsMap = new WeakMap<any, any[]>()

function flushTickCallbacks() {
  tickCallbacks.forEach(fn => {
    fn(...tickArgsMap.get(fn)!)
  })
  tickCallbacks.clear()
}

/**
 * 在下一微任务，仅执行一次传入的方法
 *
 * @param method 需要执行的方法
 * @param args 方法的额外参数，在方法调用前多次传入将会覆盖之前的参数
 */
export function nextTickOnce<T extends (...args: any[]) => any>(method: T, ...args: any[]) {
  if (typeof method !== 'function') {
    return method
  }

  tickArgsMap.set(method, args)

  if (tickCallbacks.has(method)) {
    return
  }

  tickCallbacks.add(method)

  if (tickCallbacks.size === 1) {
    Promise.resolve().then(flushTickCallbacks)
  }
}

const frameCallbacks = new Set<(...args: any[]) => any>()
const frameArgsMap = new WeakMap<any, any[]>()

function flushFrameCallbacks() {
  frameCallbacks.forEach(fn => {
    fn(...frameArgsMap.get(fn)!)
  })
  frameCallbacks.clear()
}

/**
 * 在下一渲染帧，仅执行一次传入的方法
 *
 * @param method 需要执行的方法
 * @param args 方法的额外参数，在方法调用前多次传入将会覆盖之前的参数
 */
export function nextFrameOnce<T extends (...args: any[]) => any>(method: T, ...args: any[]) {
  if (typeof method !== 'function') {
    return method
  }

  frameArgsMap.set(method, args)

  if (frameCallbacks.has(method)) {
    return
  }

  frameCallbacks.add(method)

  if (frameCallbacks.size === 1) {
    raf(flushFrameCallbacks)
  }
}

/**
 * 按指定的并发数，并行地为系列源数据执行操作
 *
 * @param maxConcurrency 最大的并发数
 * @param source 源数据
 * @param iteratorFn 处理操作的异步函数
 */
export async function runParallel<T>(
  maxConcurrency: number,
  source: T[],
  iteratorFn: (item: T, source: T[]) => Promise<any>
) {
  const ret: Array<Promise<any>> = []
  const executing: Array<Promise<any>> = []

  for (const item of source) {
    const p = Promise.resolve().then(() => iteratorFn(item, source))

    ret.push(p)

    if (maxConcurrency <= source.length) {
      const e: Promise<any> = p.then(() => executing.splice(executing.indexOf(e), 1))

      executing.push(e)

      if (executing.length >= maxConcurrency) {
        await Promise.race(executing)
      }
    }
  }

  return Promise.all(ret)
}
