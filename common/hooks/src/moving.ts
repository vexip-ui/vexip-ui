import { computed, isRef, ref } from 'vue'

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
  deltaX: number,
  deltaY: number,
  lazy: boolean,
  [custom: string]: unknown
}

export interface UseMovingOptions {
  /**
   * 作用的目标元素的 Ref
   */
  target?: Ref<HTMLElement | null | undefined>,
  /**
   * 横向位置的初始值
   */
  x?: MaybeRef<number>,
  /**
   * 纵向位置的初始值
   */
  y?: MaybeRef<number>,
  /**
   * 为否为懒加载，开启后会在 End 事件再更新位置状态
   */
  lazy?: MaybeRef<boolean>,
  /**
   * 事件的 capture 选项
   *
   * @default true
   */
  capture?: boolean,
  /**
   * 是否阻止 MouseDown 事件冒泡和默认行为
   *
   * @default true
   */
  stopMouse?: boolean,
  /**
   * 是否阻止 TouchStart 事件冒泡和默认行为
   *
   * @default true
   */
  stopTouch?: boolean,
  /**
   * 移动开始时的回调函数，返回 false 可以阻止本次移动
   */
  onStart?: (state: MovingState, event: PointerEvent) => any,
  /**
   * 移动中的回调函数
   */
  onMove?: (state: MovingState, event: PointerEvent) => void,
  /**
   * 移动结束时的回调函数
   */
  onEnd?: (state: MovingState, event: PointerEvent) => void
}

function disableEvent<E extends Event>(event: E) {
  if (event.cancelable) {
    event.stopPropagation()
    event.preventDefault()
  }
}

export function useMoving(options: UseMovingOptions) {
  const target = options.target || ref(null)
  const x = isRef(options.x) ? options.x : ref(0)
  const y = isRef(options.y) ? options.y : ref(0)
  const lazy = isRef(options.lazy) ? options.lazy : ref(false)

  const { capture = true, stopMouse = true, stopTouch = true } = options

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

  const throttleMove = throttle((event: PointerEvent) => {
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
  })

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

    document.addEventListener('pointermove', move, { capture })
    document.addEventListener('pointerup', end, { capture })

    moving.value = true
  }

  function move(event: PointerEvent) {
    disableEvent(event)
    throttleMove(event)
  }

  function end(event: PointerEvent) {
    document.removeEventListener('pointermove', move, { capture })
    document.removeEventListener('pointerup', end, { capture })

    if (internalState.lazy) {
      x.value = internalState.xEnd
      y.value = internalState.yEnd
    }

    moving.value = false

    options.onEnd?.(internalState, event)
  }

  useListener(target, 'pointerdown', start, { capture })

  stopMouse && useListener(target, 'mousedown', disableEvent, { capture })
  stopTouch && useListener(target, 'touchstart', disableEvent, { capture })

  return {
    target,
    moving: computed(() => moving.value),
    x,
    y,
    lazy
  }
}
