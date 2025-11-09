<script setup lang="ts">
import { Row } from '@/components/row'

import { computed, provide, reactive } from 'vue'

import { createSizeProp, emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { formProps } from './props'
import { FORM_ACTIONS, FORM_FIELDS, FORM_PROPS, labelAligns, submitMethods } from './symbol'

import type { FieldOptions } from './symbol'

defineOptions({ name: 'Form', inheritAttrs: true })

const _props = defineProps(formProps)
const props = useProps('form', _props, {
  method: {
    default: 'post',
    validator: value => submitMethods.includes(value),
  },
  action: null,
  model: {
    default: () => ({}),
    static: true,
  },
  rules: () => ({}),
  labelWidth: 'auto',
  labelAlign: {
    default: 'right',
    validator: value => labelAligns.includes(value),
  },
  allRequired: false,
  labelSuffix: '',
  hideAsterisk: false,
  validateAll: false,
  hideLabel: false,
  disabled: false,
  loading: false,
  size: createSizeProp(),
  inline: false,
  gap: [8, 0],
  justify: 'start',
  align: 'top',
})

const nh = useNameHelper('form')
const fieldSet: Set<FieldOptions> = reactive(new Set<any>())

const className = computed(() => {
  return [
    nh.b(),
    nh.bs('vars'),
    nh.bm(`label-${props.labelAlign}`),
    {
      [nh.bm('inherit')]: props.inherit,
      [nh.bm('disabled')]: props.disabled,
      [nh.bm('loading')]: props.loading,
      [nh.bm(props.size)]: props.size !== 'default',
      [nh.bm('inline')]: props.inline,
    },
  ]
})
const labelWidth = computed(() => {
  return Math.max(...Array.from(fieldSet).map(field => field.labelWidth.value))
})

provide(FORM_PROPS, props)
provide(FORM_FIELDS, fieldSet)
provide(FORM_ACTIONS, {
  getLabelWidth,
  validate,
  validateFields,
  reset,
  resetFields,
  clearError,
  clearFieldsError,
})

defineExpose({
  validate,
  validateFields,
  reset,
  resetFields,
  setFieldsError,
  clearError,
  clearFieldsError,
})

function getLabelWidth() {
  if (typeof props.labelWidth === 'number') {
    return props.labelWidth
  }

  return labelWidth.value
}

function getFieldMap() {
  const fieldMap: Record<string, FieldOptions> = {}

  for (const field of fieldSet) {
    if (field.prop.value) {
      fieldMap[field.prop.value] = field
    }
  }

  return fieldMap
}

function validate() {
  return validateFieldsBase(fieldSet)
}

function validateFields(fields: string | string[]) {
  if (!Array.isArray(fields)) {
    fields = [fields]
  }

  const fieldMap = getFieldMap()
  const normalizedFields = new Set<FieldOptions>()

  fields.forEach(field => {
    if (fieldMap[field]) {
      normalizedFields.add(fieldMap[field])
    }
  })

  return validateFieldsBase(normalizedFields)
}

function validateFieldsBase(items: Set<FieldOptions>) {
  const validations: Promise<string[] | null>[] = []

  items.forEach(item => {
    validations.push(item.validate())
  })

  return new Promise<string[]>(resolve => {
    Promise.all(validations).then(errors => {
      resolve(errors.flat().filter(Boolean) as string[])
    })
  })
}

function reset() {
  fieldSet.forEach(field => {
    field.reset()
  })
}

function resetFields(fields: string | string[]) {
  if (!Array.isArray(fields)) {
    fields = [fields]
  }

  const fieldMap = getFieldMap()

  fields.forEach(field => {
    if (fieldMap[field]) {
      fieldMap[field].reset()
    }
  })
}

function setFieldsError(fieldErrorMap: Record<string, string>) {
  const fieldMap = getFieldMap()

  Object.keys(fieldErrorMap).forEach(field => {
    const error = fieldErrorMap[field]

    if (error && fieldMap[field]) {
      fieldMap[field].setError(error)
    }
  })
}

function clearError() {
  fieldSet.forEach(field => {
    field.clearError()
  })
}

function clearFieldsError(fields: string | string[]) {
  if (!Array.isArray(fields)) {
    fields = [fields]
  }

  const fieldMap = getFieldMap()

  fields.forEach(field => {
    if (fieldMap[field]) {
      fieldMap[field].clearError()
    }
  })
}

function handleSubmit(event: SubmitEvent) {
  event.stopPropagation()

  if (!props.action) {
    event.preventDefault()
  }

  emitEvent(props.onSubmit, event)
}
</script>

<template>
  <Row
    v-bind="$attrs"
    :class="className"
    :inherit="props.inherit"
    tag="form"
    :method="props.action && props.method"
    :action="props.action"
    :gap="props.gap"
    :justify="props.justify"
    :align="props.align"
    :column-flex="undefined"
    @submit="handleSubmit"
    @reset.prevent.stop
  >
    <slot></slot>
  </Row>
</template>
