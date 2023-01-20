<template>
  <Button
    :inherit="isInherit"
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
    :loading-effect="props.loadingEffect"
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
    <template v-if="$slots.icon" #icon>
      <slot name="icon"></slot>
    </template>
    <template v-if="$slots.loading" #loading>
      <slot name="loading"></slot>
    </template>
  </Button>
</template>

<script lang="ts">
import { defineComponent, toRef, computed, inject } from 'vue'
import { Button } from '@/components/button'
import { useNameHelper, useProps, useLocale, emitEvent } from '@vexip-ui/config'
import { isPromise } from '@vexip-ui/utils'
import { formResetProps } from './props'
import { FORM_ACTIONS } from './symbol'

export default defineComponent({
  name: 'FormReset',
  components: {
    Button
  },
  props: formResetProps,
  emits: [],
  setup(_props) {
    const props = useProps('formReset', _props, {
      size: null,
      locale: null,
      type: 'default',
      label: null,
      dashed: null,
      text: null,
      simple: null,
      ghost: null,
      disabled: null,
      loading: null,
      circle: null,
      loadingIcon: null,
      loadingEffect: null,
      icon: null,
      color: null,
      buttonType: null,
      block: null,
      onBeforeReset: {
        default: null,
        isFunc: true
      }
    })
    const actions = inject(FORM_ACTIONS, null)

    const isInherit = computed(() => !!actions || props.inherit)

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
        actions?.reset()
        emitEvent(props.onReset)
      }
    }

    return {
      props,
      nh: useNameHelper('form'),
      locale: useLocale('form', toRef(props, 'locale')),

      isInherit,

      handleReset
    }
  }
})
</script>
