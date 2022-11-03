<template>
  <div :id="idFor" :class="className" role="radiogroup">
    <slot>
      <template v-for="item in props.options" :key="item">
        <Radio v-if="isObject(item)" :label="item.label">
          {{ item.content || item.label }}
        </Radio>
        <Radio v-else :label="item">
          {{ item }}
        </Radio>
      </template>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, provide, toRef } from 'vue'
import { Radio } from '@/components/radio'
import { Spinner } from '@vexip-ui/icons'
import {
  useNameHelper,
  useProps,
  booleanProp,
  sizeProp,
  stateProp,
  createSizeProp,
  createStateProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { useFieldStore } from '@/components/form'
import { debounceMinor, isObject } from '@vexip-ui/utils'
import { GROUP_STATE } from './symbol'

import type { PropType, Ref } from 'vue'

type RawOption =
  | string
  | {
    label: string | number,
    content?: string
  }

export default defineComponent({
  name: 'RadioGroup',
  components: {
    Radio
  },
  props: {
    size: sizeProp,
    state: stateProp,
    value: [String, Number],
    vertical: booleanProp,
    disabled: booleanProp,
    button: booleanProp,
    border: booleanProp,
    options: Array as PropType<RawOption[]>,
    loading: booleanProp,
    loadingIcon: Object,
    loadingLock: booleanProp,
    loadingSpin: booleanProp,
    onChange: eventProp<(value: string | number) => void>()
  },
  emits: ['update:value'],
  setup(_props, { emit }) {
    const { idFor, state, disabled, loading, size, validateField, getFieldValue, setFieldValue } =
      useFieldStore<string | number>(() => Array.from(inputSet)[0]?.value?.focus())

    const props = useProps('radioGroup', _props, {
      size: createSizeProp(size),
      state: createStateProp(state),
      value: {
        default: () => getFieldValue(null!),
        static: true
      },
      vertical: false,
      disabled: () => disabled.value,
      button: false,
      border: false,
      options: {
        default: () => [],
        static: true
      },
      loading: () => loading.value,
      loadingIcon: Spinner,
      loadingLock: false,
      loadingSpin: false
    })

    const nh = useNameHelper('radio-group')
    const currentValue = ref(props.value)
    const inputSet = new Set<Ref<HTMLElement | null | undefined>>()

    const className = computed(() => {
      return [
        nh.b(),
        nh.ns('radio-vars'),
        {
          [nh.bm('vertical')]: props.vertical,
          [nh.bm('button')]: !props.vertical && props.button,
          [nh.bm('disabled')]: props.disabled,
          [nh.bm(props.size)]: props.size !== 'default',
          [nh.bm('border')]: props.border,
          [nh.bm(props.state)]: props.state !== 'default'
        }
      ]
    })

    const groupState = reactive({
      currentValue,
      size: toRef(props, 'size'),
      state: toRef(props, 'state'),
      disabled: toRef(props, 'disabled'),
      button: toRef(props, 'button'),
      border: toRef(props, 'border'),
      loading: toRef(props, 'loading'),
      loadingIcon: toRef(props, 'loadingIcon'),
      loadingLock: toRef(props, 'loadingLock'),
      loadingSpin: toRef(props, 'loadingSpin'),
      updateValue: debounceMinor(updateValue),
      registerInput,
      unregisterInput
    })

    // 此处直接定义 reactive 会出现类型推断错误，存疑？
    provide(GROUP_STATE, groupState)

    watch(
      () => props.value,
      value => {
        currentValue.value = value
      }
    )
    watch(currentValue, value => {
      setFieldValue(value)
      emitEvent(props.onChange, value)
      emit('update:value', value)
      validateField()
    })

    function updateValue(value: string | number) {
      currentValue.value = value
    }

    function registerInput(input: Ref<HTMLElement | null | undefined>) {
      inputSet.add(input)
    }

    function unregisterInput(input: Ref<HTMLElement | null | undefined>) {
      inputSet.delete(input)
    }

    return {
      props,
      idFor,
      className,

      isObject
    }
  }
})
</script>
