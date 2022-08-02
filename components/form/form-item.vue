<template>
  <Column
    v-bind="$attrs"
    :class="className"
    role="group"
    tag="div"
    :span="props.span"
    :offset="props.offset"
    :push="props.push"
    :pull="props.pull"
    :order="props.order"
    :xs="props.xs"
    :sm="props.sm"
    :md="props.md"
    :lg="props.lg"
    :xl="props.xl"
    :xxl="props.xxl"
    :flex="props.flex"
  >
    <input
      v-if="isNative"
      type="hidden"
      :name="props.prop"
      :value="inputValue"
      style="display: none;"
    />
    <label
      v-if="hasLabel"
      ref="labelEl"
      :class="nh.be('label')"
      :style="{ width: `${computedlabelWidth}px` }"
      :for="props.htmlFor || props.prop"
      @click="handleLabelClick"
    >
      <slot name="label">
        {{ props.label + (labelSuffix || '') }}
      </slot>
    </label>
    <div
      :class="{
        [nh.be('control')]: true,
        [nh.bem('control', 'no-label')]: !hasLabel
      }"
      role="alert"
      aria-relevant="all"
      :style="controlStyle"
    >
      <slot></slot>
      <transition :name="props.errorTransition">
        <div v-if="!props.hideErrorTip && isError" :class="nh.be('error-tip')">
          <slot name="error" :tip="errorTip">
            {{ errorTip }}
          </slot>
        </div>
      </transition>
    </div>
  </Column>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  toRef,
  watch,
  provide,
  inject,
  onMounted,
  onBeforeUnmount
} from 'vue'
import { Column } from '@/components/column'
import { useNameHelper, useProps, useLocale, booleanProp, makeSentence } from '@vexip-ui/config'
import { isNull, isFunction, createEventEmitter } from '@vexip-ui/utils'
import { FORM_PROPS, FORM_FIELDS } from '@/components/form'
import { validate as asyncValidate } from './validator'
import { getValueByPath, setValueByPath } from './helper'
import { FIELD_OPTIONS, FORM_ACTIONS } from './symbol'

import type { Ref, PropType } from 'vue'
import type { ComponentState } from '@vexip-ui/config'
import type { ColumnOptions } from '@/components/row'
import type { FormProps, FormItemProps, FieldOptions } from './symbol'
import type { Rule } from './validator'

const mediaProp = [Number, Object] as PropType<number | ColumnOptions>

