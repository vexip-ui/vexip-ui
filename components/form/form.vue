<template>
  <form :class="className" :method="props.action && props.method" :action="props.action">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { defineComponent, computed, provide, ref } from 'vue'
import { useProps, booleanProp } from '@vexip-ui/config'
import { FORM_PROPS, FORM_FIELDS, FORM_ACTIONS } from './symbol'

import type { PropType } from 'vue'
import type { LabelPosition, SubmitMethod, FieldOptions } from './symbol'

const submitMethods = Object.freeze<SubmitMethod>(['get', 'post', 'put', 'delete'])
const labelPropstions = Object.freeze<LabelPosition>(['right', 'top', 'left'])

export default defineComponent({
  name: 'Form',
  props: {
    method: String as PropType<SubmitMethod>,
    action: String,
    model: Object,
    rules: Object,
    labelWidth: Number,
    labelPosition: String as PropType<LabelPosition>,
    allRequired: booleanProp,
    labelSuffix: String,
    hideAsterisk: booleanProp,
    validateAll: booleanProp,
    hideLabel: booleanProp
  },
  setup(_props) {
    const props = useProps('form', _props, {
      method: {
        default: 'post' as SubmitMethod,
        validator: (value: SubmitMethod) => submitMethods.includes(value)
      },
      action: null,
      model: {
        default: () => ({}),
        static: true
      },
      rules: () => ({}),
      labelWidth: 80,
      labelPosition: {
        default: 'right' as LabelPosition,
        validator: (value: LabelPosition) => labelPropstions.includes(value)
      },
      allRequired: false,
      labelSuffix: '',
      hideAsterisk: false,
      validateAll: false,
      hideLabel: false
    })

    const prefix = 'vxp-form'
    const fieldSet = ref(new Set<FieldOptions>())

    const className = computed(() => {
      return [prefix, `${prefix}-vars`, `${prefix}--label-${props.labelPosition}`]
    })

    provide(FORM_PROPS, props)
    provide(FORM_FIELDS, fieldSet)
    provide(FORM_ACTIONS, {
      validate,
      validateFields,
      reset,
      resetFields,
      clearError,
      clearFieldsError
    })

    function getPropMap() {
      const propMap: Record<string, FieldOptions> = {}

      for (const field of fieldSet.value) {
        if (field.prop.value) {
          propMap[field.prop.value] = field
        }
      }

      return propMap
    }

    function validate() {
      return validateItems(fieldSet.value)
    }

    function validateFields(props: string | string[]) {
      if (!Array.isArray(props)) {
        props = [props]
      }

      const propMap = getPropMap()
      const fields = new Set<FieldOptions>()

      props.forEach(prop => {
        if (propMap[prop]) {
          fields.add(propMap[prop])
        }
      })

      return validateItems(fields)
    }

    function validateItems(items: Set<FieldOptions>) {
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
      fieldSet.value.forEach(field => {
        field.reset()
      })
    }

    function resetFields(props: string | string[]) {
      if (!Array.isArray(props)) {
        props = [props]
      }

      const propMap = getPropMap()

      props.forEach(prop => {
        if (propMap[prop]) {
          propMap[prop].reset()
        }
      })
    }

    function clearError() {
      fieldSet.value.forEach(field => {
        field.clearError()
      })
    }

    function clearFieldsError(props: string | string[]) {
      if (!Array.isArray(props)) {
        props = [props]
      }

      const propMap = getPropMap()

      props.forEach(prop => {
        if (propMap[prop]) {
          propMap[prop].clearError()
        }
      })
    }

    return {
      props,
      className,

      validate,
      validateFields,
      reset,
      resetFields,
      clearError,
      clearFieldsError
    }
  }
})
</script>
