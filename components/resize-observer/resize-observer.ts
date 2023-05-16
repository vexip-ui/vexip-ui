import { defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, renderSlot } from 'vue'

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
        validator: (value: boolean | number) => typeof value === 'boolean' || value > 0
      }
    })

    const { observeResize, unobserveResize } = useResize()

    let observed = false

    function handleResize(entry: ResizeObserverEntry) {
      emitEvent(props.onResize, entry)
    }

    const throttleResize = props.throttle
      ? throttle(handleResize, typeof props.throttle === 'boolean' ? 16 : props.throttle)
      : handleResize

    onMounted(() => {
      const el = getCurrentInstance()?.proxy?.$el as Element | null

      if (el?.nextElementSibling) {
        if (el.nextElementSibling !== el.nextSibling && el.nodeType === 3 && el.nodeValue !== '') {
          return
        }

        observeResize(el.nextElementSibling, throttleResize)
        observed = true
      }
    })

    onBeforeUnmount(() => {
      if (observed) {
        const el = getCurrentInstance()?.proxy?.$el as Element | null

        if (el?.nextElementSibling) {
          unobserveResize(el.nextElementSibling)
        }
      }
    })

    return () => renderSlot(slots, 'default')
  }
})
