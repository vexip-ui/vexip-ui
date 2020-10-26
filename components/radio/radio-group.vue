<template>
  <div :class="className">
    <slot>
      <template v-for="(item, index) in options">
        <Radio
          v-if="isObject(item)"
          :key="index"
          :label="item.value"
        >
          {{ item.label || item.value }}
        </Radio>
        <Radio
          v-else
          :key="index"
          :label="item"
        >
          {{ item }}
        </Radio>
      </template>
    </slot>
  </div>
</template>

<script>
import Radio from './radio'
import formControl from '../../src/mixins/form-control'
import { size } from '../../src/config/properties'

const { prefix } = require('../../src/style/basis/variable')

export default {
  name: 'RadioGroup',
  components: {
    Radio
  },
  mixins: [formControl],
  model: {
    event: 'on-change'
  },
  props: {
    size,
    value: {
      type: [String, Number],
      default: null
    },
    vertical: {
      type: Boolean,
      default: false
    },
    // size: {
    //   default() {
    //     return config.radioGroup.size ?? 'default'
    //   },
    //   validator(value) {
    //     return ['small', 'default', 'large'].includes(value)
    //   }
    // },
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
    },
    options: {
      type: Array,
      default() {
        return []
      }
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
    isObject(value) {
      return typeof value === 'object'
    },
    updateItemValue(value) {
      this.items.forEach(item => {
        item.currentValue = value
      })
    }
  }
}
</script>
