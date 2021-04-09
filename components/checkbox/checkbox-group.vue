<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script>
import { useConfigurableProps } from '@/config/properties.ts'
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
    type: Array,
    default() {
      return []
    }
  },
  vertical: {
    type: Boolean,
    default: false
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
  name: 'CheckboxGroup',
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
      prefix: `${prefix}-checkbox-group`,
      items: [],
      currentValue: this.value,
      labels: {},
      valueMaps: {},
      isFormControl: true,
      control: null
    }
  },
  computed: {
    className() {
      const { prefix, vertical, disabled, size, border } = this

      return [
        prefix,
        {
          [`${prefix}--vertical`]: vertical,
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
      this.updateItemValue(value)
    },
    currentValue(value) {
      this.$emit('on-change', value)

      if (this.control && typeof this.control.updatePartial === 'function') {
        this.control.updatePartial(value)
      }

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
    updateItemValue(value) {
      this.items.forEach(item => {
        item.currentChecked = value.includes(item.currentValue)
      })
    },
    updateValue() {
      const labels = Object.keys(this.labels)

      this.currentValue = []

      for (let i = 0, len = labels.length; i < len; i++) {
        const label = labels[i]

        if (this.labels[label]) {
          this.currentValue.push(this.valueMaps[label])
        }
      }
    },
    handleGlobelChange() {
      // 在 group 层进行更新, 未选满则全选, 反之全不选
      if (this.currentValue.length === this.items.length) {
        this.updateItemValue([])

        return false
      } else {
        this.updateItemValue(Object.keys(this.labels))

        return true
      }
    }
  }
}
</script>
