<template>
  <div :class="className">
    <div
      :class="`${prefix}__signal`"
      :style="signalStyle"
      @click="handleSignalClick"
    >
      <slot name="signal">
        <div :class="`${prefix}__pointer`" :style="pointerStyle"></div>
      </slot>
    </div>
    <div :class="`${prefix}__line`"></div>
    <div ref="content" :class="`${prefix}__content`">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { findComponentUpward, removeArrayItem } from '../../utils/common'

const { prefix } = require('../../style/basis/variable')
const parentName = 'Timeline'

export default {
  name: 'TimelineItem',
  props: {
    type: {
      default: 'normal',
      validator(value) {
        return [
          'normal',
          'success',
          'error',
          'warning',
          'disabled',
          'custom'
        ].includes(value)
      }
    },
    color: {
      type: String,
      default: ''
    },
    label: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    return {
      prefix: `${prefix}-timeline`
    }
  },
  computed: {
    className() {
      const { prefix, type } = this

      return {
        [`${prefix}__item`]: true,
        [`${prefix}__item--${type}`]: type !== 'custom'
      }
    },
    bindSignalClick() {
      return !!(
        this._events['on-signal-click'] &&
        this._events['on-signal-click'].length
      )
    },
    signalStyle() {
      const { type, color, bindSignalClick } = this
      const style = {
        cursor: bindSignalClick ? 'pointer' : null
      }

      if (type === 'custom') {
        style.color = color
      }

      return style
    },
    pointerStyle() {
      const { type, color } = this

      if (type === 'custom') {
        return {
          color,
          borderColor: color
        }
      }

      return {}
    }
  },
  created() {
    const parentInstance = findComponentUpward(this, parentName)

    if (parentInstance) {
      this.parentInstance = parentInstance
      parentInstance.items.push(this)
    }
  },
  beforeDestroy() {
    if (this.parentInstance) {
      removeArrayItem(this.parentInstance.items, this)
    }
  },
  methods: {
    handleSignalClick() {
      if (this.parentInstance) {
        this.parentInstance.handleSignalClick(this.label)
      }

      this.$emit('on-signal-click', this.label)
    }
  }
}
</script>
