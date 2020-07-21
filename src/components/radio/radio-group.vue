<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script>
import formControl from '../../mixins/form-control'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'RadioGroup',
  mixins: [formControl],
  model: {
    event: 'on-change'
  },
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    vertical: {
      type: Boolean,
      default: false
    },
    size: {
      default: 'default',
      validator(value) {
        return ['small', 'default', 'large'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    button: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: `${prefix}-radio-group`,
      items: [],
      currentValue: this.value
    }
  },
  computed: {
    className() {
      const { prefix, vertical, button, disabled, size, border } = this

      return [
        prefix,
        {
          [`${prefix}--vertical`]: vertical,
          [`${prefix}--button`]: !vertical && button,
          [`${prefix}--disabled`]: disabled,
          [`${prefix}--${size}`]: size !== 'default',
          [`${prefix}--border`]: border
        }
      ]
    }
  },
  watch: {
    value(value) {
      this.currentValue = value
    },
    currentValue(value) {
      this.updateItemValue(value)
      this.$emit('on-change', value)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.updateItemValue(this.currentValue)
    })
  },
  methods: {
    updateItemValue(value) {
      this.items.forEach(item => {
        item.currentValue = value
      })
    }
  }
}
</script>
