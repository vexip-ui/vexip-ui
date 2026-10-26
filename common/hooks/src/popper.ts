import { onMounted, ref, shallowRef, unref, watch, watchEffect } from 'vue'

import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  hide,
  offset,
  platform,
  shift,
} from '@floating-ui/dom'
import { useRtl } from './rtl'
import { isClient } from '@vexip-ui/utils'

import type { MaybeRef, Ref } from 'vue'
import type {
  ComputePositionConfig,
  Middleware,
  OffsetOptions,
  Placement,
  ShiftOptions,
  VirtualElement,
} from '@floating-ui/dom'
import type { TransferNode } from '@vexip-ui/utils'

export interface UsePopperOptions {
  /**
   * popper 元素出现的位置
   */
  placement: MaybeRef<Placement>,
  /**
   * popper 元素需要迁移至的目标选择器，为 true 时会迁移至 body
   */
  transfer?: MaybeRef<boolean | string>,
  /**
   * 设置是否为从右向左的阅读方向
   */
  isRtl?: MaybeRef<boolean>,
  /**
   * 包围元素，用于判断 clickoutside 事件
   *
   * 即使 popper 元素迁移至 wrapper 元素外部，点击 popper 元素时仍认为处于 wrapper 元素内部
   */
  wrapper?: Ref<HTMLElement | null | undefined>,
  /**
   * 设置 popper 元素为否需要 drop，此时 transform-origin 会自动调整
   */
  isDrop?: MaybeRef<boolean>,
  /**
   * 参考元素，popper 元素的位置计算依据
   */
  reference?: Ref<HTMLElement | VirtualElement | null | undefined>,
  /**
   * popper 元素
   */
  popper?: Ref<HTMLElement | null | undefined>,
  /**
   * arrow 元素
   */
  arrow?: Ref<HTMLElement | null | undefined>,
  /**
   * popper 元素的偏移量，可传入一个回调函数
   */
  offset?: MaybeRef<number[] | OffsetOptions>,
  /**
   * popper 元素是否限制在窗口内
   */
  shift?: MaybeRef<boolean | ShiftOptions>,
  /**
   * 设置是否自动更新 popper 元素
   *
   * @default false
   */
  autoUpdate?: boolean,
}

export type { Placement, VirtualElement }

export const placementWhileList = Object.freeze<Placement[]>([
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
])

export function usePopper(initOptions: UsePopperOptions) {
  const { transfer, wrapper, isDrop = false } = initOptions

  const reference: Ref<HTMLElement | null | undefined> =
    (initOptions.reference as any) ?? shallowRef(null)
  const popper: Ref<HTMLElement | null | undefined> = initOptions.popper ?? shallowRef(null)
  const arrowRef: Ref<HTMLElement | null | undefined> = initOptions.arrow ?? shallowRef(null)

  const placement = ref(unref(initOptions.placement))
  const transferTo = ref('')
  const isRtl = initOptions.isRtl ?? useRtl().isRtl

  if (wrapper) {
    watchEffect(() => {
      const wrapperEl = unref(wrapper)
      const popperEl = unref(popper)

      if (wrapperEl) {
        ;(wrapperEl as TransferNode).__transferElement = popperEl
      }
    })
  }

  if (transfer != null) {
    watch(
      () => unref(transfer),
      value => {
        setTransferTo(value)
        updatePopper()
      },
    )

    setTransferTo(unref(transfer))
  }

  onMounted(() => {
    requestAnimationFrame(() => {
      watchEffect(updatePopperInternal)
    })
  })

  let cleanup: (() => void) | undefined

  async function updatePopperInternal() {
    if (!isClient) return

    cleanup?.()

    const referenceEl = unref(reference)
    const popperEl = unref(popper)

    if (!referenceEl || !popperEl) return

    const arrowEl = unref(arrowRef)

    const middleware: Middleware[] = [flip()]

    if (isDrop) {
      middleware.push({
        name: 'origin',
        fn({ placement, elements }) {
          const origin = setPopperDropOrigin(placement)

          if (origin) {
            elements.floating.style.transformOrigin = origin
          }

          return {}
        },
      })
    }

    if (initOptions.offset) {
      let offsetOptions = unref(initOptions.offset)

      if (Array.isArray(offsetOptions)) {
        offsetOptions = {
          mainAxis: offsetOptions[1],
          crossAxis: offsetOptions[0],
        }
      }

      middleware.push(offset(offsetOptions))
    }

    if (initOptions.shift) {
      let shiftOptions = unref(initOptions.shift)

      if (typeof shiftOptions === 'boolean') {
        shiftOptions = {}
      }

      middleware.push(shift(shiftOptions))
    }

    if (arrowEl) {
      middleware.push(arrow({ element: arrowEl }))
    }

    middleware.push(hide({ strategy: 'escaped' }))

    const rtl = unref(isRtl) || false
    const options: ComputePositionConfig = {
      middleware,
      placement: unref(initOptions.placement),
      platform: {
        ...platform,
        isRTL: async () => rtl,
      },
    }

    const update = async () => {
      const {
        x,
        y,
        placement: activePlacement,
        strategy,
        middlewareData,
      } = await computePosition(referenceEl, popperEl, options)

      if (unref(reference) !== referenceEl) {
        if (unref(popper) === popperEl) {
          Object.assign(popperEl.style, {
            position: '',
            top: '',
            left: '',
          })
        }

        return
      }

      const style: Partial<CSSStyleDeclaration> = {
        position: strategy,
        top: `${y}px`,
        left: `${x}px`,
      }

      // if (middlewareData.hide?.escaped) {
      //   style.visibility = 'hidden'
      // } else {
      //   style.visibility = ''
      // }

      if (arrowEl) {
        if (middlewareData.arrow) {
          const { x, y } = middlewareData.arrow

          Object.assign(arrowEl.style, {
            top: y != null ? `${y}px` : '',
            left: x != null ? `${x}px` : '',
          })
        } else {
          Object.assign(arrowEl.style, { top: '', left: '' })
        }
      }

      Object.assign(popperEl.style, style)
      popperEl.dataset.popperPlacement = activePlacement
      placement.value = activePlacement
    }

    if (initOptions.autoUpdate) {
      cleanup = autoUpdate(referenceEl, popperEl, update)
    }

    await update()
  }

  const updatePopper = () => {
    return new Promise<void>(resolve => {
      requestAnimationFrame(() => {
        updatePopperInternal().then(resolve)
      })
    })
  }

  function setTransferTo(value: boolean | string) {
    transferTo.value = typeof value === 'boolean' ? (value ? 'body' : '') : value
  }

  // function normalizePlacement(placement: Placement, rtl: boolean) {
  //   if (!rtl) return placement

  //   let [start, end] = placement.split('-')

  //   if (start === 'left' || start === 'right') {
  //     start = start === 'left' ? 'right' : 'left'
  //   } else {
  //     if (!end) return placement

  //     end = end === 'start' ? 'end' : 'start'
  //   }

  //   return `${start}-${end}` as Placement
  // }

  function setPopperDropOrigin(placement: Placement) {
    if (placement !== 'left' && placement !== 'right') {
      const [start, end] = placement.split('-')

      return start === 'bottom' || (start !== 'top' && end === 'start')
        ? 'center top'
        : 'center bottom'
    }
  }

  return {
    wrapper,
    reference,
    popper,
    placement,
    transferTo,
    updatePopper,
  }
}
