<template>
  <div :class="className">
    <input
      ref="input"
      :class="[`${prefixCls}__control`, inputClass]"
      :type="inputType"
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
    <template v-if="type === 'number'">
      <div
        :class="`${prefixCls}__number-plus`"
        @click="plusNumber"
        @mousedown.prevent
      >
        <Icon name="caret-up" :scale="0.6"></Icon>
      </div>
      <div
        :class="`${prefixCls}__number-minus`"
        @click="minusNumber"
        @mousedown.prevent
      >
        <Icon name="caret-down" :scale="0.6"></Icon>
      </div>
    </template>
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
    <div
      v-else-if="type === 'password'"
      :class="`${prefixCls}__icon--password`"
      @click="toggleShowPassword"
    >
      <Icon :name="passwordIcon"></Icon>
    </div>
    <div
      v-if="maxLength"
      :class="`${prefixCls}__count`"
      :style="countStyle"
    >
      {{ `${currentLength}/${maxLength}` }}
    </div>
  </div>
</template>

<script>
import Icon from '../icon'
import formControl from '../../mixins/form-control'
import { throttle, isNull } from '../../utils/common'
import 'vue-awesome/icons/caret-up'
import 'vue-awesome/icons/caret-down'
import 'vue-awesome/icons/regular/eye-slash'
import 'vue-awesome/icons/regular/eye'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'Input',
  components: {
    Icon
  },
  mixins: [formControl],
  model: {
    event: 'on-change'
  },
  props: {
    type: {
      default: 'text',
      validator(value) {
        return [
          'text',
          'number',
          'password',
          'date',
          'datetime',
          'time'
        ].includes(value)
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
    formatter: {
      type: Function,
      default: null
    },
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
    size: {
      default: 'default',
      validator(value) {
        return ['small', 'default', 'large'].includes(value)
      }
    },
    debounce: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      prefixCls: `${prefix}-input`,
      focused: false,
      currentValue: this.value,
      plusDisabled: false,
      minusDisabled: false,
      showPassword: false,
      lastValue: this.value,
      inputting: false,
      currentLength: this.value ? this.value.length : 0
    }
  },
  computed: {
    className() {
      const { prefixCls, type, focused, disabled, size, state } = this

      return [
        prefixCls,
        `${prefixCls}--${type}`,
        {
          [`${prefixCls}--focused`]: focused,
          [`${prefixCls}--disabled`]: disabled,
          [`${prefixCls}--${size}`]: size !== 'default',
          [`${prefixCls}--${state}`]: state !== 'default'
        }
      ]
    },
    hasPrefix() {
      return !!this.$slots.prefix || !!this.prefix
    },
    hasSuffix() {
      return !!this.$slots.suffix || !!this.suffix
    },
    inputStyle() {
      return {
        paddingLeft: this.hasPrefix ? '2em' : '',
        paddingRight: this.hasSuffix || this.type === 'password' ? '2em' : ''
      }
    },
    inputType() {
      const { type, showPassword } = this

      if (type === 'password') {
        return showPassword ? 'text' : 'password'
      }

      if (type === 'datetime') {
        return 'datetime-local'
      }

      return type !== 'number' ? type : 'text'
    },
    preciseNumber() {
      const { type, inputting, currentValue, precision } = this

      return type === 'number' &&
        !inputting &&
        typeof currentValue === 'number' &&
        precision > 0
        ? currentValue.toFixed(precision)
        : currentValue
    },
    formattedValue() {
      return this.formatter
        ? this.formatter(this.preciseNumber)
        : this.preciseNumber
    },
    passwordIcon() {
      return this.showPassword ? 'regular/eye-slash' : 'regular/eye'
    },
    countStyle() {
      const { type, hasSuffix } = this

      let fix = 0

      if (type === 'number') {
        fix += 1.4
      }

      if (hasSuffix) {
        fix += 2
      }

      if (fix) {
        return { right: `calc(${fix}em + 7px)` }
      }

      return {}
    }
  },
  watch: {
    value(value) {
      this.currentValue = value
    }
  },
  created() {
    this.handleThrottleeChange = throttle(this.handleChange)

    this.$on('on-change', () => {
      this.lastValue = this.currentValue
    })
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

      this.setNumberValue(value, 'input')
    },
    limitValueLength() {
      let value = this.currentValue

      if (isNull(value)) {
        this.currentLength = 0

        return
      }

      if (typeof value !== 'string') {
        value = String(value)
      }

      if (this.maxLength && value.length > this.maxLength) {
        value = value.slice(0, this.maxLength)
      }

      this.currentLength = value.length
      this.currentValue = value
    },
    handleChange(event) {
      const type = event.type

      this.currentValue = event.target.value
      this.limitValueLength()

      event.target.value = this.currentValue

      let value = this.currentValue

      if (this.type === 'number' && !/^-?[0-9]*\.?[0-9]*$/.test(value)) {
        value = parseFloat(value)

        if (Number.isNaN(value)) {
          value = null
        }

        event.target.value = value
      }

      this.inputting = type === 'input'

      if (this.type === 'number') {
        if (type === 'input') {
          this.limitValueLength()

          let numberValue = parseFloat(value)

          if (this.accessor) {
            numberValue = this.accessor(numberValue)
          }

          this.$emit('on-input', numberValue, value)
        } else {
          this.setNumberValue(value, type)
        }
      } else {
        this.setValue(value, type)
      }
    },
    setValue(value, type) {
      this.currentValue = value
      this.limitValueLength()
      this.emitChangeEvent(type)
    },
    emitChangeEvent(type) {
      let value = this.currentValue

      if (this.accessor) {
        value = this.accessor(value)
      }

      this.$emit(
        `on-${type === 'input' ? 'input' : 'change'}`,
        value,
        this.currentValue
      )
    },
    setNumberValue(value, type) {
      if (isNull(value) || value === '') {
        value = null
      } else {
        value = Number(Number(value).toFixed(this.precision))
      }

      this.$nextTick(() => {
        this.setValue(value, type)
      })
    },
    toggleShowPassword() {
      if (this.disabled) {
        return
      }

      this.showPassword = !this.showPassword
      this.$refs.input.focus()
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
