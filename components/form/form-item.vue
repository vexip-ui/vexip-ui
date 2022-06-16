<template>
  <div :class="className">
    <input
      v-if="isNative"
      type="hidden"
      :name="props.prop"
      :value="inputValue"
      style="display: none;"
    />
    <label
      v-if="hasLabel"
      :class="`${prefix}__label`"
      :style="{ width: `${computedlabelWidth}px` }"
      :for="props.htmlFor"
    >
      <slot name="label">
        {{ props.label + (labelSuffix || '') }}
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
      <transition :name="props.errorTransition">
        <div v-if="!props.hideErrorTip && isError" :class="`${prefix}__error-tip`">
          <slot name="error" :tip="errorTip">
            {{ errorTip }}
          </slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  toRef,
  watch,
  provide,
  inject,
  onMounted,
  onBeforeUnmount
} from 'vue'
import { useProps, booleanProp } from '@vexip-ui/config'
import { isNull, isFunction } from '@vexip-ui/utils'
import { FORM_PROPS, FORM_FIELDS } from '@/components/form'
import { validate as asyncValidate } from './validator'
import { getValueByPath, setValueByPath } from './helper'
import { VALIDATE_FIELD, CLEAR_FIELD } from './symbol'

import type { Ref, PropType } from 'vue'
import type { FormProps, FormItemProps, FieldOptions } from './symbol'
import type { Trigger, Rule } from './validator'

export default defineComponent({
  name: 'FormItem',
  props: {
    label: String,
    prop: String,
    rules: [Object, Array] as PropType<Rule | Rule[]>,
    labelWidth: Number,
    required: Boolean,
    htmlFor: String,
    errorTransition: String,
    defaultValue: Object as PropType<unknown>,
    hideErrorTip: booleanProp,
    validateAll: booleanProp,
    hideAsterisk: booleanProp,
    hideLabel: booleanProp,
    action: booleanProp
  },
  setup(_props, { slots }) {
    const props = useProps('formItem', _props, {
      label: {
        default: '',
        static: true
      },
      prop: {
        default: '',
        static: true
      },
      rules: () => [],
      labelWidth: null,
      required: false,
      htmlFor: null,
      errorTransition: 'vxp-fade',
      defaultValue: null,
      hideErrorTip: false,
      validateAll: null,
      hideAsterisk: null,
      hideLabel: null,
      action: false
    })

    const formProps = inject(FORM_PROPS, {})

    const prefix = 'vxp-form'

    const { isRequired, allRules } = useRules(props, formProps)
    const { isError, errorTip, currentValue, validate, clearError, reset } = useField(
      props,
      formProps,
      allRules
    )

    const fieldObject = reactive({
      prop: toRef(props, 'prop'),
      validate,
      clearError,
      reset
    })

    useRelation(fieldObject)

    const useAsterisk = computed(() => {
      if (props.hideAsterisk === true || formProps.hideAsterisk) {
        return false
      }

      for (const rule of allRules.value) {
        if (rule.required) return true
      }

      return isRequired.value
    })
    const hideLabel = computed(() => {
      return props.action || props.hideLabel === true || formProps.hideLabel
    })
    const hasLabel = computed(() => {
      return !(hideLabel.value || !(props.label || slots.label))
    })
    const computedlabelWidth = computed(() => {
      if (formProps.labelPosition) {
        return formProps.labelPosition === 'top'
          ? 0
          : hideLabel.value
            ? 0
            : props.labelWidth || formProps.labelWidth || 80
      }

      return hideLabel.value ? 0 : props.labelWidth || 80
    })
    const className = computed(() => {
      return {
        [`${prefix}__item`]: true,
        [`${prefix}-vars`]: true,
        [`${prefix}__item--required`]: !formProps.hideAsterisk && useAsterisk.value,
        [`${prefix}__item--error`]: isError.value,
        [`${prefix}__item--action`]: props.action
      }
    })
    const controlStyle = computed(() => {
      return {
        width: `calc(100% - ${computedlabelWidth.value}px)`,
        marginLeft:
          hasLabel.value || formProps.labelPosition === 'top'
            ? undefined
            : `${computedlabelWidth.value}px`
      }
    })
    const inputValue = computed(() => {
      const value = currentValue.value

      if (Array.isArray(value) || typeof value === 'object') {
        return JSON.stringify(value)
      }

      return value
    })

    return {
      props,
      prefix,
      isError,
      errorTip,

      labelSuffix: toRef(formProps, 'labelSuffix'),
      isNative: computed(() => !!(formProps.action && formProps.method)),

      className,
      inputValue,
      useAsterisk,
      hasLabel,
      computedlabelWidth,
      controlStyle
    }
  }
})

