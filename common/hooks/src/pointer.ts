import { onBeforeUnmount, ref } from 'vue'

import { throttle } from '@vexip-ui/utils'

import type { Ref } from 'vue'

export interface UsePointerOption {
  /**
   * 横向位置的初始值
   */
  x?: number,
  /**
   * 纵向位置的初始值
   */
  y?: number,
  /**
   * 是否手动停止，默认情况下会在组件的 BeforeUnmount 生命周期注销
   *
   * @default false
   */
  manualStop?: boolean,
}

interface PointerState {
  x: Ref<number>,
  y: Ref<number>,
}

const registered = new Set<PointerState>()
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

function register(state: PointerState) {
  if (!registered.size && window) {
    record.set('x', 0)
    record.set('y', 0)
    window.addEventListener('pointermove', throttleHandler, { passive: true })
  }

  registered.add(state)
}

function unregister(state: PointerState) {
  registered.delete(state)

  if (!registered.size && window) {
    window.removeEventListener('pointermove', throttleHandler)
  }
}

export function usePointer(options: UsePointerOption = {}) {
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
