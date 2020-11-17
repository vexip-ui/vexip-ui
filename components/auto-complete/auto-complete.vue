<template>
  <Select
    ref="select"
    :class="prefixCls"
    :value="currentValue"
    :size="size"
    :transition-name="transitionName"
    :disabled="disabled"
    :transfer="transfer"
    :placement="placement"
    @on-toggle="handleToggle"
    @on-select="handleSelect"
  >
    <slot
      name="control"
      :value="currentValue"
      :on-click="handleInputClick"
      :on-input="handleInput"
      :on-change="handleChange"
    >
      <Input
        slot="control"
        :value="inputValue"
        :prefix="prefix"
        :prefix-color="prefixColor"
        :suffix="suffix"
        :suffix-color="suffixColor"
        :placeholder="placeholder"
        :disabled="disabled"
        :size="size"
        :state="state"
        :clearable="clearable"
        @click.native="handleInputClick"
        @on-input="handleInput"
        @on-blur="handleChange"
        @on-enter="handleEnter"
        @on-clear="handleClear"
      ></Input>
    </slot>
    <slot>
      <Option
        v-for="(item, index) in filteredOptions"
        :key="index"
        :label="item.label || item.value"
        :value="item.value"
      ></Option>
    </slot>
  </Select>
</template>

<script>
import Input from '../input'
import Option from '../option'
import Select from '../select'

import { placementWhileList } from '../../src/mixins/popper'
import { useConfigurableProps } from '../../src/config/properties'
import { isNull, noop } from '../../src/utils/common'

const { prefix } = require('../../src/style/basis/variable')

const props = useConfigurableProps({
  size: {
    default: 'default',
    validator(value) {
      return ['small', 'default', 'large'].includes(value)
    }
  },
  transfer: {
    type: [Boolean, String],
    default: false
  },
  value: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    default() {
      return []
    }
  },
  state: {
    default: 'default',
    validator(value) {
      return ['default', 'success', 'error', 'warning'].includes(value)
    }
  },
  filter: {
    type: [Boolean, Function],
    default: false
  },
  prefix: {
    type: String,
    default: ''
  },
  prefixColor: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  suffixColor: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  transitionName: {
    type: String,
    default: `${prefix}-drop`
  },
  canDrop: {
    type: Boolean,
    default: true
  },
  placement: {
    default: 'bottom',
    validator(value) {
      return placementWhileList.includes(value)
    }
  },
  disableValidate: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  }
})

export default {
  name: 'AutoComplete',
  components: {
    Input,
    Option,
    Select
  },
  model: {
    event: 'on-change'
  },
  inject: {
    validateField: { default: () => noop }
  },
  props,
  emits: ['on-select', 'on-input', 'on-change', 'on-toggle'],
  data() {
    return {
      prefixCls: `${prefix}-auto-complete`,
      currentValue: this.value,
      changed: false,
      hasUsedSelect: false,
      lastValue: this.value
    }
  },
  computed: {
    rawOptions() {
      return this.options.map(item => {
        if (typeof item === 'string') {
          item = { value: item }
        }

        if (!item.label) {
          item.label = item.value
        }

        item.value = item.value.toString()

        return item
      })
    },
    filteredOptions() {
      const { rawOptions, filter, currentValue } = this

      if (filter === true) {
        return rawOptions.filter(({ value }) => value && value.toString().includes(currentValue))
      } else if (typeof filter === 'function') {
        return rawOptions.filter(item => filter(item, currentValue))
      }

      return rawOptions || []
    },
    inputValue() {
      if (this.$refs.select) {
        if (this.$refs.select.currentVisible) {
          return this.currentValue
        }

        const currentOption = this.rawOptions.find(({ value }) => value === this.currentValue)

        return currentOption ? currentOption.label : this.currentValue
      }

      return this.currentValue
    }
  },
  watch: {
    value(value) {
      this.currentValue = value
      this.lastValue = value
    }
  },
  updated() {
    this.testOptionCanDrop()
  },
  methods: {
    handleSelect(value) {
      if (isNull(value)) {
        return
      }

      const old = this.currentValue

      this.currentValue = value
      this.hasUsedSelect = true
      this.$emit('on-select', value)

      if (value !== old) {
        this.changed = true
        this.handleChange(value)
      }
    },
    handleInput(value) {
      this.hasUsedSelect = false
      this.$refs.select.handleToggelVisible(this.canDrop)
      this.currentValue = value
      this.changed = true
      this.$emit('on-input', value)
    },
    handleChange() {
      if (!this.changed || this.currentValue === this.lastValue) return

      this.changed = false
      this.lastValue = this.currentValue
      this.$emit('on-change', this.currentValue)

      if (!this.disableValidate) {
        this.validateField()
      }
    },
    handleToggle() {
      this.testOptionCanDrop()
      this.$emit('on-toggle', this.$refs.select.currentVisible)
    },
    testOptionCanDrop() {
      if (
        (!this.$slots.default && !this.filteredOptions.length) ||
        !this.canDrop
      ) {
        this.$refs.select.handleToggelVisible(false)
      }
    },
    handleInputClick(event) {
      if (!this.canDrop) {
        event.stopPropagation()
      }
    },
    handleEnter() {
      if (this.filteredOptions.length) {
        this.handleSelect(this.filteredOptions[0].value)
      }

      this.$emit('on-enter', this.currentValue)
    },
    handleClear() {
      if (this.clearable) {
        this.currentValue = ''
        this.$refs.select.handleToggelVisible(false)

        this.$emit('on-clear')
      }
    }
  }
}
</script>
