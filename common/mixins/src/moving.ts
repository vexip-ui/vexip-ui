import { ref, isRef, computed } from 'vue'
import { throttle } from '@vexip-ui/utils'
import { useListener } from './listener'

import type { Ref } from 'vue'
import type { MaybeRef } from './shared/types'

export interface MovingState {
  xStart: number,
  yStart: number,
  xEnd: number,
  yEnd: number,
  clientX: number,
  clientY: number,
  lazy: boolean
}

export interface UseMovingOptions {
  target?: Ref<HTMLElement | null>,
  x: MaybeRef<number>,
  y: MaybeRef<number>,
  lazy?: MaybeRef<boolean>,
  onStart?: (state: MovingState, event: PointerEvent) => any,
  onMove?: (state: MovingState, event: PointerEvent) => void,
  onEnd?: (state: MovingState, event: PointerEvent) => void
}

export function useMoving(options: UseMovingOptions) {
  const target = options.target || ref(null)
  const x = isRef(options.x) ? options.x : ref(0)
  const y = isRef(options.y) ? options.y : ref(0)
  const lazy = isRef(options.lazy) ? options.lazy : ref(false)

  const moving = ref(false)
  const internalState: MovingState = {
    xStart: 0,
    yStart: 0,
    xEnd: 0,
    yEnd: 0,
    clientX: 0,
    clientY: 0,
    lazy: false
  }

  const throttleMove = throttle(move)

  function start(event: PointerEvent) {
    Object.assign(internalState, {
      xStart: x.value,
      yStart: y.value,
      xEnd: x.value,
      yEnd: y.value,
      clientX: event.clientX,
      clientY: event.clientY,
      lazy: lazy.value
    })

    if (options.onStart?.(internalState, event)) {
      return
    }

    document.addEventListener('pointermove', throttleMove, true)
    document.addEventListener('pointerup', end, true)

    moving.value = true
  }

  function move(event: PointerEvent) {
    event.preventDefault()
    event.stopPropagation()

    const { clientX, clientY } = event
    const { xStart, yStart, clientX: clientXStart, clientY: clientYStart, lazy } = internalState

    internalState.xEnd = xStart + clientX - clientXStart
    internalState.yEnd = yStart + clientY - clientYStart

    if (!lazy) {
      x.value = internalState.xEnd
      y.value = internalState.yEnd
    }

    options.onMove?.(internalState, event)
  }

  function end(event: PointerEvent) {
    document.removeEventListener('pointermove', throttleMove, true)
    document.removeEventListener('pointerup', end, true)

    if (internalState.lazy) {
      x.value = internalState.xEnd
      y.value = internalState.yEnd
    }

    moving.value = false

    options.onEnd?.(internalState, event)
  }

  useListener(target, 'pointerdown', start, true)

  return {
    target,
    moving: computed(() => moving.value),
    x,
    y,
    lazy
  }
}
