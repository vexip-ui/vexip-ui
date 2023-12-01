<script setup lang="ts">
import { Scrollbar } from '@/components/scrollbar'
import { ResizeObserver } from '@/components/resize-observer'

import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowReadonly,
  toRef,
  watch,
  watchEffect
} from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { useRtl, useSetTimeout } from '@vexip-ui/hooks'
import { USE_TOUCH, createEventEmitter, isClient, isElement, isTrue } from '@vexip-ui/utils'
import { scrollProps } from './props'
import { useScrollWrapper } from './hooks'
import { MOVE_EVENT, UP_EVENT, scrollModes } from './symbol'

import type { ScrollbarExposed } from '@/components/scrollbar'
import type { EventHandler } from '@vexip-ui/utils'
import type { ScrollMode } from './symbol'

defineOptions({ name: 'Scroll' })

const _props = defineProps(scrollProps)
const props = useProps('scroll', _props, {
  scrollClass: null,
  scrollStyle: null,
  scrollAttrs: null,
  mode: {
    default: 'vertical',
    validator: value => scrollModes.includes(value)
  },
  width: '',
  height: '',
  deltaX: 40,
  deltaY: 40,
  disabled: false,
  pointer: USE_TOUCH,
  wheel: true,
  scrollX: {
    default: 0,
    static: true
  },
  scrollY: {
    default: 0,
    static: true
  },
  useXBar: false,
  useYBar: false,
  barFade: 1500,
  barClass: null,
  autoplay: false,
  playWaiting: 500,
  noBuffer: false,
  noTransition: false,
  onBeforeScroll: {
    default: null,
    isFunc: true
  },
  useBarTrack: false,
  scrollTag: 'div'
})

const emitter = createEventEmitter()

const nh = useNameHelper('scroll')
const { isRtl } = useRtl()
const { timer } = useSetTimeout()

const usingBar = ref(false)
const scrolling = ref(false)
const transitionDuration = ref<number>(0)
const mode = computed(() => (props.mode === 'horizontal-exact' ? 'horizontal' : props.mode))

let waitDelay = 180

const xBar = ref<ScrollbarExposed>()
const yBar = ref<ScrollbarExposed>()

let initialized = false

const {
  wrapperEl,
  contentEl,

  wrapper,
  isReady,
  x,
  y,
  percentX,
  percentY,
  xScrollLimit,
  yScrollLimit,
  enableXScroll,
  enableYScroll,
  xBarLength,
  yBarLength,

  handleResize,
  verifyScroll,
  computePercent,
  refresh,
  triggerUpdate
} = useScrollWrapper({
  mode,
  disabled: toRef(props, 'disabled'),
  width: toRef(props, 'width'),
  height: toRef(props, 'height'),
  scrollX: toRef(props, 'scrollX'),
  scrollY: toRef(props, 'scrollY'),
  onResize: entry => {
    emitEvent(props.onResize, entry)
  },
  // onBeforeRefresh: stopAutoplay,
  onAfterRefresh: () => {
    syncBarScroll()

    if (!initialized) {
      initialized = true
      startAutoplay()
    }
  }
})

const slotParams = shallowReadonly({
  getState,
  refresh,
  scrollTo,
  scrollBy,
  scrollToElement,
  ensureInView
})

/* autoplay */
const canPlay = ref(false)

const canAutoplay = computed(() => {
  return (
    mode.value !== 'both' &&
    (isTrue(props.autoplay) || +props.autoplay > 1000) &&
    ((mode.value === 'horizontal' && enableXScroll.value) ||
      (mode.value === 'vertical' && enableYScroll.value))
  )
})

watch([() => props.autoplay, () => props.playWaiting], () => {
  stopAutoplay()
  nextTick(startAutoplay)
})

function startAutoplay() {
  if (!canAutoplay.value) return

  stopAutoplay()

  const distance = mode.value === 'horizontal' ? 'width' : 'height'
  const limit = mode.value === 'horizontal' ? xScrollLimit : yScrollLimit
  // const prop = mode.value === 'horizontal' ? 'x' : 'y'
  const prop = mode.value === 'horizontal' ? x : y
  const waiting = props.playWaiting < 20 ? 20 : props.playWaiting

  let playSpeed = 0.5

  if (typeof props.autoplay === 'number') {
    playSpeed = (wrapper[distance] / props.autoplay) * 16
  }

  const precessScroll = () => {
    computePercent()
    triggerUpdate()
    syncBarScroll()
    emitScrollEvent(mode.value)
  }
  const scroll = () => {
    prop.value -= playSpeed

    if (prop.value <= limit.value) {
      prop.value = limit.value
      canPlay.value = false

      precessScroll()

      timer.end = setTimeout(() => {
        scrollTo(0, 0, 500)

        timer.start = setTimeout(() => {
          canPlay.value = true

          emitScrollEvent(mode.value)
          scroll()
        }, 500 + waiting)
      }, waiting)
    } else {
      precessScroll()

      if (canPlay.value) {
        requestAnimationFrame(scroll)
      }
    }
  }

  timer.play = setTimeout(() => {
    canPlay.value = true
    scroll()
  }, waiting)
}

