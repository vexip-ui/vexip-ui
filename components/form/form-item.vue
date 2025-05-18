<script setup lang="ts">
import { Column } from '@/components/column'
import { Icon } from '@/components/icon'
import { Tooltip } from '@/components/tooltip'

import { computed, inject, onBeforeUnmount, onMounted, provide, ref, toRef, watch } from 'vue'

import {
  makeSentence,
  useIcons,
  useLocale,
  useNameHelper,
  useProps,
  useWordSpace,
} from '@vexip-ui/config'
import { useDisplay } from '@vexip-ui/hooks'
import { createEventEmitter, getGlobalCount, isFunction, isNull, isObject } from '@vexip-ui/utils'
import { formItemProps } from './props'
import { validate as asyncValidate } from './validator'
import { getValueByPath, setValueByPath } from './helper'
import { FIELD_OPTIONS, FORM_ACTIONS, FORM_FIELDS, FORM_PROPS } from './symbol'

import type { ComponentState } from '@vexip-ui/config'
import type { Rule } from './validator'

defineOptions({ name: 'FormItem', inheritAttrs: true })

const nh = useNameHelper('form')
const _props = defineProps(formItemProps)
const props = useProps('formItem', _props, {
  locale: null,
  label: {
    default: '',
    static: true,
  },
  prop: {
    default: '',
    static: true,
  },
  name: {
    default: '',
    static: true,
  },
  rules: () => [],
  labelWidth: null,
  required: false,
  htmlFor: {
    default: null,
    static: true,
  },
  errorTransition: () => nh.ns('fade'),
  defaultValue: {
    default: null,
    static: true,
  },
  hideErrorTip: false,
  validateAll: null,
  hideAsterisk: null,
  hideLabel: null,
  action: false,
  help: '',
  pure: false,
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
  flex: null,
})

const slots = defineSlots<{
  default?: () => any,
  help?: () => any,
  label?: () => any,
  error?: (params: { tip: string }) => any
}>()

const formProps = inject(FORM_PROPS, {})
const formActions = inject(FORM_ACTIONS, null)
const formFields = inject(FORM_FIELDS, null)
const emitter = createEventEmitter()

const locale = useLocale('form', toRef(props, 'locale'))
const icons = useIcons()
const wordSpace = useWordSpace()

const idIndex = `${getGlobalCount()}`

const initValue = ref(props.defaultValue)
const isError = ref(false)
const errorTip = ref('')
const validating = ref(false)
const disabledValidate = ref(false)
const labelWidth = ref(0)

const placeholder = useDisplay(() => {
  if (placeholder.value) {
    labelWidth.value = placeholder.value.offsetWidth
  }
})

