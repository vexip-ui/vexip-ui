import { ref, onBeforeUnmount } from 'vue'
import { throttle } from '@vexip-ui/utils'

import type { Ref } from 'vue'

export interface UseMouseOption {
  x?: number,
  y?: number,
  manualStop?: boolean
}

interface MouseState {
  x: Ref<number>,
  y: Ref<number>
}

const registered = new Set<MouseState>()
const record = new Map<'x' | 'y', number>()

record.set('x', 0)
record.set('y', 0)

function handler(event: PointerEvent) {
  const { pageX, pageY } = event

  record.set('x', pageX)
  record.set('y', pageY)

  registered.forEach(state => {
    state.x.value = pageX
    state.y.value = pageY
  })
}

const throttleHandler = throttle(handler)

function register(state: MouseState) {
  if (!registered.size && window) {
    record.set('x', 0)
    record.set('y', 0)
    window.addEventListener('pointermove', throttleHandler, { passive: true })
  }

  registered.add(state)
}

function unregister(state: MouseState) {
  registered.delete(state)

  if (!registered.size && window) {
    window.removeEventListener('pointermove', throttleHandler)
  }
}

export function usePointer(options: UseMouseOption = {}) {
  const x = ref(options.x ?? record.get('x')!)
  const y = ref(options.y ?? record.get('y')!)

  const state = { x, y }

  register(state)

  if (!options.manualStop) {
    onBeforeUnmount(() => {
      unregister(state)
    })
  }

  return { ...state, unregister: () => unregister(state) }
}
