<template>
  <Button
    :class="`${prefix}__reset`"
    :size="size"
    :type="type"
    :simple="simple"
    :ghost="ghost"
    :disabled="disabled"
    :circle="circle"
    :loading-icon="loadingIcon"
    :loading-spin="loadingSpin"
    :icon="icon"
    :text-color="textColor"
    :block="block"
    @click="handleReset"
  >
    <slot>
      {{ text || locale.reset }}
    </slot>
  </Button>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { Button } from '@/components/button'
import { createSizeProp, useConfiguredProps, useLocaleConfig } from '@vexip-ui/config'
import { noop, isPromise } from '@vexip-ui/utils'
import { FORM_ACTIONS } from './symbol'

import type { PropType } from 'vue'
import type { ButtonType } from '@/components/button'
import type { FormActions } from './symbol'

const props = useConfiguredProps('form-submit', {
  size: createSizeProp(),
  type: {
    default: 'default' as ButtonType,
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
  text: {
    type: String,
    default: null
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
    type: String,
    default: 'spinner'
  },
  loadingSpin: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: null
  },
  block: {
    type: Boolean,
    default: false
  },
  beforeReset: {
    type: Function as PropType<() => unknown>,
    default: null
  }
})

export default defineComponent({
  name: 'FormReset',
  components: {
    Button
  },
  props,
  emits: ['reset'],
  setup(props, { emit }) {
    const actions = inject<FormActions>(FORM_ACTIONS, {
      validate: noop,
      validateFields: noop,
      reset: noop,
      resetFields: noop,
      clearError: noop,
      clearFieldsError: noop
    })

    async function handleReset() {
      if (props.disabled) return

      let result: unknown = true

      if (typeof props.beforeReset === 'function') {
        result = props.beforeReset()

        if (isPromise(result)) {
          result = await result
        }
      }

      if (result !== false) {
        actions.reset()
        emit('reset')
      }
    }

    return {
      prefix: 'vxp-form',
      locale: useLocaleConfig('form'),

      handleReset
    }
  }
})
</script>
