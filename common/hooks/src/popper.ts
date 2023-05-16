import { nextTick, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'

import { createPopper as createInternalPopper } from '@popperjs/core'

import type { Ref, WatchStopHandle } from 'vue'
import type { Instance, Modifier, Placement, Rect, VirtualElement } from '@popperjs/core'
import type { TransferNode } from '@vexip-ui/utils'

type OffsetsFunction = (options: {
  popper: Rect,
  reference: Rect,
  placement: Placement
}) => [number?, number?]

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
  offset?: OffsetsFunction | [number?, number?]
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
    modifiers: Partial<Modifier<any, any>>[]
  } = {
    placement: placement.value,
    modifiers: [
      {
        name: 'preventOverflow',
        options: {
          rootBoundary: 'window'
        }
      },
      {
        name: 'computeStyles',
        options: {
          gpuAcceleration: false
        }
      }
    ]
  }

  if (isDrop) {
    options.modifiers.push({
      name: 'setTransformOrigin',
      enabled: true,
      phase: 'afterWrite',
      fn({ state }) {
        const origin = setPopperDropOrigin(state.placement)

        if (origin) {
          state.elements.popper.style.transformOrigin = origin
        }
      }
    })
  }

  if (initOptions.offset) {
    options.modifiers.push({
      name: 'offset',
      options: {
        offset: initOptions.offset
      }
    })
  }

  let popperInstance: Instance | null = null

  watch(placement, value => {
    options.placement = value
    popperInstance && popperInstance.setOptions({ placement: value })
  })

  watchEffect(() => {
    if (wrapper.value && popper.value) {
      (wrapper.value as TransferNode).__transferElement = popper.value
    }
  })

  let stopWatchPopper: WatchStopHandle | null = null

  if (transfer) {
    watch(transfer, value => {
      setTransferTo(value)
      updatePopper()
    })

    setTransferTo(transfer.value)
  }

  onMounted(() => {
    nextTick(createPopper)
  })

  onBeforeUnmount(destroyPopper)

  function updatePopper() {
    nextTick(() => {
      popperInstance && popperInstance.forceUpdate()
    })
  }

  function createPopper() {
    destroyPopper()
    popperInstance && popperInstance.destroy()
    createPopperInstance()

    const cancelWatchReference = watch(reference, createPopperInstance)
    const cancelWatchPopper = watch(popper, createPopperInstance)

    stopWatchPopper = () => {
      cancelWatchReference()
      cancelWatchPopper()
    }
  }

  function setTransferTo(value: boolean | string) {
    transferTo.value = typeof value === 'boolean' ? (value ? 'body' : '') : value
  }

  function createPopperInstance() {
    if (reference.value && popper.value) {
      popperInstance && popperInstance.destroy()
      popperInstance = createInternalPopper(reference.value, popper.value as HTMLElement, options)
      updatePopper()
    }
  }

  function destroyPopper() {
    popperInstance && popperInstance.destroy()
    popperInstance = null

    if (typeof stopWatchPopper === 'function') {
      stopWatchPopper()
      stopWatchPopper = null
    }
  }

  return {
    reference,
    popper,
    transferTo,
    updatePopper,
    createPopper,
    destroyPopper
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
