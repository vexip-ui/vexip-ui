import {
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  renderSlot,
  watch,
} from 'vue'

import { emitEvent, useProps } from '@vexip-ui/config'
import { useResize } from '@vexip-ui/hooks'
import { throttle } from '@vexip-ui/utils'
import { resizeObserverProps } from './props'

export default defineComponent({
  name: 'ResizeObserver',
  props: resizeObserverProps,
  setup(_props, { slots }) {
    const props = useProps('resizeObserver', _props, {
      throttle: {
        default: false,
        validator: value => typeof value === 'boolean' || value > 0,
      },
      disabled: false,
    })

    const { observeResize, unobserveResize } = useResize()

    let observed = false

    function handleResize(entry: ResizeObserverEntry) {
      emitEvent(props.onResize, entry)
    }

    const throttleResize = props.throttle
      ? throttle(handleResize, typeof props.throttle === 'boolean' ? 16 : props.throttle)
      : handleResize

    const instance = getCurrentInstance()

    onMounted(() => {
      watch(
        () => props.disabled,
        value => {
          value ? unobserve() : observe()
        },
        { immediate: true, flush: 'post' },
      )
    })

    let targetEl: Element | null = null

    onBeforeUnmount(() => {
      if (observed && targetEl) {
        unobserveResize(targetEl)
      }
    })

    function observe() {
      if (observed) return

      const el = instance?.proxy?.$el as Element | null
      let target: Element | null = null

      if (el) {
        if (el.nodeType === 1) {
          target = el
        } else if (el.nextElementSibling) {
          target = el.nextElementSibling
        }
      }

      if (target) {
        observeResize(target, throttleResize)
        targetEl = target
        observed = true
      }
    }

    function unobserve() {
      if (observed && targetEl) {
        unobserveResize(targetEl)
        targetEl = null
        observed = false
      }
    }

    return () => renderSlot(slots, 'default')
  },
})
