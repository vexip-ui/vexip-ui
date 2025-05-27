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

    onBeforeUnmount(() => {
      if (observed) {
        const el = getCurrentInstance()?.proxy?.$el as Element | null

        if (el?.nextElementSibling) {
          unobserveResize(el.nextElementSibling)
        }
      }
    })

    function observe() {
      if (observed) return

      const el = instance?.proxy?.$el as Element | null

      if (el?.nextElementSibling) {
        if (el.nextElementSibling !== el.nextSibling && el.nodeType === 3 && el.nodeValue !== '') {
          return
        }

        observeResize(el.nextElementSibling, throttleResize)
        observed = true
      }
    }

    function unobserve() {
      if (observed) {
        const el = instance?.proxy?.$el as Element | null

        if (el?.nextElementSibling) {
          unobserveResize(el.nextElementSibling)
        }

        observed = false
      }
    }

    return () => renderSlot(slots, 'default')
  },
})
