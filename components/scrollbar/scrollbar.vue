<template>
  <div ref="wrapper" :class="className">
    <div
      ref="track"
      :class="`${prefix}__track`"
      :style="trackStyle"
      @mousedown="handleTrackMouseDown"
    ></div>
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
  toRef,
  onMounted,
  onBeforeUnmount,
  nextTick,
  getCurrentInstance
} from 'vue'
import { useConfiguredProps } from '@/common/config/install'
import { isDefined } from '@/common/utils/common'
import { throttle } from '@/common/utils/performance'
import { useTrack } from './mixins'
import { ScrollbarType } from './symbol'

import type { PropType, CSSProperties } from 'vue'
import type { ScrollbarPlacement } from './symbol'

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
    validator: (value: number) => value >= 0 && value <= 100
  },
  barLength: {
    type: Number,
    default: 35,
    validator: (value: number) => value > 0 && value < 100
  },
  appear: {
    type: Boolean,
    default: false
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
  },
  useTrack: {
    type: Boolean,
    default: true
  },
  trackSpeed: {
    type: Number,
    default: 2,
    validator: (value: number) => value > 0 && value < 10
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

    const wrapper = ref<HTMLElement | null>(null)
    const bar = ref<HTMLElement | null>(null)
    const track = ref<HTMLElement | null>(null)

    let fadeTimer: number

    const type = computed(() => {
      return props.placement === 'right' || props.placement === 'left'
        ? ScrollbarType.VERTICAL
        : ScrollbarType.HORIZONTAL
    })

    const { tracking, handleMouseDown: handleTrackMouseDown } = useTrack({
      currentScroll,
      track,
      bar,
      type,
      trackSpeed: toRef(props, 'trackSpeed'),
      barLength: toRef(props, 'barLength'),
      disabled: toRef(props, 'disabled'),
      handleDown: scroll => {
        window.clearTimeout(fadeTimer)
        emit('on-scroll-start', scroll)
      },
      handleMove: () => window.clearTimeout(fadeTimer),
      handleUp: scroll => {
        setScrollbarFade()
        emit('on-scroll-end', scroll)
      },
      handleScroll: scroll => emit('on-scroll', scroll)
    })

    const className = computed(() => {
      return [
        prefix,
        `${prefix}--${props.placement}`,
        {
          [`${prefix}--fade`]: props.fade,
          [`${prefix}--scrolling`]: scrolling.value,
          [`${prefix}--tracking`]: tracking.value,
          [`${prefix}--active`]: active.value,
          [`${prefix}--disabled`]: props.disabled
        }
      ]
    })
    const barStyle = computed(() => {
      const style: CSSProperties = {
        backgroundColor: props.barColor
      }
      const position = `${((100 - props.barLength) * currentScroll.value) / props.barLength}%`
      const length = `${props.barLength}%`

      if (type.value === ScrollbarType.VERTICAL) {
        style.height = length
        style.transform = `translate3d(0, ${position}, 0)`
      } else {
        // style.left = position
        style.width = length
        style.transform = `translate3d(${position}, 0, 0)`
      }

      if (isDefined(props.duration) && props.duration >= 0) {
        style.transitionDuration = `${props.duration}ms`
      }

      return style
    })
    const trackStyle = computed(() => {
      return {
        pointerEvents: props.useTrack ? undefined : 'none'
      } as CSSProperties
    })

    watch(
      () => props.scroll,
      value => {
        currentScroll.value = value
      }
    )

    if (props.appear) {
      watch(currentScroll, () => {
        window.clearInterval(fadeTimer)
        active.value = true

        if (!scrolling.value && !tracking.value) {
          setScrollbarFade()
        }
      })
    }

    const handleWrapperMouseMove = throttle(() => {
      window.clearTimeout(fadeTimer)

      if (props.disabled) {
        active.value = false
      } else {
        active.value = true

        if (!scrolling.value && !tracking.value) {
          setScrollbarFade()
        }
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

        if (!props.appear) {
          watch(currentScroll, () => {
            window.clearInterval(fadeTimer)
            active.value = true
            setScrollbarFade()
          })
        }
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

      if (!track.value || !bar.value) return false

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      const rect = track.value.getBoundingClientRect()
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
      currentScroll,

      className,
      barStyle,
      trackStyle,

      wrapper,
      bar,
      track,

      handleMouseDown,
      handleTrackMouseDown
    }
  }
})
</script>
