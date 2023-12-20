import { onScopeDispose } from 'vue'

export function useSetTimeout() {
  const timer: Record<string, ReturnType<typeof setTimeout>> = {}

  onScopeDispose(() => {
    Object.keys(timer).forEach(key => {
      clearTimeout(timer[key])
    })
  })

  return { timer }
}

export function useSetInterval() {
  const timer: Record<string, ReturnType<typeof setInterval>> = {}

  onScopeDispose(() => {
    Object.keys(timer).forEach(key => {
      clearInterval(timer[key])
    })
  })

  return { timer }
}

export function useRaf() {
  const timer: Record<string, ReturnType<typeof requestAnimationFrame>> = {}

  onScopeDispose(() => {
    Object.keys(timer).forEach(key => {
      cancelAnimationFrame(timer[key])
    })
  })

  return { timer }
}
