<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script>
const { prefix } = require('../../style/basis/variable')

export default {
  name: 'Timeline',
  props: {
    pending: {
      type: Boolean,
      default: false
    },
    bothSides: {
      type: Boolean,
      default: false
    }
  },
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