export default defineComponent({
  name: 'FormItem',
  components: {
    Column
  },
  inheritAttrs: true,
  props: {
    label: String,
    prop: String,
    rules: [Object, Array] as PropType<Rule | Rule[]>,
    labelWidth: Number,
    required: booleanProp,
    htmlFor: String,
    errorTransition: String,
    defaultValue: Object as PropType<unknown>,
    hideErrorTip: booleanProp,
    validateAll: booleanProp,
    hideAsterisk: booleanProp,
    hideLabel: booleanProp,
    action: booleanProp,
    span: Number,
    offset: Number,
    push: Number,
    pull: Number,
    order: Number,
    xs: mediaProp,
    sm: mediaProp,
    md: mediaProp,
    lg: mediaProp,
    xl: mediaProp,
    xxl: mediaProp,
    flex: [Number, String]
  },
  setup(_props, { slots }) {
    const nh = useNameHelper('form')
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
      errorTransition: () => nh.ns('fade'),
      defaultValue: null,
      hideErrorTip: false,
      validateAll: null,
      hideAsterisk: null,
      hideLabel: null,
      action: false,
      span: 24,
      offset: null,
      push: null,
      pull: null,
      order: null,
      xs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      xxl: null,
      flex: null
    })

    const formProps = inject(FORM_PROPS, {})
    const formActions = inject(FORM_ACTIONS, null)
    const emitter = createEventEmitter()

    const labelWidth = ref(0)
    const labelEl = ref<HTMLInputElement | null>(null)

    const { isRequired, allRules } = useRules(props, formProps)
    const { isError, errorTip, currentValue, validate, clearError, reset, getValue, setValue } =
      useField(props, formProps, allRules)

    const instances = new Set<any>()

    const fieldObject = Object.freeze({
      prop: computed(() => props.prop),
      idFor: computed(() => props.prop),
      state: computed<ComponentState>(() => (isError.value ? 'error' : 'default')),
      disabled: computed(() => !!formProps.disabled),
      loading: computed(() => !!formProps.loading),
      emitter,
      labelWidth,
      validate,
      clearError,
      reset,
      getValue,
      setValue,
      sync: (instance: any) => {
        if (instances.size) {
          console.warn('[vexip-ui]: must only be one control component under FormItem.')
        }

        instances.add(instance)
      },
      unsync: (instance: any) => {
        instances.delete(instance)
      }
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
        return getLabelWidth(
          formProps.labelPosition === 'top'
            ? 0
            : hideLabel.value
              ? 0
              : props.labelWidth || formProps.labelWidth || 80
        )
      }

      return getLabelWidth(hideLabel.value ? 0 : props.labelWidth || 80)
    })
    const className = computed(() => {
      return {
        [nh.be('item')]: true,
        [nh.bs('vars')]: true,
        [nh.bem('item', 'required')]: !formProps.hideAsterisk && useAsterisk.value,
        [nh.bem('item', 'error')]: isError.value,
        [nh.bem('item', 'action')]: props.action
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

    onMounted(() => {
      if (labelEl.value) {
        const range = document.createRange()

        range.setStart(labelEl.value, 0)
        range.setEnd(labelEl.value, labelEl.value.childNodes.length)

        const rangeWidth = range.getBoundingClientRect().width
        const computedStyle = getComputedStyle(labelEl.value)
        const horizontalPending =
          parseInt(computedStyle.paddingLeft, 10) + parseInt(computedStyle.paddingRight, 10)

        labelWidth.value = rangeWidth + horizontalPending
      }
    })

    function getLabelWidth(width: number | 'auto') {
      return width === 'auto' ? formActions?.getLabelWidth() || 80 : width
    }

    function handleLabelClick() {
      emitter.emit('focus')
    }

    return {
      props,
      nh,
      isError,
      errorTip,

      labelSuffix: toRef(formProps, 'labelSuffix'),
      isNative: computed(() => !!(formProps.action && formProps.method)),

      className,
      inputValue,
      useAsterisk,
      hasLabel,
      computedlabelWidth,
      controlStyle,

      labelEl,

      handleLabelClick
    }
  }
})

function useRules(props: FormItemProps, formProps: Partial<FormProps>) {
  const locale = useLocale('form')

  const isRequired = computed(() => {
    return formProps.allRequired || props.required
  })
  const requiredTip = computed(() => {
    return makeSentence(`${props.label} ${locale.value.notNullable}`)
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

  function getValue(defaultValue?: unknown) {
    if (!formProps.model || !props.prop) return defaultValue

    try {
      return getValueByPath(formProps.model, props.prop, true)
    } catch (e) {
      setValueByPath(formProps.model, props.prop, defaultValue, false)

      return defaultValue
    }
  }

  function setValue(value: unknown, strict = false) {
    if (!formProps.model || !props.prop) return

    try {
      return setValueByPath(formProps.model, props.prop, value, strict)
    } catch (e) {}
  }

  function validate() {
    return handleValidate()
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

  async function handleValidate() {
    if (disabledValidate.value) {
      disabledValidate.value = false

      return handleValidateEnd(null)
    }

    if (!props.prop || !formProps.model || validating.value) {
      return handleValidateEnd(null)
    }

    validating.value = true

    const value = currentValue.value
    const useRules = allRules.value
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

  return {
    isError,
    errorTip,
    currentValue,
    validate,
    clearError,
    reset,
    getValue,
    setValue
  }
}

function useRelation(field: FieldOptions) {
  const formFields = inject(FORM_FIELDS, null)

  provide(FIELD_OPTIONS, field)

  onMounted(() => {
    if (formFields) {
      formFields.add(field)
    }
  })

  onBeforeUnmount(() => {
    if (formFields) {
      formFields.delete(field)
    }
  })
}
</script>
