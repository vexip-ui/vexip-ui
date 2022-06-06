<template>
  <Button
    :class="`${prefix}__submit`"
    :size="props.size"
    :type="props.type"
    :simple="props.simple"
    :ghost="props.ghost"
    :dashed="props.dashed"
    :text="props.text"
    :disabled="props.disabled"
    :loading="loading"
    :circle="props.circle"
    :loading-icon="props.loadingIcon"
    :loading-spin="props.loadingSpin"
    :icon="props.icon"
    :color="props.color"
    :button-type="props.buttonType"
    :block="props.block"
    :tag="props.tag"
    @click="handleSubmit"
  >
    <slot>
      {{ props.label || locale.submit }}
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
import { useProps, useLocale, booleanProp, sizeProp } from '@vexip-ui/config'
import { noop, isPromise } from '@vexip-ui/utils'
import { FORM_PROPS, FORM_ACTIONS } from './symbol'

import type { PropType } from 'vue'
import type { ButtonType, ButtonAttrType } from '@/components/button'
import type { FormActions } from './symbol'

const buttonTypes = Object.freeze(['default', 'primary', 'info', 'success', 'warning', 'error'] as ButtonType[])

export default defineComponent({
  name: 'FormSubmit',
  components: {
    Button
  },
  props: {
    size: sizeProp,
    type: String as PropType<ButtonType>,
    label: String,
    dashed: booleanProp,
    text: booleanProp,
    simple: booleanProp,
    ghost: booleanProp,
    disabled: booleanProp,
    circle: booleanProp,
    loadingIcon: Object,
    loadingSpin: booleanProp,
    icon: Object,
    color: String,
    buttonType: String as PropType<ButtonAttrType>,
    block: booleanProp,
    tag: String,
    onBeforeSubmit: Function as PropType<() => unknown>
  },
  emits: ['submit', 'error'],
  setup(_props, { emit }) {
    const props = useProps('form-submit', _props, {
      size: null,
      type: {
        default: 'primary' as ButtonType,
        validator: (value: ButtonType) => buttonTypes.includes(value)
      },
      label: null,
      dashed: null,
      text: null,
      simple: null,
      ghost: null,
      disabled: null,
      circle: null,
      loadingIcon: null,
      loadingSpin: null,
      icon: null,
      color: null,
      buttonType: null,
      block: null,
      onBeforeSubmit: {
        default: null,
        isFunc: true
      }
    })

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
      props,
      prefix: 'vxp-form',
      locale: useLocale('form'),
      loading,

      submit,

      handleSubmit
    }
  }
})
</script>
