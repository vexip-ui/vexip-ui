<script setup lang="ts">
import { Radio } from '@/components/radio'
import { useFieldStore } from '@/components/form'

import { computed, provide, reactive, ref, toRef, watch } from 'vue'

import {
  createIconProp,
  createSizeProp,
  createStateProp,
  emitEvent,
  useNameHelper,
  useProps,
} from '@vexip-ui/config'
import { debounceMinor, isClient, isObject } from '@vexip-ui/utils'
import { radioGroupProps } from './props'
import { GROUP_STATE, radioGroupShapes } from './symbol'

import type { Ref } from 'vue'
import type { ChangeEvent } from './symbol'

defineOptions({ name: 'RadioGroup' })

const {
  idFor,
  labelId,
  state,
  disabled,
  loading,
  size,
  validateField,
  getFieldValue,
  setFieldValue,
} = useFieldStore<string | number | boolean>(focus)

const _props = defineProps(radioGroupProps)
const props = useProps('radioGroup', _props, {
  size: createSizeProp(size),
  state: createStateProp(state),
  value: {
    default: () => getFieldValue(),
    static: true,
  },
  vertical: false,
  disabled: () => disabled.value,
  options: {
    default: () => [],
    static: true,
  },
  loading: () => loading.value,
  loadingIcon: createIconProp(),
  loadingLock: false,
  loadingEffect: null,
  shape: {
    default: 'default',
    validator: value => radioGroupShapes.includes(value),
  },
})

const emit = defineEmits(['update:value'])

const nh = useNameHelper('radio-group')
const currentValue = ref(props.value)
const inputSet = new Set<Ref<HTMLElement | null | undefined>>()

const readonly = computed(() => props.loading && props.loadingLock)
const className = computed(() => {
  return [
    nh.b(),
    nh.ns('radio-vars'),
    {
      [nh.bm('inherit')]: props.inherit,
      [nh.bm('vertical')]: props.vertical,
      [nh.bm('disabled')]: props.disabled,
      [nh.bm('readonly')]: readonly.value,
      [nh.bm('loading')]: props.loading,
      [nh.bm(props.size)]: props.size !== 'default',
      [nh.bm(props.state)]: props.state !== 'default',
      [nh.bm(props.shape)]: props.shape !== 'default',
    },
  ]
})

const groupState = reactive({
  currentValue,
  size: toRef(props, 'size'),
  state: toRef(props, 'state'),
  disabled: toRef(props, 'disabled'),
  loading: toRef(props, 'loading'),
  loadingIcon: toRef(props, 'loadingIcon'),
  loadingLock: toRef(props, 'loadingLock'),
  loadingEffect: toRef(props, 'loadingEffect'),
  shape: toRef(props, 'shape'),
  updateValue: debounceMinor(updateValue),
  registerInput,
  unregisterInput,
})

// 此处直接定义 reactive 会出现类型推断错误，存疑？
provide(GROUP_STATE, groupState)

watch(
  () => props.value,
  value => {
    currentValue.value = value
  },
)

defineExpose({
  idFor,
  focus,
  blur: () => {
    for (const input of inputSet) {
      input.value?.blur()
    }
  },
})

function updateValue(value: string | number | boolean) {
  if (currentValue.value !== value) {
    currentValue.value = value

    emit('update:value', value)
    setFieldValue(value)
    emitEvent(props.onChange as ChangeEvent, value)
    validateField()
  }
}

function registerInput(input: Ref<HTMLElement | null | undefined>) {
  inputSet.add(input)
}

function unregisterInput(input: Ref<HTMLElement | null | undefined>) {
  inputSet.delete(input)
}

function focus(options?: FocusOptions) {
  const input = Array.from(inputSet)[0]?.value

  if (isClient && input && document.activeElement !== input) {
    input.focus(options)
  }
}
</script>

<template>
  <div
    :id="idFor"
    :class="className"
    role="radiogroup"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
    :aria-labelledby="labelId"
  >
    <slot>
      <template v-for="item in props.options" :key="item">
        <Radio
          v-if="isObject(item)"
          inherit
          :label="item.label"
          :disabled="item.disabled"
        >
          {{ item.content || item.label }}
        </Radio>
        <Radio v-else inherit :label="item">
          {{ item }}
        </Radio>
      </template>
    </slot>
  </div>
</template>
