import { onBeforeUnmount } from 'vue'

export function useSetTimeout() {
  const timer: Record<string, any> = {}

  onBeforeUnmount(() => {
    Object.keys(timer).forEach(key => {
      clearTimeout(timer[key])
    })
  })

  return { timer }
}

export function useSetInterval() {
  const timer: Record<string, any> = {}

  onBeforeUnmount(() => {
    Object.keys(timer).forEach(key => {
      clearInterval(timer[key])
    })
  })

  return { timer }
}
