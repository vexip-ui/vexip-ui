<template>
  <div
    :class="className"
    :style="style"
    @mousedown="handleMouseDown"
    @touchstart="handleTouchStart"
    @wheel.exact="handleWheel($event, 'vertical')"
    @wheel.shift="handleWheel($event, 'horizontal')"
  >
    <div
      ref="wrapper"
      :class="wrapperClass"
      :style="wrapperStyle"
      @transitionend="duration = null"
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
      :duration="duration"
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
      :duration="duration"
      @on-scroll-start="handleBarScrollStart('vertical')"
      @on-scroll="handleYBarScroll"
      @on-scroll-end="handleBarScrollEnd('vertical')"
    ></Scrollbar>
  </div>
</template>

<script>
import Scrollbar from './scrollbar'
import { useConfigurableProps } from '@/config/properties'
import { multipleFixed, throttle, isNull, debounce } from '@/utils/common'
import { USE_TOUCH } from '@/utils/event'

const { prefix } = require('@/style/basis/variable')

const HORIZONTAL = 'horizontal'
const VERTICAL = 'vertical'
const BOTH = 'both'

// const downEvent = USE_TOUCH ? 'touchstart' : 'mousedown'
const moveEvent = USE_TOUCH ? 'touchmove' : 'mousemove'
const upEvent = USE_TOUCH ? 'touchend' : 'mouseup'

