<template>
  <div ref="wrapper" :class="className">
    <div
      ref="bar"
      :class="`${prefix}__bar`"
      :style="barStyle"
      @mousedown="handleMouseDown"
    ></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
  getCurrentInstance
} from 'vue'
import { useConfiguredProps } from '@/common/config/install'
import { isDefined } from '@/common/utils/common'
import { throttle } from '@/common/utils/performance'

import type { PropType } from 'vue'

export type ScrollbarPlacement = 'top' | 'right' | 'bottom' | 'left'

export enum ScrollbarType {
  HORIZONTAL,
  VERTICAL
}

const props = useConfiguredProps('scrollbar', {
  placement: {
    default: 'right' as ScrollbarPlacement,
    validator: (value: ScrollbarPlacement) => {
      return ['top', 'right', 'bottom', 'left'].includes(value)
    }
  },
  scroll: {
    type: Number,
    default: 0,
    validator: (value: number) => {
      return value >= 0 && value <= 100
    }
  },
  barLength: {
    type: Number,
    default: 35,
    validator: (value: number) => {
      return value > 0 && value < 100
    }
  },
  fade: {
    type: Number,
    default: 1500
  },
  barColor: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  wrapper: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: null
  },
  duration: {
    type: Number,
    default: null
  }
})

export default defineComponent({
  name: 'Scrollbar',
  props,
  emits: ['on-scroll', 'on-scroll-start', 'on-scroll-end'],
  setup(props, { emit }) {
    const prefix = 'vxp-scrollbar'
    const active = ref(false)
    const currentScroll = ref(props.scroll)
    const scrolling = ref(false)

    const bar = ref<HTMLElement | null>(null)
    const wrapper = ref<HTMLElement | null>(null)

    let fadeTimer: number

    const className = computed(() => {
      return [
        prefix,
        `${prefix}--${props.placement}`,
        {
          [`${prefix}--fade`]: props.fade,
          [`${prefix}--scrolling`]: scrolling.value,
          [`${prefix}--active`]: active.value,
          [`${prefix}--disabled`]: props.disabled
        }
      ]
    })
    const type = computed(() => {
      return props.placement === 'right' || props.placement === 'left'
        ? ScrollbarType.VERTICAL
        : ScrollbarType.HORIZONTAL
    })
    const barStyle = computed(() => {
      const style: Partial<CSSStyleDeclaration> = {
        backgroundColor: props.barColor
      }
      const position = `${((100 - props.barLength) * currentScroll.value) / 100}%`
      const length = `${props.barLength}%`

      if (type.value === ScrollbarType.VERTICAL) {
        style.top = position
        style.height = length
      } else {
        style.left = position
        style.width = length
      }

      if (isDefined(props.duration)) {
        style.transitionDuration = `${props.duration}ms`
      }

      return style
    })

    watch(
      () => props.scroll,
      value => {
        currentScroll.value = value
      }
    )

    watch(currentScroll, () => {
      window.clearInterval(fadeTimer)
      active.value = true
      setScrollbarFade()
    })

    const handleWrapperMouseMove = throttle(() => {
      window.clearTimeout(fadeTimer)

      if (props.disabled) {
        active.value = false
      } else {
        active.value = true

        setScrollbarFade()
      }
    })

    let wrapperElement: HTMLElement | null

    onMounted(() => {
      let instance = getCurrentInstance()

      nextTick(() => {
        if (typeof props.wrapper === 'string') {
          wrapperElement = document.querySelector(props.wrapper)
        } else {
          wrapperElement = props.wrapper
        }

        if (!wrapperElement) {
          if (instance?.parent) {
            wrapperElement = (instance.parent as any).ctx.$el
          } else {
            wrapperElement = wrapper.value?.parentElement ?? null
          }
        }

        if (wrapperElement) {
          wrapperElement.addEventListener('mousemove', handleWrapperMouseMove)
        }

        instance = null
      })
    })

    onBeforeUnmount(() => {
      if (wrapperElement) {
        wrapperElement.removeEventListener('mousemove', handleWrapperMouseMove)
      }

      wrapperElement = null
    })

    let length: number
    let startAt: number
    let cursorAt: number

    function handleMouseDown(event: MouseEvent) {
      if (event.button !== 0 || props.disabled) {
        return false
      }

      event.stopPropagation()
      event.preventDefault()

      if (!wrapper.value || !bar.value) return false

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      const rect = wrapper.value.getBoundingClientRect()
      const barRect = bar.value.getBoundingClientRect()

      if (type.value === ScrollbarType.VERTICAL) {
        length = rect.height
        startAt = barRect.top - rect.top
        cursorAt = event.clientY
      } else {
        length = rect.width
        startAt = barRect.left - rect.left
        cursorAt = event.clientX
      }

      window.clearTimeout(fadeTimer)

      scrolling.value = true
      emit('on-scroll-start', currentScroll.value)
    }

    const handleBarMove = throttle((event: MouseEvent) => {
      let position: number

      if (type.value === ScrollbarType.VERTICAL) {
        position = startAt + event.clientY - cursorAt
      } else {
        position = startAt + event.clientX - cursorAt
      }

      // position / length * 100 === (100 - barLength) * currentScroll / 100
      currentScroll.value = (position / length / (100 - props.barLength)) * 1e4

      verifyScroll()
      emit('on-scroll', currentScroll.value)
    })

    function handleMouseMove(event: MouseEvent) {
      event.preventDefault()
      event.stopPropagation()

      window.clearTimeout(fadeTimer)

      handleBarMove(event)
    }

    function handleMouseUp(event: MouseEvent) {
      event.preventDefault()

      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)

      setScrollbarFade()

      scrolling.value = false
      emit('on-scroll-end', currentScroll.value)
    }

    function verifyScroll() {
      currentScroll.value = Math.max(0, Math.min(currentScroll.value, 100))
    }

    function setScrollbarFade() {
      if (props.fade >= 300) {
        fadeTimer = window.setTimeout(() => {
          active.value = false
        }, props.fade)
      }
    }

    return {
      prefix,

      className,
      barStyle,

      bar,
      wrapper,

      handleMouseDown
    }
  }
})
</script>