function useRules(props: FormItemProps, formProps: Partial<FormProps>) {
  const isRequired = computed(() => {
    return formProps.allRequired || props.required
  })
  const requiredTip = computed(() => {
    return `${props.label}不可为空`
  })
  const allRules = computed(() => {
    if (!props.prop) return []

    const requiredRule: Rule[] = isRequired.value
      ? [{ required: isRequired.value, message: requiredTip.value }]
      : []
    const selfRules = Array.isArray(props.rules) ? props.rules : [props.rules]

    let formRules: Rule[] = []

    if (formProps.rules) {
      formRules = (getValueByPath(formProps.rules, props.prop) as Rule[]) ?? []
    }

    formRules = Array.isArray(formRules) ? formRules : [formRules]

    return requiredRule.concat(formRules, selfRules)
  })

  return { isRequired, allRules }
}

function useField(props: FormItemProps, formProps: Partial<FormProps>, allRules: Ref<Rule[]>) {
  const initValue = ref(props.defaultValue)
  const isError = ref(false)
  const errorTip = ref('')
  const validating = ref(false)
  const disabledValidate = ref(false)

  const currentValue = computed(getValue)
  const isValidateAll = computed(() => {
    return isNull(props.validateAll) ? formProps.validateAll ?? false : props.validateAll
  })

  watch(
    () => props.defaultValue,
    value => {
      initValue.value = value
    }
  )

  onMounted(() => {
    const value = currentValue.value

    if (isNull(initValue.value)) {
      initValue.value = Array.isArray(value) ? Array.from(value) : value
    }
  })

  function getValue() {
    if (!formProps.model || !props.prop) return ''

    try {
      return getValueByPath(formProps.model, props.prop, true)
    } catch (e) {
      setValueByPath(formProps.model, props.prop, '', false)

      return ''
    }
  }

  function validate(type?: Trigger) {
    return handleValidate(type)
  }

  function clearError() {
    isError.value = false
    errorTip.value = ''
  }

  function reset() {
    clearError()

    if (!formProps.model || !props.prop) return false

    const value = currentValue.value

    let resetValue

    if (Array.isArray(value)) {
      resetValue = Array.isArray(initValue.value) ? Array.from(initValue.value) : []
    } else {
      resetValue = isFunction(initValue.value) ? initValue.value() : initValue.value
    }

    if (resetValue !== value) {
      disabledValidate.value = true
    }

    return setValueByPath(formProps.model, props.prop, resetValue, true)
  }

  async function handleValidate(type?: Trigger) {
    if (disabledValidate.value) {
      disabledValidate.value = false

      return handleValidateEnd(null)
    }

    if (!props.prop || !formProps.model || validating.value) {
      return handleValidateEnd(null)
    }

    validating.value = true

    const value = currentValue.value
    const useRules = type
      ? allRules.value.filter(rule => !rule.trigger || rule.trigger === type)
      : allRules.value
    const model = formProps.model

    let errors: string[] | null = await asyncValidate(useRules, value, model, isValidateAll.value)

    errors = errors.length ? errors : null

    return handleValidateEnd(errors)
  }

  function handleValidateEnd(errors: string[] | null) {
    validating.value = false

    if (!errors) {
      clearError()
    } else {
      isError.value = true
      errorTip.value = Array.isArray(errors) ? errors[0] : errors
    }

    return errors
  }

  return { isError, errorTip, currentValue, validate, clearError, reset, getValue }
}

function useRelation(field: FieldOptions) {
  const formFields = inject(FORM_FIELDS, null)

  provide(VALIDATE_FIELD, field.validate)
  provide(CLEAR_FIELD, field.clearError)

  onMounted(() => {
    if (formFields) {
      formFields.value.add(field)
    }
  })

  onBeforeUnmount(() => {
    if (formFields) {
      formFields.value.delete(field)
    }
  })
}
</script>
