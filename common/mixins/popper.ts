import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { createPopper } from '@popperjs/core'

import type { Ref, WatchStopHandle } from 'vue'
import type { Placement, Modifier, Instance } from '@popperjs/core'
import type { TransferNode } from '../utils/dom-event'

interface UsePopperOptions {
  placement: Ref<Placement>,
  transfer: Ref<boolean | string>,
  wrapper: Ref<HTMLElement | null>,
  isDrop?: boolean,
  reference?: Ref<HTMLElement | null>,
  popper?: Ref<HTMLElement | null>
}

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

  const reference = initOptions.reference ?? ref<HTMLElement | null>(null)
  const popper = initOptions.popper ?? ref<HTMLElement | null>(null)
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

  let popperInstance: Instance | null = null

  watch(placement, value => {
    options.placement = value
    popperInstance && popperInstance.setOptions({ placement: value })
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
    nextTick(() => {
      createPopperInstance()

      stopWatchPopper = watch(popper, () => {
        popperInstance && popperInstance.destroy()
        createPopperInstance()
      })

      if (wrapper.value && popper.value) {
        (wrapper.value as TransferNode).__transferElement = popper.value
      }
    })
  })

  onBeforeUnmount(() => {
    popperInstance && popperInstance.destroy()
    popperInstance = null

    if (typeof stopWatchPopper === 'function') {
      stopWatchPopper()
      stopWatchPopper = null
    }
  })

  function updatePopper() {
    nextTick(() => {
      popperInstance && popperInstance.forceUpdate()
    })
  }

  function setTransferTo(value: boolean | string) {
    transferTo.value = typeof value === 'boolean' ? (value ? 'body' : '') : value
  }

  function createPopperInstance() {
    if (reference.value && popper.value) {
      popperInstance = createPopper(reference.value, popper.value as HTMLElement, options)
    }
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
