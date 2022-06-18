<template>
  <div ref="contaniner" :class="className" :style="style">
    <div
      ref="track"
      :class="[nh.be('track'), props.useTrack ? null : nh.bem('track', 'disabled')]"
      @mousedown="handleTrackMouseDown"
    ></div>
    <div
      ref="bar"
      :class="nh.be('bar')"
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
import { useNameHelper, useProps, booleanProp } from '@vexip-ui/config'
import { isDefined, throttle, boundRange } from '@vexip-ui/utils'
import { useTrack } from './mixins'
import { ScrollbarType } from './symbol'

import type { PropType } from 'vue'
import type { ScrollbarPlacement } from './symbol'

const scrollbarPlacements = Object.freeze<ScrollbarPlacement>(['top', 'right', 'bottom', 'left'])

export default defineComponent({
  name: 'Scrollbar',
  props: {
    placement: String as PropType<ScrollbarPlacement>,
    scroll: Number,
    barLength: Number,
    width: Number,
    appear: booleanProp,
    fade: Number,
    barColor: String,
    trackColor: String,
    disabled: booleanProp,
    wrapper: [String, Object] as PropType<string | HTMLElement>,
    duration: Number,
    useTrack: booleanProp,
    trackSpeed: Number
  },
  emits: ['scroll', 'scroll-start', 'scroll-end'],
  setup(_props, { emit }) {
    const props = useProps('scrollbar', _props, {
      placement: {
        default: 'right' as ScrollbarPlacement,
        validator: (value: ScrollbarPlacement) => scrollbarPlacements.includes(value)
      },
      scroll: {
        default: 0,
        validator: (value: number) => value >= 0 && value <= 100,
        static: true
      },
      barLength: {
        default: 35,
        validator: (value: number) => value > 0 && value < 100
      },
      width: null,
      appear: false,
      fade: 1500,
      barColor: null,
      trackColor: null,
      disabled: false,
      wrapper: null,
      duration: null,
      useTrack: false,
      trackSpeed: {
        default: 2,
        validator: (value: number) => value > 0 && value < 10
      }
    })

    const nh = useNameHelper('scrollbar')
    const active = ref(false)
    const currentScroll = ref(props.scroll)
    const scrolling = ref(false)

    const contaniner = ref<HTMLElement | null>(null)
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
        emit('scroll-start', scroll)
      },
      handleMove: () => window.clearTimeout(fadeTimer),
      handleUp: scroll => {
        setScrollbarFade()
        emit('scroll-end', scroll)
      },
      handleScroll: scroll => emit('scroll', scroll)
    })

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        nh.bm(props.placement),
        {
          [nh.bm('fade')]: props.fade,
          [nh.bm('scrolling')]: scrolling.value,
          [nh.bm('tracking')]: tracking.value,
          [nh.bm('active')]: active.value,
          [nh.bm('disabled')]: props.disabled
        }
      ]
    })
    const style = computed<Record<string, string>>(() => {
      return {
        '--vxp-scrollbar-bar-bg-color': props.barColor,
        '--vxp-scrollbar-track-bg-color': props.trackColor,
        '--vxp-scrollbar-width': props.width ? `${props.width}px` : null!
      }
    })
    const barStyle = computed(() => {
      const style: Record<string, string> = {}
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
            wrapperElement = instance.parent.proxy?.$el

            if (!wrapperElement) {
              wrapperElement = contaniner.value?.parentElement ?? null
            }
          } else {
            wrapperElement = contaniner.value?.parentElement ?? null
          }
        }

        if (wrapperElement && props.fade >= 300) {
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
      window.clearTimeout(fadeTimer)
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
      emit('scroll-start', currentScroll.value)
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
      emit('scroll', currentScroll.value)
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
      emit('scroll-end', currentScroll.value)
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

    function handleScroll(scroll: number) {
      currentScroll.value = boundRange(scroll, 0, 100)
    }

    return {
      props,
      nh,
      currentScroll,

      className,
      style,
      barStyle,

      contaniner,
      bar,
      track,

      handleMouseDown,
      handleTrackMouseDown,
      handleScroll
    }
  }
})
</script>
