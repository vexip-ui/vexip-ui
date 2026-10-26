<template>
  <div
    :id="field.idFor"
    :class="[
      bem.b(),
      bem.bm(store.state),
      bem.bm(store.size),
      {
        [bem.bm('disabled')]: store.disabled,
        [bem.bm('loading')]: store.loading
      }
    ]"
  >
    <input
      ref="control"
      :class="bem.be('control')"
      :disabled="store.disabled"
      :value="currentValue"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

import { useFieldStore } from 'vexip-ui'
import { useBEM } from '@vexip-ui/bem-helper'

import type { PropType } from 'vue'
import type { ComponentSize, ComponentState } from 'vexip-ui'

const props = defineProps({
  value: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: null,
  },
  loading: {
    type: Boolean,
    default: null,
  },
  state: {
    type: String as PropType<ComponentState>,
    default: null,
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: null,
  },
})
const emit = defineEmits(['change', 'update:value'])

const field = useFieldStore<string>(focus)

const get = <V = any>(value: V, def: V) => (value != null ? value : def)

const store = reactive({
  value: computed(() => get(props.value, field.getFieldValue(''))),
  disabled: computed(() => get(props.disabled, field.disabled.value)),
  loading: computed(() => get(props.loading, field.loading.value)),
  state: computed(() => get(props.state, field.state.value)),
  size: computed(() => get(props.size, field.size.value)),
})

const bem = useBEM('input')
const currentValue = ref(store.value)

const control = ref<HTMLInputElement>()

defineExpose({ focus })

watch(
  () => store.value,
  value => (currentValue.value = value),
)

function handleChange(event: Event) {
  if (store.disabled) return

  currentValue.value = (event.target as HTMLInputElement).value
  field.setFieldValue(currentValue.value)
  emit('change', currentValue.value)
  emit('update:value', currentValue.value)
  field.validateField()
}

function focus(options?: FocusOptions) {
  control.value?.focus(options)
}
</script>
