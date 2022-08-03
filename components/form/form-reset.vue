<template>
  <Button
    :class="nh.be('reset')"
    :size="props.size"
    :type="props.type"
    :simple="props.simple"
    :ghost="props.ghost"
    :dashed="props.dashed"
    :text="props.text"
    :disabled="props.disabled"
    :loading="props.loading"
    :circle="props.circle"
    :loading-icon="props.loadingIcon"
    :loading-spin="props.loadingSpin"
    :icon="props.icon"
    :color="props.color"
    :button-type="props.buttonType"
    :block="props.block"
    :tag="props.tag"
    @click="handleReset"
  >
    <slot>
      {{ props.label || locale.reset }}
    </slot>
  </Button>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { Button, buttonTypes } from '@/components/button'
import {
  useNameHelper,
  useProps,
  useLocale,
  booleanProp,
  sizeProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { noop, isPromise } from '@vexip-ui/utils'
import { FORM_ACTIONS } from './symbol'

import type { PropType } from 'vue'
import type { ButtonType, ButtonAttrType } from '@/components/button'
import type { FormActions } from './symbol'

export default defineComponent({
  name: 'FormReset',
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
    loading: booleanProp,
    circle: booleanProp,
    loadingIcon: Object,
    loadingSpin: booleanProp,
    icon: Object,
    color: String,
    buttonType: String as PropType<ButtonAttrType>,
    block: booleanProp,
    tag: String,
    onBeforeReset: Function as PropType<() => unknown>,
    onReset: eventProp()
  },
  emits: [],
  setup(_props) {
    const props = useProps('formReset', _props, {
      size: null,
      type: {
        default: 'default' as ButtonType,
        validator: (value: ButtonType) => buttonTypes.includes(value)
      },
      label: null,
      dashed: null,
      text: null,
      simple: null,
      ghost: null,
      disabled: null,
      loading: null,
      circle: null,
      loadingIcon: null,
      loadingSpin: null,
      icon: null,
      color: null,
      buttonType: null,
      block: null,
      onBeforeReset: {
        default: null,
        isFunc: true
      }
    })
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

      if (typeof props.onBeforeReset === 'function') {
        result = props.onBeforeReset()

        if (isPromise(result)) {
          result = await result
        }
      }

      if (result !== false) {
        actions.reset()
        emitEvent(props.onReset)
      }
    }

    return {
      props,
      nh: useNameHelper('form'),
      locale: useLocale('form'),

      handleReset
    }
  }
})
</script>
