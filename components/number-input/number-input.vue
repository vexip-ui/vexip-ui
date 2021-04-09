<template>
  <div :class="className">
    <input
      ref="input"
      type="text"
      :class="[`${prefixCls}__control`, inputClass]"
      :value="formattedValue"
      :style="inputStyle"
      :autofocus="autofocus"
      :autocomplete="autocomplete"
      :spellcheck="spellcheck"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      @blur="handleBlur"
      @focus="handleFocus"
      @keyup.enter="handleEnter"
      @keyup="handleKeyUp"
      @keypress="handleKeyPress"
      @keydown="handleKeyDown"
      @input="handleThrottleeChange"
      @change="handleChange"
    />
    <div
      :class="`${prefixCls}__plus`"
      @click="plusNumber"
      @mousedown.prevent
    >
      <Icon name="caret-up" :scale="0.6"></Icon>
    </div>
    <div
      :class="`${prefixCls}__minus`"
      @click="minusNumber"
      @mousedown.prevent
    >
      <Icon name="caret-down" :scale="0.6"></Icon>
    </div>
    <div
      v-if="hasPrefix"
      :class="`${prefixCls}__icon--prefix`"
      :style="{ color: prefixColor }"
      @click="handlePrefixClick"
    >
      <slot name="prefix">
        <Icon :name="prefix"></Icon>
      </slot>
    </div>
    <div
      v-if="hasSuffix"
      :class="`${prefixCls}__icon--suffix`"
      :style="{ color: suffixColor }"
      @click="handleSuffixClick"
    >
      <slot name="suffix">
        <Icon :name="suffix"></Icon>
      </slot>
    </div>
  </div>
</template>

<script>
import Icon from '../icon'
import { useConfigurableProps } from '@/config/properties'
import { throttle, isNull, noop } from '@/utils/common'

import '../../icons/caret-up'
import '../../icons/caret-down'

const { prefix } = require('@/style/basis/variable')

