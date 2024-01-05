<script setup lang="ts">
import { Button } from '@/components/button'
import { FIELD_OPTIONS } from '@/components/form/symbol'

import { computed, inject, ref, toRef } from 'vue'

import { createIconProp, emitEvent, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import { useSetTimeout } from '@vexip-ui/hooks'
import { isPromise } from '@vexip-ui/utils'
import { formSubmitProps } from './props'
import { FORM_ACTIONS, FORM_PROPS } from './symbol'

defineOptions({ name: 'FormSubmit' })

const _props = defineProps(formSubmitProps)
const props = useProps('form-submit', _props, {
  size: null,
  locale: null,
  type: 'primary',
  label: null,
  dashed: null,
  text: null,
  simple: null,
  ghost: null,
  disabled: null,
  circle: null,
  loadingIcon: createIconProp(),
  loadingEffect: null,
  icon: createIconProp(),
  color: null,
  buttonType: null,
  block: null,
  onBeforeSubmit: {
    default: null,
    isFunc: true
  }
})

defineSlots<{
  default: () => any,
  icon: () => any,
  loading: () => any
}>()

const fieldActions = inject(FIELD_OPTIONS, null)

const formProps = inject(FORM_PROPS, {})
const actions = inject(FORM_ACTIONS, null)

const nh = useNameHelper('form')
const locale = useLocale('form', toRef(props, 'locale'))

const { timer } = useSetTimeout()

const loading = ref(false)

const submit = ref<HTMLElement>()

const isNative = computed(() => formProps.method && formProps.action)
const isInherit = computed(() => !!actions || props.inherit)
const isLoading = computed(() => {
  return loading.value || (fieldActions ? fieldActions.loading.value : false)
})

defineExpose({ submit, isNative, isLoading })

async function handleSubmit() {
  if (props.disabled || loading.value || !actions) return

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

  timer.loading = setTimeout(() => {
    loading.value = false
  }, 300)
}
</script>

<template>
  <Button
    v-bind="$attrs"
    :inherit="isInherit"
    :class="nh.be('submit')"
    :size="props.size"
    :type="props.type"
    :simple="props.simple"
    :ghost="props.ghost"
    :dashed="props.dashed"
    :text="props.text"
    :disabled="props.disabled"
    :loading="isLoading"
    :circle="props.circle"
    :loading-icon="props.loadingIcon"
    :loading-effect="props.loadingEffect"
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
    <template v-if="$slots.icon" #icon>
      <slot name="icon"></slot>
    </template>
    <template v-if="$slots.loading" #loading>
      <slot name="loading"></slot>
    </template>
    <button
      v-if="isNative"
      ref="submit"
      type="submit"
      style="display: none"
      @click.stop
    ></button>
  </Button>
</template>
