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
    @on-click="handleReset"
  >
    <slot>
      {{ text }}
    </slot>
  </Button>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { Button } from '@/components/button'
import { createSizeProp } from '@/common/config/props'
import { useConfiguredProps } from '@/common/config/install'
import { noop } from '@/common/utils/common'
import { FORM_ACTIONS } from './symbol'

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
    default: '重置'
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
  }
})

export default defineComponent({
  name: 'FormReset',
  components: {
    Button
  },
  props,
  emits: ['on-reset'],
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

      actions.reset()
      emit('on-reset')
    }

    return {
      prefix: 'vxp-form',
      handleReset
    }
  }
})
</script>
