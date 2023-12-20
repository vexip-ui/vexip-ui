import { onScopeDispose } from 'vue'

/**
 * 获取用于记录 `setTimeout` 返回值的对象，记录的定时器会在作用域消除时自动清理
 */
export function useSetTimeout() {
  const timer: Record<string, any> = {}

  onScopeDispose(() => {
    Object.keys(timer).forEach(key => {
      clearTimeout(timer[key])
    })
  })

  return { timer }
}

/**
 * 获取用于记录 `setInterval` 返回值的对象，记录的定时器会在作用域消除时自动清理
 */
export function useSetInterval() {
  const timer: Record<string, any> = {}

  onScopeDispose(() => {
    Object.keys(timer).forEach(key => {
      clearInterval(timer[key])
    })
  })

  return { timer }
}

/**
 * 获取用于记录 `requestAnimationFrame` 返回值的对象，记录的定时器会在作用域消除时自动清理
 */
export function useRaf() {
  const timer: Record<string, any> = {}

  onScopeDispose(() => {
    Object.keys(timer).forEach(key => {
      cancelAnimationFrame(timer[key])
    })
  })

  return { timer }
}

/**
 * 获取三个分别用于记录 `setTimeout`、`setInterval` 和 `requestAnimationFrame` 返回值的对象
 *
 * 记录在这些对象上的定时器将会在作用域消除时自动清理
 */
export function useTimerRecord() {
  const { timer: timeout } = useSetTimeout()
  const { timer: interval } = useSetInterval()
  const { timer: raf } = useRaf()

  return { timeout, interval, raf }
}
