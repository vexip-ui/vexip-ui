import { onMounted, ref, unref, watch, watchEffect } from 'vue'

import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom'
import { isClient } from '@vexip-ui/utils'

import type { Ref } from 'vue'
import type { Middleware, OffsetOptions, Placement, VirtualElement } from '@floating-ui/dom'
import type { TransferNode } from '@vexip-ui/utils'

interface UsePopperOptions {
  /**
   * popper 元素出现的位置
   */
  placement: Ref<Placement>,
  /**
   * popper 元素需要迁移至的目标选择器，为 true 时会迁移至 body
   */
  transfer: Ref<boolean | string>,
  /**
   * 包围元素，用于判断 clickoutside 事件
   *
   * 即使 popper 元素迁移至 wrapper 元素外部，点击 popper 元素时仍认为处于 wrapper 元素内部
   */
  wrapper: Ref<HTMLElement | null | undefined>,
  /**
   * 设置 popper 元素为否需要 drop，此时 transform-origin 会自动调整
   */
  isDrop?: boolean,
  /**
   * 参考元素，popper 元素的位置计算依据
   */
  reference?: Ref<HTMLElement | VirtualElement | null | undefined>,
  /**
   * popper 元素
   */
  popper?: Ref<HTMLElement | null | undefined>,
  /**
   * popper 元素的偏移量，可传入一个回调函数
   */
  offset?: OffsetOptions
}

export type { Placement, VirtualElement }

export const placementWhileList = Object.freeze([
  'auto',
  'auto-start',
  'auto-end',
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
  'right-end'
] as Placement[])

export function usePopper(initOptions: UsePopperOptions) {
  const { placement, transfer, wrapper, isDrop = false } = initOptions

  const reference: Ref<HTMLElement | null | undefined> = (initOptions.reference as any) ?? ref(null)
  const popper: Ref<HTMLElement | null | undefined> = initOptions.popper ?? ref(null)
  const transferTo = ref('')

  const options: {
    placement: Placement,
    middleware: Middleware[]
  } = {
    placement: placement.value,
    middleware: [flip()]
  }

  if (isDrop) {
    options.middleware.push({
      name: 'setTransformOrigin',
      fn({ placement, elements }) {
        const origin = setPopperDropOrigin(placement)

        if (origin) {
          elements.floating.style.transformOrigin = origin
        }

        return {}
      }
    })
  }

  if (initOptions.offset) {
    options.middleware.push(offset(initOptions.offset))
  }

  watchEffect(() => {
    if (wrapper.value && popper.value) {
      (wrapper.value as TransferNode).__transferElement = popper.value
    }
  })

  if (transfer) {
    watch(transfer, value => {
      setTransferTo(value)
      updatePopper()
    })

    setTransferTo(transfer.value)
  }

  onMounted(() => {
    watchEffect(updatePopper)
  })

  let cleanup: (() => void) | undefined

  function updatePopper() {
    if (!isClient) return

    cleanup?.()

    const referenceEl = unref(reference)
    const popperEl = unref(popper)

    if (!referenceEl || !popperEl) return

    const update = async () => {
      const { x, y } = await computePosition(referenceEl, popperEl, options)

      Object.assign(popperEl.style, {
        position: 'absolute',
        top: `${y}px`,
        left: `${x}px`
      })
    }

    cleanup = autoUpdate(referenceEl, popperEl, update)
  }

  function setTransferTo(value: boolean | string) {
    transferTo.value = typeof value === 'boolean' ? (value ? 'body' : '') : value
  }

  return {
    reference,
    popper,
    transferTo,
    updatePopper
  }
}

function setPopperDropOrigin(placement: Placement) {
  if (placement !== 'left' && placement !== 'right') {
    const [placementStart, placementEnd] = placement.split('-')

    return placementStart === 'bottom' || (placementStart !== 'top' && placementEnd === 'start')
      ? 'center top'
      : 'center bottom'
  }
}