const props = useConfigurableProps({
  size: {
    default: 'default',
    validator(value) {
      return ['small', 'default', 'large'].includes(value)
    }
  },
  state: {
    default: 'default',
    validator(value) {
      return ['default', 'success', 'error', 'warning'].includes(value)
    }
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
  // 格式化后显示
  formatter: {
    type: Function,
    default: null
  },
  // 格式化后读取
  accessor: {
    type: Function,
    default: null
  },
  value: {
    type: [String, Number],
    default: null
  },
  placeholder: {
    type: String,
    default: ''
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  spellcheck: {
    type: Boolean,
    default: false
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  precision: {
    type: Number,
    default: 0
  },
  readonly: {
    type: Boolean,
    default: false
  },
  step: {
    type: Number,
    default: 1
  },
  disabled: {
    type: Boolean,
    default: false
  },
  inputClass: {
    type: [String, Object, Array],
    default: ''
  },
  debounce: {
    type: Boolean,
    default: false
  },
  disableValidate: {
    type: Boolean,
    default: false
  }
})

export default {
  name: 'NumberInput',
  components: {
    Icon
  },
  model: {
    event: 'on-change'
  },
  inject: {
    validateField: { default: () => noop }
  },
  props,
  emits: [
    'on-focus',
    'on-blur',
    'on-input',
    'on-enter',
    'on-prefix-click',
    'on-suffix-click',
    'on-key-down',
    'on-key-press',
    'on-key-up'
  ],
  data() {
    return {
      prefixCls: `${prefix}-number-input`,
      focused: false,
      currentValue: this.value,
      plusDisabled: false,
      minusDisabled: false,
      lastValue: this.value,
      inputting: false
    }
  },
  computed: {
    className() {
      const { prefixCls, focused, disabled, size, state } = this

      return [
        prefixCls,
        {
          [`${prefixCls}--focused`]: focused,
          [`${prefixCls}--disabled`]: disabled,
          [`${prefixCls}--${size}`]: size !== 'default',
          [`${prefixCls}--${state}`]: state !== 'default'
        }
      ]
    },
    hasPrefix() {
      return !!(this.$slots.prefix || this.prefix)
    },
    hasSuffix() {
      return !!(this.$slots.suffix || this.suffix)
    },
    inputStyle() {
      return {
        paddingLeft: this.hasPrefix ? '2em' : '',
        paddingRight: this.hasSuffix ? '2em' : ''
      }
    },
    preciseNumber() {
      const { inputting, currentValue, precision } = this

      return !inputting && typeof currentValue === 'number' && precision > 0
        ? currentValue.toFixed(precision)
        : currentValue
    },
    formattedValue() {
      return typeof this.formatter === 'function'
        ? this.formatter(this.preciseNumber)
        : this.preciseNumber
    }
  },
  watch: {
    value(value) {
      this.currentValue = value
    }
  },
  created() {
    this.handleThrottleeChange = throttle(this.handleChange)
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    blur() {
      this.$refs.input.blur()
    },
    handleFocus(event) {
      this.focused = true
      this.inputting = true
      this.$emit('on-focus', event)
    },
    handleBlur(event) {
      this.focused = false

      setTimeout(() => {
        if (!this.focused) {
          this.inputting = false
          this.$emit('on-blur', event)

          if (this.lastValue !== this.currentValue) {
            this.lastValue = this.currentValue
            this.emitChangeEvent('change')
          }
        }
      }, 120)
    },
    plusNumber() {
      if (this.plusDisabled) {
        return
      }

      this.focus()
      this.changeStep('plus')
    },
    minusNumber() {
      if (this.minusDisabled) {
        return
      }

      if (!this.focused) {
        this.focus()
      }

      this.changeStep('minus')
    },
    changeStep(type) {
      if (this.disabled) {
        return
      }

      let value = this.currentValue

      if (/\.$/.test(value)) {
        value.length--
      }

      value = Number(value)

      if (Number.isNaN(value)) {
        return
      }

      if (type === 'plus') {
        value += this.step
      } else {
        value -= this.step
      }

      this.setValue(value, 'input')
    },
    handleChange(event) {
      const type = event.type

      this.currentValue = event.target.value

      let value = this.currentValue

      if (!/^-?[0-9]*\.?[0-9]*$/.test(value)) {
        value = parseFloat(value)

        if (Number.isNaN(value)) {
          value = null
        }

        event.target.value = value
      }

      this.inputting = type === 'input'

      if (type === 'input') {
        let numberValue = parseFloat(value)

        if (this.accessor) {
          numberValue = this.accessor(numberValue)
        }

        this.$emit('on-input', numberValue, value)
      } else {
        this.setValue(value, type)
      }
    },
    setValue(value, type) {
      if (isNull(value) || value === '') {
        value = null
      } else {
        value = Number(Number(value).toFixed(this.precision))
      }

      this.$nextTick(() => {
        this.currentValue = value
        this.emitChangeEvent(type)
      })
    },
    emitChangeEvent(type) {
      type = type === 'input' ? 'input' : 'change'

      let value = this.currentValue

      if (this.accessor) {
        value = this.accessor(value)
      }

      this.$emit(`on-${type}`, value, this.currentValue)

      if (type === 'change') {
        this.lastValue = this.currentValue

        if (!this.disableValidate) {
          this.validateField()
        }
      }
    },
    handleEnter(event) {
      this.$emit('on-enter', event)
    },
    handlePrefixClick(event) {
      this.$emit('on-prefix-click', event)
    },
    handleSuffixClick(event) {
      this.$emit('on-suffix-click', event)
    },
    handleKeyDown(event) {
      this.$emit('on-key-down', event)
    },
    handleKeyPress(event) {
      this.$emit('on-key-press', event)
    },
    handleKeyUp(event) {
      this.$emit('on-key-up', event)
    }
  }
}
</script>
