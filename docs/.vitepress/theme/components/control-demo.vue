<template>
  <div
    :class="[
      bem.b(),
      bem.bm(state),
      bem.bm(size),
      {
        [bem.bm('disabled')]: disabled,
        [bem.bm('loading')]: loading
      }
    ]"
  >
    <input
      ref="control"
      :class="bem.be('control')"
      :disabled="disabled"
      :value="currentValue"
      @chage="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { useBEM } from '@vexip-ui/bem-helper'

import type { PropType } from 'vue'
import type { ComponentSize, ComponentState } from 'vexip-ui'

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  state: {
    type: String as PropType<ComponentState>,
    default: 'default'
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: 'default'
  }
})
const emit = defineEmits(['change', 'update:value'])

const bem = useBEM('input')
const currentValue = ref(props.value)

const control = ref<HTMLInputElement>()

defineExpose({ focus })

watch(
  () => props.value,
  value => (currentValue.value = value)
)

function handleChange(event: Event) {
  if (props.disabled) return

  currentValue.value = (event.target as HTMLInputElement).value
  emit('change', currentValue.value)
  emit('update:value', currentValue.value)
}

function focus(options?: FocusOptions) {
  control.value?.focus(options)
}
</script>
