<template>
  <div
    :class="className"
    :style="style"
    @mousedown="handleMouseDown"
    @touchstart="handleTouchStart"
    @wheel="handleWheel"
  >
    <div
      ref="wrapper"
      :class="wrapperClass"
      :style="wrapperStyle"
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
      @on-scroll-start="handleBarScrollStart"
      @on-scroll="handleXBarScroll"
      @on-scroll-end="handleBarScrollEnd"
    ></Scrollbar>
    <Scrollbar
      v-if="useYBar"
      placement="right"
      :class="barClass"
      :scroll="percentY"
      :fade="barFade"
      :bar-length="yBarLength"
      :disabled="!enableYScroll"
      @on-scroll-start="handleBarScrollStart"
      @on-scroll="handleYBarScroll"
      @on-scroll-end="handleBarScrollEnd"
    ></Scrollbar>
  </div>
</template>

<script>
import Scrollbar from './scrollbar'
import { multipleFixed, throttle } from '../../utils/common'
import { USE_TOUCH } from '../../utils/event'

const { prefix } = require('../../style/basis/variable')

const HORIZONTAL = 'horizontal'
const VERTICAL = 'vertical'

// const downEvent = USE_TOUCH ? 'touchstart' : 'mousedown'
const moveEvent = USE_TOUCH ? 'touchmove' : 'mousemove'
const upEvent = USE_TOUCH ? 'touchend' : 'mouseup'

export default {
  name: 'Scroll',
  components: {
    Scrollbar
  },
  props: {
    scrollClass: {
      type: [String, Array, Object],
      default: null
    },
    mode: {
      default: VERTICAL,
      validator(value) {
        return [HORIZONTAL, VERTICAL, 'both'].includes(value)
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
    }
  },
  emits: ['on-x-enable-change', 'on-y-enable-change', 'on-wheel', 'on-scroll'],
  data() {
    return {
      prefix: `${prefix}-scroll`,
      usingBar: false,
      scrolling: false,
      bufferTimer: null,
      isReady: false,

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
      const { prefix, scrollClass, usingBar, scrolling, isReady } = this

      return [
        `${prefix}__wrapper`,
        scrollClass,
        {
          [`${prefix}__wrapper--scrolling`]: scrolling,
          [`${prefix}__wrapper--no-ready`]: !isReady,
          [`${prefix}__wrapper--using-bar`]: usingBar
        }
      ]
    },
    wrapperStyle() {
      const { currentXScroll, currentYScroll } = this

      return {
        transform: `translate3d(${currentXScroll}px, ${currentYScroll}px, 0)`
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
    }
  },
  watch: {
    scrollX(value) {
      this.currentXScroll = -value
    },
    scrollY(value) {
      this.currentYScroll = -value
    },
    width() {
      this.refreshWrapper()
    },
    height() {
      this.refreshWrapper()
    },
    enableXScroll(value) {
      this.$emit('on-x-enable-change', value)
    },
    enableYScroll(value) {
      this.$emit('on-y-enable-change', value)
    }
  },
  created() {
    this.handleResize = throttle(this.refresh)
  },
  mounted() {
    this.refresh()

    setTimeout(() => {
      this.isReady = true
      this.verifyScroll()
    }, 10)

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
      this.$nextTick(() => {
        const mode = this.mode

        if (mode !== VERTICAL) {
          this.contentWidth = this.$refs.wrapper.offsetWidth

          if (this.wrapperWidth >= this.contentWidth) {
            this.currentXScroll = 0
          }
        }

        if (mode !== HORIZONTAL) {
          this.contentHeight = this.$refs.wrapper.offsetHeight

          if (this.wrapperHeight >= this.contentHeight) {
            this.currentYScroll = 0
          }
        }

        this.isReady = false

        setTimeout(() => {
          this.isReady = true
        }, 0)
      })
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

      this.computePercent()
      this.emitScrollEvent()
    },
    handlePointerUp() {
      document.removeEventListener(moveEvent, this.handlePointerMove)
      document.removeEventListener(upEvent, this.handlePointerUp)

      this.verifyScroll()
      this.handleBuffer()
      this.emitScrollEvent()
    },
    handleWheel(event) {
      const { mode, enableXScroll, enableYScroll, deltaX, deltaY, wheel } = this

      if (wheel && (enableXScroll || enableYScroll)) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        return false
      }

      this.prepareScroll()

      const sign = event.deltaY > 0 ? -1 : 1
      const computedDeltaX = sign * deltaX
      const computedDeltaY = sign * deltaY

      let scrollType

      if (mode === 'both') {
        const { currentYScroll, yScrollLimit } = this

        // 纵向优先
        if (currentYScroll >= 0 || currentYScroll <= yScrollLimit) {
          scrollType = HORIZONTAL

          if (enableXScroll) {
            this.currentXScroll += computedDeltaX
          }
        } else {
          scrollType = VERTICAL

          if (enableYScroll) {
            this.currentYScroll += computedDeltaY
          }
        }
      } else {
        scrollType = mode

        if (enableYScroll) {
          this.currentYScroll += computedDeltaY
        } else if (enableXScroll) {
          this.currentXScroll += computedDeltaX
        }
      }

      this.verifyScroll()
      this.emitScrollEvent()

      this.$emit('on-wheel', {
        type: scrollType,
        clientX: -this.currentXScroll,
        clientY: -this.currentYScroll,
        percentX: this.percentX,
        percentY: this.percentY
      })
    },
    prepareScroll() {
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
      this.bufferTimer = setTimeout(() => {
        this.scrolling = false
      }, 300)
    },
    handleBarScrollStart() {
      this.usingBar = true
    },
    handleBarScrollEnd() {
      this.usingBar = false
    },
    handleXBarScroll(percent) {
      this.percentX = percent
      this.currentXScroll = (percent * this.xScrollLimit) / 100

      this.emitScrollEvent()
    },
    handleYBarScroll(percent) {
      this.percentY = percent
      this.currentYScroll = (percent * this.yScrollLimit) / 100

      this.emitScrollEvent()
    },
    emitScrollEvent() {
      this.$emit('on-scroll', {
        clientX: -this.currentXScroll,
        clientY: -this.currentYScroll,
        percentX: this.percentX,
        percentY: this.percentY
      })
    },
    createMutationObserver() {
      const target = this.$refs.wrapper.children[0]

      if (!target) return

      this.mutationObserver = new MutationObserver(() => {
        this.computeContentSize()
      })

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
      this.computeContentSize()
      this.refreshWrapper()

      this.$nextTick(() => {
        this.destroyMutationObserver()
        this.createMutationObserver()
      })

      setTimeout(() => {
        this.verifyScroll()
      }, 10)
    },
    scrollTo(clientX, clientY) {
      const { enableXScroll, enableYScroll } = this

      if (enableXScroll) {
        this.currentXScroll = -clientX
      }

      if (enableYScroll) {
        this.currentYScroll = -clientY
      }

      this.verifyScroll()
    },
    scrollBy(deltaX, deltaY) {
      const { enableXScroll, enableYScroll } = this

      if (enableXScroll) {
        this.currentXScroll -= deltaX
      }

      if (enableYScroll) {
        this.currentYScroll -= deltaY
      }

      this.verifyScroll()
    }
  }
}
</script>
