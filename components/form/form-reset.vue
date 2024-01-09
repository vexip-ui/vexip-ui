<script setup lang="ts">
import { Button } from '@/components/button'

import { computed, inject, toRef } from 'vue'

import { createIconProp, emitEvent, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import { isPromise } from '@vexip-ui/utils'
import { formResetProps } from './props'
import { FORM_ACTIONS } from './symbol'

defineOptions({ name: 'FormReset' })

const _props = defineProps(formResetProps)
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
  loadingIcon: createIconProp(),
  loadingEffect: null,
  icon: createIconProp(),
  color: null,
  buttonType: null,
  block: null,
  onBeforeReset: {
    default: null,
    isFunc: true
  }
})

defineSlots<{
  default: () => any,
  icon: () => any,
  loading: () => any
}>()

const actions = inject(FORM_ACTIONS, null)

const nh = useNameHelper('form')
const locale = useLocale('form', toRef(props, 'locale'))

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
</script>

<template>
  <Button
    v-bind="$attrs"
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
