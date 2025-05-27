import { useResize } from '@vexip-ui/hooks'
import { noop, throttle } from '@vexip-ui/utils'

import type { DirectiveBinding, ObjectDirective } from 'vue'
import type { ResizeHandler } from '@vexip-ui/hooks'

const { observeResize, unobserveResize } = useResize()

export interface VResizeOptions {
  handler: ResizeHandler,
  throttle?: boolean | number,
  disabled?: boolean
}

interface ResizeRecord {
  useThrottle: boolean | number,
  observed: boolean
}

function createObserver(
  el: HTMLElement & { __resize?: ResizeRecord },
  binding: DirectiveBinding<ResizeHandler | VResizeOptions>,
) {
  const options: VResizeOptions =
    typeof binding.value === 'function' ? { handler: binding.value } : { ...binding.value }
  const useThrottle = options.throttle || binding.modifiers.throttle

  el.__resize = {
    useThrottle,
    observed: false,
  }

  if (options.disabled) {
    unobserveResize(el)
    el.__resize.observed = false
    return
  }

  const throttleResize = useThrottle
    ? throttle(options.handler, typeof useThrottle === 'boolean' ? 16 : useThrottle)
    : options.handler

  observeResize(el, throttleResize)
  el.__resize.observed = true
}

export const vResize: ObjectDirective<
  HTMLElement & { __resize?: ResizeRecord },
  ResizeHandler | VResizeOptions
> = {
  mounted(el, binding) {
    createObserver(el, binding)
  },
  updated(el, binding) {
    if (!el.__resize) {
      createObserver(el, binding)
      return
    }

    const options: VResizeOptions =
      typeof binding.value === 'function' ? { handler: binding.value } : { ...binding.value }
    const useThrottle = options.throttle || binding.modifiers.throttle

    const getHandler = () =>
      useThrottle
        ? throttle(options.handler, typeof useThrottle === 'boolean' ? 16 : useThrottle)
        : options.handler

    if (options.disabled) {
      if (el.__resize.observed) {
        unobserveResize(el)
        el.__resize.observed = false
      }
    } else if (!el.__resize.observed) {
      observeResize(el, getHandler())
      el.__resize.observed = true
    } else {
      const prevOptions: VResizeOptions =
        typeof binding.oldValue === 'function'
          ? { handler: binding.oldValue }
          : { ...(binding.oldValue || { handler: noop }) }

      if (useThrottle !== el.__resize.useThrottle || options.handler !== prevOptions.handler) {
        unobserveResize(el)
        observeResize(el, getHandler())
      }
    }
  },
  beforeUnmount(el) {
    if (el.__resize?.observed) {
      unobserveResize(el)
    }

    delete el.__resize
  },
}
