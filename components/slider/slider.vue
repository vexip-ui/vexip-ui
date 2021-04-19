<template>
  <div :class="className" @mousedown="handleTrackDown">
    <div ref="track" :class="`${prefix}__track`">
      <div :class="`${prefix}__filler`" :style="fillerStyle"></div>
    </div>
    <div
      :class="`${prefix}__trigger`"
      :style="handlerStyle"
      @mousedown="handleMoveStart"
    >
      <Tooltip
        ref="tooltip"
        tabindex="0"
        theme="dark"
        trigger="custom"
        :transfer="tipTransfer"
        :visible="isTipShow || sliding"
        :tip-class="`${prefix}__tip`"
        :disabled="hideTip"
        :placement="vertical ? 'right' : 'top'"
        @on-tip-enter="showTooltip"
        @on-tip-leave="hideTooltip"
      >
        <div
          :class="`${prefix}__handler`"
          @mouseenter="showTooltip"
          @mouseleave="hideTooltip"
        ></div>
        <template #tip>
          <slot name="tip" :value="truthValue">
            {{ truthValue }}
          </slot>
        </template>
      </Tooltip>
    </div>
  </div>
</template>

<script>
import Tooltip from '../tooltip'
import { config, useConfigurableProps } from '../../src/config/properties'
import { throttle } from '../../src/utils/common'

const prefix = config.defaults.prefixCls

const props = useConfigurableProps({
  value: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1,
    validator(value) {
      return Math.ceil(value) === value
    }
  },
  vertical: {
    type: Boolean,
    default: false
  },
  hideTip: {
    type: Boolean,
    default: false
  },
  tipTransfer: {
    type: Boolean,
    default: false
  }
})

export default {
  name: 'Slider',
  components: {
    Tooltip
  },
  model: {
    event: 'on-change'
  },
  props,
  emits: ['on-change', 'on-input', 'on-change'],
  data() {
    return {
      prefix: `${prefix}-slider`,
      currentValue: this.value / this.step,
      sliding: false,
      slidingState: {},
      isTipShow: false,
      hoverTimer: null
    }
  },
  computed: {
    className() {
      const { prefix, vertical, sliding } = this

      return {
        [prefix]: true,
        [`${prefix}--vertical`]: vertical,
        [`${prefix}--sliding`]: sliding
      }
    },
    truthMin() {
      return Math.round(Math.min(this.min, this.max) / this.step)
    },
    truthMax() {
      return Math.round(Math.max(this.min, this.max) / this.step)
    },
    truthValue() {
      return this.currentValue * this.step
    },
    total() {
      return this.truthMax - this.truthMin || 1
    },
    percent() {
      return ((this.currentValue - this.truthMin) / this.total) * 100
    },
    fillerStyle() {
      const { percent, vertical } = this

      return {
        top: vertical ? '0' : '50%',
        left: vertical ? '50%' : '0',
        [vertical ? 'height' : 'width']: `${percent}%`
      }
    },
    handlerStyle() {
      const { percent, vertical } = this

      return {
        top: vertical ? `${percent}%` : '50%',
        left: vertical ? '50%' : `${percent}%`
      }
    }
  },
  watch: {
    value(value) {
      this.currentValue = value / this.step
      this.verifyValue()
    }
  },
  created() {
    this.throttleHandleMove = throttle(this.handleMove)
  },
  mounted() {
    this.verifyValue()
  },
  methods: {
    verifyValue() {
      const { currentValue, truthMin, truthMax } = this

      this.currentValue = Math.max(
        truthMin,
        Math.min(truthMax, Math.round(currentValue))
      )
    },
    handleTrackDown(event) {
      const { vertical, total, truthMin } = this
      const client = vertical ? event.clientY : event.clientX
      const trackRect = this.$refs.track.getBoundingClientRect()

      this.currentValue =
        ((client - trackRect[vertical ? 'top' : 'left']) / trackRect[vertical ? 'height' : 'width']) * total +
        truthMin
      this.verifyValue()

      this.$emit('on-change', this.truthValue)
    },
    handleMoveStart(event) {
      event.stopPropagation()
      event.preventDefault()

      const trackRect = this.$refs.track.getBoundingClientRect()

      this.slidingState.trackRect = trackRect
      this.sliding = true

      document.addEventListener('mousemove', this.throttleHandleMove)
      document.addEventListener('mouseup', this.handleMoveEnd)
    },
    handleMove(event) {
      event.preventDefault()

      const { vertical, total, truthMin } = this
      const client = vertical ? event.clientY : event.clientX
      const trackRect = this.slidingState.trackRect

      this.currentValue =
        ((client - trackRect[vertical ? 'top' : 'left']) / trackRect[vertical ? 'height' : 'width']) * total +
        truthMin
      this.verifyValue()

      if (this.$refs.tooltip) {
        this.$refs.tooltip.updatePopper()
      }

      this.$emit('on-input', this.truthValue)
    },
    handleMoveEnd() {
      this.sliding = false

      this.$emit('on-change', this.truthValue)

      document.removeEventListener('mousemove', this.throttleHandleMove)
      document.removeEventListener('mouseup', this.handleMoveEnd)
    },
    showTooltip() {
      clearTimeout(this.hoverTimer)

      this.hoverTimer = window.setTimeout(() => {
        this.isTipShow = true
      }, 250)
    },
    hideTooltip() {
      clearTimeout(this.hoverTimer)

      this.hoverTimer = window.setTimeout(() => {
        this.isTipShow = false
      }, 250)
    }
  }
}
</script>