const labelId = computed(() => nh.bs(`${idIndex}__label`))
const isRequired = computed(() => formProps.allRequired || props.required)
const requiredTip = computed(() => {
  return makeSentence(`${props.label || props.prop} ${locale.value.notNullable}`, wordSpace.value)
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
const currentValue = computed(getValue)
const isValidateAll = computed(() => {
  return isNull(props.validateAll) ? (formProps.validateAll ?? false) : props.validateAll
})
const useAsterisk = computed(() => {
  if (props.hideAsterisk === true || formProps.hideAsterisk) {
    return false
  }

  for (const rule of allRules.value) {
    if (rule.required) return true
  }

  return isRequired.value
})
const hideLabel = computed(() => props.action || props.hideLabel === true || formProps.hideLabel)
const hasLabel = computed(() => !(hideLabel.value || !(props.label || slots.label)))
const labelAlign = computed(() => formProps.labelAlign)
const computedLabelWidth = computed(() => {
  if (labelAlign.value) {
    return getLabelWidth(
      labelAlign.value === 'top'
        ? 0
        : hideLabel.value
          ? 0
          : props.labelWidth || formProps.labelWidth || 80,
    )
  }

  return getLabelWidth(hideLabel.value ? 0 : props.labelWidth || 80)
})
const className = computed(() => {
  return {
    [nh.be('item')]: true,
    [nh.bs('vars')]: true,
    [nh.bem('item', 'inherit')]: formFields || props.inherit,
    [nh.bem('item', 'required')]: !formProps.hideAsterisk && useAsterisk.value,
    [nh.bem('item', 'error')]: isError.value,
    [nh.bem('item', 'action')]: props.action,
    [nh.bem('item', 'padding')]: formProps.inline && labelAlign.value === 'top' && !hasLabel.value,
  }
})
const controlStyle = computed(() => {
  return {
    width: labelAlign.value === 'top' ? undefined : `calc(100% - ${computedLabelWidth.value}px)`,
    marginLeft:
      hasLabel.value || labelAlign.value === 'top' ? undefined : `${computedLabelWidth.value}px`,
  }
})
const inputValue = computed(() => {
  const value = currentValue.value

  if (Array.isArray(value) || isObject(value)) {
    return JSON.stringify(value)
  }

  return value
})
const columnFlex = computed(() => {
  return { justify: props.action ? 'center' : 'start', align: 'middle' } as const
})
const labelWidthDefined = computed(
  () => !!(formProps.labelWidth && formProps.labelWidth !== 'auto') || props.labelWidth > 0,
)

const instances = new Set<any>()

const fieldObject = Object.freeze({
  prop: computed(() => props.prop),
  idFor: computed(() => props.prop),
  labelId,
  state: computed<ComponentState>(() => (isError.value ? 'error' : 'default')),
  disabled: computed(() => !!formProps.disabled),
  loading: computed(() => !!formProps.loading),
  size: computed(() => formProps.size || 'default'),
  emitter,
  labelWidth,
  validate,
  clearError,
  reset,
  getValue,
  setValue,
  sync: (instance: any) => {
    if (instances.size) {
      console.warn('[vexip-ui:Form]: must only be one control component under FormItem.')
    }

    instances.add(instance)
  },
  unSync: (instance: any) => {
    instances.delete(instance)
  },
})

provide(FIELD_OPTIONS, fieldObject)

watch(
  () => props.defaultValue,
  value => {
    initValue.value = value
  },
)

onMounted(() => {
  const value = currentValue.value

  if (isNull(initValue.value)) {
    initValue.value = Array.isArray(value) ? Array.from(value) : value
  }

  if (formFields) {
    formFields.add(fieldObject)
  }
})

onBeforeUnmount(() => {
  if (formFields) {
    formFields.delete(fieldObject)
  }
})

defineExpose({ isError, inputValue, computedLabelWidth })

function getLabelWidth(width: number | 'auto') {
  return width === 'auto' ? formActions?.getLabelWidth() || 80 : width
}

let initialized = false

function getValue(defaultValue: unknown = initValue.value) {
  if (!formProps.model || !props.prop) return defaultValue

  try {
    const value = getValueByPath(formProps.model, props.prop, true)
    initialized = true

    return value
  } catch (e) {
    if (!initialized) {
      setValueByPath(formProps.model, props.prop, defaultValue, false)
      initialized = true
    }

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

  let errors: string[] | null = await asyncValidate(
    useRules,
    value,
    model,
    isValidateAll.value,
    locale.value.validateFail,
  )

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

function handleLabelClick() {
  emitter.emit('focus')
}

const isNative = computed(() => !!(formProps.action && formProps.method))
</script>

<template>
  <slot v-if="props.pure"></slot>
  <Column
    v-else
    v-bind="$attrs"
    :class="className"
    :inherit="props.inherit"
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
    :use-flex="columnFlex"
  >
    <input
      v-if="isNative"
      type="hidden"
      :name="props.name || props.prop"
      :value="inputValue"
      style="display: none"
    />
    <span
      v-if="hasLabel && labelAlign !== 'top' && !labelWidthDefined"
      ref="placeholder"
      :class="nh.be('placeholder')"
      role="none"
    >
      <Icon v-if="props.help || slots.help" v-bind="icons.help" :class="nh.be('help')"></Icon>
      <slot name="label">
        {{ props.label + (formProps.labelSuffix || '') }}
      </slot>
    </span>
    <label
      v-if="hasLabel"
      :id="labelId"
      :class="nh.be('label')"
      :style="{ width: labelAlign !== 'top' ? `${computedLabelWidth}px` : undefined }"
      :for="props.htmlFor || props.prop"
      @click="handleLabelClick"
    >
      <Tooltip v-if="props.help || slots.help" transfer>
        <template #trigger>
          <Icon v-bind="icons.help" :class="nh.be('help')"></Icon>
        </template>
        <slot name="help">
          <div :class="nh.be('help-tip')">
            {{ props.help }}
          </div>
        </slot>
      </Tooltip>
      <slot name="label">
        {{ props.label + (formProps.labelSuffix || '') }}
      </slot>
    </label>
    <div
      :class="{
        [nh.be('control')]: true,
        [nh.bem('control', 'no-label')]: !hasLabel,
        [nh.bem('control', 'action')]: props.action
      }"
      role="alert"
      aria-relevant="all"
      :style="controlStyle"
    >
      <slot></slot>
      <Transition :name="props.errorTransition">
        <div v-if="!props.hideErrorTip && isError" :class="nh.be('error-tip')">
          <slot name="error" :tip="errorTip">
            {{ errorTip }}
          </slot>
        </div>
      </Transition>
    </div>
  </Column>
</template>
