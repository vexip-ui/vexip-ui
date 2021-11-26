<template>
  <Button
    :class="`${prefix}__submit`"
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
    @on-click="handleSubmit"
  >
    <slot>
      {{ text || locale.submit }}
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
import { createSizeProp } from '@/common/config/props'
import { useConfiguredProps } from '@/common/config/install'
import { useLocaleConfig } from '@/common/config/locale'
import { noop } from '@/common/utils/common'
import { FORM_PROPS, FORM_ACTIONS } from './symbol'

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
  }
})

export default defineComponent({
  name: 'FormSubmit',
  components: {
    Button
  },
  props,
  emits: ['on-submit', 'on-error'],
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
        emit('on-error', errors)
      } else if (submit.value) {
        emit('on-submit')
        submit.value.click()
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