function stopAutoplay() {
  canPlay.value = false

  clearTimeout(timer.play)
  clearTimeout(timer.start)
  clearTimeout(timer.end)
}
/* autoplay */

const className = computed(() => {
  return [
    nh.b(),
    nh.bs('vars'),
    nh.bm(mode.value),
    {
      [nh.bm('inherit')]: props.inherit,
      [nh.bm('using-bar')]: usingBar.value,
      [nh.bm('scrolling')]: scrolling.value,
      [nh.bm('no-ready')]: !isReady.value,
      [nh.bm('no-transition')]: props.noTransition
    }
  ]
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
  return [props.scrollAttrs?.class, props.scrollClass, nh.be('wrapper')]
})
const wrapperStyle = computed(() => {
  return [props.scrollAttrs?.style, props.scrollStyle]
})

watch(enableXScroll, value => {
  emitEvent(props.onXEnabledChange, value)
})
watch(enableYScroll, value => {
  emitEvent(props.onYEnabledChange, value)
})
watch(isReady, value => {
  if (value) {
    transitionDuration.value = -1
    emitEvent(props.onReady)
  } else {
    transitionDuration.value = 0
  }
})
watchEffect(() => {
  if (!contentEl.value) return

  contentEl.value.style.transform = `translate3d(${isRtl.value ? -x.value : x.value}px, ${
    y.value
  }px, 0)`
})
watchEffect(() => {
  if (!contentEl.value) return

  contentEl.value.style.transitionDuration =
    transitionDuration.value < 0 ? '' : `${transitionDuration.value}ms`
})

onMounted(() => {
  if (!isClient || !wrapperEl.value) return

  const style = getComputedStyle(wrapperEl.value)
  const duration = style.getPropertyValue(nh.cv('move-duration')).trim()

  if (duration.endsWith('ms')) {
    waitDelay = parseFloat(duration)
  } else if (duration.endsWith('s')) {
    waitDelay = parseFloat(duration) * 1000
  }

  waitDelay = Number.isNaN(waitDelay) ? 140 : waitDelay
})

onBeforeUnmount(stopAutoplay)

defineExpose({
  percentX,
  percentY,
  x,
  y,
  isReady,

  xBarLength,
  yBarLength,
  enableXScroll,
  enableYScroll,

  wrapper: wrapperEl,
  content: contentEl,
  xBar,
  yBar,

  refresh,
  scrollTo,
  scrollBy,
  scrollToElement,
  ensureInView,
  getXScrollLimit,
  getYScrollLimit,
  addScrollListener,
  removeScrollListener
})

function getCommonPayload() {
  return {
    clientX: -x.value,
    clientY: -y.value,
    percentX: percentX.value,
    percentY: percentY.value
  }
}

function syncBarScroll() {
  xBar.value?.handleScroll(percentX.value)
  yBar.value?.handleScroll(percentY.value)
}

