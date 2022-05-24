<template>
  <div
    :class="className"
    :style="style"
    @mousedown="handleMouseDown"
    @wheel.exact="handleWheel($event, 'vertical')"
    @wheel.shift="handleWheel($event, 'horizontal')"
  >
    <div
      ref="content"
      :class="wrapperClass"
      :style="scrollStyle"
      @scroll="handleScroll"
    >
      <slot></slot>
    </div>
    <Scrollbar
      v-if="useXBar"
      ref="xBar"
      placement="bottom"
      :class="[`${prefix}__bar--horizontal`, barClass]"
      :fade="barFade"
      :bar-length="xBarLength"
      :disabled="!enableXScroll"
      :appear="appear"
      :duration="barDuration"
      :use-track="useBarTrack"
      @on-scroll-start="handleBarScrollStart('horizontal')"
      @on-scroll="handleXBarScroll"
      @on-scroll-end="handleBarScrollEnd('horizontal')"
    ></Scrollbar>
    <Scrollbar
      v-if="useYBar"
      ref="yBar"
      placement="right"
      :class="[`${prefix}__bar--vertical`, barClass]"
      :fade="barFade"
      :bar-length="yBarLength"
      :disabled="!enableYScroll"
      :appear="appear"
      :duration="barDuration"
      :use-track="useBarTrack"
      @on-scroll-start="handleBarScrollStart('vertical')"
      @on-scroll="handleYBarScroll"
      @on-scroll-end="handleBarScrollEnd('vertical')"
    ></Scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, toRef, nextTick } from 'vue'
import { Scrollbar } from '@/components/scrollbar'
import { useConfiguredProps } from '@vexip-ui/config'
import { USE_TOUCH, isTrue, createEventEmitter } from '@vexip-ui/utils'
import { useScrollWrapper } from './mixins'

import type { PropType, CSSProperties } from 'vue'
import type { EventHandler } from '@vexip-ui/utils'
import type { ScrollMode, ClassType } from './symbol'

const MOVE_EVENT = 'mousemove'
const UP_EVENT = 'mouseup'

