<template>
  <div :class="className" :style="itemStyle">
    <div
      :class="`${prefix}__signal`"
      :style="signalStyle"
      @click="handleSignalClick"
    >
      <slot name="signal">
        <div :class="`${prefix}__pointer`" :style="pointerStyle"></div>
      </slot>
    </div>
    <div :class="`${prefix}__line`" :style="lineStyle"></div>
    <div ref="content" :class="`${prefix}__content`">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { config, useConfigurableProps } from '@/config/properties'
import { findComponentUpward, removeArrayItem } from '@/utils/common'

const prefix = config.defaults.prefixCls
const parentName = 'Timeline'

const props = useConfigurableProps({
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
  },
  dashed: {
    type: Boolean,
    default: null
  },
  lineColor: {
    type: String,
    default: null
  },
  spacing: {
    type: [Number, String],
    default: null
  }
})

export default {
  name: 'TimelineItem',
  props,
  emits: ['on-signal-click'],
  data() {
    return {
      prefix: `${prefix}-timeline`,
      parentInstance: null
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
    itemStyle() {
      const { parentInstance } = this
      const spacing = this.spacing ?? parentInstance?.spacing

      return {
        paddingBottom: typeof spacing === 'number' ? `${spacing}px` : spacing
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
    },
    lineStyle() {
      const { dashed, lineColor, parentInstance } = this
      const isDashed = dashed ?? parentInstance?.dashed ?? false
      const color = lineColor ?? parentInstance?.lineColor

      return {
        borderLeftStyle: isDashed ? 'dashed' : null,
        borderLeftColor: color
      }
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