function handleMouseDown(event: MouseEvent) {
  if (!props.pointer || event.button > 0 || USE_TOUCH) {
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

let moved = false
let target: EventTarget | null = null
let lastDate = 0

function handlePointerDown(event: MouseEvent | TouchEvent) {
  if (!enableXScroll.value && !enableYScroll.value) {
    return false
  }

  if (event.cancelable) {
    event.preventDefault()
  }

  prepareScroll()

  transitionDuration.value = 0

  const pointer = 'touches' in event ? event.touches[0] : event

  xScrollStartAt = x.value
  yScrollStartAt = y.value
  cursorXPosition = pointer.clientX
  cursorYPosition = pointer.clientY

  moved = false
  target = event.target
  lastDate = Date.now()

  document.addEventListener(MOVE_EVENT, handlePointerMove)
  document.addEventListener(UP_EVENT, handlePointerUp)

  emitEvent(props.onScrollStart, getCommonPayload())
}

function handlePointerMove(event: MouseEvent | TouchEvent) {
  event.stopPropagation()

  if (!USE_TOUCH) {
    event.preventDefault()
  }

  const pointer = 'touches' in event ? event.touches[0] : event
  const signX = pointer.clientX - cursorXPosition > 0 ? 1 : -1
  const signY = pointer.clientY - cursorYPosition > 0 ? 1 : -1

  if (props.onBeforeScroll?.({ signX, signY }) === false) {
    return false
  }

  scrolling.value = true

  if (enableXScroll.value) {
    x.value = xScrollStartAt + pointer.clientX - cursorXPosition
    moved = true
  }

  if (enableYScroll.value) {
    y.value = yScrollStartAt + pointer.clientY - cursorYPosition
    moved = true
  }

  if (props.noBuffer) {
    verifyScroll()
  } else {
    computePercent()
    triggerUpdate()
  }

  syncBarScroll()
  emitScrollEvent(mode.value)
}

function handlePointerUp(event: MouseEvent | TouchEvent) {
  if (!moved && target && event.target === target && Date.now() - lastDate <= 500) {
    target.dispatchEvent(new MouseEvent('click', event))
  }

  document.removeEventListener(MOVE_EVENT, handlePointerMove)
  document.removeEventListener(UP_EVENT, handlePointerUp)

  transitionDuration.value = -1
  moved = false

  handleBuffer()
  verifyScroll()
  syncBarScroll()
  emitEvent(props.onScrollEnd, getCommonPayload())
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
    props.onBeforeScroll?.({ signX: -sign, signY: -sign }) !== false
  ) {
    event.preventDefault()
    event.stopPropagation()
  } else {
    return true
  }

  if (mode.value !== 'both' && mode.value !== type) return false

  prepareScroll()

  const computedDelta = sign * (type === 'horizontal' ? props.deltaX : props.deltaY)

  if (isVerticalScroll) {
    y.value += computedDelta
  } else if (isHorizontalScroll) {
    x.value += computedDelta
  }

  verifyScroll()
  syncBarScroll()
  emitScrollEvent(type)

  emitEvent(props.onWheel, {
    ...getCommonPayload(),
    type,
    sign: -sign as 1 | -1
  })

  startAutoplay()
}

function prepareScroll() {
  stopAutoplay()
  clearTimeout(timer.buffer)
}

function handleBuffer() {
  if (props.noBuffer) {
    timer.buffer = setTimeout(() => {
      scrolling.value = false
    }, 300)
  } else {
    scrolling.value = false
  }
}

function handleBarScrollStart(type: 'vertical' | 'horizontal') {
  usingBar.value = true
  emitEvent(props.onBarScrollStart, { ...getCommonPayload(), type })
}

function handleBarScrollEnd(type: 'vertical' | 'horizontal') {
  usingBar.value = false
  emitEvent(props.onBarScrollEnd, { ...getCommonPayload(), type })
}

function handleXBarScroll(percent: number) {
  percentX.value = percent
  x.value = (percent * xScrollLimit.value) / 100
  triggerUpdate()

  emitEvent(props.onBarScroll, {
    ...getCommonPayload(),
    type: 'horizontal'
  })
  emitScrollEvent('horizontal')
}

function handleYBarScroll(percent: number) {
  percentY.value = percent
  y.value = (percent * yScrollLimit.value) / 100
  triggerUpdate()

  emitEvent(props.onBarScroll, {
    ...getCommonPayload(),
    type: 'vertical'
  })
  emitScrollEvent('vertical')
}

function emitScrollEvent(type: Exclude<ScrollMode, 'horizontal-exact'>) {
  emitEvent(props.onScroll, {
    ...getCommonPayload(),
    type
  })
  emitter.emit('scroll', {
    ...getCommonPayload(),
    type
  })
}

function ensureScrollOffset() {
  if (wrapperEl.value) {
    wrapperEl.value.scrollTop = 0
    wrapperEl.value.scrollLeft = 0
  }
}

function getState() {
  const { clientX: scrollX, clientY: scrollY, percentX, percentY } = getCommonPayload()

  return {
    scrollX,
    scrollY,
    percentX,
    percentY,
    enableXScroll: enableXScroll.value,
    enableYScroll: enableYScroll.value
  }
}

function waitTransition(duration = waitDelay) {
  clearTimeout(timer.wait)

  return new Promise<void>(resolve => {
    timer.wait = setTimeout(() => resolve(), duration + 1)
  })
}

function scrollTo(clientX: number, clientY: number, duration?: number) {
  setDuration(duration)
  nextTick(() => {
    let changed = false

    if (enableXScroll.value && Math.abs(x.value + clientX) > 0.01) {
      x.value = -clientX
      changed = true
    }

    if (enableYScroll.value && Math.abs(y.value + clientY) > 0.01) {
      y.value = -clientY
      changed = true
    }

    verifyScroll()
    syncBarScroll()

    if (!changed) transitionDuration.value = -1
  })

  return waitTransition(duration)
}

function scrollBy(deltaX: number, deltaY: number, duration?: number) {
  setDuration(duration)
  nextTick(() => {
    let changed = false

    if (deltaX && enableXScroll) {
      x.value -= deltaX
      changed = true
    }

    if (deltaY && enableYScroll) {
      y.value -= deltaY
      changed = true
    }

    verifyScroll()
    syncBarScroll()

    if (!changed) transitionDuration.value = -1
  })

  return waitTransition(duration)
}

function setDuration(duration?: number) {
  if (typeof duration === 'number') {
    transitionDuration.value = duration

    if (transitionDuration.value === 0) {
      nextTick(() => {
        transitionDuration.value = -1
      })
    }
  }
}

function scrollToElement(el: string | Element, duration?: number, offset = 0) {
  if (!contentEl.value) return Promise.resolve()

  if (typeof el === 'string') {
    el = contentEl.value.querySelector(el)!
  }

  if (!isElement(el)) return Promise.resolve()

  const wrapperRect = contentEl.value.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()

  let clientX = 0
  let clientY = 0

  if (mode.value !== 'vertical') {
    clientX = elRect.left - wrapperRect.left + offset
  }

  if (mode.value !== 'horizontal') {
    clientY = elRect.top - wrapperRect.top + offset
  }

  return scrollTo(clientX, clientY, duration)
}

function ensureInView(el: string | Element, duration?: number, offset = 0) {
  if (!wrapperEl.value) return Promise.resolve()

  if (typeof el === 'string') {
    el = wrapperEl.value.querySelector(el)!
  }

  if (!isElement(el)) return Promise.resolve()

  const wrapperRect = wrapperEl.value.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()

  let clientX = 0
  let clientY = 0

  if (mode.value !== 'vertical') {
    if (elRect.left < wrapperRect.left + offset) {
      clientX = elRect.left - wrapperRect.left - offset
    } else if (elRect.right > wrapperRect.right - offset) {
      clientX = elRect.right - wrapperRect.right + offset
    }
  }

  if (mode.value !== 'horizontal') {
    if (elRect.top < wrapperRect.top + offset) {
      clientY = elRect.top - wrapperRect.top - offset
    } else if (elRect.bottom > wrapperRect.bottom - offset) {
      clientY = elRect.bottom - wrapperRect.bottom + offset
    }
  }

  return scrollBy(clientX, clientY, duration)
}

function getXScrollLimit() {
  return [0, -xScrollLimit.value]
}

function getYScrollLimit() {
  return [0, -yScrollLimit.value]
}

function addScrollListener(listener: EventHandler) {
  emitter.on('scroll', listener)
}

function removeScrollListener(listener: EventHandler) {
  emitter.off('scroll', listener)
}
</script>

<template>
  <div
    ref="wrapperEl"
    :class="className"
    :style="style"
    @mousedown="handleMouseDown"
    @touchstart="handleTouchStart"
    @scroll="ensureScrollOffset"
    @wheel.exact="
      handleWheel($event, props.mode === 'horizontal-exact' ? 'horizontal' : 'vertical')
    "
    @wheel.shift="handleWheel($event, 'horizontal')"
  >
    <div v-if="$slots.extra" :class="nh.be('extra')">
      <slot name="extra" v-bind="slotParams"></slot>
    </div>
    <ResizeObserver throttle :on-resize="handleResize">
      <component
        :is="props.scrollTag || 'div'"
        v-bind="props.scrollAttrs"
        ref="contentEl"
        :class="wrapperClass"
        :style="wrapperStyle"
        @transitionend="transitionDuration = -1"
      >
        <slot v-bind="slotParams"></slot>
      </component>
    </ResizeObserver>
    <Scrollbar
      v-if="props.useXBar"
      ref="xBar"
      inherit
      placement="bottom"
      :class="[nh.bem('bar', 'horizontal'), props.barClass]"
      :fade="props.barFade"
      :bar-length="xBarLength"
      :disabled="!enableXScroll"
      :duration="transitionDuration"
      :use-track="props.useBarTrack"
      @scroll-start="handleBarScrollStart('horizontal')"
      @scroll="handleXBarScroll"
      @scroll-end="handleBarScrollEnd('horizontal')"
    ></Scrollbar>
    <Scrollbar
      v-if="props.useYBar"
      ref="yBar"
      inherit
      placement="right"
      :class="[nh.bem('bar', 'vertical'), props.barClass]"
      :fade="props.barFade"
      :bar-length="yBarLength"
      :disabled="!enableYScroll"
      :duration="transitionDuration"
      :use-track="props.useBarTrack"
      @scroll-start="handleBarScrollStart('vertical')"
      @scroll="handleYBarScroll"
      @scroll-end="handleBarScrollEnd('vertical')"
    ></Scrollbar>
  </div>
</template>
