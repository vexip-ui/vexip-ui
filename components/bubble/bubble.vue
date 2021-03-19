<template>
  <div :class="className" @click="$emit('on-click', $event)">
    <div :class="[`${prefix}__content`, contentClass]" :style="contentStyle">
      <div :class="`${prefix}__arrow`" :style="arrowStyle"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { placementWhileList } from '../../src/mixins/popper'
import { useConfigurableProps } from '../../src/config/properties'

const { prefix } = require('../../src/style/basis/variable')

const props = useConfigurableProps({
  placement: {
    default: 'right',
    validator(value) {
      return placementWhileList.includes(value)
    }
  },
  background: {
    type: String,
    default: ''
  },
  shadow: {
    type: [Boolean, String],
    default: false
  },
  contentClass: {
    type: [String, Array, Object],
    default: null
  }
})

export default {
  name: 'Bubble',
  props,
  emits: ['on-click'],
  data() {
    return {
      prefix: `${prefix}-bubble`
    }
  },
  computed: {
    className() {
      const { prefix, placement, background, shadow } = this

      return [
        prefix,
        `${prefix}--${placement}`,
        {
          [`${prefix}--background`]: background,
          [`${prefix}--shadow`]: shadow
        }
      ]
    },
    contentStyle() {
      const { background, shadow } = this
      const style = {
        backgroundColor: background
      }

      if (typeof shadow === 'string') {
        style.boxShadow = `0 0 4px ${shadow}`
      }

      return style
    },
    arrowStyle() {
      const { background, placement } = this
      const position = placement.split('-').shift()

      return {
        [`border-${position}-color`]: background
      }
    }
  },
  methods: {}
}
</script>
