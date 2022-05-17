<template>
  <div :class="className">
    <slot>
      <template v-for="(item, index) in options" :key="index">
        <Radio v-if="isObject(item)" :label="item.value">
          {{ item.label || item.value }}
        </Radio>
        <Radio v-else :label="item">
          {{ item }}
        </Radio>
      </template>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, inject, provide, toRef } from 'vue'
import { Radio } from '@/components/radio'
import { useConfiguredProps, createSizeProp, createStateProp } from '@vexip-ui/config'
import { VALIDATE_FIELD } from '@/components/form-item'
import { noop, isObject, debounceMinor } from '@vexip-ui/utils'
import { GROUP_STATE } from './symbol'

import type { PropType } from 'vue'

type RawOption =
  | string
  | {
      value: string | number,
      label?: string
    }

const props = useConfiguredProps('radioGroup', {
  size: createSizeProp(),
  state: createStateProp(),
  value: {
    type: [String, Number],
    default: null
  },
  vertical: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  button: {
    type: Boolean,
    default: false
  },
  border: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array as PropType<RawOption[]>,
    default: () => []
  },
  disableValidate: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'RadioGroup',
  components: {
    Radio
  },
  props,
  emits: ['on-change', 'update:value'],
  setup(props, { emit }) {
    const validateField = inject(VALIDATE_FIELD, noop)

    const prefix = 'vxp-radio-group'
    const currentValue = ref(props.value)

    const className = computed(() => {
      return [
        prefix,
        'vxp-radio-vars',
        {
          [`${prefix}--vertical`]: props.vertical,
          [`${prefix}--button`]: !props.vertical && props.button,
          [`${prefix}--disabled`]: props.disabled,
          [`${prefix}--${props.size}`]: props.size !== 'default',
          [`${prefix}--border`]: props.border,
          [`${prefix}--${props.state}`]: props.state !== 'default'
        }
      ]
    })

    const state = reactive({
      currentValue,
      disabled: toRef(props, 'disabled'),
      updateValue: debounceMinor(updateValue)
    })

    // 此处直接定义 reactive 会出现类型推断错误，存疑？
    provide(GROUP_STATE, state)

    watch(
      () => props.value,
      value => {
        currentValue.value = value
      }
    )
    watch(currentValue, value => {
      emit('on-change', value)
      emit('update:value', value)

      if (!props.disableValidate) {
        validateField()
      }
    })

    function updateValue(value: string | number) {
      currentValue.value = value
    }

    return {
      className,

      isObject
    }
  }
})
</script>
