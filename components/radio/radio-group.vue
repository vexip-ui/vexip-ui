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
import { useConfigurableProps } from '@/config/properties'
import { noop } from '@/utils/common'

const { prefix } = require('@/style/basis/variable')

const props = useConfigurableProps({
  size: {
    default: 'default',
    validator(value) {
      return ['small', 'default', 'large'].includes(value)
    }
  },
  value: {
    type: [String, Number],
    default: null
  },
  vertical: {
    type: Boolean,
    default: false
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
  },
  options: {
    type: Array,
    default() {
      return []
    }
  },
  disableValidate: {
    type: Boolean,
    default: false
  }
})

export default {
  name: 'RadioGroup',
  components: {
    Radio
  },
  model: {
    event: 'on-change'
  },
  inject: {
    validateField: { default: () => noop }
  },
  props,
  emits: ['on-change', 'update:value'],
  data() {
    return {
      prefix: `${prefix}-radio-group`,
      items: [],
      currentValue: this.value,
      isFormControl: true
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

      if (!this.disableValidate) {
        this.validateField()
      }
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
