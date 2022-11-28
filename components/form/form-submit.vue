<template>
  <Button
    :inherit="isInherit"
    :class="nh.be('submit')"
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
      v-if="isNative"
      ref="submit"
      type="submit"
      style="display: none;"
      @click.stop
    ></button>
  </Button>
</template>

<script lang="ts">
import { defineComponent, ref, computed, inject } from 'vue'
import { Button } from '@/components/button'
import { useNameHelper, useProps, useLocale, emitEvent } from '@vexip-ui/config'
import { isPromise } from '@vexip-ui/utils'
import { formSubmitProps } from './props'
import { FORM_PROPS, FORM_ACTIONS } from './symbol'

export default defineComponent({
  name: 'FormSubmit',
  components: {
    Button
  },
  props: formSubmitProps,
  emits: [],
  setup(_props) {
    const props = useProps('form-submit', _props, {
      size: null,
      type: 'primary',
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
    const actions = inject(FORM_ACTIONS, null)

    const loading = ref(false)

    const submit = ref<HTMLElement>()

    const isNative = computed(() => formProps.method && formProps.action)
    const isInherit = computed(() => !!actions || props.inherit)

    async function handleSubmit() {
      if (props.disabled || !actions) return

      loading.value = true

      const errors = await actions.validate()

      if (errors.length) {
        emitEvent(props.onError, errors)
      } else {
        let result: unknown = true

        if (typeof props.onBeforeSubmit === 'function') {
          result = props.onBeforeSubmit()

          if (isPromise(result)) {
            result = await result
          }
        }

        if (result !== false) {
          emitEvent(props.onSubmit)

          if (isNative.value) {
            submit.value?.click()
          }
        }
      }

      loading.value = false
    }

    return {
      props,
      nh: useNameHelper('form'),
      locale: useLocale('form'),
      loading,

      submit,

      isNative,
      isInherit,

      handleSubmit
    }
  }
})
</script>
