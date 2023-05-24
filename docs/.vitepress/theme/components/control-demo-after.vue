<template>
  <div
    :id="idFor"
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
      @chage="handleChange"
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
    default: null
  },
  disabled: {
    type: Boolean,
    default: null
  },
  loading: {
    type: Boolean,
    default: null
  },
  state: {
    type: String as PropType<ComponentState>,
    default: null
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: null
  }
})
const emit = defineEmits(['change', 'update:value'])

const {
  idFor,
  state,
  disabled,
  loading,
  size,
  validateField,
  // clearField,
  getFieldValue,
  setFieldValue
} = useFieldStore<string>(focus)

const get = <V = any>(value: V, def: V) => (value != null ? value : def)

const store = reactive({
  value: computed(() => get(props.value, getFieldValue(''))),
  disabled: computed(() => get(props.disabled, disabled.value)),
  loading: computed(() => get(props.loading, loading.value)),
  state: computed(() => get(props.state, state.value)),
  size: computed(() => get(props.size, size.value))
})

const bem = useBEM('input')
const currentValue = ref(store.value)

const control = ref<HTMLInputElement>()

defineExpose({ focus })

watch(
  () => store.value,
  value => (currentValue.value = value)
)

function handleChange(event: Event) {
  if (store.disabled) return

  currentValue.value = (event.target as HTMLInputElement).value
  setFieldValue(currentValue.value)
  emit('change', currentValue.value)
  emit('update:value', currentValue.value)
  validateField()
}

function focus(options?: FocusOptions) {
  control.value?.focus(options)
}
</script>
