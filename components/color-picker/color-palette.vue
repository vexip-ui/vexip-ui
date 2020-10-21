<template>
  <div
    :class="`${prefix}__palette`"
    :style="{
      backgroundColor: `hsl(${hue}, 100%, 50%)`
    }"
    @mousedown="handleMouseDown"
  >
    <div :class="`${prefix}__saturation`"></div>
    <div :class="`${prefix}__value`"></div>
    <div
      :class="`${prefix}__palette-handler`"
      :style="{
        top: `${top * 100}%`,
        left: `${left * 100}%`
      }"
    >
      <div :class="`${prefix}__palette-pointer`"></div>
    </div>
  </div>
</template>

<script>
import { multipleFixed } from '../../src/utils/common'

const { prefix } = require('../../src/style/basis/variable')

const fixed = number => multipleFixed(number, 1, 3)

export default {
  name: 'ColorPalette',
  props: {
    hue: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0 && value <= 360
      }
    },
    saturation: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      prefix: `${prefix}-color-picker`,
      top: 1 - this.value,
      left: this.saturation,
      topStartAt: 0,
      leftStartAt: 0,
      cursorXPosition: 0,
      cursorYPosition: 0,
      widthLimit: 0,
      heightLimit: 0
    }
  },
  watch: {
    saturation(value) {
      this.left = value
      this.verifyPosition()
    },
    value(value) {
      this.top = 1 - value
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
      const { top, left, width, height } = rect
      const { clientX, clientY } = event

      this.widthLimit = width
      this.heightLimit = height

      const oldTop = fixed(this.top)
      const oldLeft = fixed(this.left)

      this.top = (this.topStartAt = clientY - top) / height
      this.left = (this.leftStartAt = clientX - left) / width

      this.cursorXPosition = clientX
      this.cursorYPosition = clientY

      this.verifyPosition()

      if (this.top !== oldTop || this.left !== oldLeft) {
        this.handleChange()
      }

      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('mouseup', this.handleMouseUp)

      this.$emit('on-edit-start')
    },
    handleMouseMove(event) {
      event.preventDefault()
      event.stopPropagation()

      const { clientX, clientY } = event

      this.top =
        (this.topStartAt + clientY - this.cursorYPosition) / this.heightLimit
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
      this.top = fixed(Math.max(0, Math.min(this.top, 1)))
      this.left = fixed(Math.max(0, Math.min(this.left, 1)))
    },
    handleChange() {
      this.$emit('on-change', {
        h: this.hue,
        s: this.left,
        v: fixed(1 - this.top)
      })
    }
  }
}
</script>
