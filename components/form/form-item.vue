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

<script lang="ts">
import {
  defineComponent,
  ref,
  // reactive,
  computed,
  toRef,
  watch,
  provide,
  inject,
  onMounted,
  onBeforeUnmount
} from 'vue'
import { useConfiguredProps } from '@/common/config/install'
import { isNull } from '@/common/utils/common'
import { FORM_PROPS, FORM_FIELDS } from '@/components/form'
import { validate as asyncValidate } from './validator'
import { getValueByPath, setValueByPath } from './helper'
import { VALIDATE_FIELD, CLEAR_FIELD } from './symbol'

import type { Ref, PropType } from 'vue'
import type { FormProps, FormItemProps, FieldOptions } from './symbol'
import type { Trigger, Rule } from './validator'

const props = useConfiguredProps('formItem', {
  label: {
    type: String,
    default: ''
  },
  prop: {
    type: String,
    default: ''
  },
  rules: {
    type: [Object, Array] as PropType<Rule | Rule[]>,
    default: () => []
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
    default: 'vxp-fade'
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
})

export default defineComponent({
  name: 'FormItem',
  props,
  setup(props, { slots }) {
    const formProps = inject(FORM_PROPS, {})

    const prefix = 'vxp-form'

    const { isRequired, allRules } = useRules(props, formProps)
    const { isError, errorTip, validate, clearError, reset } = useField(props, formProps, allRules)

    const fieldObject = {
      prop: toRef(props, 'prop'),
      validate,
      clearError,
      reset
    }

    useRelation(fieldObject)

    const useAsterisk = computed(() => {
      for (const rule of allRules.value) {
        if (rule.required) return true
      }

      return isRequired.value
    })
    const hasLabel = computed(() => {
      return !!(props.label || slots.label)
    })
    const computedlabelWidth = computed(() => {
      if (formProps.labelPosition) {
        return formProps.labelPosition === 'top'
          ? null
          : props.labelWidth || formProps.labelWidth || 80
      }

      return props.labelWidth || 80
    })
    const className = computed(() => {
      return {
        [`${prefix}__item`]: true,
        [`${prefix}__item--required`]: !formProps.hideAsterisk && useAsterisk.value,
        [`${prefix}__item--error`]: isError.value
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

    return {
      prefix,
      isError,
      errorTip,

      hideAsterisk: formProps.hideAsterisk ?? false,
      labelSuffix: formProps.labelSuffix ?? '',

      className,
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
    const value = getValue()

    if (isNull(initValue.value)) {
      initValue.value = Array.isArray(value) ? Array.from(value) : value
    }
  })

  function getValue() {
    if (!formProps.model || !props.prop) return ''

    return getValueByPath(formProps.model, props.prop, true)
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

    const value = getValue()

    let resetValue

    if (Array.isArray(value)) {
      resetValue = Array.isArray(initValue.value) ? Array.from(initValue.value) : []
    } else {
      resetValue = initValue.value
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

    const value = getValue()
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

  return { isError, errorTip, validate, clearError, reset }
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
