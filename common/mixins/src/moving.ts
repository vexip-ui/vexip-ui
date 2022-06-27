import { ref, isRef, computed } from 'vue'
import { isNull, throttle } from '@vexip-ui/utils'
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
  deltaX: number,
  deltaY: number,
  lazy: boolean,
  [custom: string]: unknown
}

export interface UseMovingOptions {
  target?: Ref<HTMLElement | null>,
  x?: MaybeRef<number>,
  y?: MaybeRef<number>,
  lazy?: MaybeRef<boolean>,
  capture?: boolean,
  onStart?: (state: MovingState, event: PointerEvent) => any,
  onMove?: (state: MovingState, event: PointerEvent) => void,
  onEnd?: (state: MovingState, event: PointerEvent) => void
}

export function useMoving(options: UseMovingOptions) {
  const target = options.target || ref(null)
  const x = isRef(options.x) ? options.x : ref(0)
  const y = isRef(options.y) ? options.y : ref(0)
  const lazy = isRef(options.lazy) ? options.lazy : ref(false)
  const capture = isNull(options.capture) ? true : !!options.capture

  const moving = ref(false)
  const internalState: MovingState = {
    xStart: 0,
    yStart: 0,
    xEnd: 0,
    yEnd: 0,
    clientX: 0,
    clientY: 0,
    deltaX: 0,
    deltaY: 0,
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

    if (options.onStart?.(internalState, event) === false) {
      return
    }

    document.addEventListener('pointermove', throttleMove, { capture })
    document.addEventListener('pointerup', end, { capture })

    moving.value = true
  }

  function move(event: PointerEvent) {
    event.preventDefault()
    event.stopPropagation()

    const { clientX, clientY } = event
    const { xStart, yStart, clientX: clientXStart, clientY: clientYStart, lazy } = internalState
    const deltaX = clientX - clientXStart
    const deltaY = clientY - clientYStart

    internalState.deltaX = deltaX
    internalState.deltaY = deltaY
    internalState.xEnd = xStart + deltaX
    internalState.yEnd = yStart + deltaY

    if (!lazy) {
      x.value = internalState.xEnd
      y.value = internalState.yEnd
    }

    options.onMove?.(internalState, event)
  }

  function end(event: PointerEvent) {
    document.removeEventListener('pointermove', throttleMove, { capture })
    document.removeEventListener('pointerup', end, { capture })

    if (internalState.lazy) {
      x.value = internalState.xEnd
      y.value = internalState.yEnd
    }

    moving.value = false

    options.onEnd?.(internalState, event)
  }

  useListener(target, 'pointerdown', start, { capture })

  return {
    target,
    moving: computed(() => moving.value),
    x,
    y,
    lazy
  }
}
