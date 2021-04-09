<template>
  <label :class="className">
    <span :class="`${prefix}__signal`"></span>
    <span :class="[`${prefix}__label`, labelClass]">
      <slot>{{ label }}</slot>
    </span>
    <input
      type="radio"
      :class="`${prefix}__input`"
      :checked="currentValue === label"
      :disabled="isDisabled"
      @change="handleChange"
    />
  </label>
</template>

<script>
import { useConfigurableProps } from '@/config/properties'
import { findComponentUpward, removeArrayItem, noop } from '@/utils/common'

const { prefix } = require('@/style/basis/variable')

const groupName = 'RadioGroup'

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
  label: {
    type: [String, Number],
    required: true
  },
  labelClass: {
    type: [String, Array, Object],
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  border: {
    type: Boolean,
    default: false
  },
  disableValidate: {
    type: Boolean,
    default: false
  }
})

export default {
  name: 'Radio',
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
      prefix: `${prefix}-radio`,
      currentValue: this.value,
      groupInstance: null
    }
  },
  computed: {
    className() {
      const { prefix, currentValue, label, disabled, size, border } = this

      return [
        prefix,
        {
          [`${prefix}--checked`]: currentValue === label,
          [`${prefix}--disabled`]: disabled,
          [`${prefix}--${size}`]: size !== 'default',
          [`${prefix}--border`]: border
        }
      ]
    },
    isDisabled() {
      if (this.groupInstance) {
        return this.groupInstance.disabled || this.disabled
      }

      return this.disabled
    }
  },
  watch: {
    value(value) {
      this.currentValue = value
    },
    currentValue(value) {
      this.$emit('on-change', value)

      if (this.groupInstance && value === this.label) {
        this.groupInstance.currentValue = value
      }

      if (!this.groupInstance?.isFormControl && !this.disableValidate) {
        this.validateField()
      }
    }
  },
  created() {
    const groupInstance = findComponentUpward(this, groupName)

    if (groupInstance) {
      this.groupInstance = groupInstance
      groupInstance.items.push(this)
    }
  },
  beforeDestroy() {
    if (this.groupInstance) {
      removeArrayItem(this.groupInstance.items, this)
    }
  },
  methods: {
    handleChange() {
      this.currentValue = this.label
    }
  }
}
</script>
