<template>
  <div :class="className">
    <label
      v-if="hasLabel"
      :class="`${prefix}__label`"
      :style="{ width: `${computedlabelWidth}px` }"
      :for="htmlFor"
    >
      <slot name="label">
        {{ label + labelSuffix }}
      </slot>
    </label>
    <div
      :class="{
        [`${prefix}__control`]: true,
        [`${prefix}__control--no-label`]: !hasLabel
      }"
      :style="controlStyle"
    >
      <slot></slot>
      <transition :name="errorTransition">
        <div v-if="!hideErrorTip && isError" :class="`${prefix}__error-tip`">
          <slot name="error" :tip="errorTip">
            {{ errorTip }}
          </slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { validate } from './validator'
import {
  isNull,
  findComponentUpward,
  removeArrayItem,
  getValueByPath,
  setValueByPath
} from '../../src/utils/common'

const { prefix } = require('../../src/style/basis/variable')
const parentName = 'Form'

export default {
  name: 'FormItem',
  provide() {
    return {
      formItem: this,
      validateField: this.validateField
    }
  },
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, Array],
      default() {
        return []
      }
    },
    labelWidth: {
      type: Number,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    htmlFor: {
      type: String,
      default: null
    },
    errorTransition: {
      type: String,
      default: `${prefix}-fade`
    },
    defaultValue: {
      default: null,
      validator() {
        return true
      }
    },
    hideErrorTip: {
      type: Boolean,
      default: false
    },
    validateAll: {
      type: Boolean,
      default: null
    },
    asterisk: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      prefix: `${prefix}-form`,
      isError: false,
      errorTip: '',
      parentInstance: null,
      validating: false,
      initValue: this.defaultValue,
      disableValidate: false,
      timer: null
    }
  },
  computed: {
    className() {
      const { prefix, useAsterisk, isError, form } = this
      const { hideAsterisk } = form || {}

      return {
        [`${prefix}__item`]: true,
        [`${prefix}__item--required`]: !hideAsterisk && useAsterisk,
        [`${prefix}__item--error`]: isError
      }
    },
    hasLabel() {
      return this.label || this.$slots.label
    },
    computedlabelWidth() {
      const { labelWidth, form } = this

      if (form) {
        return form.labelPosition === 'top'
          ? null
          : labelWidth || form.labelWidth
      }

      return labelWidth
    },
    isRequired() {
      return this.form?.allRequired || this.required
    },
    requiredTip() {
      return `${this.label}不可为空`
    },
    value() {
      const { form, prop } = this

      if (!form || !form.model || !prop) return ''

      return getValueByPath(form.model, prop, true)
    },
    allRules() {
      const { form, prop, rules, isRequired, requiredTip } = this

      if (!form || !prop) return []

      const requiredRule = isRequired
        ? [{ required: isRequired, message: requiredTip }]
        : []
      const selfRules = Array.isArray(rules) ? rules : [rules]

      let formRules = prop ? getValueByPath(form.rules, prop) || [] : []

      formRules = Array.isArray(formRules) ? formRules : [formRules]

      return [].concat(requiredRule, formRules, selfRules)
    },
    useAsterisk() {
      if (isNull(this.asterisk)) {
        const allRules = this.allRules

        for (const rule of allRules) {
          if (rule.required) return true
        }

        return this.isRequired
      }

      return this.asterisk
    },
    labelSuffix() {
      return this.form ? this.form.labelSuffix : ''
    },
    controlStyle() {
      const { hasLabel, computedlabelWidth, form } = this

      return {
        width: `calc(100% - ${computedlabelWidth}px)`,
        marginLeft:
          hasLabel || (form && form.labelPosition === 'top')
            ? null
            : `${computedlabelWidth}px`
      }
    },
    isValidateAll() {
      const { validateAll, form } = this

      return isNull(validateAll) ? form.validateAll : validateAll
    }
  },
  mounted() {
    const parentInstance = findComponentUpward(this, parentName)

    if (parentInstance) {
      this.parentInstance = parentInstance
      parentInstance.items.push(this)
    }

    this.$on('on-control-change', () => this.handleValidate('change'))
    this.$on('on-control-blur', () => this.handleValidate('blur'))
    this.$on('on-control-clear', () => this.reset())

    if (isNull(this.initValue)) {
      if (Array.isArray(this.value)) {
        this.initValue = Array.from(this.value)
      } else {
        this.initValue = this.value
      }
    }
  },
  beforeDestroy() {
    if (this.parentInstance) {
      removeArrayItem(this.parentInstance.items, this)
    }
  },
  methods: {
    validateField() {
      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        this.validate()
      }, 0)
    },
    validate(callback) {
      return this.handleValidate('', callback)
    },
    reset() {
      this.clearError()

      const { form, prop, initValue, value } = this

      if (!form || !form.model || !prop) return

      let resetValue

      if (Array.isArray(value)) {
        if (Array.isArray(initValue)) {
          resetValue = Array.from(initValue)
        } else {
          resetValue = []
        }
      } else {
        resetValue = initValue
      }

      if (resetValue !== value) {
        this.disableValidate = true
      }

      const result = setValueByPath(form.model, prop, resetValue, true)

      if (this.form) {
        this.form.$emit('on-reset', prop, result)
      }
    },
    clearError() {
      this.isError = false
      this.errorTip = ''
    },
    async handleValidate(type, callback) {
      if (this.disableValidate) {
        this.disableValidate = false

        return this.handleValidateEnd(null, callback)
      }

      if (!this.prop || this.validating) {
        return this.handleValidateEnd(null, callback)
      }

      this.validating = true

      const { value, allRules, form, isValidateAll } = this
      const useRules = type
        ? allRules.filter(rule => !rule.trigger || rule.trigger === type)
        : allRules
      const model = form.model

      let errors = await validate(useRules, value, model, isValidateAll)

      errors = errors.length ? errors : null

      return this.handleValidateEnd(errors, callback)
    },
    handleValidateEnd(errors, callback) {
      this.validating = false

      if (!errors) {
        this.clearError()
      } else {
        this.isError = true
        this.errorTip = Array.isArray(errors) ? errors[0] : errors
      }

      if (this.form) {
        this.form.$emit('on-validate', this.prop, !this.isError, errors || null)
      }

      return new Promise(resolve => {
        resolve(errors)

        if (typeof callback === 'function') {
          callback(errors)
        }
      })
    }
  }
}
</script>