const props = useConfigurableProps({
  scrollClass: {
    type: [String, Array, Object],
    default: null
  },
  mode: {
    default: VERTICAL,
    validator(value) {
      return [HORIZONTAL, VERTICAL, BOTH].includes(value)
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
    type: [String, Array, Object],
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
  }
})

export default {
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
  data() {
    return {
      prefix: `${prefix}-scroll`,
      usingBar: false,
      scrolling: false,
      bufferTimer: null,
      isReady: false,
      duration: null,
      canPlay: false,

      // 当前滚动位置
      currentXScroll: -this.scrollX,
      currentYScroll: -this.scrollY,

      // 当前滚动的百分比
      percentX: 0,
      percentY: 0,

      // 内容长宽
      contentWidth: 0,
      contentHeight: 0,

      // 容器长宽
      wrapperWidth: this.width,
      wrapperHeight: this.height,

      // 记录滚动开始位置
      xScrollStartAt: 0,
      yScrollStartAt: 0,

      // 记录滚动开始鼠标位置
      cursorXPosition: 0,
      cursorYPosition: 0
    }
  },
  computed: {
    className() {
      const { prefix, mode } = this

      return [prefix, `${prefix}--${mode}`]
    },
    style() {
      const { width, height } = this

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
    },
    wrapperClass() {
      const { prefix, scrollClass, usingBar, scrolling, isReady, noTransition } = this

      return [
        `${prefix}__wrapper`,
        scrollClass,
        {
          [`${prefix}__wrapper--scrolling`]: scrolling,
          [`${prefix}__wrapper--no-ready`]: !isReady,
          [`${prefix}__wrapper--using-bar`]: usingBar,
          [`${prefix}__wrapper--no-transition`]: noTransition
        }
      ]
    },
    wrapperStyle() {
      const { currentXScroll, currentYScroll, duration } = this

      return {
        transform: `translate3d(${currentXScroll}px, ${currentYScroll}px, 0)`,
        transitionDuration: isNull(duration) ? null : `${duration}ms`
      }
    },
    xScrollLimit() {
      return this.wrapperWidth ? this.wrapperWidth - this.contentWidth : 0
    },
    yScrollLimit() {
      return this.wrapperHeight ? this.wrapperHeight - this.contentHeight : 0
    },
    enableXScroll() {
      return (
        this.mode !== VERTICAL &&
        this.wrapperWidth &&
        this.contentWidth - this.wrapperWidth > 1
      )
    },
    enableYScroll() {
      return (
        this.mode !== HORIZONTAL &&
        this.wrapperHeight &&
        this.contentHeight - this.wrapperHeight > 1
      )
    },
    xBarLength() {
      const { wrapperWidth, contentWidth } = this

      if (typeof wrapperWidth === 'number') {
        return Math.max(
          Math.min((wrapperWidth / (contentWidth || 1)) * 100, 99),
          5
        )
      }

      return 35
    },
    yBarLength() {
      const { wrapperHeight, contentHeight } = this

      if (typeof wrapperHeight === 'number') {
        return Math.max(
          Math.min((wrapperHeight / (contentHeight || 1)) * 100, 99),
          5
        )
      }

      return 35
    },
    canAutoplay() {
      return this.mode !== BOTH &&
        (this.autoplay === true || this.autoplay > 1000) &&
        (
          (this.mode === HORIZONTAL && this.enableXScroll) ||
          (this.mode === VERTICAL && this.enableYScroll)
        )
    }
  },
  watch: {
    scrollX(value) {
      this.currentXScroll = -value
      this.verifyScroll()
    },
    scrollY(value) {
      this.currentYScroll = -value
      this.verifyScroll()
    },
    width() {
      this.refreshWrapper()
      this.verifyScroll()
    },
    height() {
      this.refreshWrapper()
      this.verifyScroll()
    },
    enableXScroll(value) {
      this.$emit('on-x-enable-change', value)
    },
    enableYScroll(value) {
      this.$emit('on-y-enable-change', value)
    },
    autoplay() {
      this.stopAutoplay()
      this.$nextTick(this.startAutoplay)
    },
    playWaiting() {
      this.stopAutoplay()
      this.$nextTick(this.startAutoplay)
    }
  },
  created() {
    this.handleResize = throttle(this.refresh)
  },
  mounted() {
    this.refresh()

    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    this.destroyMutationObserver()

    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    refreshWrapper() {
      const mode = this.mode

      if (mode !== VERTICAL) {
        this.computeWrapperSize('width')
      }

      if (mode !== HORIZONTAL) {
        this.computeWrapperSize('height')
      }
    },
    computeWrapperSize(sizeType) {
      this.$nextTick(() => {
        const size = this[sizeType]
        const titleCaseSizeType =
          sizeType.slice(0, 1).toUpperCase() + sizeType.slice(1)
        const wrapperSize = `wrapper${titleCaseSizeType}`

        // 获取 wrapper 的 px 大小
        if (typeof size === 'string') {
          if (!size.endsWith('px') && Number.isNaN(Number(size))) {
            this[wrapperSize] = this.$el[`offset${titleCaseSizeType}`]
          } else {
            this[wrapperSize] = parseInt(size)
          }
        } else {
          this[wrapperSize] = size
        }
      })
    },
    computeContentSize() {
      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        const mode = this.mode

        if (mode !== VERTICAL) {
          this.contentWidth = this.$refs.wrapper.offsetWidth

          if (this.wrapperWidth >= this.contentWidth) {
            this.currentXScroll = 0
          } else {
            if (this.currentXScroll === 0) {
              this.currentXScroll = -this.scrollX
            }
          }
        }

        if (mode !== HORIZONTAL) {
          this.contentHeight = this.$refs.wrapper.offsetHeight

          if (this.wrapperHeight >= this.contentHeight) {
            this.currentYScroll = 0
          } else {
            if (this.currentYScroll === 0) {
              this.currentYScroll = -this.scrollY
            }
          }
        }

        this.isReady = false

        setTimeout(() => {
          this.isReady = true
          this.verifyScroll()
        }, 1)
      }, 0)
    },
    handleMouseDown(event) {
      if (!this.pointer || event.button !== 0 || USE_TOUCH) {
        return false
      }

      this.handlePointerDown(event)
    },
    handleTouchStart(event) {
      if (!this.pointer || event.touches.length !== 1) {
        return false
      }

      this.handlePointerDown(event)
    },
    handlePointerDown(event) {
      const { enableXScroll, enableYScroll } = this

      if (!enableXScroll && !enableYScroll) {
        return false
      }

      event.preventDefault()

      this.prepareScroll()

      const pointer = event.touches ? event.touches[0] : event

      this.xScrollStartAt = this.currentXScroll
      this.yScrollStartAt = this.currentYScroll
      this.cursorXPosition = pointer.clientX
      this.cursorYPosition = pointer.clientY

      document.addEventListener(moveEvent, this.handlePointerMove)
      document.addEventListener(upEvent, this.handlePointerUp)

      this.$emit('on-scroll-start')
    },
    handlePointerMove(event) {
      event.stopPropagation()

      if (!USE_TOUCH) {
        event.preventDefault()
      }

      this.scrolling = true

      const pointer = event.touches ? event.touches[0] : event
      const { enableXScroll, enableYScroll } = this

      if (enableXScroll) {
        this.currentXScroll =
          this.xScrollStartAt + pointer.clientX - this.cursorXPosition
      }

      if (enableYScroll) {
        this.currentYScroll =
          this.yScrollStartAt + pointer.clientY - this.cursorYPosition
      }

      if (this.noBuffer) {
        this.verifyScroll()
      } else {
        this.computePercent()
      }

      this.emitScrollEvent('mouse')
    },
    handlePointerUp() {
      document.removeEventListener(moveEvent, this.handlePointerMove)
      document.removeEventListener(upEvent, this.handlePointerUp)

      this.handleBuffer()
      this.verifyScroll()
      this.emitScrollEvent('mouse')
      this.$emit('on-scroll-end')
      this.startAutoplay()
    },
    handleWheel(event, type) {
      // 按下 shift 时为横向滚动，保持和原生操作一致
      const { mode, enableXScroll, enableYScroll, deltaX, deltaY, wheel } = this

      const isVerticalScroll = enableYScroll && type === VERTICAL
      const isHorizontalScroll = enableXScroll && type === HORIZONTAL

      if (wheel && (isVerticalScroll || isHorizontalScroll)) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        return true
      }

      if (mode !== BOTH && mode !== type) return false

      this.prepareScroll()

      const sign = event.deltaY > 0 ? -1 : 1
      const computedDelta = sign * (type === HORIZONTAL ? deltaX : deltaY)

      // const computedDeltaX = sign * deltaX
      // const computedDeltaY = sign * deltaY

      // let scrollType

      // if (mode === BOTH) {
      //   const { currentYScroll, yScrollLimit } = this

      //   // 纵向优先
      //   if ((currentYScroll >= 0 && sign > 0) || (currentYScroll <= yScrollLimit && sign < 0)) {
      //     scrollType = HORIZONTAL

      //     if (enableXScroll) {
      //       this.currentXScroll += computedDeltaX
      //     }
      //   } else {
      //     scrollType = VERTICAL

      //     if (enableYScroll) {
      //       this.currentYScroll += computedDeltaY
      //     }
      //   }
      // } else {
      //   scrollType = mode

      //   if (enableYScroll) {
      //     this.currentYScroll += computedDeltaY
      //   } else if (enableXScroll) {
      //     this.currentXScroll += computedDeltaX
      //   }
      // }

      const scrollType = type

      if (isVerticalScroll) {
        this.currentYScroll += computedDelta
      } else if (isHorizontalScroll) {
        this.currentXScroll += computedDelta
      }

      this.verifyScroll()
      this.emitScrollEvent(scrollType)

      this.$emit('on-wheel', {
        type: scrollType,
        clientX: -this.currentXScroll,
        clientY: -this.currentYScroll,
        percentX: this.percentX,
        percentY: this.percentY
      })

      this.startAutoplay()
    },
    prepareScroll() {
      this.stopAutoplay()
      clearTimeout(this.bufferTimer)
    },
    verifyScroll() {
      if (!this.isReady) {
        return
      }

      const { mode, xScrollLimit, yScrollLimit } = this

      if (mode !== VERTICAL) {
        this.currentXScroll = Math.min(
          0,
          Math.max(this.currentXScroll, xScrollLimit)
        )
      }

      if (mode !== HORIZONTAL) {
        this.currentYScroll = Math.min(
          0,
          Math.max(this.currentYScroll, yScrollLimit)
        )
      }

      this.computePercent()
    },
    computePercent() {
      this.percentX = multipleFixed(
        this.currentXScroll / (this.xScrollLimit || -1),
        100,
        2
      )
      this.percentY = multipleFixed(
        this.currentYScroll / (this.yScrollLimit || -1),
        100,
        2
      )

      this.percentX = Math.max(0, Math.min(this.percentX, 100))
      this.percentY = Math.max(0, Math.min(this.percentY, 100))
    },
    handleBuffer() {
      if (this.noBuffer) {
        this.bufferTimer = setTimeout(() => {
          this.scrolling = false
        }, 300)
      } else {
        this.scrolling = false
      }
    },
    handleBarScrollStart(type) {
      this.usingBar = true
      this.$emit('on-bar-scroll-start', type)
    },
    handleBarScrollEnd(type) {
      this.usingBar = false
      this.$emit('on-bar-scroll-end', type)
    },
    handleXBarScroll(percent) {
      this.percentX = percent
      this.currentXScroll = (percent * this.xScrollLimit) / 100

      this.emitScrollEvent(HORIZONTAL)
    },
    handleYBarScroll(percent) {
      this.percentY = percent
      this.currentYScroll = (percent * this.yScrollLimit) / 100

      this.emitScrollEvent(VERTICAL)
    },
    emitScrollEvent(type) {
      this.$emit('on-scroll', {
        type,
        clientX: -this.currentXScroll,
        clientY: -this.currentYScroll,
        percentX: this.percentX,
        percentY: this.percentY
      })
    },
    createMutationObserver() {
      const target = this.$refs.wrapper.children[0]

      if (!target) return

      this.mutationObserver = new MutationObserver(
        debounce(() => {
          this.computeContentSize()
        })
      )

      this.mutationObserver.observe(target, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
        attributeFilter: ['style']
      })
    },
    destroyMutationObserver() {
      if (this.mutationObserver) {
        this.mutationObserver.disconnect()
      }
    },
    refresh() {
      this.stopAutoplay()
      this.computeContentSize()
      this.refreshWrapper()

      this.$nextTick(() => {
        this.destroyMutationObserver()
        this.createMutationObserver()
      })

      setTimeout(() => {
        this.verifyScroll()
        this.startAutoplay()
      }, 10)
    },
    scrollTo(clientX, clientY, duration) {
      this.setDuration(duration)

      this.$nextTick(() => {
        const { enableXScroll, enableYScroll } = this

        let changed = false

        if (enableXScroll && Math.abs(this.currentXScroll + clientX) > 0.01) {
          this.currentXScroll = -clientX
          changed = true
        }

        if (enableYScroll && Math.abs(this.currentYScroll + clientY) > 0.01) {
          this.currentYScroll = -clientY
          changed = true
        }

        this.verifyScroll()

        if (!changed) this.duration = null
      })
    },
    scrollBy(deltaX, deltaY, duration) {
      this.setDuration(duration)

      this.$nextTick(() => {
        const { enableXScroll, enableYScroll } = this

        let changed = false

        if (deltaX && enableXScroll) {
          this.currentXScroll -= deltaX
          changed = true
        }

        if (deltaY && enableYScroll) {
          this.currentYScroll -= deltaY
          changed = true
        }

        this.verifyScroll()

        if (!changed) this.duration = null
      })
    },
    setDuration(duration) {
      if (typeof duration === 'number') {
        this.duration = duration

        if (duration === 0) {
          this.$nextTick(() => {
            this.duration = null
          })
        }
      }
    },
    getXScrollLimit() {
      return [0, -this.xScrollLimit]
    },
    getYScrollLimit() {
      return [0, -this.yScrollLimit]
    },
    startAutoplay() {
      if (!this.canAutoplay) return

      this.stopAutoplay()

      const { mode, autoplay, xScrollLimit, yScrollLimit } = this
      const distance = mode === HORIZONTAL ? 'wrapperWidth' : 'wrapperHeight'
      const limit = mode === HORIZONTAL ? xScrollLimit : yScrollLimit
      const prop = mode === HORIZONTAL ? 'currentXScroll' : 'currentYScroll'
      const waiting = this.playWaiting < 20 ? 20 : this.playWaiting

      let playSpeed = 0.5

      if (typeof autoplay === 'number') {
        playSpeed = this[distance] / autoplay * 16
      }

      const scroll = () => {
        this[prop] -= playSpeed

        if (this[prop] <= limit) {
          this[prop] = limit
          this.canPlay = false

          this.computePercent()

          this.endTimer = setTimeout(() => {
            this.scrollTo(0, 0, 500)

            this.startTimer = setTimeout(() => {
              this.canPlay = true
              scroll()
            }, 500 + waiting)
          }, waiting)
        } else {
          this.computePercent()

          if (this.canPlay) {
            requestAnimationFrame(scroll)
          }
        }
      }

      this.playTimer = setTimeout(() => {
        this.canPlay = true
        scroll()
      }, waiting)
    },
    stopAutoplay() {
      this.canPlay = false

      clearTimeout(this.playTimer)
      clearTimeout(this.startTimer)
      clearTimeout(this.endTimer)
    },
    scrollToElement(el, duration, offset = 0) {
      const wrapper = this.$refs.wrapper

      if (!wrapper) return

      if (typeof el === 'string') {
        el = wrapper.querySelector(el)
      }

      if (!(el instanceof Node)) return

      const wrapperRect = wrapper.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()

      let clientX = 0
      let clientY = 0

      if (this.mode !== VERTICAL) {
        clientX = elRect.left - wrapperRect.left + offset
      }

      if (this.mode !== HORIZONTAL) {
        clientY = elRect.top - wrapperRect.top + offset
      }

      this.scrollTo(clientX, clientY, duration)
    }
  }
}
</script>
