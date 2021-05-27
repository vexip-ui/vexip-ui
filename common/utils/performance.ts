import { nextTick } from 'vue'

/**
 * 将一个函数或方法进行节流
 * @param method - 需要节流的方法，需自行绑定 this
 * @param delay - 节流后的触发间隔，默认 16 ms (1 帧/秒)
 *
 * @returns 节流后的函数
 */
export function throttle<T extends(...args: any[]) => any>(method: T, delay = 16) {
  if (typeof method !== 'function') {
    return method
  }

  let start = Date.now()
  let timer: number

  return function (...args: Parameters<T>) {
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
 * @param method - 需要防抖的方法，需自行绑定 this
 * @param delay - 防抖的限制时间，默认 300 ms
 *
 * @returns 防抖后的函数
 */
export function debounce<T extends(...args: any[]) => any>(method: T, delay = 100) {
  if (typeof method !== 'function') {
    return method
  }

  let timer: number

  return function (...args: Parameters<T>) {
    clearTimeout(timer)

    timer = window.setTimeout(() => {
      method(...args)
    }, delay)
  }
}

/**
 * 针对每个微任务，将一个函数或方法进行防抖
 * @param method - 需要防抖的方法，需自行绑定 this
 *
 * @returns 防抖后的函数
 */
export function debounceMinor<T extends(...args: any[]) => any>(method: T) {
  if (typeof method !== 'function') {
    return method
  }

  let called = false
  let lastArgs: Parameters<T>

  return function (...args: Parameters<T>) {
    lastArgs = args

    if (!called) {
      called = true

      nextTick(() => {
        method(...lastArgs)
        called = false
      })
    }
  }
}
