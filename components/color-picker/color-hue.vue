<template>
  <div :class="`${prefix}__hue`" @mousedown="handleMouseDown">
    <div
      :class="`${prefix}__hue-handler`"
      :style="{ left: `${left * 100}%` }"
    ></div>
  </div>
</template>

<script>
import { multipleFixed } from '@/utils/common'
import { config } from '@/config/properties'

const prefix = config.defaults.prefixCls

const fixed = number => multipleFixed(number, 1, 3)

export default {
  name: 'ColorHue',
  props: {
    hue: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0 && value <= 360
      }
    }
  },
  emits: ['on-edit-start', 'on-edit-end', 'on-change'],
  data() {
    return {
      prefix: `${prefix}-color-picker`,
      left: this.hue / 360,
      oldLeft: 0,
      leftStartAt: 0,
      cursorXPosition: 0,
      widthLimit: 0
    }
  },
  watch: {
    hue(value) {
      this.left = value / 360
      this.verifyPosition()
    }
  },
  mounted() {
    this.verifyPosition()
  },
  methods: {
    handleMouseDown(event) {
      if (event.button !== 0) {
        return false
      }

      event.stopPropagation()

      const rect = this.$el.getBoundingClientRect()
      const { left, width } = rect
      const { clientX } = event

      this.widthLimit = width

      this.oldLeft = fixed(this.left)

      this.left = (this.leftStartAt = clientX - left) / width
      this.cursorXPosition = clientX

      this.verifyPosition()

      if (this.left !== this.oldLeft) {
        this.oldLeft = this.left
        this.handleChange()
      }

      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('mouseup', this.handleMouseUp)

      this.$emit('on-edit-start')
    },
    handleMouseMove(event) {
      event.preventDefault()
      event.stopPropagation()

      const { clientX } = event

      this.left =
        (this.leftStartAt + clientX - this.cursorXPosition) / this.widthLimit

      this.verifyPosition()
      this.handleChange()
    },
    handleMouseUp(event) {
      event.stopPropagation()

      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handleMouseUp)

      this.$emit('on-edit-end')
    },
    verifyPosition() {
      this.left = fixed(Math.max(0, Math.min(this.left, 1)))
    },
    handleChange() {
      this.$emit('on-change', multipleFixed(this.left, 360, 1))
    }
  }
}
</script>
