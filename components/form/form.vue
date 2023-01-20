<template>
  <Row
    v-bind="$attrs"
    :class="className"
    tag="form"
    :method="props.action && props.method"
    :action="props.action"
    :gap="props.gap"
    :justify="props.justify"
    :align="props.align"
    :column-flex="undefined"
  >
    <slot></slot>
  </Row>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, provide } from 'vue'
import { Row } from '@/components/row'
import { useNameHelper, useProps, createSizeProp } from '@vexip-ui/config'
import { formProps } from './props'
import { FORM_PROPS, FORM_FIELDS, FORM_ACTIONS } from './symbol'

import type { FormLabelAlign, SubmitMethod, FieldOptions } from './symbol'

const submitMethods = Object.freeze<SubmitMethod[]>(['get', 'post', 'put', 'delete'])
const labelAligns = Object.freeze<FormLabelAlign[]>(['right', 'top', 'left'])

export default defineComponent({
  name: 'Form',
  components: {
    Row
  },
  inheritAttrs: true,
  props: formProps,
  setup(_props) {
    const props = useProps('form', _props, {
      method: {
        default: 'post',
        validator: value => submitMethods.includes(value)
      },
      action: null,
      model: {
        default: () => ({}),
        static: true
      },
      rules: () => ({}),
      labelWidth: 'auto',
      labelAlign: {
        default: 'right',
        validator: value => labelAligns.includes(value)
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
      align: 'top'
    })

    const nh = useNameHelper('form')
    const fieldSet = reactive(new Set<FieldOptions>())

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
          [nh.bm('inline')]: props.inline
        }
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
      clearFieldsError
    })

    function getLabelWidth() {
      if (typeof props.labelWidth === 'number') {
        return props.labelWidth
      }

      return labelWidth.value
    }

    function getPropMap() {
      const propMap: Record<string, FieldOptions> = {}

      for (const field of fieldSet) {
        if (field.prop.value) {
          propMap[field.prop.value] = field
        }
      }

      return propMap
    }

    function validate() {
      return validateItems(fieldSet)
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
      fieldSet.forEach(field => {
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
      fieldSet.forEach(field => {
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
