<template>
  <div :class="className">
    <slot>
      <template v-for="item in props.options" :key="item">
        <Radio :label="item">
          {{ item }}
        </Radio>
      </template>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, provide, toRef } from 'vue'
import { Radio } from '@/components/radio'
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
import { debounceMinor } from '@vexip-ui/utils'
import { GROUP_STATE } from './symbol'

import type { PropType } from 'vue'

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
    options: Array as PropType<(string | number)[]>,
    onChange: eventProp<(value: string | number) => void>()
  },
  emits: ['update:value'],
  setup(_props, { emit }) {
    const { state, validateField, getFieldValue, setFieldValue } = useFieldStore<string | number>()

    const props = useProps('radioGroup', _props, {
      size: createSizeProp(),
      state: createStateProp(state),
      value: {
        default: () => getFieldValue(null!),
        static: true
      },
      vertical: false,
      disabled: false,
      button: false,
      border: false,
      options: {
        default: () => [],
        static: true
      }
    })

    const nh = useNameHelper('radio-group')
    const currentValue = ref(props.value)

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
      updateValue: debounceMinor(updateValue)
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

    return {
      props,
      className
    }
  }
})
</script>
