<template>
  <Select
    ref="select"
    :class="prefixCls"
    :list-class="`${prefixCls}__list`"
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
      :on-enter="handleEnter"
      :on-clear="handleClear"
    >
      <Input
        slot="control"
        ref="control"
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
        @on-key-down="handleKeyDown"
      ></Input>
    </slot>
    <slot>
      <Option
        v-for="(item, index) in filteredOptions"
        :key="index"
        :label="item.label || item.value"
        :value="item.value"
        :class="{
          [`${prefixCls}__option--hit`]: currentIndex === index
        }"
      ></Option>
    </slot>
  </Select>
</template>

<script>
import Input from '../input'
import Option from '../option'
import Select from '../select'

import { placementWhileList } from '@/mixins/popper'
import { config, useConfigurableProps } from '@/config/properties'
import { isNull, noop } from '@/utils/common'

const prefix = config.defaults.prefixCls

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
  },
  ignoreCase: {
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
  emits: ['on-select', 'on-input', 'on-change', 'on-toggle', 'on-enter', 'on-clear'],
  data() {
    return {
      prefixCls: `${prefix}-auto-complete`,
      currentValue: this.value,
      changed: false,
      hasUsedSelect: false,
      lastValue: this.value,
      currentIndex: -1
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
        if (this.ignoreCase) {
          return rawOptions.filter(({ value }) => value && value.toString().toLocaleLowerCase().includes(currentValue && currentValue.toString().toLocaleLowerCase()))
        }

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

      this.$refs.select.currentVisible = false

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

      if (this.currentIndex !== -1) {
        this.currentIndex = 0
      }

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

      this.$refs.select.currentVisible = false
      this.$refs.control?.blur()
    },
    handleToggle() {
      this.testOptionCanDrop()

      const visible = this.$refs.select.currentVisible

      this.$emit('on-toggle', visible)

      if (!visible) {
        this.currentIndex = -1
      }
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
      event.stopPropagation()

      if (!this.canDrop) return

      const select = this.$refs.select

      select.$refs.popper.style.minWidth = `${select.$el.offsetWidth}px`
      this.$refs.select.currentVisible = true
      this.$refs.control?.focus()
    },
    handleKeyDown({ keyCode }) {
      this.currentIndex += keyCode === 40 ? 1 : keyCode === 38 ? -1 : 0
      this.currentIndex = Math.min(Math.max(-1, this.currentIndex), this.filteredOptions.length)
    },
    handleEnter() {
      const { filteredOptions, currentIndex } = this

      if (filteredOptions.length && currentIndex) {
        this.handleSelect(filteredOptions[currentIndex === -1 ? 0 : currentIndex].value)
      } else {
        this.handleChange()
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