const props = useConfiguredProps('nativeScroll', {
  scrollClass: {
    type: [String, Object] as PropType<ClassType>,
    default: null
  },
  scrollStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  mode: {
    default: 'vertical' as ScrollMode,
    validator: (value: ScrollMode) => {
      return ['horizontal', 'vertical', 'both'].includes(value)
    }
  },
  width: {
    type: [Number, String],
    default: ''
  },
  height: {
    type: [Number, String],
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  pointer: {
    type: Boolean,
    default: false
  },
  scrollX: {
    type: Number,
    default: 0
  },
  scrollY: {
    type: Number,
    default: 0
  },
  useXBar: {
    type: Boolean,
    default: false
  },
  useYBar: {
    type: Boolean,
    default: false
  },
  barFade: {
    type: Number,
    default: 1500
  },
  barClass: {
    type: [String, Object] as PropType<ClassType>,
    default: null
  },
  autoplay: {
    type: [Boolean, Number],
    default: false
  },
  playWaiting: {
    type: Number,
    default: 500
  },
  beforeScroll: {
    type: Function as PropType<(payload: { signX: number, signY: number }) => boolean>,
    default: null
  },
  appear: {
    type: Boolean,
    default: false
  },
  barDuration: {
    type: Number,
    default: null,
    validator: (value: number) => value >= 0
  },
  useBarTrack: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'NativeScroll',
  components: {
    Scrollbar
  },
  props,
  emits: [
    'on-x-enable-change',
    'on-y-enable-change',
    'on-wheel',
    'on-scroll-start',
    'on-scroll',
    'on-scroll-end',
    'on-bar-scroll-start',
    'on-bar-scroll-end'
  ],
  setup(props, { emit }) {
    const emitter = createEventEmitter()

    const prefix = 'vxp-native-scroll'
    const usingBar = ref(false)
    const scrolling = ref(false)

    const {
      contentElement,

      currentScroll,
      percentX,
      percentY,
      xScrollLimit,
      yScrollLimit,
      enableXScroll,
      enableYScroll,
      xBarLength,
      yBarLength,

      setScrollX,
      setScrollY,
      computePercent,
      refresh,
      scrollTo,
      scrollBy,
      scrollToElement
    } = useScrollWrapper({
      mode: toRef(props, 'mode'),
      disabled: toRef(props, 'disabled'),
      appear: toRef(props, 'appear'),
      width: toRef(props, 'width'),
      height: toRef(props, 'height'),
      scrollX: toRef(props, 'scrollX'),
      scrollY: toRef(props, 'scrollY'),
      beforeRefresh: stopAutoplay,
      afterRefresh: startAutoplay
    })

    /* autoplay */
    const canPlay = ref(false)

    const canAutoplay = computed(() => {
      return (
        props.mode !== 'both' &&
        (isTrue(props.autoplay) || props.autoplay > 1000) &&
        ((props.mode === 'horizontal' && enableXScroll.value) ||
          (props.mode === 'vertical' && enableYScroll.value))
      )
    })

    watch(
      () => props.autoplay,
      () => {
        stopAutoplay()
        nextTick(startAutoplay)
      }
    )
    watch(
      () => props.playWaiting,
      () => {
        stopAutoplay()
        nextTick(startAutoplay)
      }
    )

    let playTimer: number
    let startTimer: number
    let endTimer: number

    function startAutoplay() {
      if (!canAutoplay.value || !contentElement.value) return

      stopAutoplay()

      const mode = props.mode
      const distance = mode === 'horizontal' ? 'offsetWidth' : 'offsetHeight'
      const limit = mode === 'horizontal' ? xScrollLimit : yScrollLimit
      const prop = mode === 'horizontal' ? 'x' : 'y'
      const waiting = props.playWaiting < 20 ? 20 : props.playWaiting
      const setScroll = mode === 'horizontal' ? setScrollX : setScrollY

      let playSpeed = 0.5

      if (typeof props.autoplay === 'number') {
        playSpeed = (contentElement.value[distance] / props.autoplay) * 16
      }

      const scroll = () => {
        setScroll(currentScroll[prop] + playSpeed)

        if (currentScroll[prop] >= limit.value) {
          setScroll(limit.value)
          canPlay.value = false

          computePercent()
          syncBarScroll()

          endTimer = window.setTimeout(() => {
            scrollTo(0, 0, 500)

            startTimer = window.setTimeout(() => {
              canPlay.value = true
              scroll()
            }, 500 + waiting)
          }, waiting)
        } else {
          computePercent()
          syncBarScroll()

          if (canPlay.value) {
            requestAnimationFrame(scroll)
          }
        }
      }

      playTimer = window.setTimeout(() => {
        canPlay.value = true
        scroll()
      }, waiting)
    }

    function stopAutoplay() {
      canPlay.value = false

      window.clearTimeout(playTimer)
      window.window.clearTimeout(startTimer)
      window.clearTimeout(endTimer)
    }
    /* autoplay */

    const className = computed(() => {
      return [prefix, `${prefix}--${props.mode}`]
    })
    const style = computed(() => {
      const { width, height } = props

      return {
        width: width
          ? typeof width === 'string'
            ? Number.isNaN(Number(width))
              ? width
              : `${Number(width)}px`
            : `${width}px`
          : undefined,
        height: height
          ? typeof height === 'string'
            ? Number.isNaN(Number(height))
              ? height
              : `${Number(height)}px`
            : `${height}px`
          : undefined
      }
    })
    const wrapperClass = computed(() => {
      return [
        `${prefix}__wrapper`,
        props.scrollClass,
        {
          [`${prefix}__wrapper--scrolling`]: scrolling.value,
          [`${prefix}__wrapper--using-bar`]: usingBar.value
        }
      ]
    })

    watch(enableXScroll, value => {
      emit('on-x-enable-change', value)
    })
    watch(enableYScroll, value => {
      emit('on-y-enable-change', value)
    })

    const xBar = ref<InstanceType<typeof Scrollbar> | null>(null)
    const yBar = ref<InstanceType<typeof Scrollbar> | null>(null)

    function syncBarScroll() {
      xBar.value?.handleScroll(percentX.value)
      yBar.value?.handleScroll(percentY.value)
    }

    function handleMouseDown(event: MouseEvent) {
      if (!props.pointer || event.button !== 0 || USE_TOUCH) {
        return false
      }

      handlePointerDown(event)
    }

    // 记录滚动开始位置
    let xScrollStartAt = 0
    let yScrollStartAt = 0

    // 记录滚动开始鼠标位置
    let cursorXPosition = 0
    let cursorYPosition = 0

    function handlePointerDown(event: MouseEvent) {
      if (!enableXScroll.value && !enableYScroll.value) {
        return false
      }

      event.preventDefault()
      prepareScroll()

      xScrollStartAt = currentScroll.x
      yScrollStartAt = currentScroll.y
      cursorXPosition = event.clientX
      cursorYPosition = event.clientY

      document.addEventListener(MOVE_EVENT, handlePointerMove)
      document.addEventListener(UP_EVENT, handlePointerUp)

      emit('on-scroll-start', {
        clientX: currentScroll.x,
        clientY: currentScroll.y,
        percentX: percentX.value,
        percentY: percentY.value
      })
    }

    function handlePointerMove(event: MouseEvent) {
      event.stopPropagation()
      event.preventDefault()

      const signX = event.clientX - cursorXPosition > 0 ? 1 : -1
      const signY = event.clientY - cursorYPosition > 0 ? 1 : -1

      if (props.beforeScroll?.({ signX, signY }) === false) {
        return false
      }

      scrolling.value = true

      if (enableXScroll.value) {
        setScrollX(xScrollStartAt - (event.clientX - cursorXPosition))
      }

      if (enableYScroll.value) {
        setScrollY(yScrollStartAt - (event.clientY - cursorYPosition))
      }

      computePercent()
      syncBarScroll()
      emitScrollEvent()
    }

    function handlePointerUp() {
      document.removeEventListener(MOVE_EVENT, handlePointerMove)
      document.removeEventListener(UP_EVENT, handlePointerUp)
      emitScrollEvent()
      emit('on-scroll-end', {
        clientX: currentScroll.x,
        clientY: currentScroll.y,
        percentX: percentX.value,
        percentY: percentY.value
      })
      startAutoplay()
    }

    function handleScroll(event: Event) {
      event.stopPropagation()
      event.preventDefault()

      if (contentElement.value) {
        const signX = contentElement.value.scrollLeft - currentScroll.x > 0 ? 1 : -1
        const signY = contentElement.value.scrollTop - currentScroll.y > 0 ? 1 : -1

        if (props.beforeScroll?.({ signX, signY }) === false) {
          contentElement.value.scrollTop = currentScroll.y
          contentElement.value.scrollLeft = currentScroll.x

          return
        }

        currentScroll.y = contentElement.value.scrollTop
        currentScroll.x = contentElement.value.scrollLeft
      }

      computePercent()
      syncBarScroll()
      emitScrollEvent()
    }

    function handleWheel(event: WheelEvent, type: 'vertical' | 'horizontal') {
      const isVerticalScroll = enableYScroll.value && type === 'vertical'
      const isHorizontalScroll = enableXScroll.value && type === 'horizontal'
      const sign = event.deltaY > 0 ? 1 : -1

      if (
        (isVerticalScroll || isHorizontalScroll) &&
        props.beforeScroll?.({ signX: sign, signY: sign }) !== false
      ) {
        const maxLimit = isVerticalScroll ? yScrollLimit.value : xScrollLimit.value
        const scroll = isVerticalScroll ? currentScroll.y : currentScroll.x

        if (sign > 0 ? scroll < maxLimit : scroll > 0) {
          event.stopPropagation()

          return false
        }
      }
    }

    function prepareScroll() {
      stopAutoplay()
    }

    function handleBarScrollStart(type: 'vertical' | 'horizontal') {
      usingBar.value = true
      emit('on-bar-scroll-start', type)
    }

    function handleBarScrollEnd(type: 'vertical' | 'horizontal') {
      usingBar.value = false
      emit('on-bar-scroll-end', type)
    }

    function handleXBarScroll(percent: number) {
      percentX.value = percent
      setScrollX((percent * xScrollLimit.value) / 100)
      emitScrollEvent('horizontal')
    }

    function handleYBarScroll(percent: number) {
      percentY.value = percent
      setScrollY((percent * yScrollLimit.value) / 100)
      emitScrollEvent('vertical')
    }

    function emitScrollEvent(barType?: 'vertical' | 'horizontal') {
      emit('on-scroll', {
        barType,
        clientX: currentScroll.x,
        clientY: currentScroll.y,
        percentX: percentX.value,
        percentY: percentY.value
      })
      emitter.emit('on-scroll', {
        barType,
        clientX: currentScroll.x,
        clientY: currentScroll.y,
        percentX: percentX.value,
        percentY: percentY.value
      })
    }

    function getXScrollLimit() {
      return [0, xScrollLimit.value]
    }

    function getYScrollLimit() {
      return [0, yScrollLimit.value]
    }

    function addScrollListener(listener: EventHandler) {
      emitter.on('on-scroll', listener)
    }

    function removeScrollListener(listener: EventHandler) {
      emitter.off('on-scroll', listener)
    }

    return {
      prefix,
      percentX,
      percentY,
      currentScroll,
      xScrollLimit,
      yScrollLimit,

      className,
      style,
      wrapperClass,
      xBarLength,
      yBarLength,
      enableXScroll,
      enableYScroll,

      content: contentElement,
      xBar,
      yBar,

      handleMouseDown,
      handleScroll,
      handleWheel,
      handleBarScrollStart,
      handleBarScrollEnd,
      handleXBarScroll,
      handleYBarScroll,

      refresh,
      scrollTo,
      scrollBy,
      scrollToElement,
      getXScrollLimit,
      getYScrollLimit,
      addScrollListener,
      removeScrollListener
    }
  }
})
</script>
