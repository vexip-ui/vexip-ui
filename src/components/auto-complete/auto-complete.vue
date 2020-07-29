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
    <Input
      slot="control"
      v-model="currentValue"
      :prefix="prefix"
      :prefix-color="prefixColor"
      :suffix="prefix"
      :suffix-color="prefixColor"
      :placeholder="placeholder"
      :disabled="disabled"
      :size="size"
      @click.native="handleInputClick"
      @on-input="handleInput"
      @on-blur="handleChange"
    ></Input>
    <slot>
      <template v-for="(item, index) in filteredOptions">
        <Option
          v-if="isObject(item)"
          :key="index"
          :label="item.label || item.value"
          :value="item.value"
        ></Option>
        <Option
          v-else
          :key="index"
          :label="item"
          :value="item"
        ></Option>
      </template>
    </slot>
  </Select>
</template>

<script>
import Input from '../input'
import Option from '../option'
import Select from '../select'

import { placementWhileList } from '../../mixins/popper'
import formControl from '../../mixins/form-control'
import { isNull } from '../../utils/common'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'AutoComplete',
  components: {
    Input,
    Option,
    Select
  },
  mixins: [formControl],
  model: {
    event: 'on-change'
  },
  props: {
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
    filter: {
      type: Function,
      default: null
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
    transitionName: {
      type: String,
      default: `${prefix}-drop`
    },
    canDrop: {
      type: Boolean,
      default: true
    },
    transfer: {
      type: Boolean,
      default: false
    },
    placement: {
      default: 'bottom',
      validator(value) {
        return placementWhileList.includes(value)
      }
    }
  },
  data() {
    return {
      prefixCls: `${prefix}-auto-complete`,
      currentValue: this.value,
      changed: false,
      hasUsedSelect: false
    }
  },
  computed: {
    filteredOptions() {
      const { options, filter, currentValue } = this

      if (typeof filter === 'function') {
        return options.filter(item => filter(item, currentValue))
      }

      return options || []
    }
  },
  watch: {
    value(value) {
      this.currentValue = value
    }
  },
  updated() {
    this.testOptionCanDrop()
  },
  methods: {
    isObject(value) {
      return typeof value === 'object'
    },
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
      this.changed = true
      this.$emit('on-input', value)
    },
    handleChange() {
      if (!this.changed) return

      this.changed = false
      this.$emit('on-change', this.currentValue)
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
    }
  }
}
</script>
