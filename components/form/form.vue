<template>
  <form :class="className">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { defineComponent, computed, provide, ref } from 'vue'
import { useConfiguredProps } from '@/common/config/install'
import { FORM_PROPS, FORM_FIELDS } from './symbol'

import type { LabelPosition, FieldOptions } from './symbol'

const props = useConfiguredProps('form', {
  model: {
    type: Object,
    default: () => ({})
  },
  rules: {
    type: Object,
    default: () => ({})
  },
  labelWidth: {
    type: Number,
    default: 80
  },
  labelPosition: {
    default: 'right' as LabelPosition,
    validator: (value: LabelPosition) => {
      return ['right', 'top', 'left'].includes(value)
    }
  },
  allRequired: {
    type: Boolean,
    default: false
  },
  labelSuffix: {
    type: String,
    default: ''
  },
  hideAsterisk: {
    type: Boolean,
    default: false
  },
  validateAll: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'Form',
  props,
  setup(props) {
    const prefix = 'vxp-form'
    const fieldSet = ref(new Set<FieldOptions>())

    const className = computed(() => {
      return [prefix, `${prefix}--label-${props.labelPosition}`]
    })

    provide(FORM_PROPS, props)
    provide(FORM_FIELDS, fieldSet)

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
