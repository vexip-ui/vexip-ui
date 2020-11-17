<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script>
import { useConfigurableProps } from '../../src/config/properties'

const { prefix } = require('../../src/style/basis/variable')

const props = useConfigurableProps({
  pending: {
    type: Boolean,
    default: false
  },
  bothSides: {
    type: Boolean,
    default: false
  }
})

export default {
  name: 'Timeline',
  props,
  emits: ['on-signal-click'],
  data() {
    return {
      prefix: `${prefix}-timeline`,
      items: []
    }
  },
  computed: {
    className() {
      const { prefix, pending, bothSides, bindSignalClick } = this

      return {
        [prefix]: true,
        [`${prefix}--pending`]: pending,
        [`${prefix}--both-sides`]: bothSides,
        [`${prefix}--signal-click`]: bindSignalClick
      }
    },
    bindSignalClick() {
      return !!(
        this._events['on-signal-click'] &&
        this._events['on-signal-click'].length
      )
    }
  },
  methods: {
    handleSignalClick(label) {
      this.$emit('on-signal-click', label)
    }
  }
}
</script>
