<template>
  <Condition :name="hasBefore || hasAfter ? '' : 'input'">
    <div :class="wrapperClass">
      <div v-if="hasBefore" :class="`${prefixCls}__before`">
        <slot name="before">
          {{ before }}
        </slot>
      </div>
      <div
        slot="input"
        :class="className"
        @mouseenter="toggleHoverState(true)"
        @mouseleave="toggleHoverState(false)"
      >
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
        <transition :name="transitionName">
          <div
            v-if="clearable && hasValue && isHover"
            key="clear"
            :class="`${prefixCls}__clear`"
            @click.stop="handleClear"
          >
            <Icon name="times-circle"></Icon>
          </div>
          <div
            v-else-if="hasSuffix"
            key="suffix"
            :class="`${prefixCls}__icon--suffix`"
            :style="{ color: suffixColor }"
            @click="handleSuffixClick"
          >
            <slot name="suffix">
              <Icon :name="suffix"></Icon>
            </slot>
          </div>
          <div
            v-else-if="type === 'password' && password"
            key="password"
            :class="`${prefixCls}__icon--password`"
            @click="toggleShowPassword"
          >
            <Icon :name="passwordIcon"></Icon>
          </div>
        </transition>
        <div
          v-if="maxLength"
          :class="`${prefixCls}__count`"
          :style="countStyle"
        >
          {{ `${currentLength}/${maxLength}` }}
        </div>
      </div>
      <div v-if="hasAfter" :class="`${prefixCls}__after`">
        <slot name="after">
          {{ after }}
        </slot>
      </div>
    </div>
  </Condition>
</template>

<script>
import Condition from '../basis/condition'
import Icon from '../icon'
// import formControl from '../../src/mixins/form-control'
import { size } from '../../src/config/properties'
import { noop, throttle, isNull } from '../../src/utils/common'
import '../../icons/caret-up'
import '../../icons/caret-down'
import '../../icons/regular/eye-slash'
import '../../icons/regular/eye'

const { prefix } = require('../../src/style/basis/variable')

export default {
  name: 'Input',
  components: {
    Condition,
    Icon
  },
  // mixins: [formControl],
  model: {
    event: 'on-change'
  },
  inject: {
    validateField: { default: () => noop }
  },
  props: {
    size,
    type: {
      default: 'text',
      validator(value) {
        if (value === 'number') {
          console.warn(
            '[Vexip warn] Number type for Input will be deprecated soon, please replace it with NumberInput.'
          )
        }

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
    // size: {
    //   default() {
    //     return config.input.size ?? 'default'
    //   },
    //   validator(value) {
    //     return ['small', 'default', 'large'].includes(value)
    //   }
    // },
    debounce: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      default: 0
    },
    before: {
      type: String,
      default: ''
    },
    after: {
      type: String,
      default: ''
    },
    password: {
      type: Boolean,
      default: false
    },
    disableValidate: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
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
      currentLength: this.value ? this.value.length : 0,
      isHover: false,
      transitionName: `${prefix}-fade`
    }
  },
  computed: {
    className() {
      const {
        prefixCls,
        type,
        focused,
        disabled,
        size,
        state,
        hasBefore,
        hasAfter
      } = this

      return [
        prefixCls,
        `${prefixCls}--${type}`,
        {
          [`${prefixCls}-wrapper`]: !hasBefore && !hasAfter,
          [`${prefixCls}--focused`]: focused,
          [`${prefixCls}--disabled`]: disabled,
          [`${prefixCls}--${size}`]: size !== 'default',
          [`${prefixCls}--${state}`]: state !== 'default'
        }
      ]
    },
    wrapperClass() {
      const { prefixCls, size, hasBefore, hasAfter } = this

      return {
        [`${prefixCls}-wrapper`]: true,
        [`${prefixCls}-wrapper--${size}`]: size !== 'default',
        [`${prefixCls}-wrapper--before-only`]: hasBefore && !hasAfter,
        [`${prefixCls}-wrapper--after-only`]: !hasBefore && hasAfter
      }
    },
    hasPrefix() {
      return !!(this.$slots.prefix || this.prefix)
    },
    hasSuffix() {
      return !!(this.$slots.suffix || this.suffix)
    },
    hasBefore() {
      return !!(this.$slots.before || this.before)
    },
    hasAfter() {
      return !!(this.$slots.after || this.after)
    },
    inputStyle() {
      return {
        paddingLeft: this.hasPrefix ? '1.4em' : '',
        paddingRight: this.hasSuffix || this.type === 'password' ? '1.4em' : ''
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
      return typeof this.formatter === 'function'
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
    },
    hasValue() {
      return !(isNull(this.currentValue) || this.currentValue === '')
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
      type = type === 'input' ? 'input' : 'change'

      let value = this.currentValue

      if (this.accessor) {
        value = this.accessor(value)
      }

      this.$emit(`on-${type}`, value, this.currentValue)

      if (type === 'change') {
        if (this.lastValue === this.currentValue) return

        this.lastValue = this.currentValue

        if (!this.disableValidate) {
          this.validateField()
        }
      }
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
    handleEnter() {
      this.$emit('on-enter', this.currentValue)
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
    },
    toggleHoverState(hover = !this.isHover) {
      this.isHover = hover
    },
    handleClear() {
      if (this.clearable) {
        const cleared = isNull(this.currentValue) || this.currentValue === ''

        this.currentValue = ''
        this.currentLabel = ''
        this.$emit('on-clear')

        if (!cleared) {
          this.$emit('on-change', '', '')
        }
      }
    }
  }
}
</script>
