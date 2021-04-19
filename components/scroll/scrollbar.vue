<template>
  <div :class="className">
    <div
      ref="bar"
      :class="`${prefix}__bar`"
      :style="barStyle"
      @mousedown="handleMouseDown"
    ></div>
  </div>
</template>

<script>
import { config, useConfigurableProps } from '../../src/config/properties'
import { throttle, isDefined } from '../../src/utils/common'

const prefix = config.defaults.prefixCls

const HORIZONTAL = 1
const VERTICAL = 2

const props = useConfigurableProps({
  placement: {
    default: 'right',
    validator(value) {
      return ['top', 'right', 'bottom', 'left'].includes(value)
    }
  },
  scroll: {
    type: Number,
    default: 0,
    validator(value) {
      return value >= 0 && value <= 100
    }
  },
  barLength: {
    type: Number,
    default: 35,
    validator(value) {
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
    type: [String, Object],
    default: null
  },
  duration: {
    type: Number,
    default: null
  }
})

export default {
  name: 'Scrollbar',
  props,
  emits: ['on-scroll', 'on-scroll-start', 'on-scroll-end'],
  data() {
    return {
      prefix: `${prefix}-scrollbar`,
      active: false,
      fadeTimer: null,
      currentScroll: this.scroll,
      scrolling: false
    }
  },
  computed: {
    className() {
      const { prefix, placement, fade, active, scrolling, disabled } = this

      return [
        prefix,
        `${prefix}--${placement}`,
        {
          [`${prefix}--fade`]: !!fade,
          [`${prefix}--scrolling`]: scrolling,
          [`${prefix}--active`]: active,
          [`${prefix}--disabled`]: disabled
        }
      ]
    },
    type() {
      const placement = this.placement

      if (placement === 'right' || placement === 'left') {
        return VERTICAL
      }

      return HORIZONTAL
    },
    barStyle() {
      const { type, barColor, barLength, currentScroll, duration } = this

      const style = {}
      const position = `${((100 - barLength) * currentScroll) / 100}%`
      const length = `${barLength}%`

      if (type === VERTICAL) {
        style.top = position
        style.height = length
      } else {
        style.left = position
        style.width = length
      }

      style.backgroundColor = barColor

      if (isDefined(duration)) {
        style.transitionDuration = `${duration}ms`
      }

      return style
    }
  },
  watch: {
    scroll(value) {
      this.currentScroll = value
    },
    currentScroll() {
      clearTimeout(this.fadeTimer)

      this.active = true

      this.setScrollbarFade()
    }
  },
  created() {
    this.handleWrapperMouseMove = throttle(() => {
      clearTimeout(this.fadeTimer)

      if (this.disabled) {
        this.active = false

        return
      }

      this.active = true

      this.setScrollbarFade()
    })

    this.handleBarMove = throttle(event => {
      if (this.type === VERTICAL) {
        this.position = this.startAt + event.clientY - this.cursorAt
      } else {
        this.position = this.startAt + event.clientX - this.cursorAt
      }

      // position / length * 100 === (100 - barLength) * currentScroll / 100
      this.currentScroll =
        (this.position / this.length / (100 - this.barLength)) * 1e4

      this.verifyScroll()
      this.$emit('on-scroll', this.currentScroll)
    })
  },
  mounted() {
    this.$nextTick(() => {
      const wrapper = this.wrapper

      if (typeof wrapper === 'string' && wrapper.startsWith('#')) {
        this.wrapperElement = document.querySelector(wrapper)
      } else if (wrapper instanceof Node) {
        this.wrapperElement = wrapper
      }

      if (!this.wrapperElement) {
        if (this.$parent) {
          this.wrapperElement = this.$parent.$el
        } else {
          this.wrapperElement = this.$el.parentNode
        }
      }

      if (this.wrapperElement) {
        this.wrapperElement.addEventListener(
          'mousemove',
          this.handleWrapperMouseMove
        )
      }
    })

    if (!this.fade) {
      this.active = true
    }
  },
  beforeDestroy() {
    if (this.wrapperElement) {
      this.wrapperElement.removeEventListener(
        'mousemove',
        this.handleWrapperMouseMove
      )
    }

    this.wrapperElement = null
  },
  methods: {
    handleMouseDown(event) {
      if (event.button !== 0 || this.disabled) {
        return false
      }

      event.stopPropagation()
      event.preventDefault()

      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('mouseup', this.handleMouseUp)

      const rect = this.$el.getBoundingClientRect()
      const barRect = this.$refs.bar.getBoundingClientRect()

      if (this.type === VERTICAL) {
        this.length = rect.height
        this.startAt = barRect.top - rect.top
        this.cursorAt = event.clientY
      } else {
        this.length = rect.width
        this.startAt = barRect.left - rect.left
        this.cursorAt = event.clientX
      }

      clearTimeout(this.fadeTimer)

      this.scrolling = true
      this.$emit('on-scroll-start', this.currentScroll)
    },
    handleMouseMove(event) {
      event.preventDefault()
      event.stopPropagation()

      clearTimeout(this.fadeTimer)

      this.handleBarMove(event)
    },
    handleMouseUp(event) {
      event.preventDefault()

      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handleMouseUp)

      this.setScrollbarFade()

      this.scrolling = false
      this.$emit('on-scroll-end', this.currentScroll)
    },
    verifyScroll() {
      this.currentScroll = Math.max(0, Math.min(this.currentScroll, 100))
    },
    setScrollbarFade() {
      if (this.fade >= 300) {
        this.fadeTimer = window.setTimeout(() => {
          this.active = false
        }, this.fade)
      }
    }
  }
}
</script>
