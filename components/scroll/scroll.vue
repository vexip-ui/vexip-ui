<template>
  <div
    ref="wrapper"
    :class="className"
    :style="style"
    @mousedown="handleMouseDown"
    @touchstart="handleTouchStart"
    @wheel.exact="handleWheel($event, 'vertical')"
    @wheel.shift="handleWheel($event, 'horizontal')"
  >
    <div
      ref="content"
      :class="wrapperClass"
      :style="wrapperStyle"
      @transitionend="transitionDuration = null"
    >
      <slot></slot>
    </div>
    <Scrollbar
      v-if="useXBar"
      placement="bottom"
      :class="barClass"
      :scroll="percentX"
      :fade="barFade"
      :bar-length="xBarLength"
      :disabled="!enableXScroll"
      :duration="transitionDuration"
      @on-scroll-start="handleBarScrollStart('horizontal')"
      @on-scroll="handleXBarScroll"
      @on-scroll-end="handleBarScrollEnd('horizontal')"
    ></Scrollbar>
    <Scrollbar
      v-if="useYBar"
      placement="right"
      :class="barClass"
      :scroll="percentY"
      :fade="barFade"
      :bar-length="yBarLength"
      :disabled="!enableYScroll"
      :duration="transitionDuration"
      @on-scroll-start="handleBarScrollStart('vertical')"
      @on-scroll="handleYBarScroll"
      @on-scroll-end="handleBarScrollEnd('vertical')"
    ></Scrollbar>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick
} from 'vue'
import { Scrollbar } from '@/components/scrollbar'
import { useConfiguredProps } from '@/common/config/install'
import { isNull, isTrue } from '@/common/utils/common'
import { throttle, debounce } from '@/common/utils/performance'
import { toNumber, multipleFixed } from '@/common/utils/number'
import { USE_TOUCH } from '@/common/utils/dom-event'
import { createEventEmitter } from '@/common/utils/event-emitter'

import type { PropType } from 'vue'
import type { EventHandler } from '@/common/utils/event-emitter'

export type ScrollMode = 'horizontal' | 'vertical' | 'both'

type ClassType = string | Record<string, boolean>

const moveEvent = USE_TOUCH ? 'touchmove' : 'mousemove'
const upEvent = USE_TOUCH ? 'touchend' : 'mouseup'

