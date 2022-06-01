<template>
  <Button
    :class="`${prefix}__submit`"
    :size="size"
    :type="type"
    :simple="simple"
    :ghost="ghost"
    :text="text"
    :dashed="dashed"
    :disabled="disabled"
    :circle="circle"
    :loading-icon="loadingIcon"
    :loading-spin="loadingSpin"
    :icon="icon"
    :color="color"
    :block="block"
    @click="handleSubmit"
  >
    <slot>
      {{ label || locale.submit }}
    </slot>
    <button
      ref="submit"
      type="submit"
      style="display: none;"
      @click.stop
    ></button>
  </Button>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
import { Button } from '@/components/button'
import { createSizeProp, useConfiguredProps, useLocaleConfig } from '@vexip-ui/config'
import { noop, isPromise } from '@vexip-ui/utils'
import { FORM_PROPS, FORM_ACTIONS } from './symbol'

import type { PropType } from 'vue'
import type { ButtonType } from '@/components/button'
import type { FormActions } from './symbol'

const props = useConfiguredProps('form-submit', {
  size: createSizeProp(),
  type: {
    default: 'primary' as ButtonType,
    validator: (value: ButtonType) => {
      return [
        'default',
        'primary',
        'dashed',
        'text',
        'info',
        'success',
        'warning',
        'error'
      ].includes(value)
    }
  },
  label: {
    type: String,
    default: null
  },
  text: {
    type: Boolean,
    default: false
  },
  dashed: {
    type: Boolean,
    default: false
  },
  simple: {
    type: Boolean,
    default: false
  },
  ghost: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  loadingIcon: {
    type: Object,
    default: null
  },
  loadingSpin: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Object,
    default: null
  },
  color: {
    type: String,
    default: null
  },
  block: {
    type: Boolean,
    default: false
  },
  onBeforeSubmit: {
    type: Function as PropType<() => unknown>,
    default: null
  }
})

export default defineComponent({
  name: 'FormSubmit',
  components: {
    Button
  },
  props,
  emits: ['submit', 'error'],
  setup(props, { emit }) {
    const formProps = inject(FORM_PROPS, {})
    const actions = inject<FormActions>(FORM_ACTIONS, {
      validate: noop,
      validateFields: noop,
      reset: noop,
      resetFields: noop,
      clearError: noop,
      clearFieldsError: noop
    })

    const loading = ref(false)

    const submit = ref<HTMLElement | null>(null)

    async function handleSubmit() {
      if (props.disabled || !formProps.method || !formProps.action) return

      loading.value = true

      const errors = await actions.validate()

      if (errors.length) {
        emit('error', errors)
      } else {
        let result: unknown = true

        if (typeof props.onBeforeSubmit === 'function') {
          result = props.onBeforeSubmit()

          if (isPromise(result)) {
            result = await result
          }
        }

        if (result !== false) {
          emit('submit')
          submit.value?.click()
        }
      }

      loading.value = false
    }

    return {
      prefix: 'vxp-form',
      locale: useLocaleConfig('form'),
      loading,

      submit,

      handleSubmit
    }
  }
})
</script>
