<template>
  <div :class="className" :style="style">
    <slot></slot>
  </div>
</template>

<script>
import { findComponentUpward } from '../../utils/common'

const { prefix } = require('../../style/basis/variable')

const parentName = 'Tabs'

export default {
  name: 'TabPane',
  props: {
    label: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefix: `${prefix}-tabs`,
      active: false,
      visible: false
    }
  },
  computed: {
    className() {
      const { prefix, active, disabled } = this

      let baseClass = `${prefix}__pane`

      if (disabled) {
        baseClass += '--disabled'
      } else if (active) {
        baseClass += '--active'
      }

      return baseClass
    },
    style() {
      return {
        visibility: this.visible ? 'visible' : 'hidden'
      }
    }
  },
  watch: {
    active(value) {
      if (value) {
        this.visible = true
      } else {
        setTimeout(() => {
          this.visible = false
        }, 300)
      }

      this.$emit('on-change', value)
    }
  },
  mounted() {
    const parentInstance = findComponentUpward(this, parentName)

    if (parentInstance) {
      this.parentInstance = parentInstance
      parentInstance.items.push(this)

      this.active = this.label === parentInstance.currentActive
    }
  },
  beforeDestroy() {
    if (this.parentInstance) {
      const index = this.$parent.items.findIndex(item => item === this)

      if (~index) {
        this.$parent.items.splice(index, 1)
      }
    }
  },
  methods: {
    handleActiveChange(label) {
      this.active = this.label === label
    }
  }
}
</script>