const props = useConfiguredProps('scroll', {
  scrollClass: {
    type: [String, Object] as PropType<ClassType>,
    default: null
  },
  mode: {
    default: 'vertical' as ScrollMode,
    validator(value: ScrollMode) {
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
  deltaX: {
    type: Number,
    default: 20
  },
  deltaY: {
    type: Number,
    default: 20
  },
  disabled: {
    type: Boolean,
    default: false
  },
  pointer: {
    type: Boolean,
    default: false
  },
  wheel: {
    type: Boolean,
    default: true
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
  noBuffer: {
    type: Boolean,
    default: false
  },
  noTransition: {
    type: Boolean,
    default: false
  },
  beforeScroll: {
    type: Function as PropType<(payload: { signX: number, signY: number }) => boolean>,
    default: null
  }
})

export default defineComponent({
  name: 'Scroll',
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
    const prefix = 'vxp-scroll'
    const usingBar = ref(false)
    const scrolling = ref(false)
    const isReady = ref(false)
    const transitionDuration = ref<number | null>(null)
    const canPlay = ref(false)

    const emitter = createEventEmitter()

    // 当前滚动位置
    const currentScroll = reactive({
      x: -props.scrollX,
      y: -props.scrollY
    })

    const percentX = ref(0)
    const percentY = ref(0)

    const wrapperElement = ref<HTMLElement | null>(null)
    const contentElement = ref<HTMLElement | null>(null)

    // 容器长宽
    const wrapper = reactive({
      el: wrapperElement,
      width: toNumber(props.width),
      height: toNumber(props.height)
    })

    // 内容长宽
    const content = reactive({
      el: contentElement,
      width: 0,
      height: 0
    })

    let timer: number
    let bufferTimer: number
    let playTimer: number
    let startTimer: number
    let endTimer: number

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
          : null,
        height: height
          ? typeof height === 'string'
            ? Number.isNaN(Number(height))
              ? height
              : `${Number(height)}px`
            : `${height}px`
          : null
      }
    })
    const wrapperClass = computed(() => {
      return [
        `${prefix}__wrapper`,
        props.scrollClass,
        {
          [`${prefix}__wrapper--scrolling`]: scrolling.value,
          [`${prefix}__wrapper--no-ready`]: !isReady.value,
          [`${prefix}__wrapper--using-bar`]: usingBar.value,
          [`${prefix}__wrapper--no-transition`]: props.noTransition
        }
      ]
    })
    const wrapperStyle = computed(() => {
      return {
        transform: `translate3d(${currentScroll.x}px, ${currentScroll.y}px, 0)`,
        transitionDuration: isNull(transitionDuration.value)
          ? null
          : `${transitionDuration.value}ms`
      }
    })
    const xScrollLimit = computed(() => {
      return wrapper.width ? wrapper.width - content.width : 0
    })
    const yScrollLimit = computed(() => {
      return wrapper.height ? wrapper.height - content.height : 0
    })
    const enableXScroll = computed(() => {
      return (
        !props.disabled &&
        props.mode !== 'vertical' &&
        !!wrapper.width &&
        content.width - wrapper.width > 1
      )
    })
    const enableYScroll = computed(() => {
      return (
        !props.disabled &&
        props.mode !== 'horizontal' &&
        !!wrapper.height &&
        content.height - wrapper.height > 1
      )
    })
    const xBarLength = computed(() => {
      if (wrapper.width) {
        return Math.max(Math.min((wrapper.width / (content.width || 1)) * 100, 99), 5)
      }

      return 35
    })
    const yBarLength = computed(() => {
      if (wrapper.height) {
        return Math.max(Math.min((wrapper.height / (content.height || 1)) * 100, 99), 5)
      }

      return 35
    })
    const canAutoplay = computed(() => {
      return (
        props.mode !== 'both' &&
        (isTrue(props.autoplay) || props.autoplay > 1000) &&
        ((props.mode === 'horizontal' && enableXScroll.value) ||
          (props.mode === 'vertical' && enableYScroll.value))
      )
    })

    watch(
      () => props.scrollX,
      value => {
        currentScroll.x = -value
        verifyScroll()
      }
    )
    watch(
      () => props.scrollY,
      value => {
        currentScroll.y = -value
        verifyScroll()
      }
    )
    watch(
      () => props.width,
      () => {
        refreshWrapper()
        verifyScroll()
      }
    )
    watch(
      () => props.height,
      () => {
        refreshWrapper()
        verifyScroll()
      }
    )
    watch(enableXScroll, value => {
      emit('on-x-enable-change', value)
    })
    watch(enableYScroll, value => {
      emit('on-y-enable-change', value)
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

    const handleResize = throttle(refresh)

    onMounted(() => {
      refresh()
      window.addEventListener('resize', handleResize)
    })

    onBeforeUnmount(() => {
      destroyMutationObserver()
      window.removeEventListener('resize', handleResize)
    })

    function refreshWrapper() {
      if (props.mode !== 'vertical') {
        computeWrapperSize('width')
      }

      if (props.mode !== 'horizontal') {
        computeWrapperSize('height')
      }
    }

    function computeWrapperSize(sizeType: 'width' | 'height') {
      nextTick(() => {
        const size = props[sizeType]
        const titleCaseSizeType = sizeType.slice(0, 1).toUpperCase() + sizeType.slice(1)

        // 获取 wrapper 的 px 大小
        if (typeof size === 'string') {
          if (!size.endsWith('px') && Number.isNaN(Number(size))) {
            wrapper[sizeType] = wrapper.el![
              `offset${titleCaseSizeType}` as 'offsetWidth' | 'offsetHeight'
            ]
          } else {
            wrapper[sizeType] = parseInt(size)
          }
        } else {
          wrapper[sizeType] = size
        }
      })
    }

    function computeContentSize() {
      window.clearTimeout(timer)

      timer = window.setTimeout(() => {
        const mode = props.mode

        if (mode !== 'vertical') {
          content.width = content.el!.offsetWidth

          if (wrapper.width >= content.width) {
            currentScroll.x = 0
          } else {
            if (currentScroll.x === 0) {
              currentScroll.x = -props.scrollX
            }
          }
        }

        if (mode !== 'horizontal') {
          content.height = content.el?.offsetHeight ?? 0

          if (wrapper.height >= content.height) {
            currentScroll.y = 0
          } else {
            if (currentScroll.y === 0) {
              currentScroll.y = -props.scrollY
            }
          }
        }

        isReady.value = false

        setTimeout(() => {
          isReady.value = true
          verifyScroll()
        }, 1)
      }, 0)
    }

    function handleMouseDown(event: MouseEvent) {
      if (!props.pointer || event.button !== 0 || USE_TOUCH) {
        return false
      }

      handlePointerDown(event)
    }

    function handleTouchStart(event: TouchEvent) {
      if (!props.pointer || event.touches.length !== 1) {
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

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (!enableXScroll.value && !enableYScroll.value) {
        return false
      }

      event.preventDefault()
      prepareScroll()

      transitionDuration.value = 0

      const pointer = 'touches' in event ? event.touches[0] : event

      xScrollStartAt = currentScroll.x
      yScrollStartAt = currentScroll.y
      cursorXPosition = pointer.clientX
      cursorYPosition = pointer.clientY

      document.addEventListener(moveEvent, handlePointerMove)
      document.addEventListener(upEvent, handlePointerUp)

      emit('on-scroll-start', {
        clientX: -currentScroll.x,
        clientY: -currentScroll.y,
        percentX: percentX.value,
        percentY: percentY.value
      })
    }

    function handlePointerMove(event: MouseEvent | TouchEvent) {
      event.stopPropagation()

      if (!USE_TOUCH) {
        event.preventDefault()
      }

      const pointer = 'touches' in event ? event.touches[0] : event
      const signX = pointer.clientX - cursorXPosition > 0 ? 1 : -1
      const signY = pointer.clientY - cursorYPosition > 0 ? 1 : -1

      if (props.beforeScroll?.({ signX, signY }) === false) {
        return false
      }

      scrolling.value = true

      if (enableXScroll.value) {
        currentScroll.x = xScrollStartAt + pointer.clientX - cursorXPosition
      }

      if (enableYScroll.value) {
        currentScroll.y = yScrollStartAt + pointer.clientY - cursorYPosition
      }

      if (props.noBuffer) {
        verifyScroll()
      } else {
        computePercent()
      }

      emitScrollEvent('both')
    }

    function handlePointerUp() {
      document.removeEventListener(moveEvent, handlePointerMove)
      document.removeEventListener(upEvent, handlePointerUp)

      transitionDuration.value = null

      handleBuffer()
      verifyScroll()
      emitScrollEvent('both')
      emit('on-scroll-end', {
        clientX: -currentScroll.x,
        clientY: -currentScroll.y,
        percentX: percentX.value,
        percentY: percentY.value
      })
      startAutoplay()
    }

    // 按下 shift 时为横向滚动，保持和原生操作一致
    function handleWheel(event: WheelEvent, type: 'vertical' | 'horizontal') {
      const isVerticalScroll = enableYScroll.value && type === 'vertical'
      const isHorizontalScroll = enableXScroll.value && type === 'horizontal'

      // 纵横滚动均使用 deltaY 标记
      const sign = event.deltaY > 0 ? -1 : 1

      if (
        props.wheel &&
        (isVerticalScroll || isHorizontalScroll) &&
        props.beforeScroll?.({ signX: -sign, signY: -sign }) !== false
      ) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        return true
      }

      if (props.mode !== 'both' && props.mode !== type) return false

      prepareScroll()

      const computedDelta = sign * (type === 'horizontal' ? props.deltaX : props.deltaY)

      if (isVerticalScroll) {
        currentScroll.y += computedDelta
      } else if (isHorizontalScroll) {
        currentScroll.x += computedDelta
      }

      verifyScroll()
      emitScrollEvent(type)

      emit('on-wheel', {
        type,
        sign: -sign,
        clientX: -currentScroll.x,
        clientY: -currentScroll.y,
        percentX: percentX.value,
        percentY: percentY.value
      })

      startAutoplay()
    }

    function prepareScroll() {
      stopAutoplay()
      window.clearTimeout(bufferTimer)
    }

    function verifyScroll() {
      if (!isReady.value) {
        return
      }

      if (props.mode !== 'vertical') {
        currentScroll.x = Math.min(0, Math.max(currentScroll.x, xScrollLimit.value))
      }

      if (props.mode !== 'horizontal') {
        currentScroll.y = Math.min(0, Math.max(currentScroll.y, yScrollLimit.value))
      }

      computePercent()
    }

    function computePercent() {
      percentX.value = multipleFixed(currentScroll.x / (xScrollLimit.value || -1), 100, 2)
      percentY.value = multipleFixed(currentScroll.y / (yScrollLimit.value || -1), 100, 2)

      percentX.value = Math.max(0, Math.min(percentX.value, 100))
      percentY.value = Math.max(0, Math.min(percentY.value, 100))
    }

    function handleBuffer() {
      if (props.noBuffer) {
        bufferTimer = window.setTimeout(() => {
          scrolling.value = false
        }, 300)
      } else {
        scrolling.value = false
      }
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
      currentScroll.x = (percent * xScrollLimit.value) / 100

      emitScrollEvent('horizontal')
    }

    function handleYBarScroll(percent: number) {
      percentY.value = percent
      currentScroll.y = (percent * yScrollLimit.value) / 100

      emitScrollEvent('vertical')
    }

    function emitScrollEvent(type: ScrollMode) {
      emit('on-scroll', {
        type,
        clientX: -currentScroll.x,
        clientY: -currentScroll.y,
        percentX: percentX.value,
        percentY: percentY.value
      })
      emitter.emit('on-scroll', {
        type,
        clientX: -currentScroll.x,
        clientY: -currentScroll.y,
        percentX: percentX.value,
        percentY: percentY.value
      })
    }

    let mutationObserver: MutationObserver | null

    function createMutationObserver() {
      const target = content.el?.children[0]

      if (!target) return

      mutationObserver = new MutationObserver(debounce(computeContentSize))

      mutationObserver.observe(target, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
        attributeFilter: ['style']
      })
    }

    function destroyMutationObserver() {
      if (mutationObserver) {
        mutationObserver.disconnect()
        mutationObserver = null
      }
    }

    function refresh() {
      stopAutoplay()
      computeContentSize()
      refreshWrapper()

      nextTick(() => {
        destroyMutationObserver()
        createMutationObserver()
      })

      setTimeout(() => {
        verifyScroll()
        startAutoplay()
      }, 10)
    }

    function scrollTo(clientX: number, clientY: number, duration?: number) {
      setDuration(duration)

      nextTick(() => {
        let changed = false

        if (enableXScroll.value && Math.abs(currentScroll.x + clientX) > 0.01) {
          currentScroll.x = -clientX
          changed = true
        }

        if (enableYScroll.value && Math.abs(currentScroll.y + clientY) > 0.01) {
          currentScroll.y = -clientY
          changed = true
        }

        verifyScroll()

        if (!changed) transitionDuration.value = null
      })
    }

    function scrollBy(deltaX: number, deltaY: number, duration?: number) {
      setDuration(duration)

      nextTick(() => {
        let changed = false

        if (deltaX && enableXScroll) {
          currentScroll.x -= deltaX
          changed = true
        }

        if (deltaY && enableYScroll) {
          currentScroll.y -= deltaY
          changed = true
        }

        verifyScroll()

        if (!changed) transitionDuration.value = null
      })
    }

    function setDuration(duration?: number) {
      if (typeof duration === 'number') {
        transitionDuration.value = duration

        if (transitionDuration.value === 0) {
          nextTick(() => {
            transitionDuration.value = null
          })
        }
      }
    }

    function getXScrollLimit() {
      return [0, -xScrollLimit.value]
    }

    function getYScrollLimit() {
      return [0, -yScrollLimit.value]
    }

    function startAutoplay() {
      if (!canAutoplay.value) return

      stopAutoplay()

      // const { mode, autoplay, xScrollLimit, yScrollLimit } = this
      const mode = props.mode
      const distance = mode === 'horizontal' ? 'width' : 'height'
      const limit = mode === 'horizontal' ? xScrollLimit : yScrollLimit
      const prop = mode === 'horizontal' ? 'x' : 'y'
      const waiting = props.playWaiting < 20 ? 20 : props.playWaiting

      let playSpeed = 0.5

      if (typeof props.autoplay === 'number') {
        playSpeed = (wrapper[distance] / props.autoplay) * 16
      }

      const scroll = () => {
        currentScroll[prop] -= playSpeed

        if (currentScroll[prop] <= limit.value) {
          currentScroll[prop] = limit.value
          canPlay.value = false

          computePercent()

          endTimer = window.setTimeout(() => {
            scrollTo(0, 0, 500)

            startTimer = window.setTimeout(() => {
              canPlay.value = true
              scroll()
            }, 500 + waiting)
          }, waiting)
        } else {
          computePercent()

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

    function scrollToElement(el: Element, duration?: number, offset = 0) {
      if (!content.el) return

      if (typeof el === 'string') {
        el = content.el.querySelector(el)!
      }

      if (!(el instanceof Node)) return

      const wrapperRect = content.el.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()

      let clientX = 0
      let clientY = 0

      if (props.mode !== 'vertical') {
        clientX = elRect.left - wrapperRect.left + offset
      }

      if (props.mode !== 'horizontal') {
        clientY = elRect.top - wrapperRect.top + offset
      }

      scrollTo(clientX, clientY, duration)
    }

    function addScrollListener(listener: EventHandler) {
      emitter.on('on-scroll', listener)
    }

    function removeScrollListener(listener: EventHandler) {
      emitter.off('on-scroll', listener)
    }

    return {
      wrapper: wrapperElement,
      content: contentElement,

      percentX,
      percentY,
      transitionDuration,

      className,
      style,
      wrapperClass,
      wrapperStyle,
      xBarLength,
      yBarLength,
      enableXScroll,
      enableYScroll,

      handleMouseDown,
      handleTouchStart,
      handleWheel,
      handleBarScrollStart,
      handleBarScrollEnd,
      handleXBarScroll,
      handleYBarScroll,

      refresh,
      scrollTo,
      scrollBy,
      getXScrollLimit,
      getYScrollLimit,
      scrollToElement,
      addScrollListener,
      removeScrollListener
    }
  }
})
</script>
